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
        *   **GitHub**
    *   Next, in the **Build** menu, click on **Firestore Database**.
    *   Click the **Create database** button and follow the prompts to create a Firestore database in production mode.

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

The main application logic can be found in `src/app/page.tsx`.
