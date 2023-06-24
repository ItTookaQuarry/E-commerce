
import { initializeApp,dynamicLinkDomain} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore,doc, updateDoc,setDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyD4zscplvKXOb-W1emEwGrLKgr7qzMksbM",
  authDomain: "ecom1-7cade.firebaseapp.com",
  projectId: "ecom1-7cade",
  storageBucket: "ecom1-7cade.appspot.com",
  messagingSenderId: "356590244163",
  appId: "1:356590244163:web:98aa6c5ccb8c9dae779ff6"
};




export const actionCodeSettings = {
  url: 'http://localhost:3000/',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};


export const app = initializeApp(firebaseConfig)

export const auth=getAuth(app);

export const database=getFirestore(app)
