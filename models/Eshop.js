'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var EshopSchema = new Schema({


    prix:{
      type : String,
      required:true
    },
    date_ann:{
      type: String,
      require: Date,
      default:Date.now()
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    bird:{
      type:Schema.Types.ObjectId,
      ref:'bird'
    },
    note:{
      type:String,
    }



});

var Eshop =module.exports = mongoose.model('Eshop', EshopSchema);
