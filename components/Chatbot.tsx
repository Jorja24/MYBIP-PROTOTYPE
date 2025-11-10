
import React, { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';
import { Language } from '../types';
import { createChatSession } from '../services/geminiService';
import type { Chat } from '@google/genai';
import GuidedSteps from './GuidedSteps';

interface ChatbotProps {
  onClose: () => void;
  apiKey: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose, apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: 'Hello! I am the MyBIP Assistant. How can I help you today?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.ENGLISH);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // Animate the component in
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (apiKey) {
      chatSessionRef.current = createChatSession(apiKey, selectedLanguage);
      const greeting = getGreeting(selectedLanguage);
      setMessages([{ id: 'initial', text: greeting, sender: 'bot' }]);
      setError(null);
    } else {
      setError("API Key not provided. Please configure your API Key.");
    }
  }, [selectedLanguage, apiKey]);

  const getGreeting = (lang: Language): string => {
    switch (lang) {
      case Language.ZULU:
        return 'Sawubona! NginguMsizi we-MyBIP. Ngingakusiza ngani namhlanje?';
      case Language.XHOSA:
        return 'Molo! NdinguMncedisi we-MyBIP. Ndingakunceda ngantoni namhlanje?';
      case Language.AFRIKAANS:
        return 'Hallo! Ek is die MyBIP Assistent. Hoe kan ek jou vandag help?';
      default:
        return 'Hello! I am the MyBIP Assistant. How can I help you today?';
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading || !apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
        if (!chatSessionRef.current) {
            throw new Error("Chat session not initialized.");
        }
      const response = await chatSessionRef.current.sendMessage({ message: userMessage.text });
      
      const responseText = response.text;
      if (!responseText) {
        throw new Error("Received an empty response from the AI. The API key might be invalid or there could be a network issue.");
      }

      const cleanedText = responseText.replace(/```json|```/g, '').trim();
      const parsedResponse = JSON.parse(cleanedText);

      const botMessage: Message = {
        id: Date.now().toString() + 'b',
        text: parsedResponse.answer,
        sender: 'bot',
        sources: parsedResponse.sources?.length > 0 ? parsedResponse.sources : undefined,
        guidedStep: parsedResponse.guidedStep ? parsedResponse.guidedStep : undefined,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message to Gemini or parsing response:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + 'e',
        text: 'Sorry, I encountered an error processing your request. Please try rephrasing your question or check if your API Key is valid.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-20 right-6 w-full max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <header className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 flex justify-between items-center rounded-t-xl">
        <div>
          <h2 className="text-xl font-bold">MyBIP Assistant</h2>
          <p className="text-sm opacity-90">Powered by YeboApp</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded-full" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div className="p-2 border-b bg-gray-50">
         <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language)}
            className="w-full p-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.values(Language).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex flex-col mb-4 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`rounded-2xl py-2.5 px-4 max-w-xs md:max-w-md lg:max-w-lg shadow-sm ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}>
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.guidedStep && (
                  <GuidedSteps title={message.guidedStep.title} steps={message.guidedStep.steps} />
              )}
            </div>
             {message.sources && message.sources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-gray-500">Sources:</span>
                {message.sources.map((source, i) => (
                  <span key={i} className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{source.name}</span>
                ))}
              </div>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl py-2 px-4 rounded-bl-none flex items-center space-x-2 shadow-sm">
                 <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-xl flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={error || "Type your question..."}
          className="flex-1 p-3 border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          disabled={isLoading || !!error}
        />
        <button type="submit" className="bg-gray-800 text-white p-3 rounded-r-full hover:bg-gray-700 disabled:bg-gray-400 transition-colors" disabled={isLoading || !inputValue.trim() || !!error}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
