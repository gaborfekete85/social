const express = require('express')
const multer = require('multer')
const firebase = require('./firebase')
//const storageRef = require('./firebase')

const app = express()

const upload = multer({
    storage: multer.memoryStorage()
})

app.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file) {
        res.status(400).send("Error: No files found")
    } else {
        //firebase.put(req.file.buffer.data).then((snapshot) => {
        //    console.log('Uploaded an array!');
        //});

        const blob = firebase.bucket.file('uploads/' + req.file.originalname)       
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })
        blobWriter.on('error', (err) => {
            console.log(err)
        })
        blobWriter.on('finish', () => {
            res.status(200).send(req.file)
        })
        blobWriter.end(req.file.buffer)
    }
})

app.listen(3000, () => {
    console.log('🚀Server listening on port 3000')
})