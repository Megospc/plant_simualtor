//////////////////////////////////////////////////////////
/////                                                /////
/////               СИМУЛЯТОР РАСТЕНИЙ               /////
/////                                                /////
/////                 ######   ######                /////
/////                #::::::# #::::::#               /////
/////                #::::::# #::::::#               /////
/////                #::::::###::::::#               /////
/////                 ######   ######                /////
/////                #::::::###::::::#               /////
/////                #::::::###::::::#               /////
/////                #::::::###::::::#               /////
/////                 ###### ########                /////
/////                        ##                      /////
/////                        ##                      /////
/////                       ##                       /////
/////                      ##                        /////
/////                                                /////
/////                    MEGOSPC                     /////
/////                                                /////
//////////////////////////////////////////////////////////

const version = "1.3.22"; //Версия программы
const fps = 30; //Количество кадров в секунду
const fpsTime = 1000/fps; //Миллисекунд на кадр
const font = "Monospace"; //Шрифт текста
const anim = 1.5; //Размер анимаций
const defaultJSON = `{
  "name": "Plant Simulator default",
  "options": {
    "ggreen": 250,
    "gblue": 250,
    "gred": 250,
    "gigreen": 0.1,
    "giblue": 0.1,
    "gired": 0.1,
    "size": 28,
    "gsize": 15,
    "flycount": 100,
    "flych": 0.1,
    "flymul": 0.02,
    "flyspeed": 5,
    "flymax": 1000,
    "flyadd": 0.005,
    "flyaddc": 10,
    "vibrate": true,
    "cgreen": 250,
    "cblue": 250,
    "cred": 250,
    "btype": "thor",
    "musictype": 0,
    "music": true,
    "fireprob": 0.005,
    "firezone": 30,
    "firetime": 500
  },
  "style": {
    "size": 5,
    "resolution": 1800,
    "sort": true,
    "flysize": 3,
    "flyanim": 10,
    "flycolor": "#00000080",
    "firecolor": "#a03000",
    "fireanimmin": 56,
    "fireanimmax": 200,
    "fireanimc": 0.3,
    "fireanimr": 5,
    "ground": 35
  },
  "plants": [
    {
      "name": "растения 1",
      "color": "#00a000",
      "faze": 12,
      "consg": 1,
      "consb": 1,
      "consr": 1,
      "initial": 3,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 210,
      "ngrowmin": 2,
      "ngrowmax": 40,
      "repeat": 1,
      "rtimemin": 2,
      "rtimemax": 40,
      "fvalue": 30,
      "cleaner": 1
    },
    {
      "name": "растения 2",
      "color": "#a00000",
      "faze": 12,
      "consg": 1,
      "consb": 1,
      "consr": 1,
      "initial": 3,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 40,
      "ngrowmin": 2,
      "ngrowmax": 40,
      "fvalue": 30,
      "boom": 0.5
    },
    {
      "name": "растения 3",
      "color": "#0000a0",
      "faze": 12,
      "consg": 1,
      "consb": 1,
      "consr": 1,
      "initial": 3,
      "fruitsmin": 1,
      "fruitsmax": 6,
      "fzone": 40,
      "ngrowmin": 2,
      "ngrowmax": 40,
      "fvalue": 30,
      "nutrient": true
    },
    {
      "name": "растения 4",
      "color": "#000000",
      "faze": 15,
      "consg": 1,
      "consb": 1,
      "consr": 1,
      "initial": 3,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 80,
      "ngrowmin": 2,
      "ngrowmax": 40,
      "carn": 0.01,
      "czone": 60,
      "cadd": 10,
      "toxic": 0.01,
      "fvalue": 50,
      "mgzone": 100,
      "mgpow": 1,
      "fire": 0.0005
    },
    {
      "name": "сон-травы",
      "color": "#5000a0",
      "faze": 12,
      "consr": 1,
      "consg": 1,
      "consb": 1,
      "initial": 2,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 40,
      "ngrowmin": 2,
      "ngrowmax": 50,
      "fvalue": 5,
      "sleep": 1000,
      "sleprob": 0.01,
      "slezone": 100
    },
    {
      "name": "лианы",
      "color": "#008020",
      "faze": 12,
      "consr": 1,
      "consg": 1,
      "consb": 1,
      "initial": 20,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 40,
      "ngrowmin": 2,
      "ngrowmax": 50,
      "fvalue": 80,
      "creeprob": 0.2,
      "creezone": 50,
      "creeper": 1
    },
    {
      "name": "паразиты",
      "color": "#a00050",
      "faze": 12,
      "consr": 1,
      "consg": 1,
      "consb": 1,
      "initial": 2,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 40,
      "ngrowmin": 2,
      "ngrowmax": 50,
      "fvalue": 30,
      "parasite": 3,
      "paprob": 0.01,
      "pazone": 50
    }
  ],
  "animals": [
    {
      "name": "животные 1",
      "color": "#a08000",
      "initial": 3,
      "change": 0.01,
      "speed": 5,
      "prob": 0.02,
      "zone": 40,
      "hungry": 300,
      "hinc": 0.5,
      "muln": 600,
      "clezone": 100,
      "cleprob": 0.1,
      "stomper": 0.5
    },
    {
      "name": "животные 2",
      "color": "#00a0a0",
      "initial": 3,
      "change": 0.01,
      "speed": 5,
      "prob": 0.2,
      "zone": 40,
      "hungry": 300,
      "hinc": 0.5,
      "muln": 330,
      "eggs": true,
      "egrowmin": 100,
      "egrowmax": 200,
      "obscure": true,
      "asleep": 0.5,
      "say": 1,
      "sayprob": 0.2,
      "fvalue": 50
    },
    {
      "name": "хищники",
      "color": "#800000",
      "initial": 2,
      "change": 0.1,
      "speed": 5,
      "prob": 0.02,
      "zone": 40,
      "hungry": 300,
      "hinc": 0.5,
      "muln": 600,
      "clezone": 50,
      "cleprob": 0.1,
      "carn": true
    }
  ],
  "funguses": [
    {
      "name": "гриб",
      "color": "#502800",
      "max": 420,
      "initial": 1,
      "consr": 0.03,
      "consg": 0.03,
      "consb": 0.03,
      "grow": 0.5,
      "mul": 0.005,
      "ngrowmin": 100,
      "ngrowmax": 200,
      "mycor": 1,
      "amycor": 0.1
    }
  ]
}`; //JSON симуляции "по умолчанию"
const ejson = sessionStorage.getItem('plant_simulator_json'); //JSON из редактора
const json = ejson ? ejson:defaultJSON; //JSON симуляции
const obj = JSON.parse(json); //Объект симуляции
const options = obj.options; //Объект настроек
const style = obj.style; //Объект стиля
const plants = obj.plants ?? []; //Массив видов растений
const animals = obj.animals ?? []; //Массив видов животных
const funguses = obj.funguses ?? []; //Массив видов грибов
const canvas = $('canvas'); //Объект холста
const ctx = canvas.getContext('2d'); //Контекст холста
const music = new Audio("assets/music"+(options.musictype ?? 0)+".mp3"); //Музыка (от zvukipro.com)
var frame; //Счётчик кадров
var arr; //Массив объектов
var ground; //Массив земли
var scale; //Масштаб поля
var cscale; //Масштаб холста
var started = false; //Запущенна ли симуляция?
var astats = 0; //Лист расширенной статистики
var arendered = 0; //Отрисованный лист
var lastFrame; //Последний кадр
var sorted; //Массив отсортированной статистики
var stats; //Массив сохранённой статистики
var interval; //Интервал функции кадра
var pause; //Симуляция на паузе?
var cprops; //Характеристики холста
var counters; //Счётчики
var time; //Счётчик реального времени
var stime; //Время старта
const S = x => x*cscale; //Функция масштабирования холста
const theme = {
  back: "#ffffff",
  elements: "#d0d0d0",
  text: "#000000"
}; //Цветовая тема
const timeNow = () => frame*fpsTime; //Функция игрового времени

