import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAdL6GtL9UthE3T_ZBp1tEvDEyzmZymdsQ',
	authDomain: 'govtechthonassessment.firebaseapp.com',
	databaseURL: 'https://govtechthonassessment.firebaseio.com',
	projectId: 'govtechthonassessment',
	storageBucket: 'govtechthonassessment.appspot.com',
	messagingSenderId: '525260456653',
	appId: '1:525260456653:web:a741e373ab8fb67f22df84',
})

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth, firebase }
