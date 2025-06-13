import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Play, Trophy, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <Brain className="w-8 h-8" />
          Human Benchmark
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/game" 
            className="hover:text-purple-200 transition-colors flex items-center gap-1"
          >
            <Play className="w-4 h-4" />
            Game
          </Link>
          <Link 
            to="/leaderboard" 
            className="hover:text-purple-200 transition-colors flex items-center gap-1"
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;