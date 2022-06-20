const moogoose = require("mongoose");
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);
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
    option : {
        type : String,
    },
    date : {
        type : String,
    },
    img1 : {
        String,
    },    
});
reviewSchema.plugin(AutoIncrement, {inc_field: 'reviewid'});

reviewschema.index({created : -1});

module.exports = mongoose.model("Review", reviewSchema);

