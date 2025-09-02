import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-8 max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CareerPath</h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Shape Your Future
          </h2>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            Unlock your potential and discover the career path that's perfect for you. Personalized recommendations await.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-8">
          <Button 
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Button>
          
          <Button 
            onClick={() => navigate('/signup')}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}