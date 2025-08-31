import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = () => {
    router.push('/signup')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CareerPath
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Shape Your Future
          </p>
          <p className="text-lg text-gray-500">
            Unlock your potential and discover the career path meant for you. 
            Personalized guidance awaits.
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <div className="space-y-4">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Get Started
            </Button>
            <Button
              onClick={handleLogin}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Already have an account? Sign In
            </Button>
          </div>
        </Card>

        <div className="mt-8 text-sm text-gray-500">
          <p>Join thousands of students discovering their perfect career path</p>
        </div>
      </div>
    </div>
  )
}





