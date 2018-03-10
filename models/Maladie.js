'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var MaladieSchema = new Schema({

    name_Maladie:{
           type: String,
					 required : true
		},
    description:{
      type : String,
      required:true
    },
    photos: [
      {
        path: {
          type: String
        }
      }
    ],



});

var Maladie =module.exports = mongoose.model('Maladie', MaladieSchema);
