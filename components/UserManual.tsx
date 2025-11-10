
import React from 'react';

interface UserManualProps {
  onClose: () => void;
}

const UserManual: React.FC<UserManualProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-bold">MyBIP AI Assistant - User Testing Guide</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded-full" aria-label="Close manual">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <p className="mb-4 text-gray-700">
            Welcome to the live prototype of the MyBIP AI Assistant. This guide will walk you through testing its key features to confirm it meets all project requirements.
          </p>

          <div className="space-y-6">
            
            <div>
              <h3 className="font-bold text-lg text-blue-700 mb-2 border-b pb-1">1. Verify Information Accuracy & Sources</h3>
              <p className="mb-2 text-sm text-gray-600">This test confirms the AI uses only HSRC-approved information and transparently cites its sources.</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="font-semibold">Action:</strong> Open the chatbot and ask the question: <code className="bg-gray-200 p-1 rounded text-sm">What kind of support does SEDA offer?</code></li>
                <li><strong className="font-semibold">Expected Result:</strong> You will see a concise answer, and below it, a gray "Source" chip that says <code className="bg-gray-200 p-1 rounded text-sm">SEDA</code>. This proves the AI is accurate and trustworthy.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-700 mb-2 border-b pb-1">2. Test Multilingual Support</h3>
              <p className="mb-2 text-sm text-gray-600">This test confirms the assistant can serve South Africa's diverse user base in their native language.</p>
               <ul className="list-disc list-inside space-y-2">
                <li><strong className="font-semibold">Action 1:</strong> Select <code className="bg-gray-200 p-1 rounded text-sm">Zulu</code> from the language dropdown inside the chat window. The greeting will change.</li>
                <li><strong className="font-semibold">Action 2:</strong> Ask the question in isiZulu: <code className="bg-gray-200 p-1 rounded text-sm">Yini i-MyBIP?</code></li>
                <li><strong className="font-semibold">Expected Result:</strong> The assistant will reply entirely in isiZulu. This demonstrates its seamless multilingual capability.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-blue-700 mb-2 border-b pb-1">3. Experience Guided Step-by-Step Assistance</h3>
              <p className="mb-2 text-sm text-gray-600">This test demonstrates how the AI simplifies complex processes for users.</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="font-semibold">Action:</strong> In English, ask: <code className="bg-gray-200 p-1 rounded text-sm">How do I register a business?</code></li>
                <li><strong className="font-semibold">Expected Result:</strong> Instead of a long paragraph, the assistant will provide a clean, numbered list titled "Business Registration - Step by Step". This is a core feature that makes information easy to digest and act upon.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-red-700 mb-2 border-b pb-1">4. Confirm Critical Safety Guardrails</h3>
              <p className="mb-2 text-sm text-gray-600">This is the most important test. It proves the AI cannot access the open internet or provide unapproved information.</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="font-semibold">Action:</strong> Ask an "off-topic" question like: <code className="bg-gray-200 p-1 rounded text-sm">What is the weather like in Durban today?</code></li>
                <li><strong className="font-semibold">Expected Result:</strong> The assistant **must** politely decline to answer. It should say it can only answer questions based on the MyBIP content. This is the correct and desired behavior, proving the system is secure and "sandboxed".</li>
              </ul>
            </div>

            <div className="border-t pt-4 mt-6">
                 <p className="text-center font-semibold text-gray-800">Thank you for testing the prototype. You have now verified the core pillars of our solution: Accuracy, Accessibility, and Safety.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
