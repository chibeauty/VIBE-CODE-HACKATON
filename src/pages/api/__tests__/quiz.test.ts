import { createMocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import quizHandler from '../quiz'
import { supabaseAdmin } from '@/lib/supabase'

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: { id: 'test-quiz-id', answer_set_id: 'test-answer-set-id' }
          }))
        }))
      }))
    }))
  }
}))

describe('/api/quiz', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle POST request successfully', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id',
        answers: [
          { questionId: 'interests', answer: ['technology', 'problem-solving'] },
          { questionId: 'experience', answer: 'beginner' }
        ]
      }
    })

    await quizHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
    expect(data.answerSetId).toBeDefined()
  })

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET'
    })

    await quizHandler(req, res)

    expect(res._getStatusCode()).toBe(405)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Method not allowed')
  })

  it('should return 400 for missing userId', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        answers: [
          { questionId: 'interests', answer: ['technology'] }
        ]
      }
    })

    await quizHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Missing required fields: userId and answers array')
  })

  it('should return 400 for missing answers', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id'
      }
    })

    await quizHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Missing required fields: userId and answers array')
  })

  it('should handle database errors gracefully', async () => {
    const mockSupabase = supabaseAdmin as jest.Mocked<typeof supabaseAdmin>
    mockSupabase.from.mockReturnValue({
      insert: jest.fn(() => {
        throw new Error('Database error')
      })
    } as any)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id',
        answers: [
          { questionId: 'interests', answer: ['technology'] }
        ]
      }
    })

    await quizHandler(req, res)

    expect(res._getStatusCode()).toBe(500)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Internal server error')
  })
})