function clear() { //Метод очистки холста
  ctx.fillStyle = theme.back;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function testCord(x, size) { //Функция проверки координат
  const fsize = options.size*options.gsize; //Полный размер
  const min = size/2; //Минимальное значение
  const max = fsize-size/2; //Максимальное значение
  const leg = x => Math.min(Math.max(x, min), max); //Доп-проверка
  switch (options.btype ?? "thor") { //Тип "бортиков"
    case "limited": //Обычные
      return leg(x);
    case "bounce": //Зеркальные
      if (x < min) return leg(min+(min-x));
      else if (x > max) return leg(max-(x-max));
      else return x;
    case "thor": //Зацикленные
      if (x < min) return leg(max-(min-x));
      else if (x > max) return leg(min+(x-max));
      else return x;
  }
}

function distance(a, b) { //Функция растояния
  const fsize = options.size*options.gsize; //Полный размер
  if ((options.btype ?? "thor") == "thor") return Math.max(Math.min(Math.abs(a.x-b.x), a.x+fsize-b.x, b.x+fsize-a.x), Math.min(Math.abs(a.y-b.y), a.y+fsize-b.y, b.y+fsize-a.y));
  else return Math.max(Math.abs(a.x-b.x), Math.abs(a.y-b.y));
}

function startrender() { //Отрисовка стартового меню
  clear();
  
  //Отрисовка текста:
  ctx.textAlign = "center";
  ctx.fillStyle = "#00a000a0";
  ctx.font = S(20)+"px "+font;
  ctx.fillText("Кликните, чтобы продолжить", S(450), S(250));
  ctx.font = S(36)+"px "+font;
  ctx.fillText("Симулятор Растений", S(450), S(150));
  ctx.font = S(15)+"px "+font;
  ctx.fillText("Загрузка завершена...", S(450), S(300));
  ctx.textAlign = "left";
}

function vib(len) { //Метод вибрации
  if (typeof navigator.vibrate == "function" && options.vibrate) navigator.vibrate(len); //Использование Vibration API
}

function sort(id) { //Метод сортировки статистики
  id ??= "count"; //Критерий сортировки по умолчанию
  sorted = []; //Очистка массива
  
  function fill(arr, id) { //Метод заполнения массива
    for (let i = 0; i < arr.length; i++) {
      const state = arr[i];
      if (!state.hiddenstat) sorted.push({ counter: counters[id][i], state: state, type: id }); //Если не указанно "не отображать на статистике"
    }
  }
  
  //Заполнение массива:
  fill(plants, "plants");
  fill(animals, "animals");
  fill(funguses, "funguses");
  if (counters.fly.history) sorted.push({ state: { color: style.flycolor, name: "мухи" }, counter: { count: counters.fly.count, history: counters.fly.history }, type: "fly" }); //Добавление мух
  if (counters.fire.history) sorted.push({ state: { color: style.firecolor, name: "пожар" }, counter: { count: counters.fire.count, history: counters.fire.history }, type: "fly" }); //Добавление огня
  
  if (style.sort) { //Сортировка
    for (let j = 0; j < sorted.length-1; j++) {
      let max = sorted[j];
      let maxi = j;
      for (let i = j; i < sorted.length; i++) {
        const state = sorted[i];
        if (state.counter[id] > max.counter[id]) {
          maxi = i;
          max = state;
        }
      }
      sorted[maxi] = sorted[j];
      sorted[j] = max;
    }
  }
}

function graph(size, x, y) { //Отрисовка графиков
  const width = size/8*6; //Ширина в пикселях
  const height = size/2; //Высота в пикселях
  const start = style.graphmove ? (frame < width ? 0:frame-width):0; //Начало графика
  const timeinc = start*fpsTime; //Начало в миллисекундах
  const fsize = style.graphmove ? (frame < width ? frame:width):frame; //Ширина в кадрах
  const tsize = fsize*fpsTime; //Ширина в миллисекундах
  const arr = plants.concat(animals).concat(funguses); //Массив видов
  const countof = (j, i) => {
    if (i < plants.length) return stats.plants[i][j];
    else {
      i -= plants.length;
      if (i < animals.length) return stats.animals[i][j];
      else return stats.funguses[i-animals.length][j];
    }
  }; //Функция количества
  
  //Поиск максимального значения:
  let max = 2; //Максимальное значение
  for (let j = 0; j < width; j++) { //Проверка всех отображаемых кадров графика
    for (let i = 0; i < arr.length; i++) { //Проверка всех состояний
      const c = countof(Math.floor(j/width*fsize)+start, i);
      const s = arr[i];
      if (!s.hiddengraph) if (c > max) max = c; //Если не указанно "не отображать на графике"
    }
  }
  
  ctx.strokeStyle = theme.elements;
  ctx.lineWidth = S(1);
  ctx.lineCap = "butt";
  
  //Открисовка вертикальных линий:
  ctx.beginPath();
  ctx.moveTo(S(x+size/8), S(y+height/8));
  ctx.lineTo(S(x+size/8), S(y+height*0.875));
  ctx.moveTo(S(x+size/8*2.5), S(y+height/8));
  ctx.lineTo(S(x+size/8*2.5), S(y+height*0.875));
  ctx.moveTo(S(x+size/8*4), S(y+height/8));
  ctx.lineTo(S(x+size/8*4), S(y+height*0.875));
  ctx.moveTo(S(x+size/8*5.5), S(y+height/8));
  ctx.lineTo(S(x+size/8*5.5), S(y+height*0.875));
  ctx.moveTo(S(x+size/8*7), S(y+height/8));
  ctx.lineTo(S(x+size/8*7), S(y+height*0.875));
  ctx.stroke();
  
  //Открисовка горизонтальных линий:
  ctx.beginPath();
  ctx.moveTo(S(x+size/8), S(y+height/8));
  ctx.lineTo(S(x+size*0.875), S(y+height/8));
  ctx.moveTo(S(x+size/8), S(y+height/2));
  ctx.lineTo(S(x+size*0.875), S(y+height/2));
  ctx.moveTo(S(x+size/8), S(y+height*0.875));
  ctx.lineTo(S(x+size*0.875), S(y+height*0.875));
  ctx.stroke();
  
  //Отрисовка легенды:
  ctx.font = S(9)+"px "+font;
  ctx.fillStyle = theme.elements;
  ctx.textBaseline = "hanging";
  ctx.fillText(max, S(x), S(y+height/8), S(size/8));
  ctx.textBaseline = "middle";
  ctx.fillText(Math.floor(max/2), S(x), S(y+height/2), S(size/8));
  ctx.textBaseline = "alphabetic";
  ctx.fillText(0, S(x), S(y+height*0.875), S(size/8));
  ctx.textBaseline = "top";
  ctx.fillText(flr(timeinc/1000), S(x+size/8), S(y+height*0.95), S(size/8*1.5));
  ctx.fillText(flr((timeinc+tsize/4)/1000), S(x+size/8*2.5), S(y+height*0.95), S(size/8*1.5));
  ctx.fillText(flr((timeinc+tsize/2)/1000), S(x+size/2), S(y+height*0.95), S(size/8*1.5));
  ctx.fillText(flr((timeinc+tsize/4*3)/1000), S(x+size/8*5.5), S(y+height*0.95), S(size/8*1.5));
  ctx.fillText(flr((timeinc+tsize)/1000), S(x+size*0.875), S(y+height*0.95), S(size/8*1.5));
  ctx.textBaseline = "middle";
  
  ctx.lineWidth = S(2);
  //Отрисовка графика:
  if (frame) { //Если кадр не первый
    for (let i = 0; i < arr.length; i++) { //Отрисовка линий видов
      const s = arr[i]; //Вид
      if (!s.hiddengraph) { //Если не указанно "не отображать на графике"
        ctx.strokeStyle = s.color;
        ctx.beginPath();
        for (let k = 0; k < width; k++) { //Отрисовка линни вида
          const j = Math.floor(k/width*fsize)+start;
          const v = height/8*7-countof(j, i)/max*height/8*6+y;
          if (x == 0) ctx.moveTo(S(x+k+size/8), S(v));
          else ctx.lineTo(S(x+k+size/8), S(v));
        }
        ctx.stroke();
      }
    }
  }
}

function resize() { //Метод изменения размера холста
  //Размер окна:
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  const c = w/h; //Текущее соотношение
  const nc = 2; //Целевое соотношение
  
  //Вычисление характеристик холста:
  let W, H, X, Y;
  if (c == nc) {
    W = w;
    H = h;
    X = 0;
    Y = 0;
  }
  if (c < nc) {
    W = w;
    H = w/nc;
    X = 0;
    Y = (h-(w/nc))/2;
  }
  if (c > nc) {
    W = h*nc;
    H = h;
    X = (w-(h*nc))/2;
    Y = 0;
  }
  
  const res = style.resolution ?? 1800; //Разрешение холста
  cscale = res/900; //Установка масштаба холста
  
  //Установка характеристик холста:
  canvas.width = Math.floor(res);
  canvas.height = Math.floor(res/2);
  canvas.style.width = Math.floor(W)+"px";
  canvas.style.height = Math.floor(H)+"px";
  canvas.style.top = Math.floor(Y)+"px";
  canvas.style.left = Math.floor(X)+"px";
  
  //Сохранение характеристик холста:
  cprops = {
    left: X,
    top: Y,
    width: W,
    height: H
  };
  
  if (!started) startrender(); //Отрисовка стартового меню
  arendered = 0; //Расширенная статистика не отрисована
}

function register(obj, type) { //Метод регистрации объекта
  //Поиск свободного места (если его нет, то будет создано новое):
  let id = arr.length; //Индефикатор
  for (let i = 0; i < arr.length; i++) if (!arr[i].avail) { //Если место свободно
    //Индефикатор найден:
    id = i;
    break;
  }
      
  arr[id] = {
    avail: true, //Место занято
    obj: obj, //Объект
    type: type //Тип объекта
  };
  
  return id;
}
function deregister(id) { //Метод дерегистрации объекта
  arr[id] = {
    avail: false
  };
}

function forall(obj, types, g, nav) { //Метод проверки объектов
  const f = (p, o, s) => g.call(obj, p, o, s);
  for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
    const p = arr[i];
    if (!p.avail && !nav) continue; //Если объект не живой — пропустить
    if (!types.includes(p.type)) continue; //Если тип не подходит — пропустить
    const o = p.obj; //Объект
    switch (p.type) { //Выполнение
      case "plant":
        if (f(p, o, plants[o.state])) return;
        break;
      case "fly":
        if (f(p, o)) return;
        break;
      case "fire":
        if (f(p, o)) return;
        break;
      case "animal":
        if (f(p, o, animals[o.state])) return;
        break;
      case "mycelium":
        if (f(p, o, funguses[o.state])) return;
        break;
      case "mushroom":
        if (f(p, o, funguses[o.state])) return;
        break;
      case "egg":
        if (f(p, o, animals[o.state])) return;
        break;
    }
  }
}

