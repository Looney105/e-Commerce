const express = require("express")
const mongoose = require("mongoose")
const ProductModel = require("../models/Product.js")

const router = express.Router()

router.get("/", async (req,res) => {
    try {
        const result = await ProductModel.find({})
        res.status(200).json(result)
    }catch (err) {
        console.log(err);
    }
})

router.get("/recent",async (req,res)=> {
    try {
        const result = await ProductModel.find().limit(8).sort({$natural:-1})
        res.status(200).json(result)
        console.log(result);
    }catch(err){
        console.log(err);
    }
})

router.get("/discount",async (req,res) => {
    try {
        const result = await ProductModel.find().sort({discount:-1}).limit(8)
        res.status(200).json(result)
        console.log(result);
    }catch (err) {
        console.log(err);
    }
})

    const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

module.exports = router