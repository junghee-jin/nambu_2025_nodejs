const moment = require("moment");

const nowDate = moment();
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM원 DD일"));

console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 현재 날짜 + 시각을 2025/06/18 형태로 출력해 보세요.

const moment2 = require("moment");
const nowDate2 = moment2;
console.log(nowDate.format("YYYY/MM/DD"));
// 날짜 포맷팅: 특정 날짜의 문자열을 모멘트 객체 형태로 바꿀 수 있습니다.
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

// 시간을 추가 및 빼기
const nextDays = nowDate.add(7, "days");
console.log(nextDays);

// 시간 차이 계산
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log("과정 종료까지 남은 날 수", startDate, endDate, diffDay);

// 오늘부터 100일 후의 날짜는 YYYY년 MM월 DD일로 출력해 보세요.
const todayDate = moment();
const hundredDays = todayDate.add(100, "days");
console.log(`${moment().format("YYYY년MM월DD일")}에서 100일 후 날짜 `);
// 2024-03-15부터 2025-09-20 까지 몇 개월이 지났는 지 계산해 보세요.
const startDate2 = moment("2024-03-15");
const MonthDays = moment("2025-09-20");
const diffDay2 = MonthDays.diff(startDate2, "months");
console.log(diffDay2);
// 크리스마스까지 남은 일수를 계산해 보세요.
const s2 = moment();
const christMasDate = moment("2025-12-25");
const mb2 = christMasDate.diff(s2, "days");
console.log("크리스마스까지 남은 날 수", mb2);