class Ground { //Класс земли
  constructor() {
    //Минералы:
    this.r = options.gred;
    this.g = options.ggreen;
    this.b = options.gblue;
  }
  
  red(count) { //Получение красного минерала
    if (this.r > count) { //Проверка "Достаточно ли минерала?"
      this.r -= count; //Получение
      return true; //Получение удалось
    } else {
      this.r = 0; //Обнуление минерала
      return false; //Получение не удалось
    }
  }
  green(count) { //Получение зелёного минерала
    if (this.g > count) { //Проверка "Достаточно ли минерала?"
      this.g -= count; //Получение
      return true; //Получение удалось
    } else {
      this.g = 0; //Обнуление минерала
      return false; //Получение не удалось
    }
  }
  blue(count) { //Получение синего минерала
    if (this.b > count) { //Проверка "Достаточно ли минерала?"
      this.b -= count; //Получение
      return true; //Получение удалось
    } else {
      this.b = 0; //Обнуление минерала
      return false; //Получение не удалось
    }
  }
  
  handler() { //Метод обработчика
    //Восстановление минералов:
    this.r += options.gired ?? 0;
    this.g += options.gigreen ?? 0;
    this.b += options.giblue ?? 0;
  }
  add(r, g, b) { //Метод добавки минералов
    this.r += r;
    this.g += g;
    this.b += b;
  }
  render(x, y, w, h) { //Метод отрисовки
    const f = (x, m) => hex(x/m*style.ground+(255-style.ground));
    ctx.fillStyle = "#"+f(this.r, options.gred)+f(this.g, options.ggreen)+f(this.b, options.gblue);
    ctx.fillRect(S(x), S(y), S(w), S(h));
  }
  click() { //Метод добавки кликом
    this.r += options.cred;
    this.g += options.cgreen;
    this.b += options.cblue;
  }
}

