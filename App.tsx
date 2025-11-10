
import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import ChatIcon from './components/ChatIcon';
import UserManual from './components/UserManual';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased relative">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <svg className="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             <h1 className="text-2xl font-bold text-gray-800">MyBIP App</h1>
          </div>
          <p className="text-gray-600 hidden sm:block">For Informal Business Owners</p>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Welcome to Your Business Innovation Planner</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            This is a mock interface of the MyBIP application. Here you would find tools, resources, and guides to help you grow your informal business. Use the chat icon in the bottom right corner to get help from our AI assistant.
          </p>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsManualOpen(true)}
              className="bg-gray-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
            >
              View User Manual & Testing Guide
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-xl text-blue-800 mb-2">My Business Tools</h3>
              <p className="text-blue-700">Access tools for planning, finance, and marketing.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-xl text-green-800 mb-2">Innovation Hub</h3>
              <p className="text-green-700">Explore new strategies and ideas from the HSRC.</p>
            </div>
          </div>
        </div>
      </main>

      <ChatIcon onClick={() => setIsChatOpen(true)} />
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
      {isManualOpen && <UserManual onClose={() => setIsManualOpen(false)} />}
    </div>
  );
};

export default App;