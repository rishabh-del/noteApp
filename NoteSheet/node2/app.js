'use strict';


var express = require('express');
var app = express();
var queries = require('./blockchainController/queries');
var bodyParser = require("body-parser");
var helmet = require('helmet');
var cors = require('cors')
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../frontend2`));
app.use(bodyParser.urlencoded({
   extended: true
}));
// *******remove these once Angular front end is written ********
app.set('views', `${__dirname}/../frontend2`); // __dirname is {workspace}/build
app.engine('html', require('ejs').renderFile);
//app.use(compression()); //Compress all routes
app.use(helmet());
app.use(cors())
app.set('view engine', 'html');
var Users = [];


//app.use(router);

app.post('/changeNotes', async (req, res) => {
   console.log("inside change notes", req.body);
   var allNotes = [];
   var result = [];
   for(var i = 0;i<req.body.length;i++){
   let data = {
      key: req.body[i].key,
      value: req.body[i].value
   }
   allNotes.push(data)
}
  for(var i= 0;i<allNotes.length;i++){
     console.log(allNotes)
  let response = await queries.submitNotes(allNotes[i]);
  result.push(response);
  }

   res.send(result);
});
app.post('/removeNote', async (req, res) => {
   console.log('inside remove notes', req.body);
var data = {
   key: req.body.key,
   value: "null"
}
   let response = await queries.removeNote(data);
   res.send(response);
});
app.post('/submitNotes', async (req, res) => {
   console.log("inside submitnotes", req.body);
   var allNotes = [];
   var result = [];
   for(var i = 0;i<req.body.length;i++){
   let data = {
      key: req.body[i].key,
      value: req.body[i].value
   }
   allNotes.push(data)
}
  for(var i= 0;i<allNotes.length;i++){
     console.log(allNotes)
  let response = await queries.submitNotes(allNotes[i]);
  result.push(response);
  }

   res.send(result);
});






app.get('/getAllNotes', async (req, res) => {
   console.log("inside allNotes...");
   
   let response = await queries.allNotes();
   res.send(response.result);
});



app.get('/', function (req, res) {
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000, function (req, res) {
   console.log("Server listening at 3000");
});
