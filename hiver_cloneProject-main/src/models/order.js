const { number } = require("joi");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const orderSchema = mongoose.Schema({
    // 게시판 번호 
    orderid:{ 
        type : Number, 
     },
     
    // 닉네임
    nickname: {
        type : String, 
        required : false,
    },

    // 주문끝
    pricefinal: {
        type : Number, 
        required : false,
    }
    
} , 
    {
        timestamps: true, // 생성, 업데이트 시간 설정createAt updateAt

});

    orderSchema.plugin(autoIncrement, {
        inc_field: "orderid",
    });

    const Orders = mongoose.model("Orders", orderSchema);

module.exports = { Orders, orderSchema };
 