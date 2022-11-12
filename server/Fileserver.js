var express = require("express");
var multer = require('multer');
var app = express();


app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post('/upload', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  var storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, callback) {
      
      callback(null, req.query.id + ".jpg");
    }
  });

  var upload = multer({ storage: storage }).single('file');

  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file. " + err);
    }
    res.end("File is uploaded successfully!");
  });
})

app.post('/uploads', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  let i = 0
  var storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, callback) {
      i++
      callback(null, req.query.id+ "_" + i + ".jpg");
    }
  });

  var upload = multer({ storage: storage }).array('multifiles');
  
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file. " + err);
    }
    res.end("File is uploaded successfully!");
  });
  i = 0


});


app.listen(2000, function () {
  console.log("Server is running on port 2000");
});  