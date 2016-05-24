var User = require("../models/usersModel.js");
var Recipe = require("../models/recipeModel.js");

module.exports = {

    register: function(req, res, next) {
      User.create(req.body, function(err, result) {
        if(err) return res.status(500).send(err);
        newUser = result.toObject();
        newUser.password = null;
        res.status(200).json(newUser);
      });
    },

    me: function(req, res, next) {
      if (!req.user) return res.status(401).send('current user not defined');
      req.user.password = null;
      return res.status(200).json(req.user);
    },

    update: function(req, res, next) {
      User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
        if (err) next(err);
        res.status(200).send('user updated');
      });
    },

    //using a populate to see the recipes information in the users favorites
    Read: function(req, res, next){
        User.find()
            .populate({path: 'favorites.recipe'})
            .exec(function(err, response){
            if(err){
                res.status(500).json(err);
            }else{
                delete response.password;
                res.status(200).json(response);
            }
        })
    },

    //using a populate to see the recipes information in the users favorites
    ReadId: function(req, res, next){
        User.findOne(req.user.id).populate({path: 'favorites.recipe'}).exec(function(err, response){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(response);
            }
        })
    },

    Delete: function(req, res, next){
        User.findByIdAndRemove(req.params.id, function(err, response){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(response);
            }
        })
    },

      Recipes: function(req, res, next) {
        User.findById(req.user._id).populate({path: 'favorites.recipe'}).exec(function(err, response) {
          if(err) {
            res.status(500).json(err);
          }
          res.status(200).json(response);
        })
      },

      FridgeAdd: function(req, res, next) {
        User.findOneAndUpdate({_id: req.user._id}, {$addToSet: {'inFridge': req.body}}, function(err, response) {
          if(err) {
            console.log("huh", err);
            res.status(500).json(err);
          }
          res.status(200).json(response);
        })
      },

      FridgeRemove: function(req, res, next) {
        User.findOneAndUpdate({_id: req.user._id}, {$pull: {'inFridge': req.body}}, function(err, response) {
          if(err) {
            res.status(500).json(err);
          }
          res.status(200).json(response);
        })
      },

    //first we have to find the user by their id, then we add the recipe id given to us through the req.body and add that on the the users current favorites. then we update the users information with the updated favorites.
    AddRecipeToFavorites: function(req, res, next){
        console.log(req.params.id);
        Recipe.findOne({'recipe_id': req.params.id}, function(err, response) {
          if(err) {
            return res.status(500).json(err);
          }
          else if(!response) {
            return res.status(500).json(err);
          }
          else {
            console.log("what are you:", response);
            var recipeId = response._id;
          }
        User.findOneAndUpdate({_id: req.user._id}, {$addToSet: {'favorites': {'recipe': recipeId}}}, function(err1, response1) {
          if(err) {
            console.log(err1);
            return res.status(500).json(err1);
          }
          else {
            console.log('ryan', response1);
            return res.status(200).json(response1);
          }
        })
      })
    },

    //first we find the user by their id, then we loop through their favorites until we find the matching id of the one we want to remove, we splice it out (favorites.recipes is an array) and update the users favorites with the new array.
    RemoveRecipeFromFavorites: function(req, res, next){
        console.log(req.params.id);
        Recipe.findOne({'recipe_id': req.params.id}, function(err, response) {
          if(err) {
            console.log("err", err);
            return res.status(500).json(err);
          }
          else {
            console.log("res", response);
            var recipeId = response._id;
          }
        User.findOneAndUpdate({_id: req.user._id}, {$pull: {'favorites': {'recipe': recipeId}}}, function(err1, response1) {
          if(err1) {
            console.log("err1", err1);
            return res.status(500).json(err1);
          }
          else {
            return res.status(200).json("res1", response1);
          }
        })
      })
    },

}
