import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface CheckoutButtonProps {
  userId: string
  amount: number
  currency?: string
  serviceType?: string
  onSuccess?: (sessionId: string) => void
  onError?: (error: string) => void
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  userId,
  amount,
  currency = 'USD',
  serviceType = 'career_guidance',
  onSuccess,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    setShowFallback(false)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          currency,
          serviceType
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Checkout failed')
      }

      const data = await response.json()
      
      // Open checkout URL in new tab
      window.open(data.checkoutUrl, '_blank')
      
      onSuccess?.(data.sessionId)
      
      console.log('Checkout initiated:', data.sessionId)

    } catch (error: any) {
      console.error('Checkout error:', error)
      
      if (error.message?.includes('Payment service temporarily unavailable')) {
        setShowFallback(true)
      } else {
        onError?.(error.message || 'Checkout failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (showFallback) {
    return (
      <Card className="p-4 border-yellow-200 bg-yellow-50">
        <div className="text-center">
          <div className="text-yellow-600 text-2xl mb-2">⚠️</div>
          <h3 className="font-medium text-yellow-800 mb-2">
            Payment Service Temporarily Unavailable
          </h3>
          <p className="text-yellow-700 text-sm mb-4">
            Our payment system is currently experiencing issues. 
            Please try again later or contact support.
          </p>
          <Button
            onClick={() => setShowFallback(false)}
            variant="outline"
            size="sm"
          >
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Button
      onClick={handleCheckout}
      isLoading={isLoading}
      className="w-full"
      size="lg"
    >
      {isLoading ? 'Processing...' : `Pay $${amount} ${currency}`}
    </Button>
  )
}














