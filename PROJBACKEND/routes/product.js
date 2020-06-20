const express = require("express")
const router = express.Router()
const {getProductById,createCategory,getProduct,getProductPhoto,deleteProduct,getAllProducts} = require("../controllers/product")
const {getUserById} = require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")


router.param("userId",getUserById)
router.param("productId",getProductById)

router.post("/product/createProduct/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get("/product/getProduct",getAllProducts)
router.get("/product/getProduct/:productId",getProduct)
router.get("/product/photo/getPhoto/:productId",getProductPhoto)

router.delete("/product/delete/:userId/:productId",deleteProduct)



module.exports = router