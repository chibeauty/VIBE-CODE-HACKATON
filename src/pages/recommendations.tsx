import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RecommendationCard } from '@/components/recommendations/RecommendationCard'
import { CareerRecommendation } from '@/lib/recommendationEngine'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Recommendations() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkUserAndLoadRecommendations = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setUser(user)

        // Load recommendations
        await loadRecommendations(user.id)
      } catch (error) {
        console.error('Error loading recommendations:', error)
        setError('Failed to load recommendations')
      } finally {
        setIsLoading(false)
      }
    }

    checkUserAndLoadRecommendations()
  }, [router])

  const loadRecommendations = async (userId: string) => {
    try {
      const response = await fetch(`/api/recommendations?userId=${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations')
      }

      const data = await response.json()
      setRecommendations(data.recommendations)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      setError('Failed to load recommendations')
    }
  }

  const handleViewRoadmap = (careerId: string) => {
    router.push(`/roadmap?careerId=${careerId}`)
  }

  const handleRetakeQuiz = () => {
    router.push('/quiz')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized recommendations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Career Recommendations
          </h1>
          <p className="text-gray-600">
            Based on your assessment, here are the top career paths that match your skills and interests
          </p>
        </div>

        {recommendations.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🤔</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No recommendations found
            </h2>
            <p className="text-gray-600 mb-6">
              It looks like we couldn't generate recommendations based on your current profile.
            </p>
            <Button onClick={handleRetakeQuiz}>
              Retake Assessment
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <div key={recommendation.id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-3 -left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    TOP MATCH
                  </div>
                )}
                <RecommendationCard
                  recommendation={recommendation}
                  onViewRoadmap={handleViewRoadmap}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button
            onClick={handleRetakeQuiz}
            variant="outline"
            className="mr-4"
          >
            Retake Assessment
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}





