// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { userId } from '../store';
import Cookies from 'js-cookie';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      userId.set(result.user.uid);
      console.log(user);
      Cookies.set('uid', result.user.uid);
      document.location.reload();
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
} 

export const googleSignOut = () => {
  signOut(auth).then(() => {
    // Cookieを削除
    Cookies.remove('uid');
    // 画面を更新
    document.location.reload();
  }).catch((error) => {
    alert('ログアウトできませんでした。通信環境の良い場所で再度実行してください。')
  });
}