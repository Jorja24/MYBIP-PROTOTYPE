
# MyBIP AI Chatbot Prototype

Welcome! This is a live prototype of the MyBIP AI Assistant, designed to support informal business owners in South Africa.

## How It Works (A New, Simpler Way)

This application is now much easier to run and deploy. We have removed the complex requirement for environment variables during the build process.

Instead, the application will simply ask you for your API key when you first open it.

### Step 1: Get a Gemini API Key

You need a Google Gemini API key to power the AI assistant. You can get one for free from Google AI Studio.

➡️ **[Click here to get your API Key](https://ai.google.dev/)**

### Step 2: Run the Application

When you launch the app for the first time, a pop-up window will appear asking for your API key.

1.  **Paste** the key you got from Google AI Studio into the input field.
2.  Click **"Save & Start"**.

That's it! The key will be securely saved for your current browser session, and the chatbot will be fully activated.

### Security

Your API key is stored only in your browser's `sessionStorage`. This means:
*   It is **never** sent to any server other than Google's.
*   It is **deleted automatically** when you close the browser tab.
*   It is **not** saved in the code or on any permanent storage.

This approach is secure and makes testing and deployment incredibly simple.
