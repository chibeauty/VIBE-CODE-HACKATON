export type UserRole = 'student' | 'mentor' | 'admin';
export type SessionStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  date_of_birth?: string;
  education_level?: string;
  current_institution?: string;
  interests?: string[];
  skills?: string[];
  experience_years: number;
  hourly_rate?: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  estimated_duration_months?: number;
  required_skills?: string[];
  salary_range_min?: number;
  salary_range_max?: number;
  job_outlook?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GuidanceSession {
  id: string;
  student_id: string;
  mentor_id?: string;
  career_path_id?: string;
  session_date: string;
  duration_minutes: number;
  status: SessionStatus;
  session_type: string;
  notes?: string;
  feedback_rating?: number;
  feedback_comment?: string;
  meeting_link?: string;
  created_at: string;
  updated_at: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  career_path_id?: string;
  mentor_id?: string;
  recommendation_type: string;
  title: string;
  description: string;
  priority_level: number;
  is_implemented: boolean;
  implementation_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  session_id?: string;
  amount: number;
  currency: string;
  payment_method: string;
  intasend_transaction_id?: string;
  status: PaymentStatus;
  payment_date?: string;
  refund_date?: string;
  refund_amount?: number;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      career_paths: {
        Row: CareerPath;
        Insert: Omit<CareerPath, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CareerPath, 'id' | 'created_at' | 'updated_at'>>;
      };
      guidance_sessions: {
        Row: GuidanceSession;
        Insert: Omit<GuidanceSession, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<GuidanceSession, 'id' | 'created_at' | 'updated_at'>>;
      };
      recommendations: {
        Row: Recommendation;
        Insert: Omit<Recommendation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Recommendation, 'id' | 'created_at' | 'updated_at'>>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Payment, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_user_role: {
        Args: Record<string, never>;
        Returns: UserRole;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_mentor: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      user_role: UserRole;
      session_status: SessionStatus;
      payment_status: PaymentStatus;
    };
  };
}

