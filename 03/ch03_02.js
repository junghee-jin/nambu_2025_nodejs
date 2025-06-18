// npm i winston
const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // 로깅 레벨(info 이상의 로깅레벨만 출력)
  format: winston.format.simple(), // 간단한 테스트 형식
  transports: [
    new winston.transports.Console(), // 콘솔로 출력
    new winston.transports.File({
      filename: "app.log",
    }),
  ],
});

console.log("-------- 로그 레벨-----");
console.log("로그 레벨: error > warn > info > debug > verbose");
logger.info("정보~ 일반적인 정보 출력 시 사용");
logger.error("에러가 발생 시에만 사용");
logger.warn("경고! 주의가 필요한 경우만 사용");
logger.debug("디버그 - 개발중에만 사용");

const winston = require("winston");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // 시간 추가
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }) // 로그 포맷을 변경
  ),
  transports: [new winston.transports.Console()], // <- 여기가 format 바깥이어야 함
});
simpleLogger.info("타임스탬프가 포함된 로그");
