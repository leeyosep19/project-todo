
const User = require("./User");
const Product = require("./Product");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = Schema(
    {
       userId : {type: mongoose.ObjectId, ref:User}, //외래키값
       items : [
        {
        productId : {type:mongoose.ObjectId,ref:Product},
        size: {type:String, required:true},
        qty:{type:Number, default:1, required:true},
       },
    ],
    },
{timestamps:true}
);

cartSchema.methods.toJSON = function(){
    const obj = this._doc;
    delete obj.updateAt;
    return obj;
}

const Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart;