import { createMocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import roadmapHandler from '../roadmap'

// Mock RoadmapBuilder
const mockGenerateRoadmap = jest.fn(() => ({
  id: 'roadmap-1',
  title: 'Software Developer Roadmap',
  description: 'Step-by-step guide to become a software developer',
  steps: [
    {
      id: 'step-1',
      title: 'Learn Fundamentals',
      description: 'Learn programming basics',
      resources: [
        {
          title: 'JavaScript Tutorial',
          url: 'https://example.com/js',
          type: 'course'
        }
      ],
      durationWeeks: 2,
      order: 1,
      isCompleted: false
    }
  ],
  estimatedDurationMonths: 12,
  currentStep: 1,
  isCompleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}))

jest.mock('@/lib/roadmapBuilder', () => ({
  RoadmapBuilder: {
    getInstance: jest.fn(() => ({
      generateRoadmap: mockGenerateRoadmap
    }))
  }
}))

describe('/api/roadmap', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGenerateRoadmap.mockClear()
    // Reset the mock to return the default successful response
    mockGenerateRoadmap.mockImplementation(() => ({
      id: 'roadmap-1',
      title: 'Software Developer Roadmap',
      description: 'Step-by-step guide to become a software developer',
      steps: [
        {
          id: 'step-1',
          title: 'Learn Fundamentals',
          description: 'Learn programming basics',
          resources: [
            {
              title: 'JavaScript Tutorial',
              url: 'https://example.com/js',
              type: 'course'
            }
          ],
          durationWeeks: 2,
          order: 1,
          isCompleted: false
        }
      ],
      estimatedDurationMonths: 12,
      currentStep: 1,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
  })

  it('should generate roadmap successfully', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { careerId: 'career-1' }
    })

    await roadmapHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
    expect(data.roadmap).toBeDefined()
    expect(data.roadmap.title).toBe('Software Developer Roadmap')
    expect(data.roadmap.steps).toHaveLength(1)
  })

  it('should return 400 for missing careerId', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET'
    })

    await roadmapHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Missing or invalid careerId parameter')
  })

  it('should return 405 for non-GET requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST'
    })

    await roadmapHandler(req, res)

    expect(res._getStatusCode()).toBe(405)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Method not allowed')
  })

  it('should handle roadmap generation errors gracefully', async () => {
    mockGenerateRoadmap.mockImplementation(() => {
      throw new Error('Roadmap generation failed')
    })

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { careerId: 'career-1' }
    })

    await roadmapHandler(req, res)

    expect(res._getStatusCode()).toBe(500)
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Internal server error')
  })

  it('should return roadmap within 2 seconds (performance test)', async () => {
    const startTime = Date.now()
    
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { careerId: 'career-1' }
    })

    await roadmapHandler(req, res)
    
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    expect(responseTime).toBeLessThan(2000) // Less than 2 seconds
    expect(res._getStatusCode()).toBe(200)
  })
})
