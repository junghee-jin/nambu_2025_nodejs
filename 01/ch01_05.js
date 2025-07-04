function add1(x, y){
    return x + y
}

console.log(add1(1,2));

let add2 = function(x,y){
    return x + y;
}
console.log(add2(2,3));

const add3 = (x, y) => {
    return x + y;
}
console.log(add3(3,4));

// 콜백 함수
const ten = (cb) => {
    for(let i =0; i<10; i++){
        cb(); // () 의미는 함수 실행 해라
    }
}

ten(function(){
    console.log('call function');
});

setTimeout(function() {
    console.log('1초 뒤에 호출')
}, 1000)

setInterval(function(){
    console.log('1초 마다 실행');
}, 1000) // 1초 간격으로 계속 실행



