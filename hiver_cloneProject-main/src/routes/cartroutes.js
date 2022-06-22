const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cartRouter = express.Router({ mergeParams: true });

const {Carts,Boards,Users,Orders} = require("../models/");
const authMiddleware = require('../middlewares/authMiddleware');
const e = require('express');

// 장바구니 등록! 
cartRouter.post("/board/:boardid/cart/",authMiddleware, async (req, res) => {
  try {
  const { boardid,cartid } = req.params;
  const { quantity,totalprice } = req.body;
  const { nickname } = res.locals.user;
  let [board] = await Boards.find({ boardid });
  
  //board 콘솔 테스트 (필요할때 주석 지우고 쓸것 )
  //console.log(board.title);console.log(board.enterprise);console.log(board.image1);
  //console.log(board.discountper); console.log(totalprice);
             
  isBasket  = await Boards.find({ boardid},{});
   console.log(isBasket)
  if (isBasket.length) {
    await Carts.updateOne({ boardid,nickname }, { $set: { quantity,totalprice } });
  } else {
    await Carts.create({boardid},{  boardid:boardid,cartid, 
                         // param 값 
                          nickname    :   nickname, 
                          title       :   board.title, 
                          enterprise  :   board.enterprise,
                          discountper :   board.discountper,
                          image1      :   board.image1, 
                          option      :   board.option,
                          price       :   board.price, 
                          });
  }
  res.send({ result: "마이페이지 카트 목록이 저장되었습니다." });
  }catch(err){
    res.status(400).send({err: err.message});
  }
});

// 데이터 목록 보기 (CRUD 중 R(read))
// 데이터 전체를 볼 수 있다. 
cartRouter.get("/cart",authMiddleware, async (req, res) => {
  // #swagger.tags = ["Board"]
  // #swagger.summary = "게시글 전체 조회 페이지"
  // #swagger.description = "게시글 전체 조회 페이지"
  try {
  const { nickname } = res.locals.user;
  let [cart] = await Carts.find({ nickname });
  console.log(nickname)
  
  if(!nickname){
    return res.status(400).json({success: false, errorMessage: "로그인 후 사용하세요"});
  }
  
  // if(board){
  //   return res.status(400).json({success: false, errorMessage: "장바구니를 등록해주세요"});
  // } 

  const cartList = await Carts.find({nickname:nickname})
 
  res.status(200).json({ success:true, message: "게시글들을 불러왔습니다.",cartList });
  }catch(err){
    res.status(400).send({err: err.message});
  }
});

// 주문 하기 
cartRouter.post("/order/:totalprice",authMiddleware, async (req, res) => {
  try {
  const { totalprice } = req.params;
  const { nickname } = res.locals.user;
  
  if(nickname.langth > 0){
    await Orders.create({orderid,nickname:nickname,totalprice:totalprice});
  }
  
  // await Orders.create({boardid:boardid,cartid, 
   
  //    });
  res.send({ result: "주문이 완료되었어요!" });
  }catch(err){
    res.status(400).send({err: err.message});
  }
});


module.exports = { cartRouter };