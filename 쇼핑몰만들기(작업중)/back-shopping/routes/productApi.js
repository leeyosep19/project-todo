const express = require("express");
const authController = require("../controllers/auth.controller");
const productController = require("../controllers/productController");
const router = express.Router();

router.post("/",
    authController.authenticate,
    authController.checkAdminPermission,
    productController.createProduct
);


router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);


router.delete( "/:id",
    authController.authenticate,
    authController.checkAdminPermission,
    productController.deleteProduct
  );
  

router.put("/:id",
    authController.authenticate,
    authController.checkAdminPermission,
    productController.updateProduct
);

module.exports = router; 