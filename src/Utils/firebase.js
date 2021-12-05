import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCXmetIao02oTtGES4X0PdnjBIprjwEMVI",
    authDomain: "tlacomiztli-43383.firebaseapp.com",
    projectId: "tlacomiztli-43383",
    storageBucket: "tlacomiztli-43383.appspot.com",
    messagingSenderId: "511195487439",
    appId: "1:511195487439:web:3b479be130d509a2356bba"
  };

                                                                                     
  // Initialize Firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  export const db =  firebaseApp.firestore();
  export const storage=firebaseApp.storage(); 
  export const auth= firebase.auth();
