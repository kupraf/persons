'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var publicationSchema = new Schema({


    Contenue:{
      type : String,
      required:true
    },
    date_pub:{
      type: String,
      require: Date,
      default:Date.now()
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    like:{
      type:Boolean,
      default:false
    }



});

var publication =module.exports = mongoose.model('publication', publicationSchema);
