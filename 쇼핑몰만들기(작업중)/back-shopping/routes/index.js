const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const authApi = require("./auth.api");
const productApi = require("./productApi");
const cartApi= require("./cart.api");
const OrderApi = require("./order.api");


router.use("/user",userApi);
router.use("/auth",authApi);
router.use("/product",productApi);      
router.use("/cart",cartApi);  
router.use("/order",OrderApi);

module.exports = router;  