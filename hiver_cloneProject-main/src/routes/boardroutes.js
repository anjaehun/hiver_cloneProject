const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const boardRouter = express.Router({ mergeParams: true });
const multer = require('multer')
const upload = multer({dest: 'images/'}) //dest : 저장 위치


const {Boards} = require("../models/");
const authMiddleware = require('../middlewares/authMiddleware');

// 데이터 넣기 (CRUD 중 C(create)) authMiddleware, 
boardRouter.post("/board" , async (req, res) => {
  try {
    const { title, enterprise, category,
            image1, image2, image3, price, discountper, option} = req.body;

    const createdBoards = await Boards.create({
            title, enterprise, category, image1, image2, image3, price, discountper, option });
    res.json({ boards: createdBoards });
  }catch(err){
    res.status(400).send({err: err.message});
  }
});

// 상품 전체 조회
boardRouter.get("/", async (req, res) => {
  try {
    const boards = await Boards.find({}, { boardid: 1, title:1, enterprise: 1, image1: 1, price: 1, discountper: 1})
    return res.json ({ boards }) 
  } catch(err) {
    res.status(400).send({
      errorMessage: "조회 실패"
    })
  }
});


// 상품 상세 조회
boardRouter.get("/board/:boardid", async (req, res) => {
  try {
    const { boardid } = req.params
    const existboards = await Boards.find({ boardid }, { boardid: 1, title: 1, enterprise: 1, category: 1,
      image1: 1, image2: 1, image3: 1, price: 1, discountper: 1, option: 1});
    if (!existboards.length) {
      return res.status(400).json({ errorMessage: "상품 없음"});
    }
    return res.json({ existboards });
  } catch(err) {
    res.status(400).send({
      errorMessage: "오류 검출",
    })
  }
})


// 상품 삭제
boardRouter.delete("/board/:boardid", async (req, res) => {
  try {
    const { boardid } = req.params
    const deleteboards = await Board.find({ boardid });
    if (deleteboards.length > 0) {
    await Boards.deleteOne({ boardid })
    }
    return res.json({ success: true })
  } catch(err) {
    res.status(400).send({
      errorMessage: "삭제 오류"
    })
  }
}) 

boardRouter.post('/upload',upload.single('img'),(req,res) => {
  res.json(req.file)
  console.log(req.file)
})


module.exports = { boardRouter };

