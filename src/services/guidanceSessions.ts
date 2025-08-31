import { supabase } from '../lib/supabase';
import { GuidanceSession, SessionStatus } from '../types/database';

export interface CreateSessionData {
  student_id: string;
  mentor_id?: string;
  career_path_id?: string;
  session_date: string;
  duration_minutes: number;
  session_type: string;
  notes?: string;
}

export interface UpdateSessionData {
  mentor_id?: string;
  status?: SessionStatus;
  notes?: string;
  feedback_rating?: number;
  feedback_comment?: string;
  meeting_link?: string;
}

export class GuidanceSessionsService {
  // Create a new guidance session
  static async createSession(sessionData: CreateSessionData): Promise<GuidanceSession> {
    const { data, error } = await supabase
      .from('guidance_sessions')
      .insert(sessionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get session by ID
  static async getSessionById(id: string): Promise<GuidanceSession | null> {
    const { data, error } = await supabase
      .from('guidance_sessions')
      .select(`
        *,
        student:users!student_id(id, full_name, email, avatar_url),
        mentor:users!mentor_id(id, full_name, email, avatar_url),
        career_path:career_paths!career_path_id(id, title, category)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Get sessions for a student
  static async getStudentSessions(studentId: string): Promise<GuidanceSession[]> {
    const { data, error } = await supabase
      .from('guidance_sessions')
      .select(`
        *,
        mentor:users!mentor_id(id, full_name, email, avatar_url),
        career_path:career_paths!career_path_id(id, title, category)
      `)
      .eq('student_id', studentId)
      .order('session_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get sessions for a mentor
  static async getMentorSessions(mentorId: string): Promise<GuidanceSession[]> {
    const { data, error } = await supabase
      .from('guidance_sessions')
      .select(`
        *,
        student:users!student_id(id, full_name, email, avatar_url),
        career_path:career_paths!career_path_id(id, title, category)
      `)
      .eq('mentor_id', mentorId)
      .order('session_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get pending sessions for a mentor
  static async getPendingMentorSessions(mentorId: string): Promise<GuidanceSession[]> {
    const { data, error } = await supabase
      .from('guidance_sessions')
      .select(`
        *,
        student:users!student_id(id, full_name, email, avatar_url),
        career_path:career_paths!career_path_id(id, title, category)
      `)
      .eq('mentor_id', mentorId)
      .eq('status', 'pending')
      .order('session_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Update session
  static async updateSession(id: string, updateData: UpdateSessionData): Promise<GuidanceSession> {
    const { data, error } = await supabase
      .from('guidance_sessions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Cancel session
  static async cancelSession(id: string): Promise<GuidanceSession> {
    const { data, error } = await supabase
      .from('guidance_sessions')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Complete session
  static async completeSession(id: string, feedback?: { rating: number; comment?: string }): Promise<GuidanceSession> {
    const updateData: UpdateSessionData = {
      status: 'completed',
      ...(feedback && { feedback_rating: feedback.rating, feedback_comment: feedback.comment })
    };

    const { data, error } = await supabase
      .from('guidance_sessions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get available time slots for a mentor
  static async getAvailableTimeSlots(mentorId: string, date: string): Promise<string[]> {
    // This is a simplified version - in production you'd want more sophisticated scheduling logic
    const { data, error } = await supabase
      .from('guidance_sessions')
      .select('session_date, duration_minutes')
      .eq('mentor_id', mentorId)
      .eq('status', 'confirmed')
      .gte('session_date', date)
      .lt('session_date', new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    // Generate available time slots (9 AM to 5 PM, 1-hour slots)
    const bookedSlots = data || [];
    const availableSlots: string[] = [];
    
    for (let hour = 9; hour < 17; hour++) {
      const timeSlot = new Date(date);
      timeSlot.setHours(hour, 0, 0, 0);
      
      const isBooked = bookedSlots.some(slot => {
        const slotTime = new Date(slot.session_date);
        return Math.abs(slotTime.getTime() - timeSlot.getTime()) < 60 * 60 * 1000; // 1 hour overlap
      });

      if (!isBooked) {
        availableSlots.push(timeSlot.toISOString());
      }
    }

    return availableSlots;
  }

  // Get session statistics
  static async getSessionStats(userId: string, role: 'student' | 'mentor'): Promise<{
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  }> {
    const column = role === 'student' ? 'student_id' : 'mentor_id';
    
    const { data, error } = await supabase
      .from('guidance_sessions')
      .select('status')
      .eq(column, userId);

    if (error) throw error;

    const stats = {
      total: data?.length || 0,
      completed: data?.filter(s => s.status === 'completed').length || 0,
      pending: data?.filter(s => s.status === 'pending').length || 0,
      cancelled: data?.filter(s => s.status === 'cancelled').length || 0,
    };

    return stats;
  }
}

