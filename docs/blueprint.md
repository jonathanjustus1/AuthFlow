# **App Name**: AuthFlow Pro

## Core Features:

- Authentication: Provide 'Sign In' and 'Sign Up' tabs using Firebase authentication.
- Social Authentication: Enable 'Sign in with Google' and 'Sign in with GitHub' using Firebase OAuth.
- Profile Creation: After signup, redirect to a mandatory 'Profile Creation' view with required fields: First Name, Last Name, Date of Birth. Write this data to Firestore in a 'profiles' collection, using the User ID as the document ID.
- Dashboard: Display a 'Dashboard' only after the user is logged in AND a profile exists. Show a personalized welcome message using the first name from the Firestore profile.
- State Management: Manage user authentication state using Firebase's onAuthStateChanged. Check for the existence of a profile document in Firestore after login to determine the view to render.
- Sign Out: Implement a 'Sign Out' button that calls Firebase's signOut() method.

## Style Guidelines:

- Primary color: A muted blue (#6699CC) to evoke a sense of trust and security.
- Background color: Light gray (#F0F0F0) for a clean and modern look.
- Accent color: A warm orange (#FFB347) to highlight key actions and CTAs.
- Body and headline font: 'Inter' sans-serif, for a modern and objective feel.
- Central card layout on a light gray background for key content. Clear headings, labeled input fields, and well-styled buttons.
- Subtle transitions between authentication states and form submissions.