let date = new Date();

if (date.getHours() < 12) {
  console.log("오전");
} else {
  console.log("오후");
}

const hour = date.getHours();
const timeOfDay = hour < 12 ? "오전" : "오후";
console.log(`현재는 ${timeOfDay} 입니다.`);

switch (day) {
  case 1:
    console.log();
}

const name = "희진님";
const displayName = name || "익명님";
console.log(`환영합니다. ${displayName}`);

const userInput = null;
const defaultValue = "기본값";
const result = userInput ?? defaultValue;
console.log(`결과: ${result}`);

const isLoggedIn = true;
isLoggedIn && console.log("로그인 되었습니다.");
