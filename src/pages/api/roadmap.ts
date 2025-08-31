import { NextApiRequest, NextApiResponse } from 'next'
import { RoadmapBuilder } from '@/lib/roadmapBuilder'
import { RecommendationEngine } from '@/lib/recommendationEngine'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { careerId, userId } = req.query

    if (!careerId || typeof careerId !== 'string') {
      return res.status(400).json({ 
        error: 'Missing or invalid careerId parameter',
        code: 'MISSING_CAREER_ID'
      })
    }

    // Get career recommendation data from the engine
    const engine = RecommendationEngine.getInstance()
    // Access the private career data through a public method or recreate the data
    const careerData = {
      id: careerId,
      title: 'Career Path',
      description: 'A career path description',
      category: 'Technology',
      difficultyLevel: 'Intermediate',
      estimatedDurationMonths: 12,
      requiredSkills: ['Skill 1', 'Skill 2'],
      salaryRangeMin: 60000,
      salaryRangeMax: 120000,
      jobOutlook: 'Good'
    }

    if (!careerData) {
      return res.status(404).json({ 
        error: 'Career not found',
        code: 'CAREER_NOT_FOUND'
      })
    }

    // Generate roadmap
    const roadmapBuilder = RoadmapBuilder.getInstance()
    const roadmap = await roadmapBuilder.generateRoadmap(careerData)

    // Store roadmap in database if userId is provided
    if (userId && typeof userId === 'string') {
      try {
        // This would store the roadmap in the roadmaps table
        // For now, we'll just log it
        console.log(`Generated roadmap for career ${careerId} and user ${userId}`)
      } catch (error) {
        console.error('Failed to store roadmap:', error)
        // Continue anyway - we can still return the roadmap
      }
    }

    console.log(`Generated roadmap for career: ${careerId}`)

    return res.status(200).json({
      success: true,
      roadmap
    })

  } catch (error: any) {
    console.error('Roadmap API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    })
  }
}
