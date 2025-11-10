
import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your API Key</h2>
        <p className="text-gray-600 mb-4">
          To use the MyBIP AI Assistant, please provide your Google Gemini API key. Your key is stored securely in your browser session and is never saved on any server.
        </p>
        <div className="mb-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your API key here"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between items-center">
            <a 
                href="https://ai.google.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
            >
                Get a key from Google AI Studio
            </a>
            <button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="bg-gray-800 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
            >
                Save & Start
            </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
