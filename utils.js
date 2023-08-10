"use strict";

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
const floor = (x, d) => Math.floor(x*(10**d))/(10**d); //Округление до d знака после запятой
const flr = x => floor(x, 1)%1 ? floor(x, 1).toString():floor(x, 1)+".0"; //Округление до десятых (строка)
const dfloor = (x, d) => Math.floor(x/d)*d; //Округление вниз до точности d
const dceil = (x, d) => Math.ceil(x/d)*d; //Округление вверх до точности d

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
const disev = (x0, y0, x1, y1) => Math.sqrt((x1-x0)**2+(y1-y0)**2); //Эвклидова метрика

//Проверки:
const prob = x => rnd() < (x ?? 0); //Проверка вероятности
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

async function wakelock() { //Метод отключения затемнения экрана
  if (navigator.wakeLock) {
    let o = await navigator.wakeLock.request("screen"); //Отключение затемнения экрана
    
    o.addEventListener('release', function() { //Если отключение отмененено
      o = null;
    });
    
    document.addEventListener("visibilitychange", async function() { //Повторная блокировка
      if (o && document.visibilityState === "visible") wakelock();
    });
  }
}

function sgraph(data, x, y, w, h, s, m) { //Метод прямоугольного графика
  const width = w/8*6; //Ширина тела в пикселях
  const height = h/8*6; //Высота тела в пикселях
  const len = data[0].arr.length; //Длина информации
  const fs = m ? (len < width ? 0:len-width):0; //Начало графика
  const ts = fs*fpsTime; //Начало в миллисекундах
  const fw = m ? (len < width ? len:width):len; //Ширина в кадрах
  const tw = fw*fpsTime; //Ширина в миллисекундах
  
  //Поиск максимального значения:
  let max = 2; //Максимальное значение
  for (let j = 0; j < width; j++) { //Проверка всех отображаемых кадров графика
    for (let i = 0; i < data.length; i++) { //Проверка всех состояний
      const k = Math.floor(j/width*fw)+fs;
      const s = data[i].state;
      const c = data[i].arr[k];
      if (!s.hiddengraph) if (c > max) max = c; //Если не указанно "Не отображать на графике"
    }
  }
  
  ctx.strokeStyle = theme.elements;
  ctx.lineWidth = S(1);
  ctx.lineCap = "butt";
  
  //Отрисовка вертикальных линий:
  ctx.beginPath();
  ctx.moveTo(S(x+w/8), S(y+h/8));
  ctx.lineTo(S(x+w/8), S(y+h*0.875));
  ctx.moveTo(S(x+w/8*2.5), S(y+h/8));
  ctx.lineTo(S(x+w/8*2.5), S(y+h*0.875));
  ctx.moveTo(S(x+w/8*4), S(y+h/8));
  ctx.lineTo(S(x+w/8*4), S(y+h*0.875));
  ctx.moveTo(S(x+w/8*5.5), S(y+h/8));
  ctx.lineTo(S(x+w/8*5.5), S(y+h*0.875));
  ctx.moveTo(S(x+w/8*7), S(y+h/8));
  ctx.lineTo(S(x+w/8*7), S(y+h*0.875));
  ctx.stroke();
  
  //Отрисовка горизонтальных линий:
  ctx.beginPath();
  ctx.moveTo(S(x+w/8), S(y+h/8));
  ctx.lineTo(S(x+w*0.875), S(y+h/8));
  ctx.moveTo(S(x+w/8), S(y+h/2));
  ctx.lineTo(S(x+w*0.875), S(y+h/2));
  ctx.moveTo(S(x+w/8), S(y+h*0.875));
  ctx.lineTo(S(x+w*0.875), S(y+h*0.875));
  ctx.stroke();
  
  //Отрисовка легенды:
  ctx.font = S(9)+"px "+font;
  ctx.fillStyle = theme.elements;
  ctx.textBaseline = "hanging";
  ctx.fillText(Math.floor(max), S(x), S(y+h/8), S(w/8));
  ctx.textBaseline = "middle";
  ctx.fillText(Math.floor(max/2), S(x), S(y+h/2), S(w/8));
  ctx.textBaseline = "alphabetic";
  ctx.fillText(0, S(x), S(y+h*0.875), S(w/8));
  ctx.textBaseline = "top";
  ctx.fillText(flr(ts/1000), S(x+w/8), S(y+h*0.95), S(w/8*1.5));
  ctx.fillText(flr((ts+tw/4)/1000), S(x+w/8*2.5), S(y+h*0.95), S(w/8*1.5));
  ctx.fillText(flr((ts+tw/2)/1000), S(x+w/2), S(y+h*0.95), S(w/8*1.5));
  ctx.fillText(flr((ts+tw/4*3)/1000), S(x+w/8*5.5), S(y+h*0.95), S(w/8*1.5));
  ctx.fillText(flr((ts+tw)/1000), S(x+w*0.875), S(y+h*0.95), S(w/8*1.5));
  ctx.textBaseline = "middle";
  
  //Отрисовка графика:
  ctx.lineWidth = S(2);
  for (let i = 0; i < data.length; i++) { //Отрисовка линий видов
    const s = data[i].state; //Вид
    if (!s.hiddengraph) { //Если не указанно "Не отображать на графике"
      ctx.strokeStyle = s.color;
      ctx.beginPath();
      for (let k = 0; k < width; k++) { //Отрисовка линни вида
        const j = Math.floor(k/width*fw)+fs;
        const v = h/8*7-data[i].arr[j]/max*height+y;
        
        if (x) ctx.lineTo(S(x+k+w/8), S(v));
        else ctx.moveTo(S(x+k+w/8), S(v));
      }
      ctx.stroke();
    }
  }
  
  if (s) if (s.x > x+w/8 && s.x <= x+w/8*7 && s.y > y+h/8 && s.y <= y+h/8*7) { //Отрисовка выделения:
    ctx.strokeStyle = "#a0000080";
    ctx.lineWidth = S(2);
    ctx.beginPath();
    ctx.moveTo(S(s.x), S(y+h/8));
    ctx.lineTo(S(s.x), S(y+h/8*7));
    ctx.moveTo(S(x+w/8), S(s.y));
    ctx.lineTo(S(x+w/8*7), S(s.y));
    ctx.stroke();
    
    ctx.fillStyle = "#a0000080";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(flr(((s.x-x-w/8)/width*tw+ts)/1000), S(s.x), S(y+h/8*7.2));
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(Math.floor(((1-(s.y-y-h/8)/height)*max)), S(x+w/8*7.2), S(s.y));
  }
}


