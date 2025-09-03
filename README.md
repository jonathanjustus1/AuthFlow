# AuthFlow Pro

This is a Next.js application that serves as a user authentication learning platform using Firebase.

## Getting Started

1.  **Set up Firebase:**
    *   Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
    *   In your Firebase project, go to the **Authentication** section and enable the **Email/Password**, **Google**, and **GitHub** sign-in providers.
    *   Go to the **Firestore Database** section and create a database.
    *   Go to your **Project Settings** > **General** and find your web app's configuration.
    *   Create a `.env.local` file in the root of the project. Copy the contents of `.env.local.example` and fill in your Firebase project's configuration values.

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
