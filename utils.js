//DOM:
const $ = id => document.getElementById(id);
const $hide = id => $(id).style.display = 'none';
const $show = id => $(id).style.display = 'block';
const $create = type => document.createElement(type);
const $add = (id, html) => $(id).innerHTML += html;

const PI = Math.PI; //Число "π"

//Случайные числа:
const rnd = () => Math.random();
const random = max => rnd()*max;
const rand = (min, max) => random(max-min)+min;

//Округления:
const floor = (x, d) => Math.floor(x*(10**d))/10**d; //Округление до d знака после запятой
const flr = x => floor(x, 1)%1 ? floor(x, 1).toString():floor(x, 1)+".0"; //Округление до десятых (строка)

//HEX:
function hex(x) {
  x = Math.min(Math.max(Math.floor(x), 0), 255);
  const h = x.toString(16);
  return x < 16 ? "0"+h:h;
}

//Преобразования:
const d2r = x => x/180*PI; //Градусы в радианы
const r2d = x => x*180/PI; //Радианы в градусы

//Расчёты:
const distance = (a, b) => Math.max(Math.abs(a.x-b.x), Math.abs(a.y-b.y)); //Метрика Минковского

//Проверки:
const zone = (a, b, zone) => distance(a, b) <= zone; //Проверка зоны

function fullScreen(e) { //Метод полного экрана
  if (e.requestFullscreen) e.requestFullscreen();
  else if (e.webkitrequestFullscreen) e.webkitRequestFullscreen();
  else if (e.mozRequestFullscreen) e.mozRequestFullScreen();
}

function download(url, name) { //Метод скачивания файла
  const a = $create('a'); //Создание ссылки
  
  //Установка параметров ссылки
  a.href = url;
  a.download = name;
  
  a.click(); //Переход по ссылке (скачивание)
}