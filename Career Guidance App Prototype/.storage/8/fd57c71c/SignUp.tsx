import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignUp = () => {
    // Simple validation for demo
    if (formData.fullName && formData.email && formData.password && formData.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        navigate('/dashboard');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">CareerPath</h1>
          <h2 className="text-xl text-gray-300">Create Your Path</h2>
          <p className="text-sm text-gray-400 mt-2">Join CareerPath to unlock your potential</p>
        </div>

        {/* Sign Up Form */}
        <div className="space-y-6 bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-gray-300 text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="John Doe"
                className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300 text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button 
            onClick={handleSignUp}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </Button>

          <div className="text-center">
            <button 
              onClick={() => navigate('/login')}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300"
            >
              Already have an Account? Login
            </button>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-300"
          >
            ← Back to Welcome
          </button>
        </div>
      </div>
    </div>
  );
}