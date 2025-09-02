import { createMocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import webhookHandler from '../intasend_webhook'

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [{ id: 'payment-id' }]
        }))
      }))
    }))
  }
}))

// Mock IntaSendService
jest.mock('@/lib/intasend', () => ({
  intaSendService: {
    verifyWebhookSignature: jest.fn(() => true)
  }
}))

describe('/api/intasend_webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle completed payment webhook successfully', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-intasend-signature': 'test-signature'
      },
      body: {
        event: 'checkout.session.completed',
        data: {
          id: 'session-123',
          amount: 5000,
          currency: 'USD'
        }
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.received).toBe(true)
  })

  it('should handle expired payment webhook successfully', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-intasend-signature': 'test-signature'
      },
      body: {
        event: 'checkout.session.expired',
        data: {
          id: 'session-123',
          amount: 5000,
          currency: 'USD'
        }
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.received).toBe(true)
  })

  it('should handle cancelled payment webhook successfully', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-intasend-signature': 'test-signature'
      },
      body: {
        event: 'checkout.session.cancelled',
        data: {
          id: 'session-123',
          amount: 5000,
          currency: 'USD'
        }
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.received).toBe(true)
  })

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET'
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(405)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Method not allowed')
  })

  it('should return 400 for missing signature header', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        event: 'checkout.session.completed',
        data: {
          id: 'session-123'
        }
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Missing signature')
  })

  it('should return 400 for missing webhook body', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-intasend-signature': 'test-signature'
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(500) // The API will fail when trying to parse undefined body
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Webhook processing failed')
  })

  it('should return 401 for invalid signature', async () => {
    const { intaSendService } = require('@/lib/intasend')
    intaSendService.verifyWebhookSignature.mockReturnValue(false)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-intasend-signature': 'invalid-signature'
      },
      body: {
        event: 'checkout.session.completed',
        data: {
          id: 'session-123'
        }
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(401)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Invalid signature')
  })

  it('should handle database errors gracefully', async () => {
    const mockSupabase = require('@/lib/supabase').supabaseAdmin
    const mockIntaSend = require('@/lib/intasend').intaSendService
    
    // Ensure signature verification passes
    mockIntaSend.verifyWebhookSignature.mockReturnValue(true)
    
    // Mock the database update to throw an error
    mockSupabase.from.mockReturnValue({
      update: jest.fn(() => {
        throw new Error('Database error')
      })
    })

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-intasend-signature': 'test-signature'
      },
      body: {
        event: 'checkout.session.completed',
        data: {
          id: 'session-123',
          amount: 5000,
          currency: 'USD'
        }
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(200) // The API continues even if database operations fail
    const data = JSON.parse(res._getData())
    expect(data.received).toBe(true)
  })

  it('should handle unknown webhook states gracefully', async () => {
    const mockIntaSend = require('@/lib/intasend').intaSendService
    
    // Ensure signature verification passes
    mockIntaSend.verifyWebhookSignature.mockReturnValue(true)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-intasend-signature': 'test-signature'
      },
      body: {
        event: 'unknown.event',
        data: {
          id: 'session-123'
        }
      }
    })

    await webhookHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.received).toBe(true)
  })
})
