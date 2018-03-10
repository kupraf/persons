'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var birdSchema = new Schema({
  bague: {type :String, required:true},
  name:{type :String, required:true},
  category:{type :String, required:true},
  birth:{type :Date, required:true},
  death:{
    dead: {
      type: Boolean,
      default: false
    },
    died: {
      type: Date
    },
    cause: {
      type: String
    }
  },
  Description: {type :String, required:true},
  photos: [
    {
      path: {
        type: String
      }
    }
  ],
  parent :{
    type: Schema.Types.ObjectId,
   ref: 'Couple'
  },
  owner:{
    type:Schema.Types.ObjectId,ref:'user'
  },
  description: {
    type:String
  }
});


var bird =module.exports = mongoose.model('bird', birdSchema);
