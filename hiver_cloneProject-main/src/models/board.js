const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const boardsSchema = mongoose.Schema({
    // 물품명
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
    //  1: 브랜드 2: 쇼핑몰  3: 럭셔리 4. 스포츠  5. 디지털 6. 라이프  
    category: {
        type : Number,
        required : true, 
    },
    // 이미지 1
    image1: {
        type : String, 
    },
     // 이미지 2
     image2: {
        type : String, 
    },
     // 이미지 3
     image3: {
         type : String, 
    },
    // 가격
    price: {
        type : Number, 
        required: true,
    },
    // 세일 %
    discountper: {
        type: String,
    },
    // 옵션
    option: {
        type: String,
    },
} , 
    {
        timestamps: true, // 생성, 업데이트 시간 설정

});
boardsSchema.plugin(autoIncrement, {
    inc_field: "boardid",
  });


  const Boards = mongoose.model("Board", boardsSchema);


  module.exports = { Boards, boardsSchema };