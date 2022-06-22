const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const qnaSchema = new mongoose.Schema({
    boardid : {
        type : Number,
        required : true,
    },
    qnaid : {
        type : Number,
    },
    qna : {
        type : String,
        required : true,
    },
    condition : {
        type : Boolean,
        required : true,
    },
    recontent : {
        type : String,
    },
    date : {
        type : String,
    },    
    nickname : {
        type : String,
        required : true,
    }
});
qnaSchema.plugin(AutoIncrement, {inc_field: 'qnaid'});

qnaSchema.index({created : -1});

const Qnas = mongoose.model("Qna", qnaSchema );


module.exports = { Qnas, qnaSchema };