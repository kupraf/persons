'use strict';
var http = require("http");
var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const async = require('async');

 // import
mongoose.connect('mongodb://localhost:27017/mydb');



// Express application
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
// Get Index
app.get("/", function(req, res){
	res.end("Index")
})
//users
var users = require('./routers/user_route.js')
app.use('/api/users',users)
//oiseaux
var birds = require('./routers/bird_route.js')
app.use('/api/birds',birds)
//cages
var cages = require('./routers/cage_route.js')
app.use('/api/cages',cages)
//fiches
var fiches = require('./routers/fiche_route.js')
app.use('/api/fiches',fiches)
//messages
var messages = require('./routers/message_route.js')
app.use('/api/messages',messages)
//couple
var couples = require('./routers/couple_route.js')
app.use('/api/couples',couples)
//Maladie
var Maladies = require('./routers/Maladie_route.js')
app.use('./api/Maladies', Maladies)
//publication
var publications = require('./routers/publication_route.js')
app.use('/api/publications', publications)
//Eshop
var Eshops = require('./routers/Eshop_route.js')
app.use('/api/Eshops',Eshops)
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
