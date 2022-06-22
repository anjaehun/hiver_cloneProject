const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const reviewSchema = new mongoose.Schema({
    boardid : {
        type : Number,
        required : true,
    },
    reviewid : {
        type : Number,
    },
    review : {
        type : String,
        required : true,
    },
    tall : {
        type : Number,
        required : true,
    },
    option1 : {
        type : String,
    },
    date : {
        type : String,
    },
    img1 : {
        type :String,
    },    
    nickname : {
        type : String,
        required : true,
    }
});
reviewSchema.plugin(AutoIncrement, {inc_field: 'reviewid'});

reviewSchema.index({created : -1});

const Reviews = mongoose.model("Review", reviewSchema );


module.exports = { Reviews, reviewSchema };