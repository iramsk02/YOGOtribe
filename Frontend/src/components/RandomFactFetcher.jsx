import { useState, useEffect } from 'react';

export default function RandomFactFetcher() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [factHistory, setFactHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fetchRandomFact = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://catfact.ninja/fact');
      
      if (!response.ok) {
        throw new Error('Failed to fetch fact');
      }
      
      const data = await response.json();
      const newFact = data.fact;
      setFact(newFact);
      
      // Add to history (keep last 3 facts)
      setFactHistory(prev => [newFact, ...prev.slice(0, 2)]);
    } catch (err) {
      setError('Oops! Unable to fetch a cat fact right now. Please try again.');
      console.error('Error fetching fact:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setFactHistory([]);
    setFact('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className={`relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-white/20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mb-4 shadow-lg">
            <span className="text-3xl">🐱</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Cat Facts Generator
          </h1>
          <p className="text-gray-600 text-lg">Discover amazing facts about our feline friends!</p>
        </div>
        
        {/* Main action button */}
        <button
          onClick={fetchRandomFact}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none mb-6 text-lg relative overflow-hidden"
        >
          <span className="relative z-10">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Fetching Amazing Fact...
              </div>
            ) : (
              '✨ Get Random Cat Fact'
            )}
          </span>
          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </button>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6 animate-fade-in">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-3">⚠️</span>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {/* Current fact display */}
        {fact && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200 rounded-2xl p-6 mb-6 transform transition-all duration-500 hover:shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">💡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Did You Know?</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{fact}</p>
              </div>
            </div>
          </div>
        )}

        {/* Fact history */}
        {factHistory.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="mr-2">📚</span>
                Recent Facts
              </h3>
              <button
                onClick={clearHistory}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200 flex items-center"
              >
                <span className="mr-1">🗑️</span>
                Clear
              </button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {factHistory.map((historicalFact, index) => (
                <div
                  key={index}
                  className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all duration-200 border border-gray-200"
                >
                  <p className="text-gray-600 text-sm leading-relaxed">{historicalFact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            <span className="mr-2">🌟</span>
            Powered by Cat Facts API
            <span className="ml-2">🌟</span>
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-4xl animate-bounce delay-300">🐾</div>
      <div className="absolute bottom-20 right-10 text-3xl animate-bounce delay-700">🐱</div>
      <div className="absolute top-1/3 right-20 text-2xl animate-pulse delay-1000">✨</div>
    </div>
  );
}