var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({

    title: {type: String},
    recipe_id: {type: Number},
    image_url: {type: String, default: "../../styles/img/martha.jpg"},
    publisher: {type: String},
    ingredients: [String],
    directions: [String],
    social_rank: {type: Number, default: 100},
    created_on: {type: Date, default: Date.now},
    updated_on: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Recipe", recipeSchema);
