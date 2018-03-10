'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ficheSchema = new Schema({

    name_fiche:{
           type: String,
					 required : true
		},
    description:{
      type : String,
      required:true
    },
    photo:{
      Type: String,
      required:false
    }



});

var fiche =module.exports = mongoose.model('fiche', ficheSchema);
