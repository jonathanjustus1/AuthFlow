# AuthFlow Pro

This is a Next.js application that serves as a user authentication learning platform using Firebase.

## Getting Started (Local Development)

1.  **Set up Firebase:**
    *   Go to the [Firebase console](https://console.firebase.google.com/) and find your project (`authflow-pro`).
    *   In the **Build** menu on the left, click on **Authentication**.
    *   Click the **Get started** button. This will take you to the sign-in method configuration page.
    *   In the **Sign-in method** tab, you will see a list of providers. Click on and enable the following providers:
        *   **Email/Password**
        *   **Google**
    *   Next, in the **Build** menu, click on **Firestore Database**.
    *   Click the **Create database** button and follow the prompts to create a Firestore database in production mode.

2.  **Deploy Firestore Rules:**
    *   The default security rules for Firestore in production mode are very strict. This project includes a `firestore.rules` file that allows authenticated users to manage their own profiles.
    *   You need to deploy these rules for the profile creation to work.
    *   **Step 1: Install Firebase CLI.** If you haven't already, install the Firebase command-line tools:
        ```bash
        npm install -g firebase-tools
        ```
    *   **Step 2: Log in to Firebase.** Log in to your Google account through the CLI. This must be done from the project's root directory in your terminal.
        ```bash
        firebase login
        ```
    *   **Step 3: Deploy the rules.** Run the following command from the root directory of this project. Make sure to replace `authflow-pro` with your actual Firebase Project ID if it's different.
        ```bash
        firebase deploy --only firestore:rules --project=authflow-pro
        ```
    *   You should see a "Deploy complete!" message. If you see any errors, please double-check that you are logged in, that you are running the command from the project's root directory, and that the project ID is correct.

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

The main application logic can be found in `src/app/page.tsx`.

## Deploying to Vercel

When you deploy your application to Vercel, you need to provide it with your Firebase environment variables. Your local `.env.local` file is not uploaded to Vercel for security reasons.

Follow these steps in your Vercel project dashboard:

1.  **Go to Project Settings:** Navigate to your project in Vercel and click on the "Settings" tab.
2.  **Go to Environment Variables:** In the left sidebar, click on "Environment Variables".
3.  **Add Your Variables:** You will need to add the following variables one by one. The values can be found in your `.env.local` file. **Important:** Make sure they all start with `NEXT_PUBLIC_`.

    *   `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    *   `NEXT_PUBLIC_FIREBASE_APP_ID`

4.  **Redeploy:** After adding the variables, trigger a new deployment in Vercel. Your application should now be able to connect to your Firebase project successfully.
