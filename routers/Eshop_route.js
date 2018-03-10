'use strict';
var express = require("express");
var router = express.Router();
var Eshop = require('./../models/Eshop.js');
const async = require('async');

// Post new Eshop
router.post("/", function(req, res){
	let new_Eshop = new Eshop({
    prix:req.body.prix,
date_ann:req.body.date_ann,
owner:req.body.owner,
bird:req.body.bird,
note:req.body.note


	})
	new_Eshop.save(function(err, Eshop){
		if (err) {
			res.json({success: false, description: "Post new Eshop", message: "Eshop registration faled", error: err})
		} else {
			res.json({success: true, description: "Post new Eshop", message: "Eshop registred", data: Eshop})
		}
	})
})
// Get Eshops
router.get("/", function(req, res){
	Eshop.find(function(err, Eshops){
		if (err) {
			res.json({success: false, description: "Get new Eshop", error: err})
		} else {
			res.json({success: true, description: "Get new Eshop", data: Eshops})
		}
	})
})
// Get Eshop by id
router.get("/:Num_Eshop", function(req, res){
	Eshops.findOne({Num_Eshop: req.params.Num_Eshop}, function(err, Eshops){
		if (err) {
			res.json({success: false, description: "Get new Eshop", error: err})
		} else {
			res.json({success: true, description: "Get new Eshop", data: Eshops})
		}
	})
})
// Delete Eshop by id
router.delete("/:id", function(req, res){
	Eshop.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete Eshop", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete Eshop", message: "Eshop not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new Eshop", message: "Eshop deleted"})
		}
	})
})
// Update Eshop / id
router.put("/:id", function(req, res){
	Eshop.findByIdAndUpdate(req.params.id, {
		$set: {
      prix:req.body.prix,
  date_ann:req.body.date_ann,
  owner:req.body.owner,
  bird:req.body.bird,
  note:req.body.note
		}
	},
	{
		new: true
	}, function(err, Eshop){
		if (err) {
			res.json({success: false, description: "Update Eshop", error: err})
		} else {
			res.json({success: true, description: "Update Eshop", message: "Eshop Eshop", data: Eshop})
		}
	})
})
// exporting
module.exports =router ;
