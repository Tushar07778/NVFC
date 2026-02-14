// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-a8EVBYG1P_cZYqF4C5JhFxsRzkWe-UA",
    authDomain: "studio-3371461251-fe4e1.firebaseapp.com",
    projectId: "studio-3371461251-fe4e1",
    storageBucket: "studio-3371461251-fe4e1.firebasestorage.app",
    messagingSenderId: "90556346453",
    appId: "1:90556346453:web:93f420e30cff9acbd7e4dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export default app;
