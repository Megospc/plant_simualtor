//////////////////////////////////////////////////////////
/////               СИМУЛЯТОР РАСТЕНИЙ               /////
/////                                                /////
/////                 ######   ######                /////
/////                #::::::# #::::::#               /////
/////                #::::::# #::::::#               /////
/////                #::::::###::::::#               /////
/////                 ###### # ######                /////
/////                #::::::###::::::#               /////
/////                #::::::###::::::#               /////
/////                #::::::###::::::#               /////
/////                 ###### ########                /////
/////                        ##                      /////
/////                        ##                      /////
/////                       ##                       /////
/////                      ##                        /////
/////                                                /////
//////////////////////////////////////////////////////////

const version = "0.9.12"; //Версия программы
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
    "flymul": 0.01,
    "flyspeed": 5,
    "flymax": 1000,
    "vibrate": true,
    "cgreen": 250,
    "cblue": 250,
    "cred": 250,
    "btype": "thor",
    "musictype": 0,
    "music": true
  },
  "style": {
    "size": 5,
    "resolution": 1800,
    "sort": true,
    "flysize": 3,
    "flyanim": 10,
    "flycolor": "#00000080",
    "ground": 35
  },
  "plants": [
    {
      "name": "растение 1",
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
      "name": "растение 2",
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
      "name": "растение 3",
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
      "name": "растение 4",
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
      "toxic": 0.1,
      "fvalue": 50,
      "mgzone": 100,
      "mgpow": 1
    },
    {
      "name": "сон-трава",
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
      "name": "животное 1",
      "color": "#a08000",
      "initial": 3,
      "change": 0.1,
      "speed": 5,
      "prob": 0.02,
      "zone": 40,
      "hungry": 300,
      "hunincr": 0.5,
      "muln": 600,
      "clezone": 100,
      "cleprob": 0.1,
      "stomper": 0.5
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
      "hunincr": 0.5,
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
      "ngrowmax": 200
    }
  ]
}`; //JSON симуляции "по умолчанию"
const ejson = sessionStorage.getItem('plant_simulator_json'); //JSON из редактора
const json = ejson ? ejson:defaultJSON; //JSON симуляции
const obj = JSON.parse(json); //Объект симуляции
const options = obj.options; //Объект настроек
const style = obj.style; //Объект стиля
const plants = obj.plants; //Массив видов растений
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
var lastFrame; //Последний кадр
var sorted; //Массив отсортированной статистики
var stats; //Массив сохранённой статистики
var interval; //Интервал функции кадра
var pause; //Симуляция на паузе?
var cprops; //Характеристики холста
var counters; //Счётчики
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

function sort() { //Метод сортировки статистики
  sorted = []; //Очистка массива
  
  function fill(arr) { //Метод заполнения массива
    for (let i = 0; i < arr.length; i++) {
      const state = arr[i];
      if (!state.hiddenstat) sorted.push(state); //Если не указанно "не отображать на статистике"
    }
  }
  
  //Заполнение массива:
  fill(plants);
  fill(animals);
  fill(funguses);
  if (options.flycount) sorted.push({ color: style.flycolor, counter: counters.fly, name: "мухи" }); //Добавление мух
  
  if (style.sort) { //Сортировка
    for (let j = 0; j < sorted.length-1; j++) {
      let max = sorted[j];
      let maxi = j;
      for (let i = j; i < sorted.length; i++) {
        const state = sorted[i];
        if (state.counter > max.counter) {
          maxi = i;
          max = state;
        }
      }
      sorted[maxi] = sorted[j];
      sorted[j] = max;
    }
  }
}

function biggraph() { //Метод отрисовки большого графика
  const start = style.graphmove ? (frame < 290 ? 0:frame-290):0; //Начало графика
  const timeinc = start*(1000/fps); //Начало в миллисекундах
  const size = style.graphmove ? (frame < 290 ? frame:290):frame; //Ширина в кадрах
  
  //Поиск максимального значения:
  let max = 2; //Максимальное значение
  for (let j = start; j < stats.length; j++) { //Проверка всех кадров графика
    const gen = stats[j];
    for (let i = 0; i < gen.length; i++) { //Проверка всех видов
      const c = gen[i].count;
      const s = gen[i].state;
      if (!s.hiddengraph) if (c > max) max = c; //Если не указанно "не отображать на графике"
    }
  }
  
  //Отрисовка легенды:
  ctx.font = S(12)+"px "+font;
  ctx.fillStyle = theme.back;
  ctx.fillRect(S(465), S(15), S(420), S(210));
  ctx.fillStyle = theme.elements;
  ctx.fillRect(S(500), S(40), S(360), S(2));
  ctx.fillText(max, S(470), S(45), S(30));
  ctx.fillRect(S(500), S(120), S(360), S(2));
  ctx.fillText(Math.floor(max/2), S(470), S(125), S(30));
  ctx.fillRect(S(500), S(200), S(360), S(2));
  ctx.fillText(0, S(470), S(205), S(30));
  ctx.fillRect(S(530), S(15), S(2), S(195));
  ctx.fillText(flr(timeinc/1000), S(525), S(235), S(30));
  ctx.fillRect(S(602.5), S(15), S(2), S(195));
  ctx.fillText(flr((timeNow()-timeinc)/4000+(timeinc/1000)), S(600), S(235), S(30));
  ctx.fillRect(S(675), S(15), S(2), S(195));
  ctx.fillText(flr((timeNow()-timeinc)/2000+(timeinc/1000)), S(670), S(235), S(30));
  ctx.fillRect(S(747.5), S(15), S(2), S(195));
  ctx.fillText(flr((timeNow()-timeinc)/4000*3+(timeinc/1000)), S(742.5), S(235), S(30));
  ctx.fillRect(S(820), S(15), S(2), S(195));
  ctx.fillText(flr(timeNow()/1000), S(815), S(235), S(30));
  
  //Отрисовка линий:
  ctx.lineWidth = S(3);
  ctx.lineCap = "butt";
  if (frame) { //Если кадр не первый
    for (let i = 0; i < stats[0].length; i++) { //Отрисовка линий видов
      const s = stats[0][i].state; //Вид
      if (!s.hiddengraph) { //Если не указанно "не отображать на графике"
        ctx.strokeStyle = s.color;
        ctx.beginPath();
        for (let x = 0; x < 290; x++) { //Отрисовка линни вида
          const j = Math.floor(x/290*size)+start;
          const y = 160-(stats[j][i].count/max*160);
          if (x == 0) ctx.moveTo(S(x+530), S(y+40));
          else ctx.lineTo(S(x+530), S(y+40));
        }
        ctx.stroke();
      }
    }
  }
}
function graph() {
  const start = style.graphmove ? (frame < 160 ? 0:frame-160):0; //Начало графика
  const timeinc = start*(1000/fps); //Начало в миллисекундах
  const size = style.graphmove ? (frame < 160 ? frame:160):frame; //Ширина в кадрах
  
  //Поиск максимального значения:
  let max = 2; //Максимальное значение
  for (let j = start; j < stats.length; j++) { //Проверка всех кадров графика
    const gen = stats[j];
    for (let i = 0; i < gen.length; i++) { //Проверка всех состояний
      const c = gen[i].count;
      const s = gen[i].state;
      if (!s.hiddengraph) if (c > max) max = c; //Если не указанно "не отображать на графике"
    }
  }
  
  //Отрисовка легенды:
  ctx.font = S(9)+"px "+font;
  ctx.fillStyle = theme.elements;
  ctx.fillRect(S(685), S(20), S(165), S(1));
  ctx.fillText(max, S(660), S(25), S(20));
  ctx.fillRect(S(685), S(60), S(165), S(1));
  ctx.fillText(Math.floor(max/2), S(660), S(65), S(20));
  ctx.fillRect(S(685), S(100), S(165), S(1));
  ctx.fillText(0, S(660), S(105), S(20));
  ctx.fillRect(S(690), S(15), S(1), S(90));
  ctx.fillText(flr(timeinc/1000), S(690), S(115), S(30));
  ctx.fillRect(S(725), S(15), S(1), S(90));
  ctx.fillText(flr((timeNow()-timeinc)/4000/20*18+(timeinc/1000)), S(720), S(115), S(30));
  ctx.fillRect(S(760), S(15), S(1), S(90));
  ctx.fillText(flr((timeNow()-timeinc)/2000/20*18+(timeinc/1000)), S(760), S(115), S(30));
  ctx.fillRect(S(795), S(15), S(1), S(90));
  ctx.fillText(flr((timeNow()-timeinc)/4000*3/20*18+(timeinc/1000)), S(795), S(115), S(30));
  ctx.fillRect(S(830), S(15), S(1), S(90));
  ctx.fillText(flr((timeNow()-timeinc)/1000/20*18+(timeinc/1000)), S(830), S(115), S(30));
  
  //Отрисовка линий:
  ctx.lineWidth = S(2);
  ctx.lineCap = "butt";
  if (frame) { //Если кадр не первый
    for (let i = 0; i < stats[0].length; i++) { //Отрисовка линий видов
      const s = stats[0][i].state; //Вид
      if (!s.hiddengraph) { //Если не указанно "не отображать на графике"
        ctx.strokeStyle = s.color;
        ctx.beginPath();
        for (let x = 0; x < 160; x++) { //Отрисовка линни вида
          const j = Math.floor(x/160*size)+start;
          const y = 100-(stats[j][i].count/max*80);
          if (x == 0) ctx.moveTo(S(x+690), S(y));
          else ctx.lineTo(S(x+690), S(y));
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
function deregister(id) {
  arr[id] = {
    avail: false
  };
}

class Ground { //Класс земли
  //Минералы (приватные поля):
  #red = options.gred;
  #green = options.ggreen;
  #blue = options.gblue;
  
  red(count) { //Получение красного минерала
    if (this.#red > count) { //Проверка "Достаточно ли минерала?"
      this.#red -= count; //Получение
      return true; //Получение удалось
    } else {
      this.#red = 0; //Обнуление минерала
      return false; //Получение не удалось
    }
  }
  green(count) { //Получение зелёного минерала
    if (this.#green > count) { //Проверка "Достаточно ли минерала?"
      this.#green -= count; //Получение
      return true; //Получение удалось
    } else {
      this.#green = 0; //Обнуление минерала
      return false; //Получение не удалось
    }
  }
  blue(count) { //Получение синего минерала
    if (this.#blue > count) { //Проверка "Достаточно ли минерала?"
      this.#blue -= count; //Получение
      return true; //Получение удалось
    } else {
      this.#blue = 0; //Обнуление минерала
      return false; //Получение не удалось
    }
  }
  incr() { //Метод восстановления минералов
    this.#red += options.gired ?? 0;
    this.#green += options.gigreen ?? 0;
    this.#blue += options.giblue ?? 0;
  }
  add(r, g, b) { //Добавка минералов
    this.#red += r;
    this.#green += g;
    this.#blue += b;
  }
  render(x, y, w, h) { //Метод отрисовки
    const f = (x, m) => hex(x/m*style.ground+(255-style.ground));
    ctx.fillStyle = "#"+f(this.#red, options.gred)+f(this.#green, options.ggreen)+f(this.#blue, options.gblue);
    ctx.fillRect(S(x), S(y), S(w), S(h));
  }
  click() { //Метод добавки кликом
    this.#red += options.cred;
    this.#green += options.cgreen;
    this.#blue += options.cblue;
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
    counters.fly++; //Обновление счётчика
  }
  dead() { //Метод смерти
    deregister(this.id); //Дерегистрация мухи
    counters.fly--; //Обновление счётчика
  }
  handler() { //Метод обработчика
    if (rnd() < options.flych) this.rspeed(); //Смена скорости
    if (rnd() < options.flymul && (counters.fly < options.flymax || !options.flymax)) new Fly(this.x, this.y); //Размножение
    
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
    state.counter++; //Обновление счётчика
    this.hungry = state.hungry; //Запас очков сытости
  }
  dead(h) { //Метод смерти
    const state = animals[this.state]; //Вид животного
    state.counter--; //Обновление счётчика
    deregister(this.id); //Дерегистрация животного
    
    if (h) { //Свойство "Разложение":
      const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под животным
      gnd.add(state.gred ?? 0, state.ggren ?? 0, state.gblue ?? 0)
    }
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
    
    if (rnd() < state.change) this.rspeed(); //Смена скорости
    
    if (this.hungry > state.muln) { //Размножение
      const a = new Animal(this.state, this.x, this.y); //Новое животное
      this.hungry -= state.hungry; //Трата сытости
      this.anim(300);
      a.anim(300);
    }
    
    //Движение:
    this.x = testCord(this.x+this.speed.x, style.size);
    this.y = testCord(this.y+this.speed.y, style.size);
    
    if (state.carn) { //Свойство "Хищное"
      if (state.prob && state.zone) { //Атака
        for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
          const p = arr[i];
          if (p.type != "animal" && p.type != "plant") continue; //Если это не животное и не растение — пропустить
          if (!p.avail) continue; //Если объект мёртв — пропустить
          const o = p.obj; //Объект
          const s = p.type == "animal" ? animals[o.state]:plants[o.state]; //Вид объекта
          if (p.type == "plant") { //Если это растение
            if (!s.nutrient) continue; //Если растение не питательное — пропустить
            if (o.faze == 0) continue; //Если это семя — пропустить
          } else if (o.state == this.state) continue; //Если животное того же вида — пропустить
          
          if (s.big && !state.big) continue; //Свойство "Большое"
          if (zone(o, this, state.zone)) if (rnd() < state.prob) { //Если растение в зоне атаки и вероятность сбылась
            if (rnd() < s.protect) continue; //Если защита объекта сработала
            if (p.type == "plant") {
              if (rnd() < s.boom) o.fruits(); //Свойство "Взрывное"
              if (rnd() >= (state.stomper ?? 0)) this.hungry += (s.fvalue ?? 50)*(o.faze == 1 ? o.grow/s.faze:1); //Прибавление сытости и свтойство "Топотун"
              if (rnd() < s.cleaner && this.hungry > state.hungry) this.hungry = state.hungry; //Свойство "Очистка"
            } else this.hungry += s.fvalue ?? 50; //Прибавление сытости
            o.dead(); //Растение погибает
            if (rnd() < (s.toxic ?? 0)) { //Свойство "Ядовитое"
              this.dead(); //Смерть от яда
              return;
            }
          }
        }
      }
      
      if (state.clezone && state.cleprob) { //Свойство "Умное"
        for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
          const p = arr[i];
          if (p.type != "animal") continue; //Если это не животное — пропустить
          if (!p.avail) continue; //Если животное мертво — пропустить
          const o = p.obj; //Объект животного
          if (o.state == this.state) continue; //Если животное того же вида — пропустить
          const s = animals[o.state]; //Вид животного
          if (s.obscure) continue; //Свойство "Незаметное"
          if (zone(o, this, state.clezone)) if (rnd() < state.cleprob) { //Если животное в зоне и вероятность сбылась
            //Разницы позиций:
            const dx = o.x-this.x;
            const dy = o.y-this.y;
            
            const max = Math.max(Math.abs(dx), Math.abs(dy)); //Максимальная разница
            
            //Установка скорости:
            this.speed.x = dx/max*random(state.speed);
            this.speed.y = dy/max*random(state.speed);
          }
        }
      }
    } else {
      if (state.prob && state.zone) { //Атака
        for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
          const p = arr[i];
          if (p.type != "plant" && p.type != "mushroom") continue; //Если это не растение и не гриб — пропустить
          if (!p.avail) continue; //Если объект мёртв — пропустить
          const o = p.obj; //Объект
          if (p.type == "plant") if (o.faze == 0) continue; //Если это семя — пропустить
          const s = plants[o.state]; //Вид объекта
          if (s.big && !state.big) continue; //Свойство "Большое"
          if (zone(o, this, state.zone)) if (rnd() < state.prob) { //Если растение в зоне атаки и вероятность сбылась
            if (rnd() < s.protect) continue; //Если защита объекта сработала
            if (p.type == "plant") if (rnd() < s.boom) o.fruits(); //Свойство "Взрывное"
            if (rnd() >= (state.stomper ?? 0)) this.hungry += (s.fvalue ?? 50)*(o.faze == 1 ? o.grow/s.faze:1); //Прибавление сытости и свтойство "Топотун"
            if (p.type == "plant") if (rnd() < s.cleaner && this.hungry > state.hungry) this.hungry = state.hungry; //Свойство "Очистка"
            o.dead(); //Растение погибает
            if (rnd() < (s.toxic ?? 0)) { //Свойство "Ядовитое"
              this.dead(); //Смерть от яда
              return;
            }
          }
        }
      }
      
      if (state.clezone && state.cleprob) { //Свойство "Умное"
        for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
          const p = arr[i];
          if (p.type != "plant") continue; //Если это не растение — пропустить
          if (!p.avail) continue; //Если растение мертво — пропустить
          const o = p.obj; //Объект растения
          if (o.faze == 0) continue; //Если это семя — пропустить
          const s = plants[o.state]; //Вид растения
          if (s.obscure) continue; //Свойство "Незаметное"
          if (zone(o, this, state.clezone)) if (rnd() < state.cleprob) { //Если растение в зоне и вероятность сбылась
            //Разницы позиций:
            const dx = o.x-this.x;
            const dy = o.y-this.y;
            
            const max = Math.max(Math.abs(dx), Math.abs(dy)); //Максимальная разница
            
            //Установка скорости:
            this.speed.x = dx/max*random(state.speed);
            this.speed.y = dy/max*random(state.speed);
          }
        }
      }
    }
    
    this.hungry -= state.hunincr ?? 1; //Трата очков сытости
    if (this.hungry < 0) this.dead(true); //Смерть от голода
  }
  render() { //Метод отрисовки
    const state = animals[this.state]; //Вид животного
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
    fig.call(this, 1);
    
    if (anim && this.alen && this.atime+this.alen > timeNow()) { //Отрисовка анимаций
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
    this.ngrow = rand(state.ngrowmin, state.ngrowmax); //Время роста
    
    this.id = register(this, "mushroom"); //Регистрация гриба
    
  }
  dead() { //Метод смерти
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
    if (this.grow > this.ngrow) { //Полный рост
      new Mycelium(this.state, this.x, this.y);
      this.dead();
      return
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
    state.counter++; //Обновление счётчика
    
    this.id = register(this, "mycelium"); //Регистрация грибницы
  }
  dead() { //Метод смерти
    const state = funguses[this.state]; //Вид грибницы
    state.counter--; //Обновление счётчика
    deregister(this.id); //Дерегистрация грибницы
  }
  handler() {
    const state = funguses[this.state]; //Вид грибницы
    
    let xes = []; //Массив X земель
    let yes = []; //Массив Y земель
    
    //Границы:
    const xs = Math.floor(testCord(this.x-this.grow/2, 0)/options.gsize);
    const xe = Math.ceil(testCord(this.x+this.grow/2, 0)/options.gsize);
    const ys = Math.floor(testCord(this.y-this.grow/2, 0)/options.gsize);
    const ye = Math.ceil(testCord(this.y+this.grow/2, 0)/options.gsize);
    
    //Заполнение X:
    if (xe < xs) {
      for (let i = xs; i < options.size; i++) xes.push(i);
      for (let i = 0; i < xe; i++) xes.push(i);
    } else for (let i = xs; i < xe; i++) xes.push(i);
    
    //Заполнение Y:
    if (ye < ys) {
      for (let i = ys; i < options.size; i++) yes.push(i);
      for (let i = 0; i < ye; i++) yes.push(i);
    } else for (let i = ys; i < ye; i++) yes.push(i);
    
    let gnds = []; //Массив земель под грибницой
    for (let x = 0; x < xes.length; x++) for (let y = 0; y < yes.length; y++) gnds.push(ground[xes[x]][yes[y]]); //Заполнение массива
    
    const cc = Math.sqrt(gnds.length); //Коэффициент потребления
    
    for (let i = 0; i < gnds.length; i++) {
      const g = gnds[i]; //Земля
      let res = true; //Результат потребления
      
      //Потребление:
      res &&= g.red(state.consr*cc);
      res &&= g.green(state.consg*cc);
      res &&= g.blue(state.consb*cc);
      
      if (!res) { //Смерть от недостатка минералов
        this.dead();
        return;
      }
    }
    
    if (rnd() < state.mul) new Mushroom(this.state, rand(this.x-this.grow/2, this.x+this.grow/2), rand(this.y-this.grow/2, this.y+this.grow/2)); //Размножение
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
    this.ngrow = rand(state.ngrowmin, state.ngrowmax); //Время роста семени
    state.counter++; //Обновление счётчика
    
    this.id = register(this, "plant"); //Регистрация растения
  }
  dead() { //Метод смерти
    const state = plants[this.state]; //Вид растения
    state.counter--; //Обновление счётчика
    deregister(this.id); //Дерегистрация растения
  }
  handler() { //Метод обработчика
    const state = plants[this.state]; //Вид растения
    const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под растением
    
    if (state.carn && state.czone) { //Свойство "Хищное"
      for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
        const p = arr[i];
        if (p.type != "fly") continue; //Если это не муха — пропустить
        if (!p.avail) continue; //Если муха мертва — пропустить
        const o = p.obj; //Объект мухи
        if (zone(o, this, state.czone)) if (rnd() < state.carn) { //Если муха в зоне атаки и вероятность сбылась
          this.grow += state.cadd; //Прибавление роста
          o.dead(); //Муха погибает
        }
      }
    }
    
    if (state.mgzone && state.mgpow) { //Свойство "Приманка"
      for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
        const p = arr[i];
        if (p.type != "fly") continue; //Если это не муха — пропустить
        if (!p.avail) continue; //Если муха мертва — пропустить
        const o = p.obj; //Объект мухи
        if (zone(o, this, state.mgzone)) { //Если муха в зоне приманки
          const c = distance(o, this); //Расстояние до мухи
          const m = state.mgpow*(state.mgzone-c)/state.mgzone;
          
          //Изменение позиции мухи:
          o.x = testCord(o.x+(o.x < this.x ? m:-m), style.flysize);
          o.y = testCord(o.y+(o.y < this.y ? m:-m), style.flysize);
        }
      }
    }
    
    if (state.sleprob && state.sleep && state.slezone) { //Свойство "Сон"
      for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
        const p = arr[i];
        if (p.type != "animal") continue; //Если это не животное — пропустить
        if (!p.avail) continue; //Если животное мертво — пропустить
        const o = p.obj; //Объект животного
        if (zone(o, this, state.slezone)) if (rnd() < state.sleprob) o.tosleep(state.sleep); //Если животное в зоне и вероятность сбылась, оно засыпает
      }
    }
    
    if (state.paprob && state.parasite && state.pazone) { //Свойство "Паразит"
      for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
        const p = arr[i];
        if (p.type != "plant") continue; //Если это не растение — пропустить
        if (!p.avail) continue; //Если растение мертво — пропустить
        const o = p.obj; //Объект растения
        if (zone(o, this, state.pazone)) if (rnd() < state.paprob) { //Если животное в зоне и вероятность сбылась
          const a = o.grow < state.parasite ? o.grow:state.parasite; //Количество забираемого роста
          o.grow -= a; //Уменьшение роста жертвы
          this.grow += a; //Прибавление роста
        }
      }
    }
    
    let res = true; //Результат получения минерала
    switch (this.faze) { //Получение нужного минерала
      case 1: res = gnd.green(state.consg ?? 1); break;
      case 2: res = gnd.blue(state.consb ?? 1); break;
      case 3: res = gnd.red(state.consr ?? 1); break;
      case 4: res = gnd.green(state.consg ?? 1); break;
    }
    
    if (res) {
      this.grow += state.add ?? 1; //Получение удалось — прибавление роста
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
    
    if (state.attack && state.azone) { //Свойство "Атака"
      for (let i = 0; i < arr.length; i++) { //Проверка всех объектов
        const p = arr[i];
        if (p.type != "plant") continue; //Если это не растение — пропустить
        if (!p.avail) continue; //Если растение мертво — пропустить
        const o = p.obj; //Объект растения
        if (o.faze == 0) continue; //Если это семя — пропустить
        if (o.state == this.state) continue; //Если растение того же вида — пропустить
        if (zone(o, this, state.azone)) if (rnd() < state.attack) o.dead(); //Если растение в зоне атаки и вероятность сбылась, оно погибает
      }
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
          const s = style.size*(this.grow/state.faze*0.7+0.3)*size; //Текущий размер
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
    
    if (anim && this.alen && this.atime+this.alen > timeNow()) { //Отрисовка анимаций
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
  const fsize = options.size*options.gsize; //Полный размер поля
  scale = 420/fsize; //Установка масштаба
  stats = []; //Очистка сохранённой статистики
  arr = []; //Очистка массива объектов
  pause = false; //Не пауза
  counters = { //Устновка счётчиков
    fly: 0
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
    state.counter = 0; //Счётчик популяции
    for (let i = 0; i < state.initial; i++) new Plant(j); //Создание растений
  }
  
  //Инициализация животных:
  for (let j = 0; j < animals.length; j++) { //Для каждого состояния
    const state = animals[j];
    state.counter = 0; //Счётчик популяции
    for (let i = 0; i < state.initial; i++) new Animal(j); //Создание животных
  }
  
  //Инициализация грибов:
  for (let j = 0; j < funguses.length; j++) { //Для каждого состояния
    const state = funguses[j];
    state.counter = 0; //Счётчик популяции
    for (let i = 0; i < state.initial; i++) new Mycelium(j); //Создание грибниц
  }
  
  for (let i = 0; i < options.flycount; i++) new Fly(); //Инициализация мух
  
  sort(); //Сортировка
  
  interval = setInterval(frame_, fpsTime); //Установка интервала
}

function frame_() { //Метод кадра
  const FPS = 1000/(performance.now()-lastFrame); //Текущее количество кадров в секунду
  lastFrame = performance.now(); //Установка последнего кадра
  
  if (!pause) {
    //Расчёт суммарной популяции:
    let sum = 0;
    for (let i = 0; i < sorted.length; i++) sum += sorted[i].counter;
    
    //Сохранение популяций:
    let counts = [];
    for (let i = 0; i < plants.length; i++) counts.push({ count: plants[i].counter, state: plants[i] });
    for (let i = 0; i < animals.length; i++) counts.push({ count: animals[i].counter, state: animals[i] });
    for (let i = 0; i < funguses.length; i++) counts.push({ count: funguses[i].counter, state: funguses[i] });
    counts.sum = sum;
    stats.push(counts);
    
    for (let i = 0; i < arr.length; i++) if (arr[i].avail) arr[i].obj.handler(); //Обработка объектов
    for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) ground[x][y].incr(); //Восстановление минералов
  }
  
  while (arr.length && !arr[arr.length-1].avail) arr.pop(); //Очистка массива
  
  clear();
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
        const state = sorted[i];
        ctx.fillStyle = state.color;
        ctx.fillText(state.counter+" | "+state.name, S(490), S(180+(i*size*1.6)));
      }
      
      graph(); //Стандартный график
    } else biggraph(); //Большой график
    
    ctx.fillStyle = theme.text;
    ctx.font = S(18)+"px "+font;
    
    //Расчёт суммарной популяции:
    let sum = 0;
    for (let i = 0; i < sorted.length; i++) sum += sorted[i].counter;
    
    ctx.fillText(sum + " | сумма", S(490), S(style.biggraph ? 350:150));
    
    //Отрисовка мини-статистики:
    ctx.fillText("Время: "+flr(timeNow()/1000)+"с", S(490), S(style.biggraph ? 260:30)); //Игровое время
    ctx.fillText("FPS: "+flr(FPS)+" x"+(options.showspeed ?? 1), S(490), S(style.biggraph ? 290:60)); //Текущее количество кадров в секунду
    ctx.fillText(`Расчёт: ${Math.floor(performance.now()-lastFrame)}мс`, S(490), S(style.biggraph ? 320:90)); //Время на расчёт кадра
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
  
  if (x > 850 && y > 400) { //Кнопка "Пауза/Продолжить"
    vib(50);
    pause = !pause;
  }
  
  if (pause && x > 800 && x < 850 && y > 400) { //Кнопка "Заново"
    vib(100);
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