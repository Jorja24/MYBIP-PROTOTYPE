import { GoogleGenAI, Chat, Type } from "@google/genai";
import { KNOWLEDGE_BASE, getSystemInstruction } from '../constants';
import { Language } from '../types';

export const createChatSession = (language: Language): Chat | null => {
  // Per Vite's standard, client-side environment variables must be prefixed
  // with VITE_ and accessed via import.meta.env.
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    console.error("API key (VITE_API_KEY) is not available in the environment.");
    return null;
  }
  
  // Initialize the GoogleGenAI instance with the API key from environment variables
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: getSystemInstruction(language),
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                answer: { type: Type.STRING },
                sources: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                        },
                        required: ["name"],
                    },
                },
                guidedStep: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        steps: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                        },
                    },
                    required: ["title", "steps"],
                },
            },
            required: ["answer", "sources"],
        },
    },
    history: [
        {
            role: 'user',
            parts: [{ text: `Here is the content of the MyBIP app. Use this as my only source of information. Context: ${KNOWLEDGE_BASE}` }],
        },
        {
            role: 'model',
            parts: [{ text: `Okay, I understand. I will only use this provided context to answer all questions in ${language}, and I will respond in the specified JSON format with sources and guided steps where appropriate.` }],
        },
    ],
  });
  return chat;
};