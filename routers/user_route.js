'use strict';

var express = require("express");
var router = express.Router();
var user = require('./../models/user.js');
const async = require('async');


// Post new user
router.post("/", function(req, res, next){
	let new_user = new user({
		NomUtilisateur:req.body.NomUtilisateur,
		PrenomUtilisateur:req.body.PrenomUtilisateur,
		Date_Naissance:req.body.Date_Naissance,
		Num_tel:req.body.Num_tel,
		Adresse_email:req.body.Adresse_email,
		Region:req.body.Region,
		Mot_de_passe:req.body.Mot_de_passe,
		Avatar:req.body.Avatar
	})
	try{
		async.waterfall([
			(callback) => {
				User.findOne({email: req.body.email}, (err, user) => {
					if (err) {return next(err);}
					else if (user){
						res.json({success: false, description: 'post new user', message :'email allrady exist'})
					}
					else {
						callback();
					}
				})
			},
			(callback) => {
				new_user.save(function(err, user){
				  if (err) {
				    res.json({success: false, description: "Post new user", message: "user registration faled", error: err})
				  } else {
				   callback(null, user)
				  }
				})
			},
			(err, results) => {
				 res.json({success: true, description: "Post new user", message: "user registred", data: results})
			}
		])
	} catch (err) {
		console.error({
			success: true,
			description: "Post new user",
			error: err
		});
	}

})
// Get users
router.get("/", function(req, res){
	user.find(function(err, users){
		if (err) {
			res.json({success: false, description: "Get all users", error: err})
		} else {
			res.json({success: true, description: "Get all users", data: users})
		}
	})
})
// Get user by id

router.get("/:id", function(req, res){
	users.findOne({_id: req.params.id}, function(err, users){
		if (err) {
			res.json({success: false, description: "Get  user", error: err})
		} else {
			res.json({success: true, description: "Get  user", data: users})
		}
	})
})
// Delete user by id
router.delete("/:id", function(req, res){
	user.remove({_id: req.params.id}, function(err, done){
		if (err) {
			res.json({success: false, description: "Delete user", error: err})
		} else if(!done) {
			res.json({success: true, description: "Delete user", message: "user not deleted, try again"})
		} else {
			res.json({success: true, description: "Get new user", message: "user deleted"})
		}
	})
})
// Update user / id
router.put("/:id", function(req, res){
	user.findByIdAndUpdate(req.params.id, {
		$set: {
			NomUtilisateur:req.body.NomUtilisateur,
			PrenomUtilisateur:req.body.PrenomUtilisateur,
			Date_Naissance:req.body.Date_Naissance,
			Num_tel:req.body.Num_tel,
			Adresse_email:req.body.Adresse_email,
			Region:req.body.Region,
			Mot_de_passe:req.body.Mot_de_passe,
			Avatar:req.body.Avatar

		}
	},
	{
		new: true
	}, function(err, user){
		if (err) {
			res.json({success: false, description: "Update user", error: err})
		} else {
			res.json({success: true, description: "Update user", message: "user user", data: user})
		}
	})
})

// exporting
module.exports =router ;
