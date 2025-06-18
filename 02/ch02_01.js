// // 파일 다루기 fs 모듈 이용
// const fs = require("fs"); // common.js방식 fs(파일다루기) 모듈 가져오라는 뜻
// // 리콰이어로 모듈 이름 넣기 import와 동일
// fs.writeFileSync("test.txt", "hello world!");
// console.log("파일 쓰기 완료");

// // 문제1. hello.txt 만들고 내용에는 안녕하세요 반갑습니다. 제 이름은 정희진입니다.

const fs = require("fs");
fs.writeFileSync("hello.txt", "안녕하세요 반갑습니다. 제 이름은 정희진!");
console.log("파일 쓰기 완료");
// writeFile & writeFileSync 차이

// 파일 읽기
const data = fs.readFileSync("test.txt", "utf-8");
// utf-8은 인코딩, euc-kr
console.log(data);

// hello.txt. 읽어서 콘솔 출력
const data2 = fs.readFileSync("hello.txt", "utf-8");
console.log(data2);

// 만약 hello.txt가 1기가 짜리 파일 일 경우 16번쨰 라인이 처리 끝날떄까지 대기
const stats1 = fs.statSync("test.txt");
console.log(stats1);

fs.writeFile("async-test.txt", "Async Hello World!", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("비동기 파일 쓰기 완료");
});
// 콜백함수 호출하여 쓰기 완료 되었는 지 확인

// async-hello.txt 파일을 만들고 안녕하세요 비동기 파일 쓰기 테스트 작업입니다.
// fs.writeFile

fs.writeFile(
  "async-hello.txt",
  "안녕하세요 비동기 파일 쓰기 테스트 작업입니다.",
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("비동기 파일 쓰기 완료");
  }
);

// 비동기 파일 읽기
fs.readFile("async-test.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("읽기 에러", err);
  }
  console.log("비동기파일읽기", data);
});

// async-hello.txt 를 fs.readFile로 읽어보세요.
fs.readFile("async-hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("읽기 에러", err);
  }
  console.log("비동기 파일 읽기", data);
});

const fsPromise = require("fs").promises;

// 프로미스로 파일을 읽고 쓰는 방법
const fileOp = async () => {
  try {
    await fsPromise.writeFile("promise-test.txt", "Promise Hello World!");
    console.log("파일 쓰기 완료");
    const data = fsPromise.readFile("promise-test.txt", "utf-8");
  } catch (e) {
    console.log(e);
  }
};
fileOp();

// fileOp2라는 함수를 만들고 promise 방식으로 promise-hello.txt 넣고
// 안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요 쓰고,
// promise-hello.txt다시 읽어서 콘솔에 출력해 보세요.

const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요."
    );
    console.log("파일 쓰기 완료");
    const data = fsPromise.readFile("promise-hello.txt", "utf-8");
  } catch (e) {
    console.log(e);
  }
};
fileOp2();
