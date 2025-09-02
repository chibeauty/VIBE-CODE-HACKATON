import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CareerRoadmap, RoadmapStep } from '@/types/roadmap'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

export default function Roadmap() {
  const router = useRouter()
  const { careerId } = router.query
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkUserAndLoadRoadmap = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setUser(user)

        if (careerId) {
          await loadRoadmap(careerId as string, user.id)
        }
      } catch (error) {
        console.error('Error loading roadmap:', error)
        setError('Failed to load roadmap')
      } finally {
        setIsLoading(false)
      }
    }

    if (careerId) {
      checkUserAndLoadRoadmap()
    }
  }, [careerId, router])

  const loadRoadmap = async (careerId: string, userId: string) => {
    try {
      const response = await fetch(`/api/roadmap?careerId=${careerId}&userId=${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch roadmap')
      }

      const data = await response.json()
      setRoadmap(data.roadmap)
    } catch (error) {
      console.error('Error fetching roadmap:', error)
      setError('Failed to load roadmap')
    }
  }

  const handleStepComplete = (stepId: string) => {
    if (!roadmap) return

    setRoadmap(prev => {
      if (!prev) return prev
      
      const updatedSteps = prev.steps.map(step => 
        step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
      )
      
      return {
        ...prev,
        steps: updatedSteps,
        currentStep: Math.max(...updatedSteps.filter(s => s.isCompleted).map(s => s.order)) + 1
      }
    })
  }

  const handleBackToRecommendations = () => {
    router.push('/recommendations')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Building your career roadmap...</p>
        </div>
      </div>
    )
  }

  if (error || !roadmap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error || 'Failed to load roadmap'}</p>
          <Button onClick={handleBackToRecommendations}>
            Back to Recommendations
          </Button>
        </Card>
      </div>
    )
  }

  const progress = {
    completedSteps: roadmap.steps.filter(step => step.isCompleted).length,
    totalSteps: roadmap.steps.length,
    progressPercentage: Math.round((roadmap.steps.filter(step => step.isCompleted).length / roadmap.steps.length) * 100),
    estimatedWeeksRemaining: roadmap.steps.filter(step => !step.isCompleted).reduce((total, step) => total + step.durationWeeks, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button
            onClick={handleBackToRecommendations}
            variant="outline"
            className="mb-4"
          >
            ← Back to Recommendations
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {roadmap.title}
            </h1>
            <p className="text-gray-600 mb-6">
              {roadmap.description}
            </p>

            {/* Progress Overview */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{progress.completedSteps}</div>
                  <div className="text-sm text-gray-600">Steps Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{progress.totalSteps}</div>
                  <div className="text-sm text-gray-600">Total Steps</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{progress.progressPercentage}%</div>
                  <div className="text-sm text-gray-600">Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{progress.estimatedWeeksRemaining}</div>
                  <div className="text-sm text-gray-600">Weeks Remaining</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          {roadmap.steps.map((step, index) => (
            <RoadmapStepCard
              key={step.id}
              step={step}
              stepNumber={index + 1}
              onToggleComplete={handleStepComplete}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleBackToRecommendations}
            variant="outline"
            className="mr-4"
          >
            Back to Recommendations
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

interface RoadmapStepCardProps {
  step: RoadmapStep
  stepNumber: number
  onToggleComplete: (stepId: string) => void
}

function RoadmapStepCard({ step, stepNumber, onToggleComplete }: RoadmapStepCardProps) {
  return (
    <Card className={`transition-all duration-200 ${step.isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          step.isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {step.isCompleted ? '✓' : stepNumber}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-semibold ${
              step.isCompleted ? 'text-green-800' : 'text-gray-900'
            }`}>
              {step.title}
            </h3>
            <div className="text-sm text-gray-500">
              {step.durationWeeks} weeks
            </div>
          </div>
          
          <p className={`text-sm mb-3 ${
            step.isCompleted ? 'text-green-700' : 'text-gray-600'
          }`}>
            {step.description}
          </p>

          {/* Resources */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Resources
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {step.resources.map((resource) => (
                <div key={resource.id} className="text-xs p-2 bg-gray-50 rounded border">
                  <div className="font-medium text-gray-900">{resource.title}</div>
                  <div className="text-gray-600">{resource.description}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500">
                      {resource.estimatedHours}h
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      resource.isFree 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {resource.isFree ? 'Free' : `$${resource.cost}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => onToggleComplete(step.id)}
              variant={step.isCompleted ? 'secondary' : 'primary'}
              size="sm"
            >
              {step.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}














