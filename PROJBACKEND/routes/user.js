const express = require("express")
const router = express.Router()
const {getUserById,getUser,updateUser,userPurchseList} = require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")

router.param("userId",getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUserById,getUser)

router.put("/user/:userId",isSignedIn,isAuthenticated,getUserById,updateUser)

router.get("/user/orders/:userId",isSignedIn,isAuthenticated,getUserById,userPurchseList)

module.exports = router