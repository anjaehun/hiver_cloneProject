// const dotenv = require('dotenv');
// dotenv.config();
// const express = require("express");
// const boardRouter = express.Router({ mergeParams: true });

// const {Boards} = require("../models/");
// const authMiddleware = require('../middlewares/authMiddleware');

// // 데이터 넣기 (CRUD 중 C(create))
// // 게시판에 글을 개시할 수 있다. 
// boardRouter.post("/board" ,authMiddleware,  async (req, res) => {
//   // #swagger.tags = ["Board"]
//   // #swagger.summary = "게시글 작성 페이지"
//   // #swagger.description = "게시글 작성 페이지"
// try{
//  // console.log("req.file: ", req.file);
//   //let payLoad = { url: req.file.location };
//   //console.log(payLoad)
//   const {category,title,content} = req.body;
//   const { nickname } = res.locals.user;
//    //const { a } = req.file.originalname;
 
//   //console.log(res.locals.user);
//   console.log(nickname);
//   //console.log("123"+a);
//   const createdBoards = await Boards.create({category,title,content,nickname });

//  //const makecount = await likeCounts.create({relation_target: "board", targetId : createdBoards.boardId, relationcount : 0});

//     res.json({ boards: createdBoards });
//   }catch(err){
//     res.status(400).send({err: err.message});
//   }

// });



// module.exports = { boardRouter };



const express = require("express");
const Board = require("../models/board");
// const Comment = require("../models/comment");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 상품 작성  authMiddleware
router.post("/api/board", async (req, res) => {
  try {
  // const { nickname } = res.locals.user;
  // console.log(nickname);
    const { title, enterprise, category,
            image1, image2, image3, price, discountper, option} = req.body;

    const createdBoards = await Board.create({
            title, enterprise, category,
            image1, image2, image3, price, discountper, option 
    });
      // console.log(createdBoards)
      res.json({ boards : createdBoards });
    } catch (err) {
      res.status(400).send({
        msg: "상품 작성 실패"
      })
    }
});

// 상품 전체 조회
router.get("/api", async (req, res) => {
  try {
    const boards = await Board.find({}, { boardid: 1, title:1, enterprise: 1, image1: 1, price: 1, discountper: 1})
    res.json ({ boards }) 
  } catch(err) {
    res.status(400).send({
      msg: "조회 실패"
    })
  }
});


// 상품 상세 조회
router.get("/api/board/:boardid", async (req, res) => {
  try {
    const { boardid } = req.params
    const existboards = await Board.find({ boardid }, { boardid: 1, title: 1, enterprise: 1, category: 1,
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
// router.delete("/api/board/:boardid", async (req, res) => {
//   try {
//     const { boardid } = req.params
//     const deleteboards = await Board.find({ boardid });
//     if (deleteboards.length > 0) {
//     await Board.deleteOne({ boardid })
//     }
//     return 
//   } catch(err) {
//     res.status(400).send({
//       errorMessage: "삭제 오류"
//     })
//   }
// }) 

module.exports = router;