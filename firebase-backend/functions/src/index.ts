import app from './app'

if (process.env.NODE_ENV === 'development') {
    app.listen(5001, () => console.log('running'))
} else {
    const functions = require("firebase-functions");
    exports.api = functions.https.onRequest(app);
}