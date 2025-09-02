import { NextApiRequest, NextApiResponse } from 'next'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const healthChecks = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'unknown',
      auth: 'unknown',
      rls: 'unknown'
    }

    // Test database connection
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('count')
        .limit(1)

      healthChecks.database = error ? 'error' : 'ok'
    } catch (error) {
      healthChecks.database = 'error'
      console.error('Database health check failed:', error)
    }

    // Test auth service
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      healthChecks.auth = 'ok' // Auth service is responding
    } catch (error) {
      healthChecks.auth = 'error'
      console.error('Auth health check failed:', error)
    }

    // Test RLS policies
    try {
      const { data, error } = await supabase
        .from('career_paths')
        .select('id')
        .limit(1)

      healthChecks.rls = error ? 'error' : 'ok'
    } catch (error) {
      healthChecks.rls = 'error'
      console.error('RLS health check failed:', error)
    }

    // Determine overall status
    const hasErrors = Object.values(healthChecks).includes('error')
    healthChecks.status = hasErrors ? 'degraded' : 'ok'

    const statusCode = hasErrors ? 503 : 200
    res.status(statusCode).json(healthChecks)

  } catch (error: any) {
    console.error('Supabase health check error:', error)
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'error',
      auth: 'error',
      rls: 'error',
      error: error.message
    })
  }
}