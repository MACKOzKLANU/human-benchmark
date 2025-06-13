import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { saveScore } from '../services/scoreService';

const GamePage = () => {
  const [gameState, setGameState] = useState('waiting'); // waiting, ready, go, finished
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const { user } = useAuth();

  const startGame = () => {
    setGameState('ready');
    setSaved(false);
    const delay = Math.random() * 4000 + 1000; // 1-5 seconds
    
    const id = setTimeout(() => {
      setGameState('go');
      setStartTime(Date.now());
    }, delay);
    
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      startGame();
      return;
    }
    if (gameState === 'ready') {
      // Too early
      clearTimeout(timeoutId);
      setGameState('waiting');
      setReactionTime('Too early!');
      return;
    }
    
    if (gameState === 'go') {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setGameState('finished');
    }
  };

  const handleSaveScore = async () => {
    if (!user || typeof reactionTime !== 'number' || saving) return;
    
    setSaving(true);
    try {
      await saveScore({
        userId: user.uid,
        email: user.email,
        score: reactionTime,
        gameType: 'reaction-time',
        timestamp: Date.now()
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving score:', error);
    } finally {
      setSaving(false);
    }
  };

  const resetGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    setStartTime(null);
    setSaved(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'ready': return 'bg-red-500';
      case 'go': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'waiting':
        return reactionTime === 'Too early!' 
          ? 'Too early! Click to try again' 
          : 'Click to start';
      case 'ready':
        return 'Wait for green...';
      case 'go':
        return 'CLICK NOW!';
      case 'finished':
        return `${reactionTime}ms`;
      default:
        return '';
    }
  };

  const getPerformanceMessage = () => {
    if (typeof reactionTime !== 'number') return '';
    
    if (reactionTime < 200) return 'Excellent!';
    if (reactionTime < 300) return 'Good!';
    if (reactionTime < 400) return 'Average';
    return 'Try again!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Reaction Time Test</h1>
          <p className="text-gray-600">
            Click as quickly as possible once the screen turns green
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            onClick={handleClick}
            className={`${getBackgroundColor()} rounded-xl shadow-2xl cursor-pointer transition-all duration-200 hover:scale-105 flex items-center justify-center min-h-96`}
          >
            <div className="text-center text-white">
              <div className="text-6xl font-bold mb-4">
                {getMessage()}
              </div>
              {gameState === 'finished' && typeof reactionTime === 'number' && (
                <div className="space-y-2">
                  <div className="text-xl">
                    {getPerformanceMessage()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {gameState === 'finished' && (
            <div className="mt-8 text-center space-y-4">
              <button
                onClick={resetGame}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-4 transition-colors"
              >
                Try Again
              </button>
              
              {user && typeof reactionTime === 'number' && !saved && (
                <button
                  onClick={handleSaveScore}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Score'}
                </button>
              )}
              
              {saved && (
                <div className="text-green-600 font-semibold">
                  Score saved! 🎉
                </div>
              )}
              
              {!user && typeof reactionTime === 'number' && (
                <div className="text-gray-600">
                  <Link to="/auth" className="text-purple-600 hover:underline">
                    Login to save your score
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;