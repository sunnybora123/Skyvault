// Import the functions you need from the SDKs you need

import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
import {getFunctions} from "firebase/functions";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChYF09dzjZtFVnLSv3_3BsGf-_ViJJ9KE",
  authDomain: "dropbox-clone-77560.firebaseapp.com",
  projectId: "dropbox-clone-77560",
  storageBucket: "dropbox-clone-77560.appspot.com",
  messagingSenderId: "823333286335",
  appId: "1:823333286335:web:07355679a980f99928710a"
};

// Initialize Firebase
const app = getApps().length ? getApp(): initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);

export {db,storage};