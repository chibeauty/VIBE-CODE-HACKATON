import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Award, BarChart3 } from 'lucide-react';

export default function Statistics() {
  const navigate = useNavigate();

  const skillsData = [
    { skill: 'Technical Skills', progress: 85, color: 'from-blue-500 to-blue-600' },
    { skill: 'Communication', progress: 72, color: 'from-green-500 to-green-600' },
    { skill: 'Problem Solving', progress: 90, color: 'from-purple-500 to-purple-600' },
    { skill: 'Leadership', progress: 68, color: 'from-orange-500 to-orange-600' },
    { skill: 'Creativity', progress: 78, color: 'from-pink-500 to-pink-600' }
  ];

  const careerReadiness = 82;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Your Progress</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Career Readiness */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="w-6 h-6 text-blue-400" />
              <span>Career Readiness Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-4xl font-bold text-white mb-2">{careerReadiness}%</div>
                <p className="text-gray-300">Ready for Your Next Step!</p>
              </div>
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-700"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${careerReadiness}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Development */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-green-400" />
              <span>Skills Development Over Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {skillsData.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">{skill.skill}</span>
                  <span className="text-white font-bold">{skill.progress}%</span>
                </div>
                <div className="relative">
                  <Progress value={skill.progress} className="h-3 bg-gray-700" />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Assessments Completed</h3>
              <p className="text-3xl font-bold text-blue-400">3</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Career Matches</h3>
              <p className="text-3xl font-bold text-green-400">12</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Skill Improvement</h3>
              <p className="text-3xl font-bold text-purple-400">+15%</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center pt-6">
          <Button 
            onClick={() => navigate('/assessment')}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-8 py-3"
          >
            Update Assessment
          </Button>
        </div>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
}