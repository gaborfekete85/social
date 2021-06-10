const express = require('express');
const app = express();
const Multer = require('multer');

const admin = require('firebase-admin')

var serviceAccount = require("./pppp-59919-firebase-adminsdk-z1ftu-d5e560d572.json");

let config = {
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyDyjsigPpjQFbYW72RsSOI9ptg6L0jIBjc",
    authDomain: "pppp-59919.firebaseapp.com",
    databaseURL: "https://pppp-59919.firebaseio.com",
    storageBucket: "gs://pppp-59919.appspot.com",
    messagingSenderId: "912050282042",
    projectId: 'pppp-59919',
    appId: '1:912050282042:android:371b110d2d4cd643249f03'

};

admin.initializeApp(config);
const bucket = admin.storage().bucket()

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

app.listen(3000, () => {
  console.log('App listening to port 3000');
});

/**
 * Adding new file to the storage
 */
app.post('/upload', multer.single('file'), (req, res) => {
  console.log('Upload Image');

  let file = req.file;
  if (file) {
    uploadImageToStorage(file).then((success) => {
      res.status(200).send({
        status: 'success'
      });
    }).catch((error) => {
      console.error(error);
    });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    //let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(file.originalname);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.' + JSON.stringify(error));
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}