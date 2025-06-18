const path = require("path");

const fullPath = path.join(__dirname, "files", "test.txt");
console.log(`전체경로: ${fullPath}`);
// __dirname: 현재 파일의 디렉토리 절대경로를 가져옴

// fullPath2 변수에 현재 디렉토리 /files/tasks/jobs/01.txt 경로를 만들어보세요

const fullPath2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
console.log(`전체경로: ${fullPath2}`);
const fullPath22 = __dirname + "/" + "files"; // 윈도우는 역슬래쉬

const pathParts = path.parse(fullPath);
console.log(pathParts);

// fullPath2를 parse를 이용하여 경로를 분리해 보세요. 변수명은 pathParts2
const pathParts2 = path.parse(fullPath2);
console.log(pathParts2);

const ext = path.extname(fullPath);
console.log(ext);

// path사용
const fs = require("fs");

const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);
if (!fs.existsSync(dirPath)) {
  // 경로가 있으면 true, 없으면 false
  fs.mkdirSync(dirPath);
}

// dirPath2 변수를 만들고 현재 디렉토리 밑에 tasks를 만들어보세요.
// 디렉토리가 존재하면 안만들고 존재하지 않으면 만들어줍니다.

const dirPath2 = path.join(__dirname, "tasks");
console.log(dirPath2);
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, "tasks", "jobs", "01"); // 경로 만들고
console.log(dirPath3);
if (!fs.existsSync(dirPath3)) {
  // 경로가 존재여부 체크
  fs.mkdirSync(dirPath3), { recursive: true }; // 실제 디렉토리 생성
}

const filePath = path.join(dirPath3, "test.txt");
fs.writeFileSync(filePath, "디렉토리 생성 후 파일 생성 테스트");

// 현재 디렉토리 밑에 main/src/code/javascript.txt파일을 생성하고 파일 안에 '자바스크립트 테스트 파일 입니다.'를 적어놓으세요.
// 디렉토리 만들기 > 파일을 만들고 쓴다
const dirPath4 = path.join(__dirname, "main", "src", "code");
console.log(dirPath4);
if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}

const filePath4 = path.join(dirPath4, "javascript.txt");
fs.writeFileSync(filePath, "자바스크립트 테스트 파일 입니다.");

// 디렉토리 이름 변경
const newDirPath = path.join(__dirname, "rename-dir");
fs.renameSync(dirPath, newDirPath); // 경로변경 == 디렉토리 변경 (mv)

// 디렉토리 삭제
fs.rmdirSync(newDirPath);
