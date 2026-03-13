/**
 * Configuration Firebase
 * =====================
 * IMPORTANT: Remplacez ces valeurs par vos propres cles Firebase
 * 
 * Pour obtenir ces cles:
 * 1. Allez sur https://console.firebase.google.com
 * 2. Creez un nouveau projet ou selectionnez un projet existant
 * 3. Allez dans Parametres du projet > General
 * 4. Dans "Vos applications", ajoutez une application Web
 * 5. Copiez les valeurs de configuration
 * 
 * N'oubliez pas d'activer:
 * - Authentication > Sign-in method > Email/Password
 * - Firestore Database (mode production ou test)
 */

 const firebaseConfig = {
    apiKey: "AIzaSyAzpbU3ObVCdP-LF07_fjl6r3CUG8YuvvA",
    authDomain: "elvis-projet.firebaseapp.com",
    projectId: "elvis-projet",
    storageBucket: "elvis-projet.firebasestorage.app",
    messagingSenderId: "562045909395",
    appId: "1:562045909395:web:188011225821313f899066",
    measurementId: "G-1GD5RP85H6"
  };

// Initialisation Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialise avec succes');
} catch (error) {
    console.error('Erreur initialisation Firebase:', error);
}

// References aux services Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Parametres Firestore pour le mode hors ligne
db.enablePersistence().catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Persistence deja active dans un autre onglet');
    } else if (err.code === 'unimplemented') {
        console.warn('Persistence non supportee par ce navigateur');
    }
});

