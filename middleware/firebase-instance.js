const firebaseAdmin = require("firebase-admin");
const firebaseServiceAccount = require('../config/ntcon-dev-firebase-adminsdk');

module.exports = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    databaseURL: "https://ntcon-dev.firebaseio.com"
});