const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps:true})


userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(this._password)
})
.get(function(){
    return this._password
})


userSchema.methods = {
    securePassword:function(plainPassword){
        // console.log(plainPassword)
        if(!plainPassword){
            return ""
        }
        try{
            // console.log(crypto.createHmac('sha256', this.salt)
            // .update([plainPassword])
            // .digest('hex'))
             return crypto.createHmac('sha256', this.salt)
                    .update(plainPassword)
                    .digest('hex')
        }catch(error){
            // console.log(error)
            return ""
        }
    },
    authenticate:function(plainPassword){
        if(this.securePassword(plainPassword) === this.encry_password){
            return true
        }
        return false;
    }
}



module.exports = mongoose.model('user',userSchema)