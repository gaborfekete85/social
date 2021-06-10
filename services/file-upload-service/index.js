var express = require('express');
const app = express();
const port = 8203;
const firebase = require('./firebase')
const { v4: uuidv4 } = require('uuid');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

//var storageRef = firebase.storage.ref("uploads/todo.json");

//var upload = multer({ storage: storage })

const upload = multer({
  storage: multer.memoryStorage()
})

//app.use(upload.single());


app.get('/', (req, res) => {
    res.send('hello people Gaben');
});

function today() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  return yyyy + '-' + mm + '-' + dd;
}

function fileUpload(req, res) {
  if(!req.file) {
    res.status(400).send("Error: No files found")
  } else {
      let fileIdentifier = uuidv4();
      let currDate = today();
      const blob = firebase.bucket.file('uploads/' + currDate + '/' + fileIdentifier)

      const blobWriter = blob.createWriteStream({
          metadata: {
              contentType: req.file.mimetype
          }
      })

      blobWriter.on('error', (err) => {
          console.log(err)
      })

      blobWriter.on('finish', () => {
        res.set('Content-Type', 'application/json');
        res.status(200).send({
          'id': fileIdentifier,
          'date': currDate,
          'url': '/download/' + currDate + '/' + fileIdentifier
        });
      })
      blobWriter.end(req.file.buffer)
  }
}

app.get('/file/test', upload.single('file'), (req, res) => {
  res.status(200).send('Env variable: ' + process.env.AUTH_SERVICE_ENDPOINT);
})

app.post('/file/upload', upload.single('file'), (req, res) => {
  fileUpload(req, res)
})

app.get('/file/download/:date/:id', (req, res) => {
  const fileDate = req.params.date;
  const fileIdentifier = req.params.id;
  console.log('fileIdentifier: ' + fileIdentifier);

  const file = firebase.bucket.file('uploads/' + fileDate + '/' + fileIdentifier)
  file.download().then(function(data) {
    const contents = data[0];
    res.set('Content-Type', file.metadata.contentType);
    res.status(200).send(contents);
  });
});

app.post('/file/meta', upload.single('file'), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
});

app.post('/file/uploads', upload.array('files', 4) , (req, res) =>{
  try {
      res.send(req.files);
  } catch(error) {
        console.log(error);
         res.send(400);
  }
});

app.listen(port, () => {
    console.log('listening to the port: ' + port);
});