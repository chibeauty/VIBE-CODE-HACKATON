import { supabase } from '../lib/supabase';
import { Recommendation } from '../types/database';

export interface CreateRecommendationData {
  user_id: string;
  career_path_id?: string;
  mentor_id?: string;
  recommendation_type: string;
  title: string;
  description: string;
  priority_level: number;
}

export interface UpdateRecommendationData {
  title?: string;
  description?: string;
  priority_level?: number;
  is_implemented?: boolean;
  implementation_notes?: string;
}

export class RecommendationsService {
  // Create a new recommendation
  static async createRecommendation(recommendationData: CreateRecommendationData): Promise<Recommendation> {
    const { data, error } = await supabase
      .from('recommendations')
      .insert(recommendationData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get recommendation by ID
  static async getRecommendationById(id: string): Promise<Recommendation | null> {
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        *,
        user:users!user_id(id, full_name, email),
        career_path:career_paths!career_path_id(id, title, category),
        mentor:users!mentor_id(id, full_name, email)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Get recommendations for a user
  static async getUserRecommendations(userId: string): Promise<Recommendation[]> {
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        *,
        career_path:career_paths!career_path_id(id, title, category),
        mentor:users!mentor_id(id, full_name, email)
      `)
      .eq('user_id', userId)
      .order('priority_level', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get recommendations by type
  static async getRecommendationsByType(userId: string, type: string): Promise<Recommendation[]> {
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        *,
        career_path:career_paths!career_path_id(id, title, category),
        mentor:users!mentor_id(id, full_name, email)
      `)
      .eq('user_id', userId)
      .eq('recommendation_type', type)
      .order('priority_level', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Get high priority recommendations
  static async getHighPriorityRecommendations(userId: string, priorityThreshold: number = 3): Promise<Recommendation[]> {
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        *,
        career_path:career_paths!career_path_id(id, title, category),
        mentor:users!mentor_id(id, full_name, email)
      `)
      .eq('user_id', userId)
      .gte('priority_level', priorityThreshold)
      .order('priority_level', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Get implemented recommendations
  static async getImplementedRecommendations(userId: string): Promise<Recommendation[]> {
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        *,
        career_path:career_paths!career_path_id(id, title, category),
        mentor:users!mentor_id(id, full_name, email)
      `)
      .eq('user_id', userId)
      .eq('is_implemented', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Get pending recommendations
  static async getPendingRecommendations(userId: string): Promise<Recommendation[]> {
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        *,
        career_path:career_paths!career_path_id(id, title, category),
        mentor:users!mentor_id(id, full_name, email)
      `)
      .eq('user_id', userId)
      .eq('is_implemented', false)
      .order('priority_level', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Update recommendation
  static async updateRecommendation(id: string, updateData: UpdateRecommendationData): Promise<Recommendation> {
    const { data, error } = await supabase
      .from('recommendations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mark recommendation as implemented
  static async markAsImplemented(id: string, notes?: string): Promise<Recommendation> {
    const { data, error } = await supabase
      .from('recommendations')
      .update({ 
        is_implemented: true, 
        implementation_notes: notes 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get recommendations by career path
  static async getRecommendationsByCareerPath(userId: string, careerPathId: string): Promise<Recommendation[]> {
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        *,
        career_path:career_paths!career_path_id(id, title, category),
        mentor:users!mentor_id(id, full_name, email)
      `)
      .eq('user_id', userId)
      .eq('career_path_id', careerPathId)
      .order('priority_level', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Get recommendation statistics
  static async getRecommendationStats(userId: string): Promise<{
    total: number;
    implemented: number;
    pending: number;
    byType: Record<string, number>;
    byPriority: Record<number, number>;
  }> {
    const { data, error } = await supabase
      .from('recommendations')
      .select('recommendation_type, priority_level, is_implemented')
      .eq('user_id', userId);

    if (error) throw error;

    const recommendations = data || [];
    
    const stats = {
      total: recommendations.length,
      implemented: recommendations.filter(r => r.is_implemented).length,
      pending: recommendations.filter(r => !r.is_implemented).length,
      byType: {} as Record<string, number>,
      byPriority: {} as Record<number, number>,
    };

    // Count by type
    recommendations.forEach(rec => {
      stats.byType[rec.recommendation_type] = (stats.byType[rec.recommendation_type] || 0) + 1;
    });

    // Count by priority
    recommendations.forEach(rec => {
      stats.byPriority[rec.priority_level] = (stats.byPriority[rec.priority_level] || 0) + 1;
    });

    return stats;
  }
}

