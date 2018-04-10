'use strict';
var express = require("express");
var router = express.Router();
var family = require('./../models/family.js');
const async = require('async');
var multer =require("multer")
var upload = require('./../config/multerup');
var multerconf = require('./../config/multerup')
var passport = require("passport");


// Post new family
router.post("/",passport.authenticate('jwt', { session: false }), multer(multerconf).array('photos',5),(req, res, next) => {
	if (req.file){
		console.log(req.file);
		req.body.photos=req.file.filename;
	}
	let new_family = new family({
	parent:req.body.parent,
	name:req.body.name,
	description:req.body.description,
	photos:req.body.photos=req.file.filename,
	created:Date.now()
	})
	new_family.save(function(err, family){
		if (err) {
			res.json({success: false, description: "Post new family", message: "family registration faled", error: err})
		} else {
			res.json({success: true, description: "Post new family", message: "family registred", data: family})
		}
	})
})
// Get familys
router.get("/",passport.authenticate('jwt', { session: false }),function(req, res){
	family.find(function(err, familys){
		if (err) {
			res.json({success: false, description: "Get new family", error: err})
		} else {
			res.json({success: true, description: "Get new family", data: familys})
		}
	})
})
// Get family by id
router.get("/:Num_family",passport.authenticate('jwt', { session: false }),function(req, res){
	familys.findOne({Num_family: req.params.Num_family}, function(err, familys){
		if (err) {
			res.json({success: false, description: "Get new family", error: err})
		} else {
			res.json({success: true, description: "Get new family", data: familys})
		}
	})
})
// Delete family by id
router.delete("/:id", function(req, res){
	family.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete family", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete family", message: "family not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new family", message: "family deleted"})
		}
	})
})
// Update family / id
router.put("/:id", function(req, res){
	family.findByIdAndUpdate(req.params.id, {
		$set: {
      name_family : req.body.name_family,
  		description: req.body.description
		}
	},
	{
		new: true
	}, function(err, family){
		if (err) {
			res.json({success: false, description: "Update family", error: err})
		} else {
			res.json({success: true, description: "Update family", message: "family family", data: family})
		}
	})
})
// exporting
module.exports =router ;
