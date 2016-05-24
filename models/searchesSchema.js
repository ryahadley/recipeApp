var mongoose = require("mongoose");

var search = new mongoose.Schema({

    title: {type: String},
    count: {type: Number, default: 1}

});

module.exports = mongoose.model("Search", search);
