var mongoose = require("mongoose");
var Search = require('../models/searchesSchema.js');

module.exports = {

SearchCount: function(req, res , next) {
  Search.findOne({title: req.body.title}, function(err, response) {
    if(err) {
      console.log('lll', err);
      res.status(500).json(err);
    }
    else if (response) {
      console.log('!!', response);
      Search.findOneAndUpdate({title: req.body.title}, {$inc: {count: 1}}, function(err, response) {
        if(err) {
          console.log('nope', err);
        }
        console.log('yep', response);
        return response;
      })

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

  Searches: function(req, res, next) {
    Search.find({count: {$gt: 3}}, function(err, response) {
      if(err) {
        console.log(err);
      }
      else {
        console.log(response);
      }
    }).limit(20).exec(function(err, response) {
      if(err) {
        console.log(err)
        return res.status(500).json(err);
      }
      else {
        console.log(response);
        return res.status(200).json(response);
      }
    })
  }

}
