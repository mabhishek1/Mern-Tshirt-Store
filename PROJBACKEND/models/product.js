const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
    },
    category:{
        type:String,
        // ref:"category",
        required:true

    },
    stock:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model('product',productSchema)