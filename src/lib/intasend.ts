export interface IntaSendCheckoutSession {
  id: string
  checkout_url: string
  status: string
  amount: number
  currency: string
  created_at: string
}

export interface IntaSendWebhookPayload {
  event: string
  data: {
    id: string
    status: string
    amount: number
    currency: string
    metadata?: Record<string, any>
  }
}

export class IntaSendService {
  private apiKey: string
  private secretKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.INTASEND_KEY || ''
    this.secretKey = process.env.INTASEND_SECRET || ''
    this.baseUrl = 'https://api.intasend.com'
  }

  async createCheckoutSession(params: {
    amount: number
    currency: string
    email: string
    firstName: string
    lastName: string
    metadata?: Record<string, any>
  }): Promise<IntaSendCheckoutSession> {
    if (!this.apiKey) {
      throw new Error('IntaSend API key not configured')
    }

    try {
      const response = await fetch(`${this.baseUrl}/v1/checkout/sessions/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: params.amount,
          currency: params.currency,
          email: params.email,
          first_name: params.firstName,
          last_name: params.lastName,
          metadata: params.metadata || {},
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={checkout_session_id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
          webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/intasend_webhook`
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`IntaSend API error: ${errorData.message || response.statusText}`)
      }

      const data = await response.json()
      
      console.log(`Created IntaSend checkout session: ${data.id} for ${params.email}`)
      
      return {
        id: data.id,
        checkout_url: data.checkout_url,
        status: data.status,
        amount: data.amount,
        currency: data.currency,
        created_at: data.created_at
      }
    } catch (error) {
      console.error('IntaSend checkout creation error:', error)
      throw error
    }
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.secretKey) {
      console.error('IntaSend secret key not configured')
      return false
    }

    try {
      // In a real implementation, you would verify the webhook signature
      // using crypto.createHmac() with the secret key
      // For now, we'll do a basic check
      const expectedSignature = `sha256=${this.generateSignature(payload)}`
      return signature === expectedSignature
    } catch (error) {
      console.error('Webhook signature verification error:', error)
      return false
    }
  }

  private generateSignature(payload: string): string {
    // This is a simplified signature generation
    // In production, use proper HMAC-SHA256
    const crypto = require('crypto')
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(payload)
      .digest('hex')
  }

  async getSessionStatus(sessionId: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('IntaSend API key not configured')
    }

    try {
      const response = await fetch(`${this.baseUrl}/v1/checkout/sessions/${sessionId}/`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch session status: ${response.statusText}`)
      }

      const data = await response.json()
      return data.status
    } catch (error) {
      console.error('Error fetching session status:', error)
      throw error
    }
  }
}

export const intaSendService = new IntaSendService()





