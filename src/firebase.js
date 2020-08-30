import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3qVw4R4Mi_2MfFKzPBkGhUY_sYOiVG1g",
  authDomain: "twitter-clone-46275.firebaseapp.com",
  databaseURL: "https://twitter-clone-46275.firebaseio.com",
  projectId: "twitter-clone-46275",
  storageBucket: "twitter-clone-46275.appspot.com",
  messagingSenderId: "206935105440",
  appId: "1:206935105440:web:a5dc869ffbf0875bb10ec5",
  measurementId: "G-TZ6N8HCXT6",
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timeStamp };
