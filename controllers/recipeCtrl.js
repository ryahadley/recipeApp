var Recipe = require("../models/recipeModel.js");
var mongoose = require("mongoose");
var newRecipe = new Recipe;
var http = require('http');
var request = require('request');
var keys = require('../keys');
newRecipe.created_on = Date.now();
newRecipe.save();

module.exports = {

    Create: function(req, res, next){
      Recipe.findOne({'recipe_id': req.body.recipe_id}, function(err, response) {
        if(err) {
          return res.status(500).json(err);
          next();
        }
        if(!response && req.body.title) {
          var newRecipe = new Recipe(req.body);
          newRecipe.save(function(err, response){
              if(err){


                  res.status(500).json(err);
              }else{

                  res.status(200).json(response);
              }
          })
        }
        else {

          res.status(200).json(response);
        }
      })
    },

    Make: function(req, res, next) {
      var make = new Recipe(req.body);
      req.body.publisher = req.user.name;
      make.save(function(err, response) {
        if(err) {


            res.status(500).json(err);
        }else{

            res.status(200).json(response);
        }
      })
    },

    Yours: function(req, res, next) {
      Recipe.find({'publisher': req.user.username}, function(err, response) {
        if(err) {

          return res.status(500).json(err);
        }
        else {

          return res.status(200).json(response);
        }
      })
    },

    Read: function(req, res, next){
        Recipe.find().exec(function(err, response){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(response);
            }
        })
    },

    Update: function(req, res, next){
        Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, response){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(response);
            }
        })
    },

    Delete: function(req, res, next){
        Recipe.findByIdAndRemove(req.params.id, function(err, response){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(response);
            }
        })
    },

    SearchCount: function(req, res , next) {
      Search.findOne({'title': req.body}, function(err, response) {
        if(err) {

          res.status(500).json(err);
        }
        else if (response) {

          response.count ++;
        }
        else if (!response) {
          Search.create(req.body, function(err, response) {
            if(err) {
              return res.status(500).json(err);
            }
            return res.status(200).json(response);
          })
        }
      })
    },


    getRecipes: function (req, res, next) {

      request('http://food2fork.com/api/search?key=' + keys.apiKey + '&q=' + req.params.id, function (error, response, body) {
      if(error) {

        return res.status(500).json(err);
      }

      if (!error && response.statusCode == 200) {

      }
      var parsed = JSON.parse(body);


      res.status(200).json(parsed);
      })
    },

    getIngredients: function(req, res, next) {
      request('http://food2fork.com/api/get?key=' + keys.apiKey + '&rId=' + req.params.id, function(error, response, body) {
        if(error) {

          return res.status(500).json(err);
        }
        // if (!error && response.statusCode == 200) {
        //
        // }
        var parsed = JSON.parse(body);


        res.status(200).json(parsed);
      })
    }

  }
