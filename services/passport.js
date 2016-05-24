var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/usersModel');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  User.findOne({ username: username })
  .exec(function(err, user) {
    console.log("I am this guy: ", user);
    if(err) done(err);
    if(!user) return done(null, false, {message: 'Incorrect username.'});
    if(!user.verifyPassword(password)) {
      return done(null, false, {message: 'Incorrect password.'});
    }
    else {
    console.log("this guy: ", user);
    return done(null, user);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
