import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 0,
      title: "What type of work environment do you prefer?",
      options: [
        { value: "collaborative", label: "Collaborative team environment" },
        { value: "independent", label: "Independent work with minimal supervision" },
        { value: "mixed", label: "Mix of both collaborative and independent work" },
        { value: "leadership", label: "Leading and managing others" }
      ]
    },
    {
      id: 1,
      title: "Which skills do you want to develop most?",
      options: [
        { value: "technical", label: "Technical and programming skills" },
        { value: "analytical", label: "Data analysis and problem-solving" },
        { value: "creative", label: "Creative and design thinking" },
        { value: "communication", label: "Communication and presentation" }
      ]
    },
    {
      id: 2,
      title: "What motivates you most in your career?",
      options: [
        { value: "impact", label: "Making a positive impact on society" },
        { value: "growth", label: "Continuous learning and growth" },
        { value: "stability", label: "Job security and stability" },
        { value: "innovation", label: "Innovation and cutting-edge work" }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSubmit = () => {
    navigate('/statistics');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-white text-2xl">Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Thank you for completing the career assessment. Your personalized results are ready!
            </p>
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            >
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Skills Assessment</h1>
        </div>
        <div className="text-gray-300 text-sm">
          {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Your Journey So Far</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-700" />
        </div>

        {/* Question Card */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              {questions[currentQuestion].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-gray-300 cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            variant="outline"
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}