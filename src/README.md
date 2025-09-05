# AuthFlow Pro

This is a Next.js application that serves as a user authentication learning platform using Firebase.

## Getting Started

### 1. Set up Firebase Project

*   Go to the [Firebase console](https://console.firebase.google.com/) and find your project (`authflow-pro`).
*   In the **Build** menu on the left, click on **Authentication**.
*   Click the **Get started** button.
*   In the **Sign-in method** tab, enable the following providers:
    *   **Email/Password**
    *   **Google**
*   Next, in the **Build** menu, click on **Firestore Database**.
*   Click the **Create database** button and follow the prompts to create a Firestore database in **production mode**.

### 2. Configure Local Environment

*   This project uses a `.env.local` file to store your Firebase project credentials. You need to create this file in the root of your project. A `.env.local.example` file is provided as a template.
*   Copy your Firebase project's web app configuration object into this file. You can find this in your Firebase project settings under "Your apps".

### 3. Deploy Firestore Rules (CRITICAL STEP)

The default security rules for Firestore are too strict and will cause a "Profile Update Failed: Missing or insufficient permissions" error. You **must** deploy the rules included in this project for the app to work.

*   **Step 1: Open the Terminal.** The IDE you are using has a built-in terminal. Find and click on the "Terminal" tab at the bottom of the screen.
*   **Step 2: Log in to Firebase.** Run the following command in the terminal. It will provide a URL for you to open in your browser to log in to your Google account.

    ```bash
    firebase login
    ```
*   **Step 3: Deploy the rules.** After logging in, run the following command from the root directory of this project. **Make sure to replace `authflow-pro` with your actual Firebase Project ID if it's different.**

    ```bash
    firebase deploy --only firestore:rules --project=authflow-pro
    ```
*   You should see a "Deploy complete!" message. If you see any errors, please double-check that you are logged in and that the project ID is correct.

### 4. Run the App

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. The main application logic can be found in `src/app/page.tsx`.

## Deploying to Vercel

To deploy your application to Vercel, you need to provide your Firebase credentials as Environment Variables in your Vercel project settings.

1.  **Log in to Vercel** and select your project.
2.  Navigate to the **Settings** tab.
3.  Click on **Environment Variables** in the left-hand menu.
4.  Copy each variable from your local `.env.local` file and add it to Vercel. For each variable, you will add the name (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`) and its corresponding value. Ensure they are set for **all environments** (Production, Preview, and Development).

Here are the variables you need to add:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

After adding the environment variables, trigger a new deployment on Vercel. Your app should now be able to connect to your Firebase project.
