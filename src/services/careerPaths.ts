import { supabase } from '../lib/supabase';
import { CareerPath } from '../types/database';

export class CareerPathsService {
  // Get all active career paths
  static async getAllCareerPaths(): Promise<CareerPath[]> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('is_active', true)
      .order('title');

    if (error) throw error;
    return data || [];
  }

  // Get featured career paths
  static async getFeaturedCareerPaths(): Promise<CareerPath[]> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('title');

    if (error) throw error;
    return data || [];
  }

  // Get career paths by category
  static async getCareerPathsByCategory(category: string): Promise<CareerPath[]> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('is_active', true)
      .eq('category', category)
      .order('title');

    if (error) throw error;
    return data || [];
  }

  // Get career path by ID
  static async getCareerPathById(id: string): Promise<CareerPath | null> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  }

  // Search career paths
  static async searchCareerPaths(query: string): Promise<CareerPath[]> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('is_active', true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('title');

    if (error) throw error;
    return data || [];
  }

  // Get career paths by difficulty level
  static async getCareerPathsByDifficulty(difficulty: string): Promise<CareerPath[]> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('*')
      .eq('is_active', true)
      .eq('difficulty_level', difficulty)
      .order('title');

    if (error) throw error;
    return data || [];
  }

  // Get all categories
  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('category')
      .eq('is_active', true);

    if (error) throw error;
    
    const categories = data?.map(item => item.category) || [];
    return [...new Set(categories)].sort();
  }

  // Get difficulty levels
  static async getDifficultyLevels(): Promise<string[]> {
    const { data, error } = await supabase
      .from('career_paths')
      .select('difficulty_level')
      .eq('is_active', true);

    if (error) throw error;
    
    const levels = data?.map(item => item.difficulty_level) || [];
    return [...new Set(levels)].sort();
  }
}

