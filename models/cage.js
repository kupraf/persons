'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var cageSchema = new Schema({

    Num_cage:{
           type: Number,
					 required : true
		},

	type : {
		type: String,
		required: true
	},

	couple: {
     type: Schema.Types.ObjectId,
     ref: 'couple'
  },
  num_oeuf: {
    type: Number,
    required: false
  }



});

var cage =module.exports = mongoose.model('cage', cageSchema);
