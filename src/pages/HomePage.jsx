import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trophy, User, Play, Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Human Benchmark
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Test your cognitive abilities with our reaction time game. Challenge yourself and compete with others!
          </p>
          <Link
            to="/game"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105"
          >
            <Play className="w-6 h-6" />
            Start Playing
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Clock className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Reaction Time</h3>
            <p className="text-gray-600">Test how quickly you can respond to visual stimuli</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Compete</h3>
            <p className="text-gray-600">Challenge others and climb the leaderboard</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <User className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Track Progress</h3>
            <p className="text-gray-600">Save your scores and monitor improvement</p>
          </div>
        </div>

        {!user && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Ready to save your high scores?</p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold py-3 px-6 rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200"
            >
              <User className="w-5 h-5" />
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;