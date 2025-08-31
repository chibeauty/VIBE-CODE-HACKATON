import { createMocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import checkoutHandler from '../checkout'
import { supabaseAdmin } from '@/lib/supabase'
import { intaSendService } from '@/lib/intasend'

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn()
  }
}))

// Mock IntaSendService
jest.mock('@/lib/intasend', () => ({
  intaSendService: {
    createCheckoutSession: jest.fn()
  }
}))

describe('/api/checkout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Setup default mocks
    const mockSupabase = require('@/lib/supabase').supabaseAdmin
    const mockIntaSend = require('@/lib/intasend').intaSendService
    
    // Reset mocks to default behavior
    mockSupabase.from.mockReset()
    mockIntaSend.createCheckoutSession.mockReset()
    
    // Default IntaSend mock
    mockIntaSend.createCheckoutSession.mockResolvedValue({
      checkout_url: 'https://checkout.intasend.com/session/123',
      id: 'session-123',
      created_at: new Date().toISOString()
    })
  })

  it('should create checkout session successfully', async () => {
    const mockSupabase = require('@/lib/supabase').supabaseAdmin
    
    // Mock the user lookup
    mockSupabase.from.mockReturnValueOnce({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              id: 'test-user-id',
              email: 'test@example.com',
              full_name: 'Test User'
            }
          }))
        }))
      }))
    })
    
    // Mock the payment insert
    mockSupabase.from.mockReturnValueOnce({
      insert: jest.fn(() => ({
        data: [{ id: 'payment-id' }]
      }))
    })

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id',
        amount: 5000,
        currency: 'USD',
        serviceType: 'career_guidance'
      }
    })

    await checkoutHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
    expect(data.checkoutUrl).toBe('https://checkout.intasend.com/session/123')
    expect(data.sessionId).toBe('session-123')
  })

  it('should return 400 for missing userId', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        amount: 5000,
        currency: 'USD'
      }
    })

    await checkoutHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Missing required fields: userId and amount')
  })

  it('should return 400 for missing amount', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id',
        currency: 'USD'
      }
    })

    await checkoutHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Missing required fields: userId and amount')
  })

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET'
    })

    await checkoutHandler(req, res)

    expect(res._getStatusCode()).toBe(405)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Method not allowed')
  })

  it('should handle user not found error', async () => {
    const mockSupabase = supabaseAdmin as jest.Mocked<typeof supabaseAdmin>
    mockSupabase.from.mockReturnValue({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: null
          }))
        }))
      }))
    } as any)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'non-existent-user',
        amount: 5000,
        currency: 'USD'
      }
    })

    await checkoutHandler(req, res)

    expect(res._getStatusCode()).toBe(404)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('User not found')
  })

  it('should handle IntaSend service errors gracefully', async () => {
    const mockSupabase = require('@/lib/supabase').supabaseAdmin
    const mockIntaSend = require('@/lib/intasend').intaSendService
    
    // Mock the user lookup
    mockSupabase.from.mockReturnValueOnce({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              id: 'test-user-id',
              email: 'test@example.com',
              full_name: 'Test User'
            }
          }))
        }))
      }))
    })
    
    // Mock IntaSend to throw an error
    mockIntaSend.createCheckoutSession.mockRejectedValue(
      new Error('IntaSend API error: Service unavailable')
    )

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id',
        amount: 5000,
        currency: 'USD'
      }
    })

    await checkoutHandler(req, res)

    expect(res._getStatusCode()).toBe(502)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Payment service temporarily unavailable')
  })

  it('should handle database errors gracefully', async () => {
    const mockSupabase = require('@/lib/supabase').supabaseAdmin
    
    // Mock the user lookup
    mockSupabase.from.mockReturnValueOnce({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: {
              id: 'test-user-id',
              email: 'test@example.com',
              full_name: 'Test User'
            }
          }))
        }))
      }))
    })
    
    // Mock the payment insert to return an error (not throw)
    mockSupabase.from.mockReturnValueOnce({
      insert: jest.fn(() => ({
        error: { message: 'Database error' }
      }))
    })

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id',
        amount: 5000,
        currency: 'USD'
      }
    })

    await checkoutHandler(req, res)

    expect(res._getStatusCode()).toBe(200) // The API continues even if storing payment fails
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
  })
})
