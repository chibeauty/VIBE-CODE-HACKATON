import React from 'react'
import { QuizQuestion, QuizAnswer } from '@/types/quiz'

interface FormBuilderProps {
  question: QuizQuestion
  answer: QuizAnswer | null
  onAnswerChange: (answer: QuizAnswer) => void
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  const handleAnswerChange = (value: string | number | string[]) => {
    onAnswerChange({
      questionId: question.id,
      answer: value
    })
  }

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answer?.answer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'text':
        return (
          <input
            type="text"
            value={answer?.answer as string || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )

      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={answer?.answer as number || question.min}
              onChange={(e) => handleAnswerChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{question.min}</span>
              <span className="font-medium">{answer?.answer || question.min}</span>
              <span>{question.max}</span>
            </div>
          </div>
        )

      case 'tags':
        const selectedTags = (answer?.answer as string[]) || []
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {question.tags?.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const newTags = selectedTags.includes(tag)
                      ? selectedTags.filter(t => t !== tag)
                      : [...selectedTags, tag]
                    handleAnswerChange(newTags)
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <p className="text-sm text-gray-600">
                Selected: {selectedTags.join(', ')}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {renderQuestion()}
      </div>
    </div>
  )
}






