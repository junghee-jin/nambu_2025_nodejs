// 예를 들어 이지훈이라는 객체를 표현
const name = '정희진';
const age = 40;
const job = 'developer';
const name1 = '이지훈';
const age1 = 10;
const job1 = 'sw engineer';

const person1 = {
    name: '정희진',
    age: 38,
    job: 'engineer'
}

console.log(person1.age);
console.log();

person1.hobby =  ['cook', 'fishing']
console.log(person1);
console.log(Object.keys(person1)); // 객체 순회
console.log(Object.values(person1));

person1.addAge = function(){
    this.age = this.age + 1;
}

person1.addAge();
console.log(person1); // 객체에는 함수도 넣을 수 있다.

class PersonInfo {
    constructor(name, age, address){
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age){
        return this.age
    }

    getAge(){
        return this.age
    }
}

let p1 = new PersonInfo('정희진', 38, '을왕동');
console.log(p1);
p1.addAge(38);
console.log(p1.getAge);

class Employee extends PersonInfo(){
    constructor(name, age, address, salary){
        super(name, age, address)
        this.salary = salary;
    }
}

let e1 = new Employee('정희진', 38, '인천', 10000000)
console.log(e1);

try {
    // 데이터베이스 커넥션 얻어와서
    // 데이터베이스에 데이터 질의
    const arr = new Array(-1)
} catch(e) {
    // 데이터 질의 하다가 예외 발생했을 때 처리
    console.log('예외 발생', e);
} finally {
    // 데이터베이스 커넥션 닫아주기
    console.log('예외가 발생해도 이 작업은 반드시 필요');
}

try {
    const err = new Error('나만의 에러')
    err.name = '나만의 에러'
    err.message = '나만의 에러가 완성되었어요.'
    throw err
} catch(e) {
    console.log(e.name, e.message);
}

console.log('-------continue--------');
for(i in arr){
    if(typeof arr[i] === 'string'){
        continue;
    // 이후 로직 수행 안하고 다음 반복으로 바로 넘어감
    }
    console.log(arr[i]);    
}

