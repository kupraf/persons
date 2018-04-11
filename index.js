'use strict';
var http = require("http");
var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const async = require('async');
var config= require('./config/database');
var multer =require('multer')
var db= require('./config/connection');
var cors=require('cors');
var passport = require("passport");
var passport_facebook= require('passport-facebook')
var FacebookStrategy = require ('passport-facebook');

 // import
mongoose.connect('mongodb://ataoo:ataoo@ds012188.mlab.com:12188/ataoo');



// Express application
var app = express();
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
require('./config/passport_facebook')(passport_facebook);
passport.use(new FacebookStrategy({
	clientID: '590969441262591',
	clientSecret: 'd5182c7c7d05815b49438a49b89b0a32',
	callbackURL: "https://localhost:8081/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
	console.log(profile);
	cb(null, profile);

}
));
app.get('/flogin',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session :false }),
  function(req, res) {
		console.log(profile);
    res.send('AUTH WAS GOOD!')
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
// Get Index
app.get("/", function(req, res){
	res.end("Index")
})
// Cors Middleware
const cors_permission = require('./cors');
app.use(cors_permission.permission)
//
app.use(cors({
    allowedHeaders: ["Content-Type", "Authorization"]
}));
//users
var users = require('./routers/user_route.js')
app.use('/api/users',users)
//oiseaux
var birds = require('./routers/bird_route.js')
app.use('/api/birds',birds)
//cages
var cages = require('./routers/cage_route.js')
app.use('/api/cages',cages)
//familys
var familys = require('./routers/family_route.js')
app.use('/api/familys',familys)
//messages
var messages = require('./routers/message_route.js')
app.use('/api/messages',messages)
//couple
var couples = require('./routers/couple_route.js')
app.use('/api/couples',couples)

//publication
var publications = require('./routers/publication_route.js')
app.use('/api/publications', publications)
//commentaire
var commentaires = require('./routers/commentaire_route.js')
app.use('/api/commentaires',commentaires)


app.listen(8081, function(err){
	if (err) {
		console.error(err)
	} else {
		console.log("il3ab yala")
	}
});
