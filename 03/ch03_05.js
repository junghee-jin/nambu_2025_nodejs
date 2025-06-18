// .env파일을 프로그램 상에 로드 합니다.
require("dotenv").config();

console.log(`서버 포트: ${process.env.PORT}`);

// 문제 1 데이터베이스 DB_NAME, DB_USER, DB_PASSWORD, API_KEY, NODE_ENV 출력
console.log(`DB_NAME: ${process.env.DB_NAME}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
console.log(`API_KEY: ${process.env.API_KEY}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`DB_PORT: ${process.env.DB_PORT || 54321}`);

if (!process.env.OPEN_API_KEY) {
  console.log(`오픈 ai의 키가 필요합니다.`);
}

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log(`개발 환경에서의 로직 처리`);
} else {
  console.log(`운영 환경에서의 로직 처리`);
}
