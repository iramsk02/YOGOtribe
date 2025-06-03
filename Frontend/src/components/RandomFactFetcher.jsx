import { useState } from 'react';

export default function RandomFactFetcher() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRandomFact = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://catfact.ninja/fact');
      
      if (!response.ok) {
        throw new Error('Failed to fetch fact');
      }
      
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError('Sorry, could not fetch a fact right now. Please try again.');
      console.error('Error fetching fact:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Random Cat Facts
        </h1>
        
        <button
          onClick={fetchRandomFact}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-6"
        >
          {loading ? 'Fetching...' : 'Get Random Fact'}
        </button>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {fact && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Fun Fact:</h2>
            <p className="text-gray-600 leading-relaxed">{fact}</p>
          </div>
        )}
      </div>
    </div>
  );
}