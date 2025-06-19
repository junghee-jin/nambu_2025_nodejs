// 1. Express 모듈 가져오기
const express = require("express");
// 2. Express 어플리케이션 설정
const app = express();
// 3. 포트 설정
const PORT = 3000;

// 4. 라우팅 설정
// app: GET요청을 처리하는데, http://localhost:3000/ 을 처리하라는 뜻
app.get("/", (req, res) => {
  // req: HTTP요청 res: HTTP 응답
  res.send("Hello world!");
}); // 첫 번째 웹 서버 생성

// http://localhost:3000/hello GET
app.get("/hello", (req, res) => {
  res.send("안녕 /hello주소에 접근하셨습니다.");
});

// 문제 // http://localhost:3000/world GET 으로 처리할 경우 응답을 "안녕 /world 주소에 접근하였습니다." 라우터를 만들어 보세요.
app.get("/world", (req, res) => {
  res.send("안녕 /world 주소에 접근하셨습니다.");
});

// 5. 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 실행 중 입니다.`);
});
