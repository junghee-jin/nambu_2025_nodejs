let arr = [5, 23, 'hello', true, 'world', -9];
console.log(arr);
console.log(arr[1]);

// for(초기조건; 종료조건:증감조건 )
for (let i= 0; i<arr.length; i++){
    console.log(`${i} is ${arr[i]}`);
}

// for ... in . i < = index
console.log('------for in ----');
for(i in arr){
    console.log(`${i} is ${arr[i]}`);
}

// for ... of ...
console.log('------for of----');
for(e of arr){
    console.log(e);
}





