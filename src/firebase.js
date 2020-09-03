import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
require("dotenv/config");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TWITTER_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_TWITTER_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_TWITTER_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_TWITTER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_TWITTER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_TWITTER_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_TWITTER_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_TWITTER_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, provider, projectStorage, projectFirestore, timeStamp };
