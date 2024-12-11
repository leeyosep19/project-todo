// const mongoose = require("mongoose");

// const Schema = mongoose.Schema

// const taskSchema = Schema({
//     task:{
//         type: String,
//         required: true //꼭필요하다는 함수
//     },

//     isComplete:{
//         type: Boolean,    //참과거짓 을 의미하는 데이터 타입
//         required: true
//     },
//     date: {
//         type: Date,    // 날짜 필드 추가
//         required: true,
//     },

// },
// {timestamps:true}   //  시간을 알려주는 라이브러리
// );


// const Task = mongoose.model("Task",taskSchema);

// module.exports = Task;


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// 날짜를 yyyy-mm-dd 형식으로 저장하고 관리할 수 있도록 처리하는 유틸리티
const formatDate = (dateString) => {
    return new Date(dateString); // 문자열을 Date 객체로 변환하여 반환
  };

const taskSchema = new Schema({
  task: {
    type: String,
    required: true, // 필수
  },
  isComplete: {
    type: Boolean, // 참/거짓 값을 의미하는 데이터 타입
    required: true,
    default: false, // 기본값은 false (할 일은 처음에 완료되지 않음)
  },
  date: {
    type: Date, // 날짜 필드
    required: true,
    set: formatDate, // 저장 전에 날짜를 yyyy-mm-dd 형식으로 변환
  },
  userId: {  // 사용자 ID를 추가
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // User 모델과 연결
    required: true,
}
}, 
{ timestamps: true }); // 생성 및 수정 시간을 자동으로 기록

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
