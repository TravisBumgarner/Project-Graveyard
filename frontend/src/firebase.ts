import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
    staging: {
        apiKey: 'AIzaSyDbhejVpGA1tZ5GbQUsF_prG13cWjsDgXY',
        authDomain: 'phraseaday-staging.firebaseapp.com',
        projectId: 'phraseaday-staging',
        storageBucket: 'phraseaday-staging.appspot.com',
        messagingSenderId: '63085629930',
        appId: '1:63085629930:web:e47f925fa89f16a679a293',
        measurementId: 'G-8V3NHM86NC'
    },
    production: {
        apiKey: 'AIzaSyCsWLHFybwgscsuRn_AXQ4wTZUQTTCadPM',
        authDomain: 'phraseaday-production.firebaseapp.com',
        projectId: 'phraseaday-production',
        storageBucket: 'phraseaday-production.appspot.com',
        messagingSenderId: '301761759960',
        appId: '1:301761759960:web:0c5fbd491a5e15293465ad',
        measurementId: 'G-VD64CWCCMH'
    }
}

const app = firebase.initializeApp(config[__FIREBASE_CONFIG__]) //eslint-disable-line

export const auth = getAuth(app)
export default app
