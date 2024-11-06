import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration Firebase
const firebaseConfig = {
    apiKey: "********",
    authDomain: "*******",
    projectId: "******",
    storageBucket: "******",
    messagingSenderId: "******",
    appId: "**********"
};

// Initialisez Firebase
const app = initializeApp(firebaseConfig);

// Initialisez Auth
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };