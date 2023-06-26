const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express")
const UserModel = require("../models/User.js")
const ProductModel = require("../models/Product.js")

const router = express.Router()

router.post("/register",async(req,res)=>{
    const {name,password} = req.body
    const user = await UserModel.findOne({name})

    if(user){
        return res.status(400).json({message:"Username already exist"})
    }
    
     const hashedPassword = await bcrypt.hash(password,10)
    
    const newUser = new UserModel({name,password:hashedPassword})
    await newUser.save()
    res.json({message:"user registered succesfully"})
})

router.post("/login",async (req,res)=>{
    const {name,password} = req.body
    const user = await UserModel.findOne({name})

    if(!user){
        return res.status(400).json({message:"Username or password is wrong"})

    }
    const isPassValid = bcrypt.compare(password,user.password)
    if(!isPassValid){
        return res.status(400).json({message:"Username or password is wrong"})
    }
    const token = jwt.sign({id:user._id},"secret")
    res.json({token,userID:user._id})
})

router.post("/basket",async (req,res)=> {
    const product = req.body.addBasketProduct
    const userID = req.body.userID

    await UserModel.updateOne(
        {_id:userID},
        {$push:{basket:product}}
    )

    const eben = await ProductModel.findOne({product})
    if(eben){

        res.status(200).json(product)
    }

})
router.get("/basket/:userID",async (req,res)=> {
    
        const userID = req.params.userID
        const result = await UserModel.findOne({_id:userID})
       
   res.status(200).json(result)
})
router.delete("/basket/:userID/:productID",async (req,res)=> {
    const userID = req.params.userID
    const productID = req.params.productID

    const result = await UserModel.updateOne({_id:userID},{$pull:{"basket":{_id:productID}}})
    res.status(200).json(result)
    console.log("silindi");

})



module.exports=router

