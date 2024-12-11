const Task = require("../model/Task");

const taskController ={};



//=========메모 저장하기

taskController.createTask= async(req,res)=>{
    try{
        const {task, isComplete, date} = req.body;
        const newTask = new Task({task,isComplete, date, userId: req.user._id, });
        await newTask.save();
        res.status(200).json({status:"ok", data: newTask});

    }catch(err){

        res.status(400).json({status:"fail", error: err});
    }
   
}; 


// =====메모 불러오기

taskController.getTask= async(req,res)=>{
    try{
        const taskList = await Task.find({userId: req.user._id}).select("-__v");   //.select 빼주는 명령어 ("-");

        res.status(200).json({status:"ok",data: taskList});

    }catch(err){

        res.status(400).json({status:"fail",error: err});
    }
};

  // ========메모 상태 업데이트

taskController.updateTask = async (req, res) => {
    try {
     const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // 사용자 ID로 필터링
        req.body, 
        { new: true,runValidators: true } //req.body에 스키마 검증을 적용
      );
      if (!updatedTask) {
       return res.status(404).json({ message: "Task not found"});
      }
       
      res.status(200).json({ status: "success", data: updatedTask });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };



//========메모삭제
  taskController.deleteTask = async (req, res) => {
    try {
      const deleteItem = await Task.findOneAndDelete(
        { _id: req.params.id, userId: req.user._id } // 사용자 ID로 필터링
    );
    if (!deleteItem) {
        return res.status(404).json({ message: "Task not found or you don't have permission" });
    }
      res.status(200).json({ status: "success", data: deleteItem });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };


// =========켈린더
taskController.getTasksByDate = async (req, res) => {
  const { date } = req.query; // 쿼리 파라미터로 날짜를 받음
  try {
    if (!date) {
      return res.status(400).json({ status: "fail", message: "날짜를 입력해 주세요." });
    }

    // 날짜 형식 검사 (예: yyyy-mm-dd 형식)
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidDate) {
      return res.status(400).json({ status: "fail", message: "잘못된 날짜 형식입니다. yyyy-mm-dd 형식으로 입력해주세요." });
    }

    // 날짜를 Date 객체로 변환하고 시간을 00:00:00으로 초기화
    // const parsedDate = new Date(date);
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ status: "fail", message: "유효하지 않은 날짜입니다." });
    }
    parsedDate.setHours(0, 0, 0, 0); // 날짜의 시간을 00:00:00으로 설정

    // 해당 날짜의 끝 시간 23:59:59.999로 설정
    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    console.log("Parsed Date:", parsedDate);
    console.log("End of Day:", endOfDay);

   const Task = require("../model/Task");

const taskController ={};



//=========메모 저장하기

taskController.createTask= async(req,res)=>{
    try{
        const {task, isComplete, date} = req.body;
        const newTask = new Task({task,isComplete, date, userId: req.user._id, });
        await newTask.save();
        res.status(200).json({status:"ok", data: newTask});

    }catch(err){

        res.status(400).json({status:"fail", error: err});
    }
   
}; 


// =====메모 불러오기

taskController.getTask= async(req,res)=>{
    try{
        const taskList = await Task.find({userId: req.user._id}).select("-__v");   //.select 빼주는 명령어 ("-");

        res.status(200).json({status:"ok",data: taskList});

    }catch(err){

        res.status(400).json({status:"fail",error: err});
    }
};

  // ========메모 상태 업데이트

taskController.updateTask = async (req, res) => {
    try {
     const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // 사용자 ID로 필터링
        req.body, 
        { new: true,runValidators: true } //req.body에 스키마 검증을 적용
      );
      if (!updatedTask) {
       return res.status(404).json({ message: "Task not found"});
      }
       
      res.status(200).json({ status: "success", data: updatedTask });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };



//========메모삭제
  taskController.deleteTask = async (req, res) => {
    try {
      const deleteItem = await Task.findOneAndDelete(
        { _id: req.params.id, userId: req.user._id } // 사용자 ID로 필터링
    );
    if (!deleteItem) {
        return res.status(404).json({ message: "Task not found or you don't have permission" });
    }
      res.status(200).json({ status: "success", data: deleteItem });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };


// =========켈린더
taskController.getTasksByDate = async (req, res) => {
  const { date } = req.query; // 쿼리 파라미터로 날짜를 받음
  try {
    if (!date) {
      return res.status(400).json({ status: "fail", message: "날짜를 입력해 주세요." });
    }

    // 날짜 형식 검사 (예: yyyy-mm-dd 형식)
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidDate) {
      return res.status(400).json({ status: "fail", message: "잘못된 날짜 형식입니다. yyyy-mm-dd 형식으로 입력해주세요." });
    }

    // 날짜를 Date 객체로 변환하고 시간을 00:00:00으로 초기화
    // const parsedDate = new Date(date);
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ status: "fail", message: "유효하지 않은 날짜입니다." });
    }
    parsedDate.setHours(0, 0, 0, 0); // 날짜의 시간을 00:00:00으로 설정

    // 해당 날짜의 끝 시간 23:59:59.999로 설정
    const endOfDay = new Date(parsedDate);
    endOfDay.setHours(23, 59, 59, 999);

    console.log("Parsed Date:", parsedDate);
    console.log("End of Day:", endOfDay);

    // 날짜에 해당하는 할 일을 DB에서 조회
    const tasks = await Task.find({
      createdAt: {
        $gte: parsedDate,  // 시작 시간
        $lte: endOfDay     // 끝 시간
       
      },
      userId: req.user._id // 사용자 ID로 필터링
    });

    // 조회된 할 일 목록을 응답으로 전송
    res.status(200).json({ status: "ok", data: tasks,parsedDate:parsedDate, endOfDay:endOfDay});
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message });
  }
};



 module.exports = taskController;

    // 조회된 할 일 목록을 응답으로 전송
    res.status(200).json({ status: "ok", data: tasks,parsedDate:parsedDate, endOfDay:endOfDay});
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message });
  }
};



 module.exports = taskController;