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
    const signature = req.headers['x-intasend-signature'] as string
    const payload = JSON.stringify(req.body)

    if (!signature) {
      console.error('Missing webhook signature')
      return res.status(400).json({ error: 'Missing signature' })
    }

    // Verify webhook signature
    const isValidSignature = intaSendService.verifyWebhookSignature(payload, signature)
    if (!isValidSignature) {
      console.error('Invalid webhook signature')
      return res.status(401).json({ error: 'Invalid signature' })
    }

    const { event, data } = req.body

    console.log(`Received IntaSend webhook: ${event} for session ${data.id}`)

    // Handle different webhook events
    switch (event) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(data)
        break
      
      case 'checkout.session.expired':
        await handleCheckoutExpired(data)
        break
      
      case 'checkout.session.cancelled':
        await handleCheckoutCancelled(data)
        break
      
      default:
        console.log(`Unhandled webhook event: ${event}`)
    }

    return res.status(200).json({ received: true })

  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function handleCheckoutCompleted(data: any) {
  try {
    // Update payment status in database
    const { error: updateError } = await supabaseAdmin
      .from('payments')
      .update({
        status: 'completed',
        payment_date: new Date().toISOString(),
        metadata: {
          ...data.metadata,
          webhookReceivedAt: new Date().toISOString(),
          webhookEvent: 'checkout.session.completed'
        }
      })
      .eq('intasend_transaction_id', data.id)

    if (updateError) {
      console.error('Failed to update payment status:', updateError)
      return
    }

    console.log(`Payment completed for session: ${data.id}`)

    // Here you could trigger additional actions like:
    // - Send confirmation email
    // - Grant access to premium features
    // - Update user subscription status
    // - Send notification to admin

  } catch (error) {
    console.error('Error handling checkout completed:', error)
  }
}

async function handleCheckoutExpired(data: any) {
  try {
    // Update payment status to expired
    const { error: updateError } = await supabaseAdmin
      .from('payments')
      .update({
        status: 'failed',
        metadata: {
          ...data.metadata,
          webhookReceivedAt: new Date().toISOString(),
          webhookEvent: 'checkout.session.expired',
          failureReason: 'Session expired'
        }
      })
      .eq('intasend_transaction_id', data.id)

    if (updateError) {
      console.error('Failed to update payment status:', updateError)
      return
    }

    console.log(`Payment session expired: ${data.id}`)

  } catch (error) {
    console.error('Error handling checkout expired:', error)
  }
}

async function handleCheckoutCancelled(data: any) {
  try {
    // Update payment status to cancelled
    const { error: updateError } = await supabaseAdmin
      .from('payments')
      .update({
        status: 'failed',
        metadata: {
          ...data.metadata,
          webhookReceivedAt: new Date().toISOString(),
          webhookEvent: 'checkout.session.cancelled',
          failureReason: 'User cancelled'
        }
      })
      .eq('intasend_transaction_id', data.id)

    if (updateError) {
      console.error('Failed to update payment status:', updateError)
      return
    }

    console.log(`Payment session cancelled: ${data.id}`)

  } catch (error) {
    console.error('Error handling checkout cancelled:', error)
  }
}





