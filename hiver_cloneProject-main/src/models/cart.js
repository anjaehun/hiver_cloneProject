const { number } = require("joi");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const cartsSchema = mongoose.Schema({
    // 게시판 번호 
    boardid:{ 
        type : Number, 
     },
     cartid:{
        type : Number,
     },
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
        type : String, 
        required: true,
    },
    // 세일 %
    discountper: {
        type: String,
    },
    // 총 값 가격 
    totalprice: {
        type : Number, 
        
    },
    // cart수량 
    quantity: {
        type : Number, 
        required : false,
    },
    // 닉네임
    nickname: {
        type : String, 
        required : false,
    }
    
    
} , 
    {
        timestamps: true, // 생성, 업데이트 시간 설정createAt updateAt

});

cartsSchema.plugin(autoIncrement, {
    inc_field: "cartid",
  });

const Carts = mongoose.model("Carts", cartsSchema);




module.exports = { Carts, cartsSchema };
 