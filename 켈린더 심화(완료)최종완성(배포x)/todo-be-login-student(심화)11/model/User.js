const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;



const userSchema = Schema({
    name :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    
},

{timestamps:true}
);

userSchema.methods.toJSON = function(){     
    //toJSON몽구스에서 사용하는함수  오브젝트가 json으로바뀔때
    const obj = this._doc;
    delete obj.password;
    return obj;
};                        // 패스워드는 중요한 정보이기때문에 항상 지워질수있도록 따로 만든 코드


userSchema.methods.generateToken =function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY,{
        expiresIn:"1d",                                              //expiresIn : (1day....) 추가정보를 입력
    });
    return token;
};


const User = mongoose.model("User",userSchema);
module.exports = User;