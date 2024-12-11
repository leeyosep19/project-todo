const express = require("express");
const taskController = require("../Controller/task.controller");
const router = express.Router();
const verifyToken = require("../model/verifyToken"); // 인증 미들웨어 불러오기

// =========메모 저장

// router.post("/",(req,res)=>{
//     res.send("create task");
// });

router.post("/",verifyToken,taskController.createTask);


//==============메모 불러오기

// router.get("/",(req,res)=>{
//     res.send("get task");
// });

router.get("/",verifyToken,taskController.getTask);

//===============메모 수정

// router.put("/:id",(req,res)=>{
//     res.send("update task");
// });

// ===== 날짜 기반 할 일 조회
router.get("/tasks",verifyToken, taskController.getTasksByDate); 



router.put("/:id",verifyToken,taskController.updateTask);



//=========메모 삭제

// router.delete("/:id",(req,res)=>{
//     res.send("delete task");
// });


router.delete("/:id",verifyToken,taskController.deleteTask);




module.exports = router; // 라우터로 수출