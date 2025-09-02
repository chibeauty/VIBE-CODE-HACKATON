export interface RoadmapStep {
  id: string
  title: string
  description: string
  durationWeeks: number
  resources: RoadmapResource[]
  isCompleted: boolean
  order: number
}

export interface RoadmapResource {
  id: string
  title: string
  type: 'course' | 'book' | 'project' | 'certification' | 'mentorship'
  url?: string
  description: string
  estimatedHours: number
  isFree: boolean
  cost?: number
}

export interface CareerRoadmap {
  id: string
  careerId: string
  title: string
  description: string
  steps: RoadmapStep[]
  estimatedDurationMonths: number
  currentStep: number
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface RoadmapProgress {
  completedSteps: number
  totalSteps: number
  progressPercentage: number
  estimatedWeeksRemaining: number
}














