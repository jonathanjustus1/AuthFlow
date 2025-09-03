# AuthFlow Pro

This is a Next.js application that serves as a user authentication learning platform using Firebase.

## Getting Started

1.  **Set up Firebase:**
    *   Go to the [Firebase console](https://console.firebase.google.com/) and find your project (`authflow-pro`).
    *   In the **Build** menu on the left, click on **Authentication**.
    *   Click the **Get started** button. This will take you to the sign-in method configuration page.
    *   In the **Sign-in method** tab, you will see a list of providers. Click on and enable the following providers:
        *   **Email/Password**
        *   **Google**
    *   Next, in the **Build** menu, click on **Firestore Database**.
    *   Click the **Create database** button and follow the prompts to create a Firestore database in production mode.

2. **Deploy Firestore Rules:**
    * The default security rules for Firestore in production mode are very strict. This project includes a `firestore.rules` file that allows authenticated users to manage their own profiles.
    * You need to deploy these rules for the profile creation to work.
    * Install the Firebase CLI: `npm install -g firebase-tools`
    * Log in to Firebase: `firebase login`
    * Deploy the rules, making sure to replace `authflow-pro` with your actual Firebase Project ID if it's different: `firebase deploy --only firestore:rules --project=authflow-pro`


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
