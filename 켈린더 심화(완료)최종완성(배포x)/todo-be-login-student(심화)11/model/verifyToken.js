const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Authorization 헤더에서 토큰 추출

  if (!token) {
    return res.status(401).json({ status: "fail", message: "토큰이 없습니다. 로그인 후 다시 시도해주세요." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY); // 토큰을 검증하고 사용자 정보 복원
    req.user = decoded; // 복원된 사용자 정보를 요청 객체에 저장
    next(); // 미들웨어를 통과하여 다음 핸들러로 넘어감
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "유효하지 않은 토큰입니다." });
  }
};

module.exports = verifyToken;