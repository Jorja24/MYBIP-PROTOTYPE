import React, { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';
import { Language } from '../types';
import { createChatSession } from '../services/geminiService';
import type { Chat } from '@google/genai';
import GuidedSteps from './GuidedSteps';

interface ChatbotProps {
  onClose: () => void;
}

const selectedLanguageToLocale = (lang: Language): string => {
    switch (lang) {
      case Language.ZULU:
        return 'zu-ZA';
      case Language.XHOSA:
        return 'xh-ZA';
      case Language.AFRIKAANS:
        return 'af-ZA';
      default:
        return 'en-US';
    }
};

// Fix for SpeechRecognition errors.
// 1. Cast `window` to `any` to access browser-specific APIs (`SpeechRecognition`, `webkitSpeechRecognition`) without TypeScript errors.
// 2. Rename the `SpeechRecognition` constant to `SpeechRecognitionAPI` to avoid shadowing the global `SpeechRecognition` type interface.
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const isSpeechSupported = !!SpeechRecognitionAPI;

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.ENGLISH);
  const [error, setError] = useState<string | null>(null);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // Fix for "Cannot find name 'SpeechRecognition'". The type is not available in the current TypeScript configuration, so using 'any'.
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    // Animate the component in
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null); // Reset error state on language change

    try {
        const session = createChatSession(selectedLanguage);
        if (session) {
            chatSessionRef.current = session;
            const greeting = getGreeting(selectedLanguage);
            setMessages([{ id: 'initial', text: greeting, sender: 'bot' }]);
        } else {
            // This case handles the missing API key gracefully.
            setError('The API key is missing. Please ask the administrator to configure it.');
        }
    } catch (e) {
        console.error("Error initializing chat session:", e);
        // This will catch any other errors from the SDK, e.g., invalid key format.
        setError("Could not start the chat session. The API key might be invalid.");
    } finally {
        setIsLoading(false);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (!isSpeechSupported) {
      console.warn("Speech recognition is not supported in this browser.");
      return;
    }

    // Fix: Use the renamed `SpeechRecognitionAPI` constant to create a new instance.
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = selectedLanguageToLocale(selectedLanguage);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      setInputValue(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [selectedLanguage]);

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

  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setInputValue('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading || error) return;

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
        text: 'Sorry, I encountered an error processing your request. Please try again later or rephrase your question.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-28 right-4 left-4 sm:left-auto sm:right-6 sm:w-full sm:max-w-md h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
            disabled={!!error}
          >
            {Object.values(Language).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">Oops, something went wrong.</h3>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-xl flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isRecording ? "Listening..." : "Type your question..."}
          className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          disabled={isLoading || isRecording || !!error}
        />
        {isSpeechSupported && (
            <button
                type="button"
                onClick={handleMicClick}
                className={`p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                disabled={isLoading || !!error}
                aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            </button>
        )}
        <button type="submit" className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 disabled:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" disabled={isLoading || !inputValue.trim() || isRecording || !!error}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;