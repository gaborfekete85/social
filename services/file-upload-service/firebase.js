const admin = require('firebase-admin')

var serviceAccount = require("./pppp-59919-firebase-adminsdk-z1ftu-d5e560d572.json");

let config = {
    credential: admin.credential.cert(serviceAccount),
    apiKey:  process.env.API_KEY,
    authDomain: "pppp-59919.firebaseapp.com",
    databaseURL: "https://pppp-59919.firebaseio.com",
    storageBucket: "gs://pppp-59919.appspot.com",
    messagingSenderId: "912050282042",
    projectId: 'pppp-59919',
    appId: '1:912050282042:android:371b110d2d4cd643249f03'

};

admin.initializeApp(config);

const bucket = admin.storage().bucket()
//const database = admin.database();

const storage = admin.storage();

module.exports = { 
    //database, 
    bucket, 
    storage
    //ref 
}
