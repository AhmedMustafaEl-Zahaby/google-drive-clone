import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2vU0TRru3fwn4o-j2TExmcdvGvYVuhHY",
  authDomain: "drive-clone-4c853.firebaseapp.com",
  projectId: "drive-clone-4c853",
  storageBucket: "drive-clone-4c853.appspot.com",
  messagingSenderId: "416428895401",
  appId: "1:416428895401:web:797a08c11fe242509bcdb8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
