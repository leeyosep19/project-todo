const Order = require("../models/Order");
const productController = require("./productController");
const {randomStringGenerator} = require("../utils/randomStringGenerator");

const orderController={};

orderController.createOrder = async(req,res)=>{
    try{
        const {userId} = req;
        const{shipTo,contact,totalPrice,orderList} = req.body;
        //재고 확인 & 재고 업데이트
        const insufficientStockItems = await productController.checkItemListStock(orderList);
        //재고 소진시시
        if(insufficientStockItems.length>0){
            const errorMessage = insufficientStockItems.reduce((total,item)=>
                (total += item.message),""
            );
            throw new Error(errorMessage);
        }

        const newOrder = new Order({
            userId,
            totalPrice,
            shipTo,
            contact,
            items:orderList,
            orderNum: randomStringGenerator(),

        });

        await newOrder.save();

        //카트 비우기
        
        res.status(200).json({status:"success", orderNum: newOrder.orderNum });
    }catch(error){
        return res.status(400).json({status: "fail", error:error.message});
    }
}

module.exports = orderController;