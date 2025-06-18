// 배열 [1, 2, '멈춰', 3, 4, true, false]에서 멈추는 코드를 만들어보세요.
console.log('===break===');
const p1 = [1,2,'멈춰', 3,4];
for(i in p1){
    console.log(i, p1[i]);
    if(p1[i] === '멈춰'){
        break;
    }
    console.log(p1[i]);
}

// 배열 [5,10,15,20,25]에서 20 이상이 나오면 멈추는 코드를 만들어보세요.
const p2 = [5,10,15,20,25];
for(i in p2){
    if(p2[i] >= 20){
        continue;
    }
    console.log(p2[i]);
}

// 배열 [1,2,3,4,5,6,7,8,9,10]에서 짝수만 나오는 코드를 만들어보세요.
const p3 = [1,2,3,4,5,6,7,8,9,10];

for(i of p3){
    if(i % 2 === 0)
        console.log(i);
}

// 1부터 10까지 돌면서 3의 배수는 건너뛰고 나머지를 출력하는 코드를 만들어보세요.
for(let i =0; i <= 10; i++){
    if(i % 3 === 0){
        continue;
    }
    console.log(i);
}
// 배열 ['사과', 1, '바나나', 2, '포도', false]에서 문자열만 나오는 코드를 만들어보세요.
const p4 = ['사과', 1, '바나나', 2, '포도', false];

for(i in p4){
    if(typeof p4[i] === "string"){
           console.log(p4[i]);
    }
}