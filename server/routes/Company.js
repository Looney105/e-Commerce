
const express = require("express")
const mongoose = require("mongoose")
const CompanyModel = require("../models/Company.js")

const router = express.Router()

router.get("/name",async (req,res)=>{
   try {
    const result = await CompanyModel.find({})
    console.log(result);
    res.status(200).json(result)
   } catch (err) {
    console.log(err);
   }
})

module.exports = router