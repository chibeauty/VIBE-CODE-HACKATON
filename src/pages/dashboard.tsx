import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckoutButton } from '@/components/payments/CheckoutButton'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userStats, setUserStats] = useState({
    quizzesCompleted: 0,
    recommendationsReceived: 0,
    roadmapsCreated: 0
  })

  useEffect(() => {
    const checkUserAndLoadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setUser(user)
        await loadUserStats(user.id)
      } catch (error) {
        console.error('Error loading dashboard:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkUserAndLoadData()
  }, [router])

  const loadUserStats = async (userId: string) => {
    try {
      // Load user statistics
      const [quizzesResponse, recommendationsResponse] = await Promise.all([
        fetch(`/api/quiz?userId=${userId}`),
        fetch(`/api/recommendations?userId=${userId}`)
      ])

      if (quizzesResponse.ok) {
        const quizzesData = await quizzesResponse.json()
        setUserStats(prev => ({ ...prev, quizzesCompleted: quizzesData.quizzes?.length || 0 }))
      }

      if (recommendationsResponse.ok) {
        const recommendationsData = await recommendationsResponse.json()
        setUserStats(prev => ({ ...prev, recommendationsReceived: recommendationsData.recommendations?.length || 0 }))
      }
    } catch (error) {
      console.error('Error loading user stats:', error)
    }
  }

  const handleStartQuiz = () => {
    router.push('/quiz')
  }

  const handleViewRecommendations = () => {
    router.push('/recommendations')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">CareerPath Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600">
            Continue your career development journey with personalized guidance and resources.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {userStats.quizzesCompleted}
              </div>
              <div className="text-gray-600">Quizzes Completed</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {userStats.recommendationsReceived}
              </div>
              <div className="text-gray-600">Career Recommendations</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {userStats.roadmapsCreated}
              </div>
              <div className="text-gray-600">Roadmaps Created</div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Career Assessment
              </h3>
              <p className="text-gray-600 mb-4">
                Take our comprehensive career assessment to discover your ideal career path.
              </p>
              <Button onClick={handleStartQuiz} className="w-full">
                Start Assessment
              </Button>
            </div>
          </Card>

          <Card>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                View Recommendations
              </h3>
              <p className="text-gray-600 mb-4">
                See your personalized career recommendations based on your assessment.
              </p>
              <Button onClick={handleViewRecommendations} variant="outline" className="w-full">
                View Recommendations
              </Button>
            </div>
          </Card>
        </div>

        {/* Premium Features */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Unlock Premium Features
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get access to personalized mentorship, advanced career roadmaps, and exclusive resources 
              to accelerate your career development journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-left max-w-2xl mx-auto">
              <div className="flex items-center space-x-2">
                <div className="text-green-500">✓</div>
                <span className="text-sm text-gray-700">1-on-1 Mentor Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-green-500">✓</div>
                <span className="text-sm text-gray-700">Advanced Roadmaps</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-green-500">✓</div>
                <span className="text-sm text-gray-700">Premium Resources</span>
              </div>
            </div>

            <CheckoutButton
              userId={user.id}
              amount={99}
              serviceType="premium_subscription"
              onSuccess={(sessionId) => {
                console.log('Checkout initiated:', sessionId)
              }}
              onError={(error) => {
                console.error('Checkout error:', error)
              }}
            />
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <Card>
            <div className="p-6">
              {userStats.quizzesCompleted === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📊</div>
                  <p className="text-gray-600 mb-4">No activity yet. Start your career journey!</p>
                  <Button onClick={handleStartQuiz}>
                    Take Your First Assessment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-blue-600">✅</div>
                    <div>
                      <div className="font-medium text-gray-900">Career Assessment Completed</div>
                      <div className="text-sm text-gray-600">You've completed your career assessment</div>
                    </div>
                  </div>
                  {userStats.recommendationsReceived > 0 && (
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="text-green-600">🎯</div>
                      <div>
                        <div className="font-medium text-gray-900">Recommendations Generated</div>
                        <div className="text-sm text-gray-600">You have {userStats.recommendationsReceived} career recommendations</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}





