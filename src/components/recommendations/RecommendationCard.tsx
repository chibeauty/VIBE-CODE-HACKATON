import React from 'react'
import { CareerRecommendation } from '@/lib/recommendationEngine'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface RecommendationCardProps {
  recommendation: CareerRecommendation
  onViewRoadmap: (careerId: string) => void
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onViewRoadmap
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600'
    if (score >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent Match'
    if (score >= 0.6) return 'Good Match'
    return 'Fair Match'
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {recommendation.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {recommendation.category} • {recommendation.difficultyLevel}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${getScoreColor(recommendation.totalScore)}`}>
              {Math.round(recommendation.totalScore * 100)}%
            </div>
            <div className="text-xs text-gray-500">
              {getScoreLabel(recommendation.totalScore)}
            </div>
          </div>
        </div>

        <p className="text-gray-700">
          {recommendation.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Duration:</span>
            <p className="text-gray-900">{recommendation.estimatedDurationMonths} months</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Salary Range:</span>
            <p className="text-gray-900">
              ${recommendation.salaryRangeMin.toLocaleString()} - ${recommendation.salaryRangeMax.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Job Outlook:</span>
            <p className="text-gray-900">{recommendation.jobOutlook}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Demand Score:</span>
            <p className="text-gray-900">{recommendation.demandScore}/10</p>
          </div>
        </div>

        <div>
          <span className="font-medium text-gray-600 text-sm">Required Skills:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {recommendation.requiredSkills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-sm text-gray-500">
            Match: {Math.round(recommendation.matchScore * 100)}% | 
            Demand: {recommendation.demandScore}/10
          </div>
          <Button
            onClick={() => onViewRoadmap(recommendation.id)}
            size="sm"
          >
            View Roadmap
          </Button>
        </div>
      </div>
    </Card>
  )
}






