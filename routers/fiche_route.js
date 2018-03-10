'use strict';
var express = require("express");
var router = express.Router();
var fiche = require('./../models/fiche.js');
const async = require('async');

// Post new fiche
router.post("/", function(req, res){
	let new_fiche = new fiche({
		name_fiche : req.body.name_fiche,
		description: req.body.description,
		photo:req.body.photo


	})
	new_fiche.save(function(err, fiche){
		if (err) {
			res.json({success: false, description: "Post new fiche", message: "fiche registration faled", error: err})
		} else {
			res.json({success: true, description: "Post new fiche", message: "fiche registred", data: fiche})
		}
	})
})
// Get fiches
router.get("/", function(req, res){
	fiche.find(function(err, fiches){
		if (err) {
			res.json({success: false, description: "Get new fiche", error: err})
		} else {
			res.json({success: true, description: "Get new fiche", data: fiches})
		}
	})
})
// Get fiche by id
router.get("/:Num_fiche", function(req, res){
	fiches.findOne({Num_fiche: req.params.Num_fiche}, function(err, fiches){
		if (err) {
			res.json({success: false, description: "Get new fiche", error: err})
		} else {
			res.json({success: true, description: "Get new fiche", data: fiches})
		}
	})
})
// Delete fiche by id
router.delete("/:id", function(req, res){
	fiche.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete fiche", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete fiche", message: "fiche not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new fiche", message: "fiche deleted"})
		}
	})
})
// Update fiche / id
router.put("/:id", function(req, res){
	fiche.findByIdAndUpdate(req.params.id, {
		$set: {
      name_fiche : req.body.name_fiche,
  		description: req.body.description
		}
	},
	{
		new: true
	}, function(err, fiche){
		if (err) {
			res.json({success: false, description: "Update fiche", error: err})
		} else {
			res.json({success: true, description: "Update fiche", message: "fiche fiche", data: fiche})
		}
	})
})
// exporting
module.exports =router ;
