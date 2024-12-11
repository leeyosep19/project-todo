const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const authApi = require("./auth.api");
const productApi = require("./productApi");


router.use("/user",userApi);
router.use("/auth",authApi);
router.use("/product",productApi);      


module.exports = router;  