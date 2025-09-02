import { createMocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import recommendationsHandler from '../recommendations'
import { supabaseAdmin } from '@/lib/supabase'
import { RecommendationEngine } from '@/lib/recommendationEngine'

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => ({
              data: []
            }))
          }))
        }))
      })),
      insert: jest.fn(() => ({
        data: [{ id: 'new-rec-id' }]
      }))
    }))
  }
}))

// Mock RecommendationEngine
jest.mock('@/lib/recommendationEngine', () => ({
  RecommendationEngine: {
    getInstance: jest.fn(() => ({
      generateRecommendations: jest.fn(() => ({
        recommendations: [
          {
            id: 'career-1',
            title: 'Software Developer',
            description: 'Build software applications',
            matchScore: 0.85,
            demandScore: 0.9,
            totalScore: 0.875,
            category: 'Technology',
            difficultyLevel: 'Intermediate',
            estimatedDurationMonths: 12,
            requiredSkills: ['JavaScript', 'React'],
            salaryRangeMin: 60000,
            salaryRangeMax: 120000,
            jobOutlook: 'Good'
          }
        ]
      }))
    }))
  }
}))

describe('/api/recommendations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return existing recommendations if available', async () => {
    const mockSupabase = supabaseAdmin as jest.Mocked<typeof supabaseAdmin>
    mockSupabase.from.mockReturnValue({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            order: jest.fn(() => ({
              data: [
                {
                  id: 'existing-rec-id',
                  career_path_id: 'career-1',
                  user_id: 'test-user-id',
                  title: 'Software Developer',
                  description: 'Build software applications',
                  priority_level: 4
                }
              ]
            }))
          }))
        }))
      }))
    } as any)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { userId: 'test-user-id', answerSetId: 'test-answer-set-id' }
    })

    await recommendationsHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
    expect(data.recommendations).toHaveLength(1)
  })

  it('should generate new recommendations if none exist', async () => {
    const mockSupabase = supabaseAdmin as jest.Mocked<typeof supabaseAdmin>
    mockSupabase.from.mockReturnValue({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => ({
            limit: jest.fn(() => ({
              single: jest.fn(() => ({
                data: {
                  id: 'test-quiz-id',
                  answer_set_id: 'test-answer-set-id',
                  answers: [
                    { questionId: 'interests', answer: ['technology'] }
                  ]
                }
              }))
            }))
          }))
        }))
      })),
      insert: jest.fn(() => ({
        data: [{ id: 'new-rec-id' }]
      }))
    } as any)

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { userId: 'test-user-id' }
    })

    await recommendationsHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
    expect(data.recommendations).toHaveLength(1)
  })

  it('should return 400 for missing userId', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET'
    })

    await recommendationsHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Missing or invalid userId parameter')
  })

  it('should return 405 for non-GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST'
    })

    await recommendationsHandler(req, res)

    expect(res._getStatusCode()).toBe(405)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Method not allowed')
  })

  it('should handle database errors gracefully', async () => {
    const mockSupabase = supabaseAdmin as jest.Mocked<typeof supabaseAdmin>
    mockSupabase.from.mockImplementation(() => {
      throw new Error('Database error')
    })

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { userId: 'test-user-id' }
    })

    await recommendationsHandler(req, res)

    expect(res._getStatusCode()).toBe(500)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Internal server error')
  })

  it('should return recommendations within 2 seconds (performance test)', async () => {
    const mockSupabase = supabaseAdmin as jest.Mocked<typeof supabaseAdmin>
    const mockRecommendationEngine = require('@/lib/recommendationEngine').RecommendationEngine.getInstance()
    
    // Setup mocks for successful recommendation generation
    mockSupabase.from.mockReturnValue({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => ({
            limit: jest.fn(() => ({
              single: jest.fn(() => ({
                data: {
                  id: 'test-quiz-id',
                  answer_set_id: 'test-answer-set-id',
                  answers: [
                    { questionId: 'interests', answer: ['technology'] }
                  ]
                }
              }))
            }))
          }))
        }))
      })),
      insert: jest.fn(() => ({
        data: [{ id: 'new-rec-id' }]
      }))
    } as any)
    
    mockRecommendationEngine.generateRecommendations.mockResolvedValue({
      recommendations: [
        {
          careerId: 'software-engineer',
          title: 'Software Engineer',
          description: 'Develop software applications',
          totalScore: 85,
          skillMatch: 90,
          interestMatch: 80,
          demandScore: 85,
          salaryRange: '$80k - $150k',
          requiredSkills: ['JavaScript', 'React', 'Node.js']
        }
      ]
    })
    
    const startTime = Date.now()
    
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { userId: 'test-user-id' }
    })

    await recommendationsHandler(req, res)
    
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    expect(responseTime).toBeLessThan(2000) // Less than 2 seconds
    expect(res._getStatusCode()).toBe(200)
  })
})
