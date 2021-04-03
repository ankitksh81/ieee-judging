import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
	apiKey: 
	authDomain: 
	databaseURL: 
	projectId: 
	storageBucket: 
	messagingSenderId: 
	appId: 
})

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth, firebase }
