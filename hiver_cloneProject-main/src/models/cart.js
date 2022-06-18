const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const cartsSchema = mongoose.Schema({
    // 게시판 번호 
    cartid:{ 
       type : Number, 
    },
    //제목
    title: {
        type : String,
        required : true, 
    },
    // 기업명
    enterprise: {  
        type : String, 
        required : true,
    },
    
    // 대표 이미지
    image1: {
        type : String, 
        required : false,
    },
    // 옵션 
    option: {
        type : String, 
        required : false,
    },
    // 총 값 가격 
    totalprice: {
        type : String, 
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
 