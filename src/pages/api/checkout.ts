import { NextApiRequest, NextApiResponse } from 'next'
import { intaSendService } from '@/lib/intasend'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, amount, currency = 'USD', serviceType = 'career_guidance' } = req.body

    if (!userId || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId and amount',
        code: 'MISSING_FIELDS'
      })
    }

    // Get user details
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('email, full_name')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      })
    }

    // Parse full name
    const nameParts = user.full_name.split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Create IntaSend checkout session
    const checkoutSession = await intaSendService.createCheckoutSession({
      amount: parseFloat(amount),
      currency,
      email: user.email,
      firstName,
      lastName,
      metadata: {
        userId,
        serviceType,
        timestamp: new Date().toISOString()
      }
    })

    // Store payment record in database
    const { error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        user_id: userId,
        amount: parseFloat(amount),
        currency,
        payment_method: 'intasend',
        intasend_transaction_id: checkoutSession.id,
        status: 'pending',
        metadata: {
          serviceType,
          checkoutSessionId: checkoutSession.id,
          createdAt: checkoutSession.created_at
        }
      })

    if (paymentError) {
      console.error('Failed to store payment record:', paymentError)
      // Continue anyway - we can still return the checkout URL
    }

    console.log(`Checkout session created for user ${userId}: ${checkoutSession.id}`)

    return res.status(200).json({
      success: true,
      checkoutUrl: checkoutSession.checkout_url,
      sessionId: checkoutSession.id,
      message: 'Checkout session created successfully'
    })

  } catch (error: any) {
    console.error('Checkout API error:', error)
    
    // Handle IntaSend-specific errors
    if (error.message?.includes('IntaSend API error')) {
      return res.status(502).json({ 
        error: 'Payment service temporarily unavailable',
        code: 'PAYMENT_SERVICE_ERROR'
      })
    }

    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    })
  }
}





