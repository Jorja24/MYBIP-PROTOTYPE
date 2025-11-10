
# MyBIP AI Chatbot Prototype

Welcome! This is a live prototype of the MyBIP AI Assistant, designed to support informal business owners in South Africa.

## How It Works

This application connects to the Google Gemini API to power its AI assistant.

**IMPORTANT:** The API key must be managed securely as an environment variable named `VITE_API_KEY` in the deployment environment (like Vercel or a similar hosting platform).

There is no need to enter an API key in the browser. The application is configured to use the pre-set key from the environment, making it ready to use immediately upon loading, provided the `VITE_API_KEY` variable is correctly set.

### Key Features

- **Knowledge-Based Answers**: The AI provides answers based on a built-in knowledge base about South African informal businesses.
- **Source Citing**: The AI cites its sources for transparency.
- **Multilingual Support**: The chat can be switched between English, Zulu, Xhosa, and Afrikaans.
- **Guided Steps**: For complex processes, the AI provides easy-to-follow step-by-step guides.
- **Safe & Secure**: The AI is "sandboxed" and cannot access outside information, ensuring all responses are from the approved knowledge base.