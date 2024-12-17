
const User = require("./User");
const Product = require("./Product");
const mongoose = require("mongoose");
const Cart = require("./Cart")
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
            productId : {type:mongoose.ObjectId, ref:Product, required:true },
            price :{type:Number, required:true},
            qty : {type:Number, required:true, default: 1},
            size : {type:String, required:true},     
       },
    ],
    },
{timestamps:true}
);

orderSchema.methods.toJSON = function(){
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
}


orderSchema.post("save", async function() {
  //카트비우기
  const cart = await Cart.findOne({userId:this.userId});
  cart.items =[];
  await cart.save();
});



const Order = mongoose.model("Order",orderSchema);
module.exports = Order;