import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "Your api key",
    authDomain: "auth-domain",
    projectId: "project-id",
    storageBucket: "starage bucket",
    messagingSenderId: "messaging sender id",
    appId: "app id"
};


firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export {auth, provider, storage}