'use strict';

var fs = require('fs');
var os = require('os');
//var router = require('./router');
var express = require('express');
var app = express();
//server = http.createServer(app);
var queries = require('./blockchainController/queries');
//const mongoose = require('mongoose');
var bodyParser = require("body-parser");
var compression = require('compression');
var helmet = require('helmet');
// var { User } = require('../models/userSchema');
// var { Org } = require('../models/orgSchema');
// var authy = require('authy')('Kl1QZBwUjW6L5NKfiUv7bj0KFF0RGlYm');
//var createpdf = require('../backend/createpdf');
// var sql = require("mssql");
// Need cookieParser and expressSession for session support
var expressSession = require('express-session');
// In memory session store
var sessionStore = new expressSession.MemoryStore;
//const exec = util.promisify(require('child_process').exec);
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../frontend`));
app.use(bodyParser.urlencoded({
   extended: true
}));
// *******remove these once Angular front end is written ********
app.set('views', `${__dirname}/../frontend`); // __dirname is {workspace}/build
app.engine('html', require('ejs').renderFile);
//app.use(compression()); //Compress all routes
app.use(helmet());
app.set('view engine', 'html');
var Users = [];

//app.use(router);
app.use(expressSession({ key: 'JSESSIONID', secret: 'whatever', store: sessionStore, maxAge: Date.now() + (1000), resave: false, saveUninitialized: true }));



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
  // for(var i= 0;i<allNotes.length;i++){
     console.log(allNotes)
  let response = await queries.submitNotes(allNotes[0]);


   res.send(response.result);
});






app.post('/allNotes', async (req, res) => {
   console.log("inside allNotes");
   let data = {
      key: "12345"
   }
   let response = await queries.allNotes(data);
   res.send(response.result);
});



app.get('/', function (req, res) {
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(5000, function (req, res) {
   console.log("Server listening at 5000");
});
