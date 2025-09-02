import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, answers } = req.body

    if (!userId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId and answers array' 
      })
    }

    // Generate unique answer set ID
    const answerSetId = `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store quiz results in database
    const { data: quizData, error: quizError } = await supabaseAdmin
      .from('quizzes')
      .insert({
        user_id: userId,
        answer_set_id: answerSetId,
        answers: answers,
        completed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (quizError) {
      console.error('Quiz storage error:', quizError)
      return res.status(500).json({ 
        error: 'Failed to store quiz results',
        code: 'QUIZ_STORAGE_ERROR'
      })
    }

    console.log(`Quiz completed for user ${userId}, answerSetId: ${answerSetId}`)

    return res.status(200).json({
      success: true,
      answerSetId,
      message: 'Quiz submitted successfully'
    })

  } catch (error: any) {
    console.error('Quiz API error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    })
  }
}






