import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FormBuilder } from '@/components/quiz/FormBuilder'
import { QUIZ_QUESTIONS, QuizAnswer } from '@/types/quiz'
import { supabase } from '@/lib/supabase'

export default function Quiz() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
    }
    checkUser()
  }, [router])

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id)

  const handleAnswerChange = (answer: QuizAnswer) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === answer.questionId)
      if (existingIndex >= 0) {
        const newAnswers = [...prev]
        newAnswers[existingIndex] = answer
        return newAnswers
      }
      return [...prev, answer]
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          answers
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit quiz')
      }

      const result = await response.json()
      
      // Redirect to recommendations
      router.push(`/recommendations?answerSetId=${result.answerSetId}`)
    } catch (error) {
      console.error('Quiz submission error:', error)
      alert('Failed to submit quiz. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isCurrentQuestionAnswered = () => {
    return currentAnswer && 
           (Array.isArray(currentAnswer.answer) ? currentAnswer.answer.length > 0 : currentAnswer.answer !== '')
  }

  const isQuizComplete = () => {
    return answers.length === QUIZ_QUESTIONS.length && 
           answers.every(answer => 
             Array.isArray(answer.answer) ? answer.answer.length > 0 : answer.answer !== ''
           )
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Assessment</h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
          </p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <FormBuilder
            question={currentQuestion}
            answer={currentAnswer}
            onAnswerChange={handleAnswerChange}
          />

          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>

            {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered()}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isQuizComplete() || isLoading}
                isLoading={isLoading}
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}





