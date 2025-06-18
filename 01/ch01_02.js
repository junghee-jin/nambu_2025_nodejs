let pi;
console.log(pi);

pi = 3.141592;
console.log(pi);

let radius = 12;
console.log(`넓이: ${pi * radius * radius}`);
console.log(`둘레: ${pi * 2 * radius}`);

// 문제 area라는 변수를 만들고 radius 15인 경우 area넓이 계산해서 넣어보세요
// console.log area를 출력해 보세요.

let radius2 = 15;
let area = pi * radius2 * radius2;
console.log(area);

// 사각형의 넓이를 계산 width, height에서 각각 값을 넣고
// area2라는 변수에 넓이를 넣어보세요. 그리고 area2를 출력

let width = 10;
let height = 20;
let area2 = width * height;
console.log(area2);

let num = 0;
num++;
console.log(num);
num--;
console.log(num);

console.log(String(52));
console.log(typeof String(52));

console.log("52"); // 52
console.log(typeof Number("52")); // String

console.log(parseInt("1234"));
console.log(parseInt("1234.56"));
console.log(parseFloat("1234.56"));

console.log(Number("hello"));
console.log(isNaN(Number("hello"))); // NaN

console.log(typeof 10); // number
console.log(typeof "hello"); // String
console.log(typeof ture); // boolean
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof []); // object

let test = "변경불가";
test = "주님 지켜주세요.";
console.log(test);
