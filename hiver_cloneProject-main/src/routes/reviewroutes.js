const dotenv = require('dotenv');
dotenv.config()
const express = require("express");
const reviewRouter = express.Router({ mergeParams: true }); //상위라우터의 파라미터가 필요해서 넣어놓음!
const { Reviews, Users, Boards } = require('../models/');
const moment = require('moment');
const authMiddleware = require('../middlewares/authMiddleware');

// review 작성
reviewRouter.post('/board/:boardid/review', authMiddleware, async (req, res) => {
    try {
        const { boardid } = req.params;
        const { nickname } = res.locals.user;
        const { review, tall, option } = req.body;
        const date = moment().add('9','h').format('YYYY-MM-DD HH:mm:ss');
        console.log("지나갑니다")
        const findBoard = await Boards.find({ boardid });
        console.log(findBoard)
        const findUser = await Users.find({ nickname });
        console.log(findUser)
        
        
        if(!findUser) {
            return res.status(400).json({ sucess: false, msg : "로그인 후 사용하세요."});
        };
        if((!review) || (!tall) || (!option)) {
            return res.status(400).json({ sucess: false, msg : "리뷰,키,옵션을 입력해주세요."});
        };

        const createReview = await Reviews.create({ boardid, nickname, review, tall, option, date: date.split(' ')[0]})
        console.log(createReview)
        res.status(200).json({ createReview, success: true, msg: "리뷰를 작성하였습니다."});

    } catch (err) {
        return res.status(500).json({ err : err.message})
    } 
    
});

// review 조회

reviewRouter.get('/board/:boardid/review', async (req,res) => {
    try {
        const { boardid } = req.params;
        const reviews = await Reviews.find({ boardid });
        res.status(200).json({ success: true, reviews});
    } catch (err) {
        return res.status(500).json({ err : err.message });
    };
});

// review 수정

reviewRouter.put('/board/:boardid/review/:reviewid', authMiddleware, async (req,res) => {
    try {
        const { boardid, reviewid } = req.params;
        const { review, tall, option } = req.body;
        const { nickname } = res.locals.user;
        console.log(nickname)
        const detail = await Reviews.findOne({ reviewid: Number(reviewid) })
        console.log(detail.nickname)
        if(!reviewid&&boardid) {
            return res.status(400).json({ success : false, msg : "해당 상품에 대한 리뷰가 아닙니다."})
        }
        if((!review) || (!tall) || (!option)) {
            return res.status(400).json({ success: false, msg : "리뷰,키,옵션을 입력해주세요."});
        };
        if(!reviewid) {
            return res.status(400).json({ success: false, msg : "리뷰를 작성해 주세요."});
        };
        if(nickname !== detail.nickname) {
            return res.status(400).json({ success: false, msg: "자신의 리뷰가 아닙니다."});
        };
        // console.log(`닉네임은 ${nickname}입니다.`)
        // console.log(reviewsearch.nickname)
        await Reviews.updateOne({ reviewid : Number(reviewid) }, { $set: { review, tall, option }});
            res.status(200).json({ success: true, msg : "수정되었습니다."});

    } catch (err) {
        return res.status(500).send({ err: err.message })
    }
});

// review 삭제

reviewRouter.put('/board/:boardid/review/:reviewid', authMiddleware, async (req,res) => {
    try {
        const { boardid, reviewid } = req.params;
        const { nickname } = res.locals.user;
        console.log(nickname)
        const detail = await Reviews.findOne({ reviewid: Number(reviewid) })
        console.log(detail.nickname)
        if(!reviewid&&boardid) {
            return res.status(400).json({ success : false, msg : "해당 상품에 대한 리뷰가 아닙니다."})
        }
        if(!reviewid) {
            return res.status(400).json({ success: false, msg : "해당리뷰가 없습니다."});
        };
        if(nickname !== detail.nickname) {
            return res.status(400).json({ success: false, msg: "자신의 리뷰가 아닙니다."});
        };
        // console.log(`닉네임은 ${nickname}입니다.`)
        // console.log(reviewsearch.nickname)
        await Reviews.deleteOne({ reviewid : Number(reviewid) });
            res.status(200).json({ success: true, msg : "삭제되었습니다."});

    } catch (err) {
        return res.status(500).send({ err: err.message })
    }
});
module.exports = { reviewRouter };