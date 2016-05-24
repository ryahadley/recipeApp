var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var favoritesSchema = require("./favoritesSchema.js");

var User = new mongoose.Schema({

    name: {type: String},
    userId: {type: Number},
    username: {type: String, unique: true, index: true, trim: true },
    password: {type: String},
    inFridge: [],
    favorites: [favoritesSchema]

});

User.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model("User", User);
