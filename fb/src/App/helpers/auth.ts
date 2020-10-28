import { firebase } from "../services";

const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

const signin = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export {
    signup,
    signin
}