class Fire { //Класс огня
  constructor(x, y) {
    //Усатновка координат:
    this.x = x;
    this.y = y;
    
    this.time = timeNow(); //Время появления
    this.anim = { now: 128, next: rand(style.fireanimmin, style.fireanimmax) }; //Анимация
    
    this.id = register(this, "fire"); //Регистрация огня
    
    //Обновлление счётчиков:
    counters.fire.count++;
    counters.fire.history++;
  }
  dead() {
    deregister(this.id); //Дерегистрация огня
    counters.fire.count--; //Обновление счётчика
  }
  handler() {
    forall(this, ["plant", "animal", "egg", "fly", "mushroom"], function(p, o, s) { //Возгорание
      if (zone(o, this, options.firezone)) if (prob(options.fireprob)) { //Если растение в зоне и вероятность сбылась
        if (p.type == "plant" || p.type == "animal" || p.type == "egg") if (prob(s.afire)) return; //Если защита объекта сработала — пропустить
        if (p.type == "plant") new Fire(o.x, o.y); //Если это растение — появление огня
        o.dead(); //Объект сгорает
      }
    });
    if (timeNow() > this.time+(options.firetime ?? 1000)) this.dead(); //Тушение со временем
  }
  render() {
    function fig(size) {
      const s = style.size*size;
      ctx.beginPath();
      ctx.moveTo(S(this.x*scale+15), S((this.y-s/2)*scale+15));
      ctx.lineTo(S((this.x+s/2)*scale+15), S(this.y*scale+15));
      ctx.lineTo(S((this.x+s/4)*scale+15), S((this.y+s/2)*scale+15));
      ctx.lineTo(S((this.x-s/4)*scale+15), S((this.y+s/2)*scale+15));
      ctx.lineTo(S((this.x-s/2)*scale+15), S(this.y*scale+15));
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = style.firecolor;
    fig.call(this, 1);
    
    if (anim > 1) { //Отрисовка анимации
      ctx.fillStyle = style.firecolor+hex(this.anim.now);
      fig.call(this, anim);
      
      //Изменение альфа-канала:
      this.anim.now = this.anim.now+(this.anim.next-this.anim.now)*style.fireanimc;
      if (frame%style.fireanimr == 0) this.anim.next = rand(style.fireanimmin, style.fireanimmax);
    }
  }
}

class Fly { //Класс мух
  constructor(x, y) {
    this.speed = {}; //Объект скорости
    
    //Установка координат:
    const fsize = options.size*options.gsize; //Полный размер поля
    this.x = testCord(x ?? random(fsize), style.flysize);
    this.y = testCord(y ?? random(fsize), style.flysize);
    this.rspeed(); //Установка скорости
    this.finc = random(360); //Инкремент анимации
    
    this.id = register(this, "fly"); //Регистрация мухи
    
    //Обновление счётчиков:
    counters.fly.count++;
    counters.fly.history++;
  }
  dead() { //Метод смерти
    deregister(this.id); //Дерегистрация мухи
    counters.fly.count--; //Обновление счётчика
  }
  handler() { //Метод обработчика
    if (prob(options.flych)) this.rspeed(); //Смена скорости
    if (prob(options.flymul) && (counters.fly.count < options.flymax || !options.flymax)) new Fly(this.x, this.y); //Размножение
    
    //Движение:
    this.x = testCord(this.x+this.speed.x, style.flysize);
    this.y = testCord(this.y+this.speed.y, style.flysize);
  }
  render() { //Метод отрисовки
    const r = d2r(frame*5+this.finc); //Поворот в радианах
    const fsize = options.size*options.gsize; //Полный размер
    
    //Координаты с анимацией:
    const x = testCord(Math.cos(r)*style.flyanim+this.x, style.flysize);
    const y = testCord(Math.sin(r)*style.flyanim+this.y, style.flysize);
    
    //Отрисовка фигуры:
    ctx.fillStyle = style.flycolor;
    ctx.fillRect(S((x-style.flysize/2)*scale+15), S((y-style.flysize/2)*scale+15), S(style.flysize*scale), S(style.flysize*scale));
    ctx.fillRect(S((x-style.flysize/4)*scale+15), S((y-style.flysize/4)*scale+15), S(style.flysize/2*scale), S(style.flysize/2*scale));
  }
  rspeed() { //Метод установки скорости
    this.speed.x = rand(-options.flyspeed, options.flyspeed);
    this.speed.y = rand(-options.flyspeed, options.flyspeed);
  }
}

class Egg { //Класс яиц
  constructor(state, x, y) {
    this.state = state; //Вид яйца
    this.grow = 0; //Рост яйца
    this.init(); //Инициализация
    
    //Установка координат:
    this.x = testCord(x, style.size);
    this.y = testCord(y, style.size);
    
    this.id = register(this, "egg"); //Регистрация яйца
  }
  init() { //Метод инициализации
    const state = animals[this.state]; //Вид яйца
    this.ngrow = rand(state.egrowmin, state.egrowmax); //Время роста яйца
    counters.animals[this.state].eggs++; //Обновление счётчика
  }
  dead() { //Метод смерти
    counters.animals[this.state].eggs--; //Обновление счётчика
    deregister(this.id); //Дерегистрация яйца
  }
  handler() {
    this.grow++; //Рост
    if (this.grow >= this.ngrow) { //Полный рост
      new Animal(this.state, this.x, this.y);
      this.dead();
      return;
    }
  }
  render() { //Метод отрисовки
  const state = animals[this.state]; //Вид яйца
    function fig(size) {
      const s = style.size*size;
      ctx.beginPath();
      ctx.moveTo(S((this.x)*scale+15), S((this.y-s/2)*scale+15));
      ctx.lineTo(S((this.x+s/2)*scale+15), S((this.y)*scale+15));
      ctx.lineTo(S((this.x)*scale+15), S((this.y+s/2)*scale+15));
      ctx.lineTo(S((this.x-s/2)*scale+15), S((this.y)*scale+15));
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = state.color;
    fig.call(this, this.grow/this.ngrow*0.8+0.2);
  }
}

class Animal { //Класс животных
  constructor(state, x, y) {
    this.state = state; //Вид животного
    this.speed = {}; //Объект скорости
    
    //Установка координат:
    const fsize = options.size*options.gsize; //Полный размер поля
    this.x = testCord(x ?? random(fsize), style.size);
    this.y = testCord(y ?? random(fsize), style.size);
    
    this.rspeed(); //Установка скорости
    this.init(); //Инициализация
    
    this.id = register(this, "animal"); //Регистрация животного
  }
  init() { //Метод инициализации
    const state = animals[this.state]; //Вид животного
    this.hungry = state.hungry; //Запас очков сытости
    
    //Обновление счётчиков:
    counters.animals[this.state].count++;
    counters.animals[this.state].history++;
  }
  dead(h) { //Метод смерти
    const state = animals[this.state]; //Вид животного
    counters.animals[this.state].count--;//Обновление счётчика
    
    if (h) { //Свойство "Разложение":
      const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под животным
      gnd.add(state.gred ?? 0, state.ggreen ?? 0, state.gblue ?? 0)
    }
    
    if (state.sayprob && state.say) forall(this, ["animal"], function(p, o, s) { //Свойство "Переговоры"
      if (s.say == state.say) if (prob(state.say)) { //Если животное того же языка и вероятность сбылась
        //Разницы позиций:
        const dx = this.x-o.x;
        const dy = this.y-o.y;
        
        const max = Math.max(Math.abs(dx), Math.abs(dy)); //Максимальная разница
        
        //Установка скорости:
        const v = random(s.speed); //Скорость
        o.speed.x = dx/max*v;
        o.speed.y = dy/max*v;
        
        o.anim(100);
      }
    });
    
    deregister(this.id); //Дерегистрация животного
  }
  handler() { //Метод обработчика
    const state = animals[this.state]; //Вид животного
    
    if (this.sleep) { //Обработка сна
      if (timeNow() > this.sleep) this.sleep = false; //Пробуждение
      else { //Проверка сна
        this.hungry -= state.slehun ?? 0; //Потребление еды
        if (this.hungry < 0) this.dead(true); //Смерть от голода
        return; //Конец обработки
      }
    }
    
    if (prob(state.change)) this.rspeed(); //Смена скорости
    
    if (this.hungry > state.muln) { //Размножение
      if (state.eggs) new Egg(this.state, this.x, this.y); //Свойство "Яйценос"
      else {
        const a = new Animal(this.state, this.x, this.y); //Новое животное
        a.anim(300);
      }
      if (state.sayprob && state.say) forall(this, ["animal"], function(p, o, s) { //Свойство "Переговоры"
        if (distance(this, o)) if (s.say == state.say) if (prob(state.say)) { //Если животное того же языка и вероятность сбылась
          //Разницы позиций:
          const dx = this.x-o.x;
          const dy = this.y-o.y;
          
          const max = Math.max(Math.abs(dx), Math.abs(dy)); //Максимальная разница
          
          //Установка скорости:
          const v = random(s.speed); //Скорость
          o.speed.x = dx/max*v;
          o.speed.y = dy/max*v;
          
          o.anim(100);
        }
      });
      this.hungry -= state.hungry; //Трата сытости
      this.anim(300);
    }
    
    //Движение:
    this.x = testCord(this.x+this.speed.x, style.size);
    this.y = testCord(this.y+this.speed.y, style.size);
    
    if (state.sleprob && state.sleep && state.slezone) forall(this, ["animal"], function(p, o, s) { //Свойство "Гипноз"
      if (o.state == this.state) return; //Если животное того же вида — пропустить
      if (zone(o, this, state.slezone)) if (prob(state.sleprob)) o.tosleep(state.sleep); //Если животное в зоне и вероятность сбылась, оно засыпает
    });
    
    if (state.carn) { //Свойство "Хищное"
      if (state.prob && state.zone) forall(this, ["animal", "plant"], function(p, o, s) { //Атака
        if (p.type == "plant") { //Если это растение
          if (!s.nutrient) return; //Если растение не питательное — пропустить
          if (o.faze == 0) return; //Если это семя — пропустить
        } else if (o.state == this.state) return; //Если животное того же вида — пропустить
          
        if (s.big && !state.big) return; //Свойство "Большое"
        if (zone(o, this, state.zone)) if (prob(state.prob)) { //Если растение в зоне атаки и вероятность сбылась
          if (prob(s.protect)) return; //Если защита объекта сработала
          if (p.type == "plant") {
            if (prob(s.boom)) o.fruits(); //Свойство "Взрывное"
            if (!prob(state.stomper ?? 0)) this.hungry += (s.fvalue ?? 50)*(o.faze == 1 ? o.grow/s.faze:1); //Прибавление сытости и свтойство "Топотун"
            if (prob(s.cleaner && this.hungry > state.hungry)) this.hungry = state.hungry; //Свойство "Очистка"
          } else this.hungry += s.fvalue ?? 50; //Прибавление сытости
          o.dead(); //Растение погибает
          if (prob(s.toxic ?? 0)) { //Свойство "Ядовитое"
            this.dead(); //Смерть от яда
            return true;
          }
        }
      });
      
      if (state.clezone && state.cleprob) forall(this, ["animal"], function(p, o, s) { //Свойство "Умное"
        if (o.state == this.state) return; //Если животное того же вида — пропустить
        if (s.obscure) return; //Свойство "Незаметное"
        if (zone(o, this, state.clezone)) if (prob(state.cleprob)) { //Если животное в зоне и вероятность сбылась
          //Разницы позиций:
          const dx = o.x-this.x;
          const dy = o.y-this.y;
          
          const max = Math.max(Math.abs(dx), Math.abs(dy)); //Максимальная разница
          
          //Установка скорости:
          const v = random(state.speed); //Скорость
          this.speed.x = dx/max*v;
          this.speed.y = dy/max*v;
        }
      });
    } else {
      if (state.prob && state.zone) forall(this, ["plant", "mushroom"], function(p, o, s) { //Атака
        if (p.type == "plant") if (o.faze == 0) return; //Если это семя — пропустить
        if (s.big && !state.big) return; //Свойство "Большое"
        if (zone(o, this, state.zone)) if (prob(state.prob)) { //Если растение в зоне атаки и вероятность сбылась
          if (prob(s.protect)) return; //Если защита объекта сработала
          if (p.type == "plant") if (prob(s.boom)) o.fruits(); //Свойство "Взрывное"
          if (!prob(state.stomper ?? 0)) this.hungry += (s.fvalue ?? 50)*(o.faze == 1 ? o.grow/s.faze:1); //Прибавление сытости и свтойство "Топотун"
          if (p.type == "plant") if (prob(s.cleaner) && this.hungry > state.hungry) this.hungry = state.hungry; //Свойство "Очистка"
          o.dead(); //Растение погибает
          if (prob(s.toxic ?? 0)) { //Свойство "Ядовитое"
            this.dead(); //Смерть от яда
            return true;
          }
        }
      });
      
      if (state.clezone && state.cleprob) forall(this, ["plant"], function(p, o, s) { //Свойство "Умное"
        if (o.faze == 0) return; //Если это семя — пропустить
        if (s.obscure) return; //Свойство "Незаметное"
        if (zone(o, this, state.clezone)) if (prob(state.cleprob)) { //Если растение в зоне и вероятность сбылась
          //Разницы позиций:
          const dx = o.x-this.x;
          const dy = o.y-this.y;
          
          const max = Math.max(Math.abs(dx), Math.abs(dy)); //Максимальная разница
          
          //Установка скорости:
          const v = random(state.speed); //Скорость
          this.speed.x = dx/max*v;
          this.speed.y = dy/max*v;
        }
      });
    }
    
    this.hungry -= state.hinc ?? 1; //Трата очков сытости
    if (this.hungry < 0) this.dead(true); //Смерть от голода
  }
  render() { //Метод отрисовки
    const state = animals[this.state]; //Вид животного
    function fig(size) {
      const s = style.size*size;
      ctx.beginPath();
      ctx.moveTo(S(this.x*scale+15), S((this.y-s/2)*scale+15));
      ctx.lineTo(S((this.x+s/2)*scale+15), S(this.y*scale+15));
      ctx.lineTo(S(this.x*scale+15), S((this.y+s/2)*scale+15));
      ctx.lineTo(S((this.x-s/2)*scale+15), S(this.y*scale+15));
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = state.color;
    fig.call(this, 1);
    
    if (anim > 1 && this.alen && this.atime+this.alen > timeNow()) { //Отрисовка анимаций
      const a = 128-(timeNow()-this.atime)/this.alen*128; //Непрозрачность
      ctx.fillStyle = state.color+hex(a);
      fig.call(this, anim);
    }
  }
  rspeed() { //Метод установки скорости
    const state = animals[this.state]; //Вид животного
    this.speed.x = rand(-state.speed, state.speed);
    this.speed.y = rand(-state.speed, state.speed);
  }
  tosleep(len) { //Метод сна
    const state = animals[this.state]; //Вид животного
    if (prob(state.asleep)) return; //Свойство "Анти-сон"
    
    //Сохранение сна:
    this.sleep = timeNow()+len;
    this.anim(300);
  }
  anim(len) { //Функция анимации
    //Сохранение параметров:
    this.atime = timeNow();
    this.alen = len;
  }
}

class Mushroom { //Класс грибов-плодов
  constructor(state, x, y) {
    this.grow = 0; //Установка счётчика роста
    this.state = state; //Вид гриба
    
    this.init(); //Инициализация
    
    //Установка координат:
    const fsize = options.size*options.gsize; //Полный размер поля
    this.x = testCord(x, style.size);
    this.y = testCord(y, style.size);
  }
  init() { //Метод инициализации
    const state = funguses[this.state]; //Вид гриба
    counters.funguses[this.state].fruits++; //Обновление счётчика
    this.ngrow = Math.floor(rand(state.ngrowmin, state.ngrowmax)); //Время роста
    
    this.id = register(this, "mushroom"); //Регистрация гриба
  }
  dead() { //Метод смерти
    counters.funguses[this.state].fruits--; //Обновление счётчика
    deregister(this.id); //Дерегистрация гриба
  }
  handler() {
    const state = funguses[this.state]; //Вид гриба
    
    const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под грибом
    let res = true; //Результат потребления
    
    //Потребление:
    res &&= gnd.red(state.consr);
    res &&= gnd.green(state.consg);
    res &&= gnd.blue(state.consb);
    
    if (!res) { //Смерть от недостатка минералов
      this.dead();
      return;
    }
    
    this.grow++; //Рост
    if (this.grow >= this.ngrow) { //Полный рост
      new Mycelium(this.state, this.x, this.y);
      this.dead();
      return;
    }
  }
  render() {
    const state = funguses[this.state]; //Вид гриба
    const s = style.size*(this.grow/this.ngrow); //Размер гриба
    ctx.fillStyle = state.color;
    ctx.beginPath();
    ctx.moveTo(S((this.x-s/2)*scale+15), S(this.y*scale+15));
    ctx.lineTo(S((this.x-s/4)*scale+15), S((this.y-s/2.2)*scale+15));
    ctx.lineTo(S((this.x+s/4)*scale+15), S((this.y-s/2.2)*scale+15));
    ctx.lineTo(S((this.x+s/2)*scale+15), S(this.y*scale+15));
    ctx.lineTo(S((this.x+s/4)*scale+15), S((this.y+s/2.2)*scale+15));
    ctx.lineTo(S((this.x-s/4)*scale+15), S((this.y+s/2.2)*scale+15));
    ctx.closePath();
    ctx.fill();
  }
}

class Mycelium { //Класс грибниц
  constructor(state, x, y) {
    this.grow = 0; //Установка счётчика роста
    this.state = state; //Вид грибницы
    
    this.init(); //Инициализация
    
    //Установка координат:
    const fsize = options.size*options.gsize; //Полный размер поля
    this.x = x ?? random(fsize);
    this.y = y ?? random(fsize);
  }
  init() { //Метод инициализации
    const state = funguses[this.state]; //Вид грибницы
    //Обновление счётчиков:
    counters.funguses[this.state].count++;
    counters.funguses[this.state].history++;
    
    this.id = register(this, "mycelium"); //Регистрация грибницы
  }
  dead() { //Метод смерти
    const state = funguses[this.state]; //Вид грибницы
    counters.funguses[this.state].count--; //Обновление счётчика
    deregister(this.id); //Дерегистрация грибницы
  }
  handler() {
    const state = funguses[this.state]; //Вид грибницы
    const fsize = options.size*options.gsize; //Полный размер поля
    
    let saves = 0; //Счётчик исключений
    if (state.mycor || state.amycor) forall(this, ["plant"], function(p, o, s) { //Свойство "Микориза"
      if (zone(o, this, this.grow/2)) {
        o.grow += state.mycor; //Прибавление роста
        saves += state.amycor ?? 1; //Добавка исключения
      }
    });
    
    let gnds = []; //Массив земель под грибницой
    for (let x = dfloor(this.x-this.grow/2, options.gsize); x < dceil(this.x+this.grow/2, options.gsize); x += options.gsize) for (let y = dfloor(this.y-this.grow/2, options.gsize); y < dceil(this.y+this.grow/2, options.gsize); y += options.gsize) gnds.push(ground[Math.floor(Math.min(testCord(x, 0), fsize-1)/options.gsize)][Math.floor(Math.min(testCord(y, 0), fsize-1)/options.gsize)]); //Заполнение массива
    
    const cc = Math.sqrt(gnds.length); //Коэффициент потребления
    
    for (let i = 0; i < gnds.length; i++) {
      const g = gnds[i]; //Земля
      let res = true; //Результат потребления
      
      //Потребление:
      res &&= g.red(state.consr*cc);
      res &&= g.green(state.consg*cc);
      res &&= g.blue(state.consb*cc);
      
      if (!res) { //Смерть от недостатка минералов
        if (saves >= 1) saves--; //Если есть исключения, трата исключения
        else { //Если нет — смерть
          this.dead();
          return;
        }
      }
    }
    
    if (prob(state.mul)) new Mushroom(this.state, rand(this.x-this.grow/2, this.x+this.grow/2), rand(this.y-this.grow/2, this.y+this.grow/2)); //Размножение
    this.grow = Math.min(this.grow+(state.grow ?? 1), state.max); //Рост
  }
  render() {
    if (style.funga) {
      const state = funguses[this.state]; //Вид грибницы
      ctx.fillStyle = state.color+hex(style.funga);
      ctx.fillRect(S((this.x-this.grow/2)*scale+15), S((this.y-this.grow/2)*scale+15), S(this.grow*scale), S(this.grow*scale));
    }
  }
}

class Plant { //Класс растений
  constructor(state, x, y) {
    this.grow = 0; //Установка счётчика роста
    this.state = state; //Вид растения
    this.repeat = 0; //Счётчик повторений
    this.faze = 0; //Фаза растения
    
    this.init(); //Инициализация
    
    //Установка координат:
    const fsize = options.size*options.gsize; //Полный размер поля
    this.x = testCord(x ?? random(fsize), style.size);
    this.y = testCord(y ?? random(fsize), style.size);
  }
  init() { //Метод инициализации
    const state = plants[this.state]; //Вид растения
    this.ngrow = Math.floor(rand(state.ngrowmin, state.ngrowmax)); //Время роста семени
    
    //Обновление счётчиков:
    counters.plants[this.state].count++;
    counters.plants[this.state].history++;
    
    this.id = register(this, "plant"); //Регистрация растения
  }
  dead() { //Метод смерти
    const state = plants[this.state]; //Вид растения
    counters.plants[this.state].count--; //Обновление счётчика
    deregister(this.id); //Дерегистрация растения
  }
  handler() { //Метод обработчика
    const state = plants[this.state]; //Вид растения
    const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под растением
    
    if (state.carn && state.czone) forall(this, ["fly"], function(p, o) { //Свойство "Хищное"
      if (zone(o, this, state.czone)) if (prob(state.carn)) { //Если муха в зоне атаки и вероятность сбылась
        this.grow += state.cadd; //Прибавление роста
        o.dead(); //Муха погибает
      }
    });
    
    if (state.mgzone && state.mgpow) forall(this, ["fly"], function(p, o) { //Свойство "Приманка"
      if (zone(o, this, state.mgzone)) { //Если муха в зоне приманки
        const c = distance(o, this); //Расстояние до мухи
        const m = state.mgpow*(state.mgzone-c)/state.mgzone;
        
        //Изменение позиции мухи:
        o.x = testCord(o.x+(o.x < this.x ? m:-m), style.flysize);
        o.y = testCord(o.y+(o.y < this.y ? m:-m), style.flysize);
      }
    });
    
    if (this.faze && state.sleprob && state.sleep && state.slezone) forall(this, ["animal"], function(p, o, s) { //Свойство "Сон"
      if (zone(o, this, state.slezone)) if (prob(state.sleprob)) o.tosleep(state.sleep); //Если животное в зоне и вероятность сбылась, оно засыпает
    });
    
    if (state.paprob && state.parasite && state.pazone) forall(this, ["plant"], function(p, o, s) { //Свойство "Паразит"
      if (zone(o, this, state.pazone)) if (prob(state.paprob)) { //Если животное в зоне и вероятность сбылась
        const a = o.grow < state.parasite ? o.grow:state.parasite; //Количество забираемого роста
        o.grow -= a; //Уменьшение роста жертвы
        this.grow += a; //Прибавление роста
      }
    });
    
    let res = true; //Результат получения минерала
    switch (this.faze) { //Получение нужного минерала
      case 1: res = gnd.green(state.consg ?? 1); break;
      case 2: res = gnd.blue(state.consb ?? 1); break;
      case 3: res = gnd.red(state.consr ?? 1); break;
      case 4: res = gnd.green(state.consg ?? 1); break;
    }
    
    if (res) {
      this.grow += state.grow ?? 1; //Получение удалось — прибавление роста
      const n = this.faze == 0 || this.faze == 4 ? this.ngrow:state.faze; //Необходимый рост
      if (this.grow >= n) { //Если рост достаточен
        this.faze++; //Новая фаза
        this.grow = 0; //Сброс роста
        if (this.faze > 1) this.anim(300);
        if (this.faze == 4) { //Полный рост
          this.fruits();
          if (state.repeat > this.repeat) { //Свойство "Повтор"
            this.repeat++; //Обновление счётчика повторений
            this.ngrow = rand(state.rtimemin, state.rtimemax); //Установка таймера
          } else {
            this.dead(); //Смерть (конец жизненного цикла)
            return;
          }
        }
      }
      if (this.faze == 5) this.faze = 2; //Конец отдыха
    } else {
      this.dead(); //Минерала недостаточно — смерть
      return;
    }
    
    if (state.attack && state.azone) forall(this, ["plant"], function(p, o, s) { //Свойство "Атака"
      if (o.faze == 0) return; //Если это семя — пропустить
      if (o.state == this.state) return; //Если растение того же вида — пропустить
      if (zone(o, this, state.azone)) if (prob(state.attack)) o.dead(); //Если растение в зоне атаки и вероятность сбылась, оно погибает
    });
    
    if (state.creeprob && state.creeper) { //Свойство "Лиана"
      let c = 0; //Количество растений в зоне
      forall(this, ["plant"], function(p, o, s) { //Подсчёт растений в зоне
        if (s.creeprob && s.creeper) return; //Если это лиана — пропустить
        if (zone(o, this, state.creezone)) c++; //Обновление счётчика
      });
      if (c < state.creeper && prob(state.creeprob)) { //Если растений недостаточно и вероятность сбылась
        this.dead(); //Смерть
        return;
      }
    }
    
    if (prob(state.fire ?? 0)) { //Свойство "Возгорание"
      new Fire(this.x, this.y); //Новый огонь
      this.dead(); //Растение сгорает
    }
  }
  render() { //Метод отрисовки
    const state = plants[this.state]; //Вид растения
    const hsize = style.size/2; //Половина размера
    let fig; //Функция фигуры
    
    //Установка функции фигуры:
    switch (this.faze) {
      case 0: //Семя
        fig = function(size) {
          const s = style.size/5*size; //Текущий размер
          const hs = s/2; //Половина размера
          ctx.fillRect(S((this.x-hs)*scale+15), S((this.y-hs)*scale+15), S(s*scale), S(s*scale));
        };
        break;
      case 1: //Рост
        fig = function(size) {
          const s = style.size*(Math.min(this.grow/state.faze, 1)*0.7+0.3)*size; //Текущий размер
          const hs = s/2; //Половина размера
          ctx.fillRect(S((this.x-hs)*scale+15), S((this.y-hs)*scale+15), S(s*scale), S(s*scale));
        };
        break;
      case 2: //Цветение
        fig = function(size) {
          const s = style.size*size;
          ctx.beginPath();
          ctx.moveTo(S((this.x-s/2)*scale+15), S((this.y+s/2)*scale+15));
          ctx.lineTo(S((this.x+s/2)*scale+15), S((this.y+s/2)*scale+15));
          ctx.lineTo(S(this.x*scale+15), S((this.y-s/2)*scale+15));
          ctx.closePath();
          ctx.fill();
        };
        break;
      case 3: //Плодоношение
        fig = function(size) {
          const s = style.size*size;
          ctx.beginPath();
          ctx.arc(S(this.x*scale+15), S(this.y*scale+15), S(s/2*scale), 0, PI*2)
          ctx.closePath();
          ctx.fill();
        };
        break;
      case 4: //Отдых
        fig = function(size) {
          const s = style.size*size; //Текущий размер
          const hs = s/2; //Половина размера
          ctx.fillRect(S((this.x-hs)*scale+15), S((this.y-hs)*scale+15), S(s*scale), S(s*scale));
        };
        break;
    }
    ctx.fillStyle = state.color;
    fig.call(this, 1);
    
    if (anim > 1 && this.alen && this.atime+this.alen > timeNow()) { //Отрисовка анимаций
      const a = 128-(timeNow()-this.atime)/this.alen*128; //Непрозрачность
      ctx.fillStyle = state.color+hex(a);
      fig.call(this, anim);
    }
  }
  fruits() { //Метод разброса фруктов
    const state = plants[this.state]; //Вид растения
    const fruits = Math.floor(rand(state.fruitsmin, state.fruitsmax));
    for (let i = 0; i < fruits; i++) { //Разброс плодов
      const x = this.x+rand(-state.fzone, state.fzone);
      const y = this.y+rand(-state.fzone, state.fzone);
      new Plant(this.state, x, y);
    }
  }
  anim(len) { //Функция анимации
    //Сохранение параметров:
    this.atime = timeNow();
    this.alen = len;
  }
}

function start() { //Метод инициализации
  frame = 0; //Сброс счётчика
  lastFrame = performance.now(); //Сброс последнего кадра
  time = 0; //Сброс реального времени
  stime = performance.now(); //Сохранение текущего времени
  const fsize = options.size*options.gsize; //Полный размер поля
  scale = 420/fsize; //Установка масштаба
  stats = {
    plants: [],
    animals: [],
    funguses: []
  }; //Очистка сохранённой статистики
  arr = []; //Очистка массива объектов
  pause = false; //Не пауза
  counters = { //Устновка счётчиков
    fly: { count: 0, history: 0 },
    fire: { count: 0, history: 0 },
    plants: [],
    animals: [],
    funguses: []
  };
  
  //Инициализация земли:
  ground = []; //Очистка массива
  for (let x = 0; x < options.size; x++) {
    ground[x] = []; //Создание матрицы
    for (let y = 0; y < options.size; y++) ground[x][y] = new Ground();
  }
  
  //Инициализация растений:
  for (let j = 0; j < plants.length; j++) { //Для каждого состояния
    const state = plants[j];
    counters.plants[j] = { count: 0, history: 0 }; //Счётчик популяции
    stats.plants[j] = []; //Сохранённая статистика
    for (let i = 0; i < state.initial; i++) new Plant(j); //Создание растений
  }
  
  //Инициализация животных:
  for (let j = 0; j < animals.length; j++) { //Для каждого состояния
    const state = animals[j];
    counters.animals[j] = { count: 0, eggs: 0, history: 0 }; //Счётчик популяции
    stats.animals[j] = []; //Сохранённая статистика
    for (let i = 0; i < state.initial; i++) new Animal(j); //Создание животных
  }
  
  //Инициализация грибов:
  for (let j = 0; j < funguses.length; j++) { //Для каждого состояния
    const state = funguses[j];
    counters.funguses[j] = { count: 0, fruits: 0, history: 0 }; //Счётчик популяции
    stats.funguses[j] = []; //Сохранённая статистика
    for (let i = 0; i < state.initial; i++) new Mycelium(j); //Создание грибниц
  }
  
  for (let i = 0; i < (options.flycount ?? 0); i++) new Fly(); //Инициализация мух
  
  sort(); //Сортировка
  
  frame++; //Прибавление кадра
  interval = setInterval(frame_, fpsTime/(options.showspeed ?? 1)); //Установка интервала
}

function frame_() { //Метод кадра
  const FPS = 1000/(performance.now()-lastFrame); //Текущее количество кадров в секунду
  lastFrame = performance.now(); //Установка последнего кадра
  
  //Расчёт реального времени:
  if (pause) {
    if (stime !== false) { //Остановка реального времени
      time += performance.now()-stime;
      stime = false;
    }
  } else if (stime === false) stime = performance.now(); //Возобновление реального времени
  
  if (astats) { //Расширенные настройки
    if (arendered == astats) return; //Если уже отрисованно — пропустить
    clear();
    ctx.fillStyle = theme.elements;
    ctx.beginPath();
    ctx.moveTo(S(45), S(20));
    ctx.lineTo(S(20), S(35));
    ctx.lineTo(S(45), S(50));
    ctx.closePath();
    ctx.fill();
    if (astats < 5) {
      ctx.beginPath();
      ctx.moveTo(S(855), S(20));
      ctx.lineTo(S(880), S(35));
      ctx.lineTo(S(855), S(50));
      ctx.closePath();
      ctx.fill();
    }
    switch (astats) {
      case 1:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Текущая популяция:", S(450), S(30));
          ctx.textAlign = "left";
          sort();
          let sum = 0; //Сумма популяций
          const size = Math.min(200/sorted.length, 18); //Размер шрифта
          ctx.font = S(size)+"px "+font;
          for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i];
            const s = p.state; //Вид
            const c = p.counter; //Счётчик
            let str = c.count.toString();
            if (c.eggs) str += " ("+c.eggs+")";
            if (c.fruits) str += " ("+c.fruits+")";
            str += " | ";
            str += s.name;
            ctx.fillStyle = s.color;
            ctx.fillText(str, S(80), S(80+i*size*1.6), S(380));
            sum += c.count;
          }
          
          //Отрисовка графика:
          let deg = 0; //Поворот в градусах
          for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i];
            const s = p.state; //Вид
            const c = p.counter; //Счётчик
            const d = c.count/sum*360; //Размер дуги в градусах
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.moveTo(S(700), S(225));
            ctx.arc(S(700), S(225), S(150), d2r(deg), d2r(deg+d));
            ctx.closePath();
            ctx.fill();
            deg += d;
          }
        }
        break;
      case 2:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Историческая популяция:", S(450), S(30));
          ctx.textAlign = "left";
          sort("history");
          let sum = 0; //Сумма популяций
          const size = Math.min(200/sorted.length, 18); //Размер шрифта
          ctx.font = S(size)+"px "+font;
          for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i];
            const s = p.state; //Вид
            const c = p.counter.history; //Счётчик
            ctx.fillStyle = s.color;
            ctx.fillText(c+" | "+s.name, S(80), S(80+i*size*1.6), S(380));
            sum += c;
          }
          
          //Отрисовка графика:
          let deg = 0; //Поворот в градусах
          for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i];
            const s = p.state; //Вид
            const c = p.counter; //Счётчик
            const d = c.history/sum*360; //Размер дуги в градусах
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.moveTo(S(700), S(225));
            ctx.arc(S(700), S(225), S(150), d2r(deg), d2r(deg+d));
            ctx.closePath();
            ctx.fill();
            deg += d;
          }
        }
        break;
      case 3:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("График:", S(450), S(30));
          ctx.textAlign = "left";
          graph(860, 20, 20);
        }
        break;
      case 4:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Состояние земли:", S(450), S(30));
          ctx.textAlign = "left";
          let r = 0, g = 0, b = 0; //Количество минералов
          
          //Подсчёт минералов:
          for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) {
            const gnd = ground[x][y];
            r += gnd.r;
            g += gnd.g;
            b += gnd.b;
          }
          
          let sum = r+g+b; //Сумма минералов
          
          //Отрисовка количества минералов:
          ctx.font = S(18)+"px "+font;
          ctx.fillStyle = "#a00000";
          ctx.fillText(Math.floor(r)+" | красный", S(80), S(80), S(380));
          ctx.fillStyle = "#00a000";
          ctx.fillText(Math.floor(g)+" | зелёный", S(80), S(110), S(380));
          ctx.fillStyle = "#0000a0";
          ctx.fillText(Math.floor(b)+" | синий", S(80), S(140), S(380));
          ctx.font = S(24)+"px "+font;
          ctx.fillStyle = "#000000";
          const c = options.size**2;
          ctx.fillText(Math.floor((sum)/(c*options.gred+c*options.ggreen+c*options.gblue)*100)+"%", S(80), S(170), S(380));
          const f = (x, m) => hex(x/m*128+127);
          const s = 200/options.size;
          for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) {
            const gnd = ground[x][y];
            ctx.fillStyle = "#"+f(gnd.r, options.gred)+f(gnd.g, options.ggreen)+f(gnd.b, options.gblue);
            ctx.fillRect(S(80+x*s), S(200+y*s), S(s), S(s));
          }
          
          let deg = 0; //Поворот в градусах
          draw(r, "#a00000");
          draw(g, "#00a000");
          draw(b, "#0000a0");
          
          function draw(a, c) {
            const d = a/sum*360; //Поворот дуги в градусах
            ctx.fillStyle = c;
            ctx.beginPath();
            ctx.moveTo(S(700), S(225));
            ctx.arc(S(700), S(225), S(150), d2r(deg), d2r(deg+d));
            ctx.closePath();
            ctx.fill();
            deg += d;
          }
        }
        break;
      case 5:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Служебная информация:", S(450), S(30));
          ctx.textAlign = "left";
          ctx.font = S(18)+"px "+font;
          ctx.fillText("Название симуляции: "+obj.name, S(20), S(80), S(860));
          ctx.fillText("Номер кадра: "+frame, S(20), S(110), S(860));
          ctx.fillText("Игровое время: "+floor(timeNow()/1000, 3)+"с", S(20), S(140), S(860));
          ctx.fillText("Реальное время: "+floor(time/1000, 3)+"с", S(20), S(170), S(860));
          ctx.fillText("Средний расчёт: "+floor(time/frame, 2)+"мс", S(20), S(200), S(860));
          ctx.fillText("Количество ячеек: "+arr.length, S(20), S(230), S(860));
        }
        break;
    }
    arendered = astats;
    
    //Кнопка "Скриншот":
    ctx.fillStyle = theme.elements;
    ctx.fillRect(S(850), S(405), S(30), S(20));
    ctx.fillRect(S(870), S(400), S(5), S(5));
    ctx.fillStyle = theme.back;
    ctx.fillRect(S(860), S(410), S(10), S(10));
    ctx.fillStyle = theme.elements;
    ctx.fillRect(S(863), S(413), S(4), S(4));
    return;
  }
  
  if (!pause) {
    //Сохранение популяций:
    for (let i = 0; i < plants.length; i++) stats.plants[i].push(counters.plants[i].count);
    for (let i = 0; i < animals.length; i++) stats.animals[i].push(counters.animals[i].count);
    for (let i = 0; i < funguses.length; i++) stats.funguses[i].push(counters.funguses[i].count);
    
    if (prob(options.flyadd)) for (let i = 0; i < (options.flyaddc ?? 1) && counters.fly.count < options.flymax; i++) new Fly(); //Добавка мух
    for (let i = 0; i < arr.length; i++) if (arr[i].avail) arr[i].obj.handler(); //Обработка объектов
    for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) ground[x][y].handler(); //Обработка земли
  }
  
  while (arr.length && !arr[arr.length-1].avail) arr.pop(); //Очистка массива
  
  clear();
  ctx.textBaseline = "middle";
  if (style.ground) for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) ground[x][y].render(x*options.gsize*scale+15, y*options.gsize*scale+15, options.gsize*scale, options.gsize*scale); //Отрисовка земли
  for (let i = 0; i < arr.length; i++) if (arr[i].avail) arr[i].obj.render(); //Отрисовка объектов
  
  //Отрисовка "бортиков":
  ctx.fillStyle = theme.elements;
  ctx.fillRect(0, 0, S(450), S(15));
  ctx.fillRect(0, S(435), S(450), S(15));
  ctx.fillRect(0, 0, S(15), S(450));
  ctx.fillRect(S(435), 0, S(15), S(450));
  
  if (!style.onlygame) { //Отрисовка доп-информации
    if (!style.biggraph) {
      sort(); //Сортировка статистики
      
      //Отрисовка статистики:
      const size = Math.min(Math.floor(9/sorted.length*18), 18); //Размер текста
      ctx.fillStyle = theme.text;
      ctx.font = S(18)+"px "+font;
      ctx.fillText("Статистика:", S(490), S(120))
      ctx.font = S(size)+"px "+font;
      for (let i = 0; i < sorted.length; i++) { //Отрисовка статистики
        const c = sorted[i];
        ctx.fillStyle = c.state.color;
        ctx.fillText(c.counter.count+" | "+c.state.name, S(490), S(180+i*size*1.6), S(380));
      }
      
      graph(200, 670, 10); //Стандартный график
    } else graph(420, 470, 10); //Большой график
    
    ctx.fillStyle = theme.text;
    ctx.font = S(18)+"px "+font;
    
    //Расчёт суммарной популяции:
    let sum = 0;
    for (let i = 0; i < sorted.length; i++) sum += sorted[i].counter.count;
    
    ctx.fillText(sum + " | сумма", S(490), S(style.biggraph ? 350:150));
    
    //Отрисовка мини-статистики:
    ctx.fillText("Время: "+flr(timeNow()/1000)+"с", S(490), S(style.biggraph ? 260:30), S(style.biggraph ? 400:180)); //Игровое время
    ctx.fillText("FPS: "+flr(FPS)+" x"+(options.showspeed ?? 1), S(490), S(style.biggraph ? 290:60), S(style.biggraph ? 400:180)); //Текущее количество кадров в секунду
    ctx.fillText("Расчёт: "+Math.floor(performance.now()-lastFrame)+"мс", S(490), S(style.biggraph ? 320:90), S(style.biggraph ? 400:180)); //Время на расчёт кадра
  }
  
  if (pause) { //Отрисовка меню возможностей
    ctx.fillStyle = theme.elements;
    
    //Кнопка "Продолжить":
    ctx.beginPath();
    ctx.moveTo(S(850), S(400));
    ctx.lineTo(S(870), S(415));
    ctx.lineTo(S(850), S(430));
    ctx.closePath();
    ctx.fill();
    
    //Кнопка "Заново":
    ctx.fillRect(S(800), S(400), S(30), S(30));
    ctx.fillStyle = theme.back;
    ctx.fillRect(S(807), S(407), S(16), S(16));
    ctx.fillRect(S(820), S(415), S(16), S(20));
    ctx.fillStyle = theme.elements;
    ctx.beginPath();
    ctx.moveTo(S(834), S(410));
    ctx.lineTo(S(826), S(420));
    ctx.lineTo(S(818), S(410));
    ctx.closePath();
    ctx.fill();
    
    //Кнопка "Полный экран":
    ctx.beginPath();
    ctx.moveTo(S(760), S(400));
    ctx.lineTo(S(770), S(400));
    ctx.lineTo(S(760), S(410));
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(S(790), S(400));
    ctx.lineTo(S(780), S(400));
    ctx.lineTo(S(790), S(410));
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(S(760), S(430));
    ctx.lineTo(S(770), S(430));
    ctx.lineTo(S(760), S(420));
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(S(790), S(430));
    ctx.lineTo(S(780), S(430));
    ctx.lineTo(S(790), S(420));
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(S(770), S(410), S(10), S(10));
      
    //Кнопка "Скриншот":
    ctx.fillRect(S(720), S(405), S(30), S(20));
    ctx.fillRect(S(740), S(400), S(5), S(5));
    ctx.fillStyle = theme.back;
    ctx.fillRect(S(730), S(410), S(10), S(10));
    ctx.fillStyle = theme.elements;
    ctx.fillRect(S(733), S(413), S(4), S(4));
    
    //Кнопка "Статистика":
    ctx.beginPath();
    ctx.moveTo(S(695), S(415));
    ctx.arc(S(695), S(415), S(12), d2r(0), d2r(300));
    ctx.fill();
  } else {
    //Кнопка "Пауза":
    ctx.fillStyle = theme.elements;
    ctx.fillRect(S(850), S(400), S(10), S(30));
    ctx.fillRect(S(870), S(400), S(10), S(30));
    
    frame++; //Обновление счётчика кадров
  }
}

