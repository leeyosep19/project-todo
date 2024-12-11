//npm init -y  
//npm install express mongoose  
//npm install body-parser  설치
//npm install cors      참조 cors: https://www.npmjs.com/package/cors
//npm install dotenv    env를 쓰기위한 인스톨


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require ("dotenv").config();


const indexRouter  = require("./routes/index");
const core = require("cors");

const app = express();
app.use(bodyParser.json());  //데이터를보기쉽게해주는 함수 문서에 나와있는코드 참조 링크  https://www.npmjs.com/package/body-parser
app.use(core());             // core 함수는 상위에  밑에있을경우 에러남
app.use("/api", indexRouter);


mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));


app.listen(process.env.PORT || 5000, () => {    
    console.log("server on at 5000");     //포트넘버 5000번을 주시하겠다 (포트넘버는 원하는 넘버) 
  });



// const mongoURI = `mongodb://localhost:27017`;   //몽고db 기본주소


// mongoose
// .connect(mongoURI,{useNewUrlParser:true}) // 몽고 URI연결해달라는 코드
// .then(()=>{
//     console.log("mongoose connected");
// })

// .catch((err)=>{ 
//     console.log("DB connection fail",err);
// });





// 모든 리소스에대해서 cors를 허가했지만 만약에 내가 특정 도메인만 허락하고싶다 하면 이렇게 코드를 짜면 된다

// const express = require('express')
// const cors = require('cors') 
// const app = express() 
// const whitelist = ['http://example1.com', 'http://example2.com'] 
// const corsOptions = {  
//       origin: function (origin, callback) {
//             if (whitelist.indexOf(origin) !== -1) {      
//                 callback(null, true)
//             } else {
//                 callback(new Error('Not allowed by CORS'))
//              }
//       } }
// app.use(cors(corsOptions))


