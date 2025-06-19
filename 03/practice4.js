const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "app.log",
    }),
  ],
});

console.log("-------로그 레벨 -------");
console.log("정보 일반적인 정보 출력 시 사용");
logger.info("");
logger.error();

const winston = require("winston");

const simpleLogger = winston.createLogger({
  level: "info",
});