function click(e) { //Обработчик кликов
  if (!started) { //Стартовый клик
    vib(100);
    if (options.music) { //Если музыка включена
      music.loop = true; //Цикличная музыка
      music.play(); //Запуск музыки
    }
    started = true;
    start();
    return; //Отменить дальнейшую проверку клика
  }
  
  //Получение координат клика:
  const x = (e.pageX-cprops.left)/cprops.width*900;
  const y = (e.pageY-cprops.top)/cprops.height*450;
  
  if (x < 0 || x >= 900 || y < 0 || y >= 900) return; //Пропустить клик, если он за пределами
  
  if (astats) { //Расширенная статистика
    if (x < 50 && y < 50) { //Кнопка "Назад"
      vib(100);
      astats--;
      if (!astats) arendered = 0;
    }
    if (astats < 5 && x > 850 && y < 50) { //Кнопка "Вперёд"
      vib(100);
      astats++;
    }
    if (x > 850 && y > 400) { //Кнопка "Скриншот"
      //Создание копии холста:
      const s = document.createElement('canvas');
      const scr = s.getContext('2d');
      s.width = canvas.width;
      s.height = canvas.height;
      scr.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
      
      //Изменение изображения (нанесение водяного знака):
      scr.fillStyle = theme.back;
      scr.fillRect(S(850), S(400), S(50), S(25));
      scr.fillRect(S(850), S(0), S(50), S(50));
      scr.fillRect(S(0), S(0), S(50), S(50));
      scr.font = S(18)+"px "+font;
      scr.fillStyle = theme.text;
      scr.fillText("Plant Simulator", S(700), S(30));
      
      const url = s.toDataURL('image/png'); //Получение base64-изображения
      download(url, `plant_simulator_screenshot_${obj.name}.png`); //Скачивание изображения
    }
    return;
  }
  
  if (x > 835 && y > 400) { //Кнопка "Пауза/Продолжить"
    vib(50);
    pause = !pause;
  }
  
  if (pause && x > 800 && x < 835 && y > 400) { //Кнопка "Заново"
    vib(100);
    clearInterval(interval);
    start();
  }
  
  if (pause && x > 760 && x < 790 && y > 400) { //Кнопка "Полный экран"
    vib(100);
    fullScreen(document.documentElement);
  }
  
  if (pause && x > 720 && x < 750 && y > 400) { //Кнопка "Скриншот"
    //Создание копии холста:
    const s = document.createElement('canvas');
    const scr = s.getContext('2d');
    s.width = canvas.width;
    s.height = canvas.height;
    scr.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
    
    //Изменение изображения (нанесение водяного знака):
    scr.fillStyle = theme.back;
    scr.fillRect(S(590), S(400), S(310), S(50));
    scr.font = S(24)+"px "+font;
    scr.fillStyle = theme.text;
    scr.fillText("Plant Simulator", S(630), S(430));
    
    const url = s.toDataURL('image/png'); //Получение base64-изображения
    download(url, `plant_simulator_screenshot_${obj.name}.png`); //Скачивание изображения
  }
  
  if (pause && x > 680 && x < 710 && y > 400) { //Кнопка "Статистика"
    vib(100);
    astats = 1;
  }
  
  if (x >= 15 && x < 435 && y >= 15 && y < 435 && !pause) { //Добавка кликом
    vib(30);
    const gnd = ground[Math.floor((x-15)*scale/options.gsize)][Math.floor((y-15)*scale/options.gsize)];
    gnd.click();
  }
}

window.onload = function() {
  resize();
  window.addEventListener('resize', resize);
  if (ejson) sessionStorage.setItem('plant_simulator_json', ""); //Очистка JSON
  wakelock();
  document.addEventListener('click', click); //Объявление обработчика кликов
};