import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCFpZuP7zxZeTqHqQvfhbDSfvJa_U-Kyr0',
  authDomain: 'fahmos.firebaseapp.com',
  projectId: 'fahmos',
  storageBucket: 'fahmos.appspot.com',
  messagingSenderId: '719976341701',
  appId: '1:719976341701:web:33eb6ad4ca1838d98850ac',
  measurementId: 'G-VSF1KXQCK5'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
