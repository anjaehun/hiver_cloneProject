const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const reviewRouter = express.Router({ mergeParams: true }); //상위라우터의 파라미터가 필요해서 넣어놓음!
const { Comments, Users, Boards,likeCounts } = require('../models/');
const moment = require('moment');

//review작성
reviewRouter.post('/board/:boardid/review', async (res, res) => {
    const { boardid } = req.parmas;
    const { review, tall, option, img } = 
    const date = moment().add('9','h').format('YYYY-MM-DD HH:mm:ss');
    res.send({});
});
