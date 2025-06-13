import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Play } from 'lucide-react';
import { getTopScores } from '../services/scoreService';

const LeaderboardPage = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        const topScores = await getTopScores(10);
        setScores(topScores);
      } catch (err) {
        console.error('Error fetching scores:', err);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const getRankStyle = (index) => {
    switch (index) {
      case 0:
        return 'bg-yellow-100 text-yellow-800';
      case 1:
        return 'bg-gray-100 text-gray-700';
      case 2:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTrophyColor = (index) => {
    switch (index) {
      case 0:
        return 'text-yellow-500';
      case 1:
        return 'text-gray-400';
      case 2:
        return 'text-orange-500';
      default:
        return '';
    }
  };

  const getPerformanceLabel = (score) => {
    if (score < 200) return 'Excellent';
    if (score < 300) return 'Good';
    if (score < 400) return 'Average';
    return 'Slow';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-gray-600">
            Top 10 fastest reaction times
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {scores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-500 mb-2">No scores yet</h3>
              <p className="text-gray-400 mb-6">Be the first to set a record!</p>
              <Link
                to="/game"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors"
              >
                <Play className="w-5 h-5" />
                Play Now
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold">Top Performers</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {scores.map((score, index) => (
                  <div key={score.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getRankStyle(index)}`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">
                              {score.email}
                            </span>
                            {index < 3 && (
                              <Trophy className={`w-5 h-5 ${getTrophyColor(index)}`} />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(score.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          {score.score}ms
                        </div>
                        <div className="text-sm text-gray-500">
                          {getPerformanceLabel(score.score)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;