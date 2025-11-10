export const KNOWLEDGE_BASE = `
MyBIP App Content:

1.  **About the MyBIP App**:
    *   The MyBIP (My Business Innovation Planner) app was created by the Human Sciences Research Council (HSRC) to support informal business owners in South Africa.
    *   It provides research-based tools and resources to help with innovation, problem-solving, and identifying business opportunities.
    *   The goal is to help informal business owners use their skills and knowledge to create value for customers.

2.  **Key Features & Tools**:
    *   **Innovation Toolkit**: A set of guides and steps from the HSRC to help you think creatively about your business.
    *   **Business Planner**: A tool to help you create a simple plan for your business.
    *   **Resource Hub**: Contains articles and HSRC Policy Briefs.

HSRC (Human Sciences Research Council) Content:
*   The HSRC provides the core 'Innovation Toolkit' and 'Policy Briefs' focused on the informal economy. Their goal is to empower business owners with research-backed strategies.

Business Registration (CIPC Content):
*   To register a business as a sole proprietor with the CIPC (Companies & Intellectual Property Commission), you need to: 1. Create a CIPC account. 2. Reserve a business name (optional). 3. Complete the sole proprietor registration form online. 4. Receive confirmation.
*   The process is designed to be simple for individuals starting a business.

Tax Information (SARS Content):
*   All businesses, including sole proprietors, must register for Income Tax with SARS (South African Revenue Service). This can be done on the SARS eFiling website.
*   **Record Keeping:** Keeping records of all your income and expenses is very important for tax purposes.
*   **Presumptive Tax (Turnover Tax):** For small businesses with a turnover of less than R1 million per year, SARS offers a simpler tax system called Presumptive Tax. You pay tax on your total sales (turnover), not on profit. This makes bookkeeping easier.
*   **eFiling:** This is SARS's online platform where you can register for tax, submit your tax returns, and make payments. It is the easiest way to manage your taxes.
*   **Tax Clearance Certificate:** This is a document from SARS that proves your tax affairs are in order. You often need it when applying for funding or government tenders. You can get it via eFiling.

Business Support (SEDA Content):
*   SEDA (Small Enterprise Development Agency) provides non-financial support, training, and resources for small businesses in South Africa.
*   They can help with business planning, accessing funding, and mentorship.
*   You can find your nearest SEDA branch on their official website to get help.

Funding & Financial Support:

1.  **SEFA (Small Enterprise Finance Agency) Content**:
    *   **What is SEFA?** SEFA provides financial products and services to small, medium, and micro enterprises (SMMEs). They offer direct loans to businesses.
    *   **Who can apply?** South African citizens who own or want to start a business based in South Africa.
    *   **Types of Funding:** They offer 'Micro-Loans' (from R500 to R50,000) for very small businesses and 'Direct Lending' for larger amounts.
    *   **How to apply:** You will generally need a business plan, your ID document, proof of address, and company registration documents (if registered). Find application details on the SEFA website.

2.  **DSBD (Department of Small Business Development) Content**:
    *   **What is the DSBD?** This government department runs several programmes that offer financial support to small businesses.
    *   **Township and Rural Entrepreneurship Programme (TREP):** This programme provides funding and support specifically for businesses operating in townships and rural areas. It includes financial grants and business development support.
    *   **How to get help:** Visit the official DSBD website or a local SEDA branch to learn about current funding programmes.

Data and Privacy:
*   This chatbot does not save your personal conversation history after you close it.
*   All answers are based on the content available inside the MyBIP app.
`;

export const getSystemInstruction = (language: string): string => `
You are a friendly and helpful AI assistant for the MyBIP app. Your name is 'MyBIP Assistant'.
You are designed to support informal business owners in South Africa.
You MUST answer questions based ONLY on the provided context. The context has information from: MyBIP App Content, HSRC Content, CIPC Content, SARS Content, SEDA Content, SEFA Content, and DSBD Content.
If the answer is not in the context, you MUST politely say that you cannot answer. Do not invent information.
When you provide an answer, you MUST cite the source(s) you used from the context by using the title of the relevant section (e.g., "Tax Information (SARS Content)", "SEFA (Small Enterprise Finance Agency) Content").
If a user asks for a step-by-step process that is in your context (like registering a business), you MUST provide it as a 'guidedStep'.
You MUST respond in ${language}. Keep your answers concise and clear.

Your entire response must be a single JSON object with the following structure:
{
  "answer": "Your text response here.",
  "sources": [{"name": "SOURCE_NAME_1"}, {"name": "SOURCE_NAME_2"}],
  "guidedStep": {
    "title": "Title of the Process",
    "steps": ["Step 1 text", "Step 2 text", "Step 3 text"]
  }
}

// Fix: Changed instruction to omit the 'guidedStep' key instead of setting it to null.
// This aligns with the response schema where the key is optional.
If there is no guided step for the query, you must omit the "guidedStep" key from the JSON object.
If there are no sources, the value for "sources" must be an empty array [].
`;