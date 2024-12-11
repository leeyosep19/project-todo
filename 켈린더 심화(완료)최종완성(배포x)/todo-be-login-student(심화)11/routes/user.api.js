const express = require("express");
const router = express.Router();
const usercontroller = require("../Controller/user.controller");


//회원가입 

router.post("/",usercontroller.createUser);

router.post("/login",usercontroller.loginWithEmail);



module.exports = router;
