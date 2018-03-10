'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var commentaireSchema = new Schema({


    Contenue:{
      type : String,
      required:true
    },
    date_com:{
      type: String,
      require: Date,
      default:Date.now()
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    pub:{
      type:Schema.Types.ObjectId,
      ref:'publication'
    }



});

var commentaire =module.exports = mongoose.model('commentaire', commentaireSchema);
