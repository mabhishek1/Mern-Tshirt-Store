const User = require("../models/user")
const Order = require("../models/order").order

exports.getUser = (req,res)=>{

    // console.log(req.profile)
    req.profile.encry_password = undefined
    req.profile.salt = undefined
    req.profile.updatedAt = undefined
    req.profile.createdAt = undefined
    // console.log(req.profile)
    return res.json({
        user:req.profile
    })
}


exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(req.profile._id,
        { $set:req.body },
        {new:true},
        (err,user)=>{
            if(err){
                return res.status(500).json({
                    message:"Error in database"
                })
            }

            if(!user){
                return res.status(400).json({
                    message:"Unauthorised access"
                })
            }
            user.encry_password = undefined
            user.salt = undefined
            user.updatedAt = undefined
            user.createdAt = undefined
            res.json(user)

        }
    )
}

exports.userPurchseList = (req,res)=>{
    Order.find({user:req.profile._id})
        .populate("user","_id name")
        .exec((err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"No order/Error in DB"
                })

            }

            return res.json(order)
        })
}



//Middleware
exports.getUserById = (req,res,next,id)=>{
    console.log("hii")
    User.findById(id,(err,user)=>{
        if(err || !user){
            return res.status(503).json({
                error:"Database error/User Not found"
            })
        }

        if(!user){
            return res.status(422).json({
                error:"User Not found"
            })
        }

        if(user){
            // console.log(user)
            req.profile = user
        }
        next()
    })
}



exports.pushOrderInPurchaseList = (req,res,next)=>{
    let purchases = []
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.dexcription,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        })
    })

    User.findOneAndUpdate({_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,purchase)=>{
            if(err){
                return res.status(400).json({
                    error:"Unable to save purchase list"
                })
            }
        }
        )
    next()
}