const express=require("express");
const router=express.Router();
const passport=require("passport");

const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsyc.js");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller=require("../controllers/users.js");

router.get("/signup",usercontroller.renderSignup);
router.post("/signup",wrapAsync(usercontroller.signup));
router.get("/login",usercontroller.renderlogin);
router.post("/login",saveRedirectUrl, passport.authenticate("local" ,{
    failureRedirect:"/login",
    failureFlash:true,
}),
usercontroller.login
);
router.get("/logout",usercontroller.logout
);
module.exports=router;