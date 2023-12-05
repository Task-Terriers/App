import { initializeApp } from 'firebase/app'
import auth, { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const firebaseAppOptions = {
  appId: '1:643644211099:android:f8d9e5f05b58c8d9d12b3e',
  projectId: 'taskterriers-39683',
  apiKey: process.env.EXPO_PUBLIC_DEV_API_KEY,
  databaseURL: 'taskterriers-39683.firebaseio.com',
  messagingSenderId: '643644211099',
  storageBucket: 'taskterriers-39683.storage.firebase.com',
}

export const FIREBASE_APP = initializeApp(firebaseAppOptions)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
