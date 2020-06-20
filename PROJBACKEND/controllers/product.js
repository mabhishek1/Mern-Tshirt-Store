
const Product = require("../models/product")
const formidable = require("formidable")
const fs = require("fs")
const uuid = require("uuid/v1");
const path = require("path")

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
        .exec((err,product)=>{
            if(err){
                return res.status(404).json({
                    "error":"Product not found/Db error"
                })
            }
            // console.log(product)
            req.product = product
            next()
        })
}


exports.createCategory = (req,res)=>{
    
    const form = formidable()
    // console.log(req)
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        console.log(files)
        if (err) {
          console.log(err)
          next()
          return;
        }
        // res.json({ fields, files });
        const product = new Product({
            name:fields.name,
            description:fields.description,
            price:fields.price,
            category:fields.category,
            stock:fields.stock,
            sold:fields.sold,
            photo:files.photo.path
        })                                                                                                                  
        console.log(product)
        product.save((err,product)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:"Error in db/Cannot save product"
                })
            }

            return res.json({
                message:"Product saved successfully"
            })
        })
            

      });
    form.on('fileBegin', function (name, file){
            file.name = uuid()+file.name
            file.path = "./files/"+uuid()+file.name;
    });

    // form.on('file', function (name, file){
    //     console.log('Uploaded ' + file.name);
    // });
}
exports.getAllProducts = (req,res)=>{
    Product.find({},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Cannot access Database"
            })
        }
        if(products){
            return res.json(products)
        }
    })
}

exports.getProduct = (req,res)=>{
    return res.json(req.product)
}

exports.getProductPhoto = (req,res)=>{
    // console.log(path.join(__dirname,"../"+req.product.photo))
    return res.sendFile(path.join(__dirname,"../"+req.product.photo))
}

exports.deleteProduct = (req,res)=>{
    fs.unlink(req.product.photo,(err)=>console.log(err))
    Product.deleteOne({_id:req.product._id})
        .exec((err)=>{
            if(err){
                return res.status(400).json({
                    error:"Cannot delete product"
                })
            }
            return res.json({
                message:"Product successfully deleted"
            })
        })
}


exports.updateProduct = (req,res)=>{
    fs.unlink(req.category.photo)
    const form = formidable()
    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ fields, files });
        const product = new Product(req.body)

        Product.findByIdAndUpdate(req.category._id,
            {$set:product},
            {new:true},
            (err,product)=>{
                if(err){
                    return res.status(400).json({
                        error:"Error in database"
                    }) 
                }

                return res.json(product)
            })

      });
    form.on('fileBegin', function (name, file){
            file.name = uuid()+file.name
            file.path = "./files/"+uuid()+file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

}