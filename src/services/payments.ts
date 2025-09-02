import { supabase } from '../lib/supabase';
import { Payment, PaymentStatus } from '../types/database';

export interface CreatePaymentData {
  user_id: string;
  session_id?: string;
  amount: number;
  currency?: string;
  payment_method: string;
  metadata?: Record<string, any>;
}

export interface UpdatePaymentData {
  status?: PaymentStatus;
  payment_date?: string;
  refund_date?: string;
  refund_amount?: number;
  metadata?: Record<string, any>;
}

export interface IntaSendWebhookData {
  transaction_id: string;
  status: 'success' | 'failed' | 'pending';
  amount: number;
  currency: string;
  payment_method: string;
  metadata?: Record<string, any>;
}

export class PaymentsService {
  // Create a new payment record
  static async createPayment(paymentData: CreatePaymentData): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...paymentData,
        currency: paymentData.currency || 'USD',
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get payment by ID
  static async getPaymentById(id: string): Promise<Payment | null> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        user:users!user_id(id, full_name, email),
        session:guidance_sessions!session_id(id, session_date, session_type)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Get payment by IntaSend transaction ID
  static async getPaymentByIntaSendId(intaSendId: string): Promise<Payment | null> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        user:users!user_id(id, full_name, email),
        session:guidance_sessions!session_id(id, session_date, session_type)
      `)
      .eq('intasend_transaction_id', intaSendId)
      .single();

    if (error) throw error;
    return data;
  }

  // Get payments for a user
  static async getUserPayments(userId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        session:guidance_sessions!session_id(id, session_date, session_type)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get payments by status
  static async getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        user:users!user_id(id, full_name, email),
        session:guidance_sessions!session_id(id, session_date, session_type)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Update payment
  static async updatePayment(id: string, updateData: UpdatePaymentData): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Process IntaSend webhook
  static async processIntaSendWebhook(webhookData: IntaSendWebhookData): Promise<Payment> {
    // Find payment by IntaSend transaction ID
    const payment = await this.getPaymentByIntaSendId(webhookData.transaction_id);
    
    if (!payment) {
      throw new Error(`Payment not found for IntaSend transaction: ${webhookData.transaction_id}`);
    }

    // Map IntaSend status to our payment status
    let status: PaymentStatus;
    switch (webhookData.status) {
      case 'success':
        status = 'completed';
        break;
      case 'failed':
        status = 'failed';
        break;
      case 'pending':
        status = 'pending';
        break;
      default:
        status = 'pending';
    }

    // Update payment with webhook data
    const updateData: UpdatePaymentData = {
      status,
      payment_date: status === 'completed' ? new Date().toISOString() : undefined,
      metadata: {
        ...payment.metadata,
        intasend_webhook: webhookData,
        processed_at: new Date().toISOString()
      }
    };

    return await this.updatePayment(payment.id, updateData);
  }

  // Mark payment as completed
  static async markPaymentAsCompleted(id: string, intaSendId?: string): Promise<Payment> {
    const updateData: UpdatePaymentData = {
      status: 'completed',
      payment_date: new Date().toISOString(),
      ...(intaSendId && { intasend_transaction_id: intaSendId })
    };

    return await this.updatePayment(id, updateData);
  }

  // Mark payment as failed
  static async markPaymentAsFailed(id: string, reason?: string): Promise<Payment> {
    const updateData: UpdatePaymentData = {
      status: 'failed',
      metadata: {
        failure_reason: reason,
        failed_at: new Date().toISOString()
      }
    };

    return await this.updatePayment(id, updateData);
  }

  // Process refund
  static async processRefund(id: string, refundAmount: number, reason?: string): Promise<Payment> {
    const updateData: UpdatePaymentData = {
      status: 'refunded',
      refund_date: new Date().toISOString(),
      refund_amount: refundAmount,
      metadata: {
        refund_reason: reason,
        refunded_at: new Date().toISOString()
      }
    };

    return await this.updatePayment(id, updateData);
  }

  // Get payment statistics
  static async getPaymentStats(userId?: string): Promise<{
    total: number;
    completed: number;
    pending: number;
    failed: number;
    refunded: number;
    totalAmount: number;
    completedAmount: number;
  }> {
    let query = supabase.from('payments').select('status, amount');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;

    const payments = data || [];
    
    const stats = {
      total: payments.length,
      completed: payments.filter(p => p.status === 'completed').length,
      pending: payments.filter(p => p.status === 'pending').length,
      failed: payments.filter(p => p.status === 'failed').length,
      refunded: payments.filter(p => p.status === 'refunded').length,
      totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
      completedAmount: payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0),
    };

    return stats;
  }

  // Get recent payments
  static async getRecentPayments(limit: number = 10): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        user:users!user_id(id, full_name, email),
        session:guidance_sessions!session_id(id, session_date, session_type)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Verify payment status with IntaSend
  static async verifyPaymentStatus(intaSendId: string): Promise<PaymentStatus> {
    // In a real implementation, you would make an API call to IntaSend
    // to verify the current status of the transaction
    // For now, we'll return the status from our database
    
    const payment = await this.getPaymentByIntaSendId(intaSendId);
    if (!payment) {
      throw new Error(`Payment not found for IntaSend transaction: ${intaSendId}`);
    }
    
    return payment.status;
  }
}

