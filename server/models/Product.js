const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    keywords:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
    
    },
    stock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sellerid:{
        type:Number,
        required:true
    },
    details:{
        type:String,
    
    },
    options:{
        type:Array,
        required:true
    },
    
})
module.exports = mongoose.model("product",productSchema)