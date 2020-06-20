const User = require("../models/user")
const { validationResult }= require('express-validator');
const jwt = require('jsonwebtoken')
const expressJwt = require("express-jwt")
const cookieParser = require("cookie-parser")

exports.signup = (req,res)=>{

    
    const error = validationResult(req)
    // console.log(error)
    if(!error.isEmpty()){
        return res.status(422).json({
            error:error
        })  
    }
    const user = new User(req.body)

    user.save()
    .then(user=>{
        res.status(200).json({
            message:"User succesfully created."
        })
    })
    .catch(error=>{
        res.status(422).json({
            error:"error"
        })
    })

}


exports.signin = (req,res)=>{
    const error = validationResult(req)
    
    if(!error.isEmpty()){
        return res.status(422).json(error)
    }

    const {email,password} = req.body;
    // console.log(email+" "+password)

    User.findOne({email},(err,user)=>{
        if(err){
            console.log(err)
            return res.status(422).json({
                error:"Error in database"
            })
        }   
    
        if(!user){
            return res.status(404).json({
                error:"No user with email address"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password do not match"
            })
        }

        const token = jwt.sign({id:user._id,name:user.name,email:user.email,role:user.role},process.env.SECRET)
        res.cookie("token",token,{expire:new Date()+9999})
        const{ _id,name,email,role} = user;
        return res.json({token,user:{_id,name,email,role}})


    })
}


exports.signOut = (req,res)=>{
    res.clearCookie()
    res.json({
        message:"User Signed Out."
    })
}

//Is signed in method
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
})



//Middleware for is Authenticated
exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && (req.profile_id == req.auth._id)
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }

    next()
}

//Middleware for is Admin
exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        console.log("Not admin")
        res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next()
}