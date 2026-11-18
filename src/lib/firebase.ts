// ============================================
// Firebase Configuration
// ============================================
//
// Las credenciales de Firebase se leen desde variables de entorno (.env.local).
// Copia .env.example a .env.local y completa los valores.
//
// ============================================

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Verificar si Firebase está configurado correctamente
export const isFirebaseConfigured =
  firebaseConfig.apiKey && firebaseConfig.apiKey !== 'tu_api_key_aqui';

export { db };
