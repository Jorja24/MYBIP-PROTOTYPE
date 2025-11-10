# MyBIP AI Chatbot Assistant

This is a live prototype of the MyBIP AI Assistant, an AI-powered chatbot to assist informal business owners using the MyBIP application.

## What's New?

This project has been configured with **Vite**, a modern frontend build tool. This allows for a fast local development experience and a simple process to build and deploy the application as a static website on services like GitHub Pages.

## Getting Started

Follow these steps to run the application on your local machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) installed on your computer.
- A Gemini API Key. Get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 2. Create an Environment File

Create a new file in the root of the project named `.env.local`. This file will store your API key securely. Add your key to it like this:

```
VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

The `.gitignore` file is already configured to prevent this file from being uploaded to GitHub.

### 3. Install Dependencies

Open your terminal in the project root and run:

```bash
npm install
```

### 4. Run the Development Server

To start the app, run:

```bash
npm run dev
```

This will open the application in your web browser, usually at `http://localhost:5173`.

---

## One-Click Deployment to GitHub Pages

You can deploy this application for free using GitHub Pages. After the initial setup, you can redeploy your app anytime by just running `npm run deploy`.

### 1. Create a GitHub Repository

If you haven't already, create a new repository on [GitHub](https://github.com/new).

### 2. Update Configuration Files

You need to tell the project where it will be hosted. **This is a one-time setup.**

1.  **`package.json`**: Open this file and update the `homepage` line with your GitHub username and repository name.
    ```json
    // "homepage": "https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>",
    "homepage": "https://johndoe.github.io/mybip-chatbot/", // Example
    ```

2.  **`vite.config.ts`**: Open this file and update the `base` path with your repository name.
    ```typescript
    // base: '/<YOUR_REPOSITORY_NAME>/',
    base: '/mybip-chatbot/', // Example
    ```

### 3. Push to GitHub

Connect your local project to your GitHub repository and push the code.

```bash
# Make sure you are in your project folder
git init
git add .
git commit -m "Initial setup with Vite and deployment configs"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

### 4. Deploy!

Now for the magic. Run this single command in your terminal:

```bash
npm run deploy
```

This command will automatically build your application and push the final files to a special `gh-pages` branch in your repository.

### 5. Configure GitHub Pages Settings

The final step is to tell GitHub to use this new branch to serve your website.

1.  Go to your repository on GitHub.
2.  Click on the **Settings** tab.
3.  In the left sidebar, click on **Pages**.
4.  Under "Build and deployment," change the **Source** to **Deploy from a branch**.
5.  Select the **`gh-pages`** branch and keep the folder as **`/ (root)`**. Click **Save**.

After a minute or two, your application will be live at the URL you specified in your `package.json`!
