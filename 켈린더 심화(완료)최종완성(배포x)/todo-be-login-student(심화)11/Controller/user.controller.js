
const User = require("../model/User");
const bcrypt = require('bcryptjs');


const userController ={};

userController.createUser= async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne ({email});

        if(user){
            throw new Error ('이미 가입된 유저입니다') ;
        }
        // 비밀번호 해싱
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({name,email,password:hash});
        await newUser.save();
        res.status(200).json({status:"success"});
             
    }catch(error){

        res.status(400).json({status:"fail", error});
    }   
}; 


//==========이메일에서 유저정보 확인
userController.loginWithEmail= async(req,res)=>{
    try{ 
        const {email,password} = req.body;
        const user = await User.findOne ({email},"-createdAt -updatedAt -__v");   //-updatedAt -createdAt -__v 정보를 안보이도록 뺌

        if (!user) {
            // 유저가 존재하지 않으면 에러 발생
            throw new Error("아이디 또는 비밀번호가 일치하지 않습니다!");
        }

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // 비밀번호가 일치하지 않으면 에러 발생
            throw new Error("아이디 또는 비밀번호가 일치하지 않습니다!");
        }

        // 토큰 생성
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
    } catch (error) {
        // 에러 메시지 응답
        res.status(400).json({ status: "fail", message: error.message });
    }
};

        //         if(user){
//            const isMath = bcrypt.compareSync(password, user.password);
//            if (isMath){
//             const token = user.generateToken();
//             return res.status(200).json({status:"success",user,token});
//            } 
//         }
//         throw new Error ('아이디 또는 비밀번호가 일치하지 않습니다!') 
//     }catch(error){
//         res.status(400).json({status:"fail",message: error.message});
//     }

// };





module.exports = userController;