'use strict';
var User = require('./../models/user');
const config = require('../config/database');

// Exporting
// module.exports = (passport) => {
// 	let opts = {};
// 	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
// 	opts.secretOrKey = config.secret;
// 	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
// 		User.findOneById(jwt_payload._doc._id, (err, user) =>{
// 			if (err) {
// 				return done(err, false);
// 			} else if (user) {
// 				return done(null, user);
// 			} else {
// 				return done(null, false);
// 			}
// 		})
// 	}));
// }

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOneById(jwt_payload.sub, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));
