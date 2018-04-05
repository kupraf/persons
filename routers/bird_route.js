
'use strict';

var express = require("express");
var router = express.Router();
var bird = require('./../models/bird.js');
const async = require('async');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require('./../config/database');
var passport = require("passport");
var multer =require("multer")
var upload = require('./../config/multerup');
var multerconf = require('./../config/multerup')


// Post new bird mat1

router.post("/", passport.authenticate('jwt', { session: false }), multer(multerconf).single('avatar'),(req, res, next) => {

	if (req.file){
		console.log(req.file);
		req.body.avatar=req.file.filename;
	}
	let new_bird = new bird({
		ring: req.body.ring,
		name: req.body.name,
		family: req.body.family,
		birth: req.body.birth,
		description: req.body.description,
	//	avatar: req.file.avatar,
		parent: req.body.parent,
		owner: req.user._id
	})
	console.log(file);
	new_bird.save(function(err, bird){
		if (err) {
			res.json({success: false, description: "Post new bird", message: "bird registration faled", error: err})
		} else {
			res.json({success: true, description: "Post new bird", message: "bird registred", data: bird})
		}
	})

})
//upload photos
router.put("/photos", function(req, res){
	bird.findByIdAndUpdate(req.params.id, {
		$set: {
			photos:req.files.photos
		}
	},
	{
		new: true
	}, function(err, bird){
		if (err) {
			res.json({success: false, description: " photos ajouter", error: err})
		} else {
			res.json({success: true, description: "photos ajouter", message: "photo ajouter ", data: bird})
		}
	})
})
// Get birds
router.get("/",passport.authenticate('jwt', { session: false }), function(req, res){console.log(req.user._id)
	bird.find()
	// .select('id_pere id_mere')
	// .populate({
	// 	path: 'male',
	// 	module: 'couple',
	// 	select: 'ring',
	// 	populate: {
	//
	// 	}
	// })
	// .populate({
	// 	path: 'female',
	// 	module: 'couple',
	// 	select: 'ring'
	// })
	.exec(function(err, birds){
		if (err) {
			res.json({success: false, description: "Get new bird", error: err})
		} else {
			res.json({success: true, description: "Get new bird", data: birds})
		}
	})
})
// Get bird by id
router.get("/:id", function(req, res){
	birds.findOne({_id: req.params.id}, function(err, birds){
		if (err) {
			res.json({success: false, description: "Get new bird", error: err})
		} else {
			res.json({success: true, description: "Get new bird", data: birds})
		}
	})
})
// Delete bird by id
router.delete("/:id", function(req, res){
	bird.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete bird", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete bird", message: "bird not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new bird", message: "bird deleted"})
		}
	})
})
// Update bird / id
router.put("/:id", function(req, res){
	bird.findByIdAndUpdate(req.params.id, {
		$set: {
			ring: req.body.ring,
			name: req.body.name,
			family: req.body.family,
			birth: req.body.birth,
			description: req.body.description,
			Photo: req.body.Photo,
			parent: req.body.parent
		}
	},
	{
		new: true
	}, function(err, bird){
		if (err) {
			res.json({success: false, description: "Update bird", error: err})
		} else {
			res.json({success: true, description: "Update bird", message: "bird bird", data: bird})
		}
	})
})
//end bird
// exporting
module.exports =router ;
