
'use strict';

var express = require("express");
var router = express.Router();
var publication = require('./../models/publication.js');
const async = require('async');



// Post new publication
router.post("/", function(req, res){
	let new_publication = new publication({
    Contenue:req.body.Contenue,
    date_pub:req.body.date_pub,
    owner:req.body.owner,
    like:req.body.like
	})
	new_publication.save(function(err, publication){
		if (err) {
			res.json({success: false, description: "Post new publication", publication: "publication registration faled", error: err})
		} else {
			res.json({success: true, description: "Post new publication", publication: "publication registred", data: publication})
		}
	})
})
// Get publications
router.get("/", function(req, res){
	publication.find(function(err, publications){
		if (err) {
			res.json({success: false, description: "Get new publication", error: err})
		} else {
			res.json({success: true, description: "Get new publication", data: publications})
		}
	})
})
// Get publication by id
router.get("//:id", function(req, res){
	publications.findOne({_id: req.params.id}, function(err, publications){
		if (err) {
			res.json({success: false, description: "Get new publication", error: err})
		} else {
			res.json({success: true, description: "Get new publication", data: publications})
		}
	})
})
// Delete publication by id
router.delete("/:id", function(req, res){
	publication.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete publication", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete publication", publication: "publication not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new publication", publication: "publication deleted"})
		}
	})
})

//end publication
// exporting
module.exports =router ;
