const os = require("os");

console.log(`운영체제: ${os.type()}`);
console.log(`플랫폼: ${os.platform()}`);
console.log(`아키텍쳐: ${os.arch()}`);
console.log(`호스트명: ${os.hostname()}`);

const cpus = os.cpus();
console.log(`cpu코어수: ${cpus.length}`);
console.log(`cpu모델: ${cpus[0].model}`);
console.log(`cpu코어수: ${cpus[0].speed}`);

const totalMemoryGB = os.totalmem();
const freeMemoryGB = os.freemem();
console.log("\n 메모리 정보");
console.log(`총 메모리: ${totalMemoryGB} GB`);
console.log(`사용 가능한 메모리: ${freeMemoryGB} GB`);

// 사용자 정보 가져오기
const userInfo = os.userInfo();
console.log("\n 사용자 정보");
console.log(`사용자 이름: ${userInfo.username}`);
console.log(`홈 디렉토리: ${userInfo.homedir}`);
console.log(`쉘: ${userInfo.shell}`);
