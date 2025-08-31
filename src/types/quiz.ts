export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple_choice' | 'text' | 'slider' | 'tags'
  options?: string[]
  min?: number
  max?: number
  step?: number
  tags?: string[]
  required: boolean
}

export interface QuizAnswer {
  questionId: string
  answer: string | number | string[]
}

export interface QuizSubmission {
  userId: string
  answers: QuizAnswer[]
  answerSetId: string
}

export interface QuizResult {
  id: string
  answerSetId: string
  userId: string
  answers: QuizAnswer[]
  completedAt: string
  createdAt: string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'skills',
    question: 'What are your top 3 skills?',
    type: 'text',
    required: true
  },
  {
    id: 'career_goal',
    question: 'What is your ideal career goal?',
    type: 'text',
    required: true
  },
  {
    id: 'experience_level',
    question: 'What is your current experience level?',
    type: 'multiple_choice',
    options: ['Beginner', 'Some Experience', 'Intermediate', 'Advanced', 'Expert'],
    required: true
  },
  {
    id: 'interests',
    question: 'Select areas that interest you:',
    type: 'tags',
    tags: ['Technology', 'Business', 'Healthcare', 'Arts', 'Education', 'Science', 'Finance', 'Marketing'],
    required: true
  },
  {
    id: 'learning_style',
    question: 'How do you prefer to learn?',
    type: 'multiple_choice',
    options: ['Online courses', 'Books', 'Hands-on projects', 'Mentorship', 'Group learning'],
    required: true
  },
  {
    id: 'time_commitment',
    question: 'How many hours per week can you dedicate to career development?',
    type: 'slider',
    min: 1,
    max: 20,
    step: 1,
    required: true
  }
]





