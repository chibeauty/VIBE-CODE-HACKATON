import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { BarChart3, User, CreditCard, FileText, Home, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const careerCards = [
    {
      title: "Data Scientist",
      match: "95% MATCH",
      description: "Analyze complex data to drive business decisions",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Software Engineer",
      match: "92% MATCH", 
      description: "Build innovative software solutions",
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Marketing Manager",
      match: "88% MATCH",
      description: "Lead marketing strategies and campaigns",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Financial Analyst",
      match: "85% MATCH",
      description: "Evaluate financial data and investment opportunities",
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
          </div>
          <Button
            onClick={() => navigate('/profile')}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Top Recommendations */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Top Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerCards.map((career, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{career.title}</CardTitle>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${career.color} text-white`}>
                      {career.match}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{career.description}</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                    onClick={() => navigate('/payment')}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Self Assessment */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Your Self-Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Take our comprehensive career assessment to get personalized recommendations based on your skills, interests, and goals.
            </p>
            <Button 
              onClick={() => navigate('/assessment')}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center space-y-1 text-blue-400"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => navigate('/statistics')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Stats</span>
          </button>
          <button 
            onClick={() => navigate('/assessment')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Assessment</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}