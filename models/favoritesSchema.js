var mongoose = require("mongoose");

var favoritesSchema = new mongoose.Schema({

    recipe: {type: mongoose.Schema.Types.ObjectId, ref: "Recipe"},

});

module.exports = favoritesSchema;
