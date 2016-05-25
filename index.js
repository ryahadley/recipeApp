//external modules
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var keys = require('./keys');
var mongoose = require('mongoose');
var passport = require('passport');
var Facebook = require('passport-facebook').Strategy;
var request = require('request');
var http = require('http');

//controllers
var recipeCtrl = require('./controllers/recipeCtrl');
var userCtrl = require('./controllers/userCtrl');
var searchCtrl = require('./controllers/searchCtrl');
var User = require("./models/usersModel.js");

//services
var localPassport = require('./services/passport');

// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

//express
var app = express();

mongoose.set('debug', true);

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: keys.session_secret,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(localPassport.initialize());
app.use(localPassport.session());
app.use(express.static(__dirname + '/public'));

//recipes
app.get('/api/recipes', recipeCtrl.Read);
app.get('/api/yourRecipes', recipeCtrl.Yours);
app.post('/api/recipes', recipeCtrl.Create);
app.put('/api/recipes/:id', recipeCtrl.Update);
app.delete('/api/recipes/:id', recipeCtrl.Delete);
app.post('/api/make', recipeCtrl.Make);

app.get('/allRecipes/:id', recipeCtrl.getRecipes);
app.get('/ingredients/:id', recipeCtrl.getIngredients);

//search
app.post('/api/searchTerm', searchCtrl.SearchCount);
app.get('/api/searches', searchCtrl.Searches);

//user
app.get('/api/user', userCtrl.Read);
app.get('/api/allrecipes', userCtrl.Recipes);
app.delete('/api/user/:id', userCtrl.Delete);
app.post('/api/user/addtofavorites/:id', userCtrl.AddRecipeToFavorites);
app.put('/api/user/removefromfavorites/:id', userCtrl.RemoveRecipeFromFavorites);
app.put('/api/user/addFridge', userCtrl.FridgeAdd);
app.put('/api/user/removeFridge', userCtrl.FridgeRemove);


app.post('/api/user', userCtrl.register);
app.get('/api/me', isAuthed, userCtrl.me);
app.put('/api/users/:_id', isAuthed, userCtrl.update);

app.post('/api/login', localPassport.authenticate('local', {
  successRedirect: '/#/home',
  failureRedirect: '/#/signIn'
}));
app.get('/api/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});

//passport
passport.use(new Facebook({
  clientID: keys.clientID,
  clientSecret: keys.clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback/'
}, function(token, refreshToken, profile, done) {

    User.findOne({'userId': profile.id}, function(err, response) {
      if(err) {
        return done(err);
      }
      if(!response) {
        var newUser = new User({
          userId: profile.id,
          name: profile.displayName
        });
        newUser.save(function(err, response) {
          if(err) return done(err);
          return done(response);
        })
      }
      else{
        return done(response);
      }

    })
    console.log('token', token);
    console.log('profile', profile);
    return done(null, profile);
}))

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: 'http://localhost:3000/#/home',
  failureRedirect: 'http://localhost:3000/#/login'
}));

passport.serializeUser(function(user, done) {
  //go to mongo get _id for user, put that on session
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //get data off of session (see serializeUser)
  done(null, obj);
  //put it on req.user in EVERY ENDPOINT
});

//mongoose
mongoose.connect('mongodb://localhost/recipes', function(err) {
  if (err) throw err;
});
mongoose.connection.once('open', function(){
    console.log('Connected to mongodb\n');
});


app.listen(keys.serverPort, function() {
  console.log('listening on port, ', keys.serverPort);
});
