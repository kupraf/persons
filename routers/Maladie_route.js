'use strict';
var express = require("express");
var router = express.Router();
var Maladie = require('./../models/Maladie.js');
const async = require('async');

// Post new Maladie
router.post("/", function(req, res){
	let new_Maladie = new Maladie({
		name_Maladie : req.body.name_Maladie,
		description: req.body.description,
		photos:req.body.photos


	})
	new_Maladie.save(function(err, Maladie){
		if (err) {
			res.json({success: false, description: "Post new Maladie", message: "Maladie registration faled", error: err})
		} else {
			res.json({success: true, description: "Post new Maladie", message: "Maladie registred", data: Maladie})
		}
	})
})
// Get Maladies
router.get("/", function(req, res){
	Maladie.find(function(err, Maladies){
		if (err) {
			res.json({success: false, description: "Get new Maladie", error: err})
		} else {
			res.json({success: true, description: "Get new Maladie", data: Maladies})
		}
	})
})
// Get Maladie by id
router.get("/:Num_Maladie", function(req, res){
	Maladies.findOne({Num_Maladie: req.params.Num_Maladie}, function(err, Maladies){
		if (err) {
			res.json({success: false, description: "Get new Maladie", error: err})
		} else {
			res.json({success: true, description: "Get new Maladie", data: Maladies})
		}
	})
})
// Delete Maladie by id
router.delete("/:id", function(req, res){
	Maladie.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete Maladie", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete Maladie", message: "Maladie not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new Maladie", message: "Maladie deleted"})
		}
	})
})
// Update Maladie / id
router.put("/:id", function(req, res){
	Maladie.findByIdAndUpdate(req.params.id, {
		$set: {
      name_Maladie : req.body.name_Maladie,
  		description: req.body.description,
  		photos:req.body.photos
		}
	},
	{
		new: true
	}, function(err, Maladie){
		if (err) {
			res.json({success: false, description: "Update Maladie", error: err})
		} else {
			res.json({success: true, description: "Update Maladie", message: "Maladie Maladie", data: Maladie})
		}
	})
})
// exporting
module.exports =router ;
