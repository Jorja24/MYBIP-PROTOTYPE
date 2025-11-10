import { GoogleGenAI, Chat, Type } from "@google/genai";
import { KNOWLEDGE_BASE, getSystemInstruction } from '../constants';
import { Language } from '../types';

// Fix: Adhere to Gemini API guidelines for API key management.
// This resolves the TypeScript error on line 6 by replacing `import.meta.env`
// with `process.env.API_KEY` and removes the warning about setting the key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = (language: Language): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        // The instruction is now much more detailed.
        systemInstruction: getSystemInstruction(language),
        // Fix: Improve reliability of JSON output by using responseSchema and responseMimeType
        // as recommended by the Gemini API guidelines, instead of relying solely on prompt instructions.
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
    // The history provides the context for the model.
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
