const express = require("express")
const router = express.Router()

const { isSignedIn,isAuthenticated,isAdmin } = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {getCategoryById,createCategory,getCategory,getCategories,updateCategory,deleteCategory} = require("../controllers/category")

router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get("/category/getCategory/:categoryId",getCategory)
router.get("/category/getCategories",getCategories)
router.put("/category/updateCategory/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)
router.delete("/category/deleteCategory/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)

module.exports = router