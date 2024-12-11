
// const User = require("./User");
// const Product = require("./Product");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = Schema(
    {
       userId : {type:mongoose.ObjectId, ref:User, required:true},
       shipTo: {type:Object, required:true},
       contact : {type:Object, required:true},
       totalPrice: {type:Number, required:true, default: 0},     
       status : { type:String, default: "preparing"},
       orderNum : { type:String},     
       items : [
        {
            productId : {type:mongoose.Object, ref:Product, required:true },
            qty : {type:Number, required:true},
            size : {type:Number, required:true},
            price :{type:String, required:true}
       },
    ],
    },
{timestamps:true}
);

orderSchema.methods.toJSON = function(){
    const obj = this._doc ;  
    delete obj.updateAt;
    return obj;
}

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;