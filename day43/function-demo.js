// 1. 함수 선언문
function add(x, y) {
  return console.log(x + y);
}

// 2. 함수 표현식 (익명함수)
const add = function (x, y) {
    return console.log(x + y);
}

// 3. 함수 생성자
const add = new Function('x', 'y', 'return console.log(x + y)');

// 4. 화살표 함수
const add = (x, y) => {
    return console.log(x + y);
}