let date = new Date();
const day = date.getDay();
console.log(day);

switch(day){
    case 1:
        console.log('월요일');  break;
    case 2:
        console.log('화요일'); break;
    case 3:
        console.log('수요일');  break;
    case 4:
        console.log('목요일'); break;
    case 5:
        console.log('금요일');  break;
    case 6:
        console.log('토요일'); break;
    case 0: 
        console.log('일요일'); break;
    default:
        console.log('필요없는 요일');
}