function rgraph(data, x, y, r, s) { //Метод круглого графика
  //Подсчёт суммы:
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i].value;
  
  //Обработка выделения:
  const sx = s?.x;
  const sy = s?.y;
  const sb = sum && disev(sx, sy, x, y) < r;
  const sa = 0.5-Math.atan2((sx-700), (sy-225))/PI/2-0.25;
  const sd = sa < 0 ? 1+sa:sa;
  let si, sp;
  
  //Отрисовка графика:
  let a = 0; //Текущий поворот
  for (let i = 0; i < data.length; i++) {
    const s = data[i].state; //Вид
    const v = data[i].value/sum; //Значение
    const b = a+v;
    
    if (sb && sd >= a && sd <= b) { //Если область выделена
      //Сохраниение параметров:
      si = i;
      sp = v;
    }
    
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.moveTo(S(x), S(y));
    ctx.arc(S(x), S(y), S(r), a*PI*2, b*PI*2);
    ctx.closePath();
    ctx.fill();
    
    a += v;
  }
  
  if (sb) { //Отрисвка выделения
    const size = Math.min(Math.sqrt(sp)*90, 18);
    
    ctx.textAlign = "center";
    ctx.font = S(size)+"px "+font;
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = S(5);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(data[si].state.name+" | "+flr(sp*100)+"%", S(sx), S(sy-size));
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
  }
}