const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    basket:{
        type:Array
    }
})

module.exports = mongoose.model("user",userSchema)