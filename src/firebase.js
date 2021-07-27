import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyBqoMuKgDDU-Aq-4LKD_WKrfWdtr0eJ8yE',
	authDomain: 'chatbud-55cd8.firebaseapp.com',
	projectId: 'chatbud-55cd8',
	storageBucket: 'chatbud-55cd8.appspot.com',
	messagingSenderId: '27705194223',
	appId: '1:27705194223:web:3b615c46c9e03502898d1a',
	measurementId: 'G-V05CERF75M',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const fv = firebase.firestore.FieldValue;

export { db, auth, provider, fv, storage };
