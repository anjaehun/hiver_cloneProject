const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const boardsSchema = mongoose.Schema({
    // 물품 번호
    boardid: {
        type: Number,
    },
    // 상품명
    title: {
        type : String,
        required : true, 
    },
    // 메이커
    enterprise: {
        type: String,
        required : true,
    },
    // 내용
    content: {  
        type : String, 
    },
    // 가격
    price: {
        type: String,
        required: true,
    },
    // 할인율
    discountper: {
        type: String,
    },
    // 사이즈 옵션
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
    },
    
    // 이미지
    image1: {
        type : String, 
    },
    image2: {
        type : String, 
    },
    image3: {
        type : String, 
    },

} , 
    {
        timestamps: true, // 생성, 업데이트 시간 설정createAt updateAt

});
boardsSchema.plugin(autoIncrement, {
    inc_field: "boardid",
  });



const Boards = mongoose.model("Board", boardsSchema);


module.exports = { Boards, boardsSchema };