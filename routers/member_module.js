
'use strict';

var express = require("express");
var router = express.Router();
var User = require('./../models/user.js');
const async = require('async');
//m1
new_user.save(function(err, user){
  if (err) {
    res.json({success: false, description: "Post new user", message: "user registration faled", error: err})
  } else {
    res.json({success: true, description: "Post new user", message: "user registred", data: user})
  }
})
//mat2
exports.post_new_user= (req,res,next) => {
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
        if (err) {
    			res.json({success: false, description: "Post new user", message: "user registration faled", error: err})
    		} else {
    			res.json({success: true, description: "Post new user", message: "user registred", data: user})
    		}
      }
    ], (err, results) => {

    })
  }
   catch {
    console.error({

    };
  }
}
