const Category = require("../models/category")

//Middleware
exports.getCategoryById = (req,res,next,id)=>{
    
    Category.findById(id,(err,cate)=>{
        if(err){
            return res.send(404).json({
                error:"Database error/Category not found"
            })
        }
        
        req.category = cate
        next()
    })

    
}

// exports.test = (req,res,next)=>{
//     console.log("Test"+req.profile)
//     console.log("Test"+req.category)
//     next()
// }

exports.deleteCategory = (req,res)=>{
    Category.deleteOne({_id:req.category._id},
        (err)=>{
            if(err){
                return res.status(400).json({
                    error:"Category not deleted"
                })
            }
            return res.json({
                message:"Category deleted"
            })
        })
}


exports.updateCategory = (req,res)=>{
    Category.findByIdAndUpdate(req.category.id,
        {$set:req.body},
        {new:true},
        (err,category)=>{
            if(err){
                return res.status(404).json({
                    error:"Error in db/Category not updated"
                })
            }

            return res.json(category)

        })
}


exports.getCategory = (req,res)=>{
    // console.log("Method")
    return res.json(req.category)
}


exports.getCategories = (req,res)=>{
    Category.find((err,categories)=>{
        if(err){
            return res.status(404).json({
                error:"Error in database/Categories not found"
            })
        }

        return res.json(categories)
        
    })
}


exports.createCategory = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Error in database/Could not create category"
            })
        }
        return res.json(category)
    }) 
}

