const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cartRouter = express.Router({ mergeParams: true });

const {Carts} = require("../models/");
const authMiddleware = require('../middlewares/authMiddleware');


cartRouter.post("/cart" ,authMiddleware,  async (req, res) => {
    // #swagger.tags = ["Board"]
    // #swagger.summary = "게시글 작성 페이지"
    // #swagger.description = "게시글 작성 페이지"
  try{
   
    const {title,enterprise,image1,option,totalprice,price} = req.body;
    const { nickname } = res.locals.user;
    
    console.log(nickname);
    
    const createdcarts = await Carts.create({title,enterprise,image1,option,totalprice,price});
  
      res.json({ boards: createdcarts });
    }catch(err){
      res.status(400).send({err: err.message});
    }
  
  });

  

module.exports = { cartRouter };