const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const boardRouter = express.Router({ mergeParams: true });

const {Boards} = require("../models/");
const authMiddleware = require('../middlewares/authMiddleware');

// 데이터 넣기 (CRUD 중 C(create))
// 게시판에 글을 개시할 수 있다. 
boardRouter.post("/board" ,authMiddleware,  async (req, res) => {
  // #swagger.tags = ["Board"]
  // #swagger.summary = "게시글 작성 페이지"
  // #swagger.description = "게시글 작성 페이지"
try{
 // console.log("req.file: ", req.file);
  //let payLoad = { url: req.file.location };
  //console.log(payLoad)
  const {category,title,content} = req.body;
  const { nickname } = res.locals.user;
   //const { a } = req.file.originalname;
 
  //console.log(res.locals.user);
  console.log(nickname);
  //console.log("123"+a);
  const createdBoards = await Boards.create({category,title,content,nickname });

 //const makecount = await likeCounts.create({relation_target: "board", targetId : createdBoards.boardId, relationcount : 0});

    res.json({ boards: createdBoards });
  }catch(err){
    res.status(400).send({err: err.message});
  }

});



module.exports = { boardRouter };