const express = require("express")
const { check,validationResult }= require('express-validator');
const router = express.Router();


const {signup,signin,isSignedIn,signOut} = require("../controllers/auth")


router.post("/signup",
    [
        check('email').isEmail().withMessage("Enter valid email"),
        check('password').isLength({min:5}).withMessage("Enter valid password")
    ],
signup)


router.post("/signin",
    [
        check('email').isEmail().withMessage("Enter valid email"),
        check('password').isLength({min:5}).withMessage("Enter valid password")
    ],
signin)

router.get("/signout",signOut)



module.exports = router