// 클래스명은 (CarInfo), 속성은 brand, color, model: string 타입
// 메서드는 drive() -> '모델 00가 달리는 중', stop() -> '모델 00가 멈췄습니다.'
// 객체를 2개 정도 생성 후에 drive, stop 메서드 호출

class CarInfo{
   constructor(brand, color, model){
    this.brand = brand;
    this.color = color;
    this.model = model;
   }  
   Drive(model){
    console.log(`모델 ${model}가 달리는 중`);
   }
   Stop(model){
    console.log(`모델 ${model}가 멈췄습니다.`);
   }
}

const Car1 = new CarInfo('삼성', '검정', '삼성자동차');
const Car2 = new CarInfo('포르쉐', '빨강', '벤츠') 
console.log(Car1);
Car1.Drive(Car1.model);
console.log(Car1.Drive);
Car2.Stop(Car2.model);
console.log(Car2.Stop);

// CarInfo를 상속 받아서 ElectricCarInfo를 만들어보세요.
// 추가 속성은 battery,
// 추가로 charge() => '모델 00가 충전 중', stop() 메서드도 추가
// 객체를 2개 정도 생성 후에 drive, stop 메서드 호출 해보기

class ElectricCarInfo extends CarInfo{
    constructor(brand, color, model, battery){
        super(brand, color, model)
        this.battery = battery
    }
    charge(){
        console.log(`모델 ${model}이(가) 충전 중`);
    }
}

const c1 = new ElectricCarInfo('벤츠','화이트', 'v2', 100)
const c2 = new ElectricCarInfo('bmw', '블루', 'B2', 80)
c1.Drive(c1.model);
console.log(c1.Drive);
c2.Stop(c2.model);
console.log(c2.Stop);