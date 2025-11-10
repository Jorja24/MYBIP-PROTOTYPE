
# MyBIP AI Chatbot: A Beginner's Guide to Going Live

Welcome! This guide will walk you through putting your MyBIP AI Assistant prototype on the live internet, so anyone with the link can see it. We'll use a free service from GitHub called **GitHub Pages**.

### The Big Picture (In Simple Terms)

1.  **Your Code:** Lives on your computer.
2.  **GitHub (`github.com/Jorja24/MYBIP-PROTOTYPE`):** This is like a public library for your code.
3.  **The "Deploy" Command (`npm run deploy`):** This is a magic command you'll run on your computer. It builds a neat, professional version of your website and sends it to your GitHub library.
4.  **GitHub Pages:** This is the free service that takes the website from your library and puts it on the internet for everyone to see.

The process has two main parts: a **one-time setup** to get everything connected, and then the **easy "deploy" command** for any future updates.

---

## ✅ Part 1: The One-Time Setup

Let's get everything ready. You only have to do this part once!

### Step 1: Open Your Project's Command Line (Terminal)

First, you need to open a command line that is "inside" your project folder. The easiest way to do this is to open your project in your code editor (like VS Code) and then open its built-in terminal.

*(In VS Code: Go to the top menu and click `Terminal` -> `New Terminal`)*

### Step 2: Install the Building Blocks

Your project relies on tools like React and Vite to work. You need to download them into your project.

➡️ In your terminal, run this command:
```bash
npm install
```
**What this does:** It reads the `package.json` file and downloads all the necessary code "building blocks" into a new `node_modules` folder. You won't need to do this again unless you add new tools later.

### Step 3: Send Your Website to GitHub for the First Time

Now we'll run the magic "deploy" command. This prepares your website and sends it to a special place on GitHub.

➡️ In your terminal, run this command:
```bash
npm run deploy
```
**What this does:**
1.  It builds a special, optimized version of your website in a folder named `dist`.
2.  It automatically creates a new, separate branch on your GitHub repository called `gh-pages` and pushes only the contents of that `dist` folder to it.

> **Wait for this command to finish completely before moving to the next step.**

### Step 4: Configure the GitHub Website

This is the final setup step! You need to tell GitHub to turn that `gh-pages` branch into a live website.

1.  **Go to your repository settings:** Open your web browser and go to `https://github.com/Jorja24/MYBIP-PROTOTYPE/settings`
2.  **Go to the "Pages" section:** On the left-hand menu, click on **Pages**.
    
3.  **Set the Source Branch:**
    *   Under "Build and deployment", for the **Source**, choose **Deploy from a branch**.
    *   A new dropdown will appear. In the branch dropdown, select **`gh-pages`**.
    *   Leave the folder as `/ (root)`.
    *   Click the **Save** button.
    

---

## 🚀 Part 2: You're Live!

**Congratulations!** You've done all the hard work.

GitHub will now take a minute or two to publish your site. You can watch the progress on that same "Pages" settings screen. When it's ready, it will show a green message with your public URL.

Your live website link is: **https://Jorja24.github.io/MYBIP-PROTOTYPE**

---

## 🔄 How to Update Your Live Website in the Future

Now that the setup is done, updating your site is incredibly simple.

1.  Make any changes you want to your code (`App.tsx`, etc.) and save the files.
2.  Save your changes to GitHub (you can use the command line or a desktop app).
    ```bash
    git add .
    git commit -m "Made some new updates"
    git push
    ```
3.  Run the deploy command again.
    ```bash
    npm run deploy
    ```

That's it! Your changes will appear on the live website after a minute or two. You've now got your "one-click deploy button."
