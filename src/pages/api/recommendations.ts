import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import { RecommendationEngine } from '@/lib/recommendationEngine'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, answerSetId } = req.query

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ 
        error: 'Missing or invalid userId parameter',
        code: 'MISSING_USER_ID'
      })
    }

    // Check if we have cached recommendations
    if (answerSetId && typeof answerSetId === 'string') {
      const { data: existingRecs, error: fetchError } = await supabaseAdmin
        .from('recommendations')
        .select('*')
        .eq('user_id', userId)
        .eq('answer_set_id', answerSetId)
        .order('total_score', { ascending: false })

      if (!fetchError && existingRecs && existingRecs.length > 0) {
        console.log('Returning cached recommendations for user:', userId)
        return res.status(200).json({
          success: true,
          recommendations: existingRecs,
          source: 'cache'
        })
      }
    }

    // Get quiz answers for the user
    const { data: quizData, error: quizError } = await supabaseAdmin
      .from('quizzes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (quizError || !quizData) {
      return res.status(404).json({ 
        error: 'No quiz data found for user',
        code: 'NO_QUIZ_DATA'
      })
    }

    // Generate recommendations using the engine
    const engine = RecommendationEngine.getInstance()
    const result = await engine.generateRecommendations(
      userId,
      quizData.answers,
      quizData.answer_set_id
    )

    // Store recommendations in database
    const recommendationsToStore = result.recommendations.map(rec => ({
      user_id: userId,
      answer_set_id: quizData.answer_set_id,
      career_path_id: rec.id,
      recommendation_type: 'career_path',
      title: rec.title,
      description: rec.description,
      priority_level: Math.ceil(rec.totalScore * 5), // Convert 0-1 score to 1-5 priority
      metadata: {
        matchScore: rec.matchScore,
        demandScore: rec.demandScore,
        totalScore: rec.totalScore,
        category: rec.category,
        difficultyLevel: rec.difficultyLevel,
        estimatedDurationMonths: rec.estimatedDurationMonths,
        requiredSkills: rec.requiredSkills,
        salaryRangeMin: rec.salaryRangeMin,
        salaryRangeMax: rec.salaryRangeMax,
        jobOutlook: rec.jobOutlook
      }
    }))

    const { error: storeError } = await supabaseAdmin
      .from('recommendations')
      .insert(recommendationsToStore)

    if (storeError) {
      console.error('Failed to store recommendations:', storeError)
      // Continue anyway - we can still return the recommendations
    }

    console.log(`Generated ${result.recommendations.length} recommendations for user ${userId}`)

    return res.status(200).json({
      success: true,
      recommendations: result.recommendations,
      answerSetId: quizData.answer_set_id,
      source: 'computed'
    })

  } catch (error: any) {
    console.error('Recommendations API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    })
  }
}





