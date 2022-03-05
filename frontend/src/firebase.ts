import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: 'AIzaSyAWFo_X1icJzlvLGETLqbukLM4nP1F_48I',
    authDomain: 'worksheets-9b1ad.firebaseapp.com',
    projectId: 'worksheets-9b1ad',
    storageBucket: 'worksheets-9b1ad.appspot.com',
    messagingSenderId: '741113016078',
    appId: '1:741113016078:web:60b2a990ac386da5df715f',
    measurementId: 'G-2WLH8KZDG1',
})

export const auth = getAuth(app)
export default app
