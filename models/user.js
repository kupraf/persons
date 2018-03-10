'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 //user
var userSchema = new Schema({

NomUtilisateur: {type:String, required:true},
PrenomUtilisateur: {type:String, required:true},
Date_Naissance: {type:Date},
Num_tel:{type:Number, required:true},
Adresse_email:{type:String, required:true},
Region:{type:String, required:true},
Mot_de_passe:{type:String, required:true},
Avatar:{type:String, required:true}

});

var user =module.exports = mongoose.model('user', userSchema);
