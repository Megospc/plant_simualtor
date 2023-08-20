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

"use strict";

const version = "1.7.7"; //Версия программы
const fps = 30; //Количество кадров в секунду
const fpsTime = 1000/fps; //Миллисекунд на кадр
const font = "Monospace"; //Шрифт текста
const anim = 1.5; //Размер анимаций
const defaultJSON = `{
  "name": "по умолчанию",
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
    "flych": 0.01,
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
    "fireprob": 0.05,
    "firezone": 30,
    "firetime": 500,
    "water": 0.00001,
    "iwater": 0.005,
    "awater": 0.001,
    "airblue": 500000,
    "airgreen": 500000,
    "airred": 500000,
    "fairblue": -5,
    "fairred": 5
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
    "watercolor": "#b0ffff",
    "waterstcolor": "#00a0a0",
    "air": 35,
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
      "cleaner": 1,
      "airred": -2,
      "airblue": 2
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
      "boom": 0.5,
      "airred": -1,
      "airblue": 1
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
      "nutrient": true,
      "airred": -2,
      "airblue": 2
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
      "fire": 0.0005,
      "airblue": -3,
      "airgreen": 3
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
      "slezone": 100,
      "airred": -3,
      "airblue": 3
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
      "creeper": 1,
      "quprob": 0.2,
      "quzone": 50
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
      "pazone": 50,
      "airblue": -1,
      "airgreen": 1
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
      "stomper": 0.5,
      "airblue": -5,
      "airred": 5,
      "airnblue": 5000
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
      "fvalue": 50,
      "airblue": -8,
      "airred": 8,
      "airnblue": 10000,
      "division": 0.1,
      "divzone": 50,
      "hide": 3000,
      "hideprob": 0.01
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
      "carn": true,
      "airblue": -5,
      "airred": 5,
      "airnblue": 7000
    }
  ],
  "funguses": [
    {
      "name": "грибы",
      "color": "#502800",
      "max": 420,
      "initial": 1,
      "consr": 0.03,
      "consg": 0.03,
      "consb": 0.03,
      "grow": 0.5,
      "mul": 0.01,
      "ngrowmin": 100,
      "ngrowmax": 200,
      "mycor": 1,
      "amycor": 0.1,
      "airblue": -2,
      "airred": 2,
      "expecs": 1,
      "airnblue": 3000
    },
    {
      "name": "грибы-мутанты",
      "color": "#808080",
      "max": 420,
      "initial": 1,
      "consr": 0.03,
      "consg": 0.03,
      "consb": 0.03,
      "grow": 0.5,
      "mul": 0.01,
      "ngrowmin": 100,
      "ngrowmax": 200,
      "expecs": 30,
      "airgreen": -1,
      "airblue": 1
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
var RANDOM; //Случайные числа
var rseed; //Случачайное семя
var frame; //Счётчик кадров
var arr; //Массив объектов
var ground; //Массив земли
var scale; //Масштаб поля
var cscale; //Масштаб холста
var started = false; //Запущенна ли симуляция?
var astats = 0; //Лист расширенной статистики
var arendered = false; //Отрисованный лист
var lastFrame; //Последний кадр
var sorted; //Массив отсортированной статистики
var stats; //Массив сохранённой статистики
var interval; //Интервал функции кадра
var pause; //Симуляция на паузе?
var cprops; //Характеристики холста
var counters; //Счётчики
var time; //Счётчик реального времени
var stime; //Время старта
var mods; //Объект модификаций
var ptime; //Время на расчёт
var timer; //Таймер
const S = x => x*cscale; //Функция масштабирования холста
const timeNow = () => frame*fpsTime; //Функция игрового времени

function clear() { //Метод очистки холста
  ctx.fillStyle = "#ffffff";
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

function sort(id = "count") { //Метод сортировки статистики
  sorted = []; //Очистка массива
  
  function fill(arr, id, type) { //Метод заполнения массива
    for (let i = 0; i < arr.length; i++) {
      const state = arr[i];
      if (!state.hiddenstat) sorted.push({ counter: counters[id][i], state, type }); //Если не указанно "не отображать на статистике"
    }
  }
  
  //Заполнение массива:
  fill(plants, "plants", "plant");
  fill(animals, "animals", "animal");
  fill(funguses, "funguses", "fungus");
  if (counters.fly.history) sorted.push({ state: { color: style.flycolor, name: "мухи" }, counter: counters.fly, type: "fly" }); //Добавление мух
  if (counters.fire.history) sorted.push({ state: { color: style.firecolor, name: "пожар" }, counter: counters.fire, type: "fire" }); //Добавление огня
  if (counters.water.history) sorted.push({ state: { color: style.waterstcolor, name: "наводнение" }, counter: counters.water, type: "water" }); //Добавление огня
  
  if (style.sort) sorted.sort((a, b) => a.counter[id] > b.counter[id] ? -1:1); //Сортировка
}

function graph(size, x, y, s, m, c, l, j) { //Отрисовка графиков
  //Массивы информации:
  const p = stats.plants.map((x, i) => ({ arr: x, state: plants[i] })); //Растения
  const a = stats.animals.map((x, i) => ({ arr: x, state: animals[i] })); //Животные
  const f = stats.funguses.map((x, i) => ({ arr: x, state: funguses[i] })); //Грибы
  const data = p.concat(a).concat(f);
  
  sgraph(data.length ? data:[{ arr: new Array(frame).fill(0), state: { color: "#00000000" } }], x, y, size, size/2, s, m ?? style.graphmove, c, l, j);
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
    obj, //Объект
    type //Тип объекта
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

function consair(s, m = 1) { //Функция потребления газов
  if (options.airred) { //Углекислый газ
    if (s.airred) {
      counters.air.red += s.airred*m; //Потребление
      if (counters.air.red < 0) { //Если уровень ниже нуля
        counters.air.red = 0;
        return false;
      }
    }
    if (counters.air.red < s.airnred) if (!prob(s.aair)) return false; //Если не достаточно
    if (s.airdred) if (counters.air.red > s.airdred) if (!prob(s.aair)) return false; //Если слишком много
  }
  if (options.airgreen) { //Метан
    if (s.airgreen) {
      counters.air.green += s.airgreen*m; //Потребление
      if (counters.air.green < 0) { //Если уровень ниже нуля
        counters.air.green = 0;
        return false;
      }
    }
    if (counters.air.green < s.airngreen) if (!prob(s.aair)) return false; //Если не достаточно
    if (s.airdgreen) if (counters.air.green > s.airdgreen) if (!prob(s.aair)) return false; //Если слишком много
  }
  if (options.airblue) { //Кислород
    if (s.airblue) {
      counters.air.blue += s.airblue*m; //Потребление
      if (counters.air.blue < 0) { //Если уровень ниже нуля
        counters.air.blue = 0;
        return false;
      }
    }
    if (counters.air.blue < s.airnblue) if (!prob(s.aair)) return false; //Если не достаточно
    if (s.airdblue) if (counters.air.blue > s.airdblue) if (!prob(s.aair)) return false; //Если слишком много
  }

  return true;
}

class Ground { //Класс земли
  constructor() {
    //Минералы:
    this.r = options.gred;
    this.g = options.ggreen;
    this.b = options.gblue;
    
    if (options.water && prob(options.iwater)) { //Наводнение
      this.water = true;
      
      //Обновление счётчиков:
      counters.water.count++;
      counters.water.history++;
    } else this.water = false;
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
    //Обработка наводнения:
    if (this.water) {
      if (options.awater && prob(options.awater)) {
        this.water = false;
        counters.water.count--; //Обновление счётчика
      }
    } else {
      if (options.water && prob(options.water)) {
        this.water = true;
        
        //Обновление счётчиков:
        counters.water.count++;
        counters.water.history++;
      }
    }
    
    this.add(options.gired, options.gigreen, options.giblue); //Восстановление минералов
  }
  add(r = 0, g = 0, b = 0) { //Метод добавки минералов
    this.r += r;
    this.g += g;
    this.b += b;
  }
  render(x, y, w, h) { //Метод отрисовки
    if (this.water) { //Отрисовка воды
      ctx.fillStyle = style.watercolor;
      ctx.fillRect(S(x), S(y), S(w), S(h));
    } else { //Отрисовка земли
      const f = (x, m) => hex(x/m*style.ground+(255-style.ground));
      ctx.fillStyle = "#"+f(this.r, options.gred)+f(this.g, options.ggreen)+f(this.b, options.gblue);
      ctx.fillRect(S(x), S(y), S(w), S(h));
    }
  }
  click() { //Метод добавки кликом
    this.r += options.cred;
    this.g += options.cgreen;
    this.b += options.cblue;
  }
}

class Fire { //Класс огоньков
  constructor(x, y) {
    //Усатновка координат:
    this.x = x;
    this.y = y;
    
    this.time = timeNow(); //Время появления
    this.anim = { //Анимация
      now: 128,
      next: rand(style.fireanimmin, style.fireanimmax)
    };
    
    this.id = register(this, "fire"); //Регистрация огня
    
    //Обновление счётчиков:
    counters.fire.count++;
    counters.fire.history++;
  }
  dead() { //Метод тушения
    deregister(this.id); //Дерегистрация огня
    counters.fire.count--; //Обновление счётчика
  }
  handler() { //Метод обработки
    const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под огнём
    
    if (gnd.water) { //Тушение от наводнения
      this.dead();
      return;
    }
    
    if (!consair({
      airred: options.fairred,
      airgreen: options.fairgreen,
      airblue: options.fairblue
    })) {
      this.dead();
      return;
    }
    
    forall(this, ["plant", "animal", "egg", "fly", "mushroom"], function(p, o, s) { //Возгорание
      if (zone(o, this, options.firezone)) if (prob(options.fireprob)) { //Если растение в зоне и вероятность сбылась
        if (p.type == "plant" || p.type == "animal" || p.type == "egg") if (prob(s.afire)) return; //Если защита объекта сработала — пропустить
        if (p.type == "plant" && o.faze) new Fire(o.x, o.y); //Если это растение не в фазе семени — появление огня
        o.dead(); //Объект сгорает
      }
    });
    if (timeNow() > this.time+(options.firetime ?? 1000)) this.dead(); //Тушение со временем
  }
  render() { //Метод отрисовки
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
      
      if (!pause) { //Изменение альфа-канала:
        this.anim.now = this.anim.now+(this.anim.next-this.anim.now)*style.fireanimc;
        if (frame%style.fireanimr == 0) this.anim.next = rand(style.fireanimmin, style.fireanimmax);
      }
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
    this.hide = false; //Под бронёй?
    
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
    if (state.timemin && state.timemax) this.time = timeNow()+rand(state.timemin, state.timemax); //Свойство "Старость"
    
    //Обновление счётчиков:
    counters.animals[this.state].count++;
    counters.animals[this.state].history++;
  }
  dead(h) { //Метод смерти
    const state = animals[this.state]; //Вид животного
    counters.animals[this.state].count--;//Обновление счётчика
    
    if (h) { //Свойство "Разложение":
      const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под животным
      gnd.add(state.gred, state.ggreen, state.gblue);
    }
    
    if (state.sayprob && state.say) forall(this, ["animal"], function(p, o, s) { //Свойство "Переговоры"
      if (s.say == state.say) if (prob(state.say)) { //Если животное того же языка и вероятность сбылась
        //Разницы позиций:
        const dx = o.x-this.x;
        const dy = o.y-this.y;
        
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
    const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под животным
    
    if (gnd.water && !state.water) return void this.dead(); //Смерть от наводнения
    if (!consair(state)) return void this.dead(); //Потребление газов
    
    if (this.sleep) { //Обработка сна
      if (timeNow() > this.sleep) this.sleep = false; //Пробуждение
      else { //Проверка сна
        this.hungry -= state.slehun ?? 0; //Потребление еды
        if (this.hungry < 0) this.dead(true); //Смерть от голода
        return; //Конец обработки
      }
    }
    
    if (this.hide) { //Обработка брони
      if (timeNow() > this.hide) this.hide = false;
      else {
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
    
    if (!this.hide && state.hide) if (prob(state.hideprob)) { //Свойство "Броненосец"
      this.hide = timeNow()+state.hide;
      this.anim(300);
    }
    
    if (this.time) if (timeNow() > this.time) return void this.dead(); //Свойство "Старость"
    
    if (state.sleprob && state.sleep && state.slezone) forall(this, ["animal"], function(p, o, s) { //Свойство "Гипноз"
      if (o.state == this.state) return; //Если животное того же вида — пропустить
      if (zone(o, this, state.slezone)) if (prob(state.sleprob)) o.tosleep(state.sleep); //Если животное в зоне и вероятность сбылась, то оно засыпает
    });
    
    if (state.division && state.divzone) forall(this, ["animal"], function(p, o, s) { //Свойство "Деление"
      if (o.state == this.state) if (zone(o, this, state.divzone)) if (prob(state.division)) { //Если животное того же вида, находится в зоне и вероятность сбылась
        const r = this.hungry-o.hungry; //Разница очков сытости
        if (r > 0) {
          this.hungry -= r/2;
          o.hungry += r/2;
        }
      }
    });
    
    if (state.paprob && state.parasite && state.pazone) forall(this, ["animal"], function(p, o, s) { //Свойство "Паразит"
      if (p.state == this.state) return; //Если животное того же вида — пропустить
      if (zone(o, this, state.pazone)) if (prob(state.paprob)) { //Если животное в зоне и вероятность сбылась
        const a = o.hungry < state.parasite ? o.hungry:state.parasite; //Количество забираемой сытости
        o.hungry -= a; //Уменьшение сытости жертвы
        this.hungry += a; //Прибавление сытости
      }
    });
    
    if (state.carn) { //Свойство "Хищное"
      if (state.prob && state.zone) forall(this, ["animal", "plant"], function(p, o, s) { //Атака
        if (p.type == "plant") { //Если это растение
          if (!s.nutrient) return; //Если растение не питательное — пропустить
          if (o.faze == 0) return; //Если это семя — пропустить
        } else {
          if (o.state == this.state) return; //Если животное того же вида — пропустить
          if (o.hide) return; //Если животное в броне — пропустить
        }
          
        if (s.big && !state.big) return; //Свойство "Большое"
        if (zone(o, this, state.zone)) if (prob(state.prob)) { //Если растение в зоне атаки и вероятность сбылась
          if (prob(s.protect)) return; //Если защита объекта сработала
          if (p.type == "plant") {
            if (prob(s.boom)) o.fruits(); //Свойство "Взрывное"
            if (!prob(state.stomper)) this.hungry += (s.fvalue ?? 50)*(o.faze == 1 ? o.grow/s.faze:1); //Прибавление сытости и свойство "Топотун"
            if (prob(s.cleaner && this.hungry > state.hungry)) this.hungry = state.hungry; //Свойство "Очистка"
          } else {
            this.hungry += s.fvalue ?? 50; //Прибавление сытости
            if (state.vampire) this.hungry += state.vampire*o.hungry; //Свойство "Вампиризм"
          }
          o.dead(); //Объект погибает
          if (prob(s.toxic)) { //Свойство "Ядовитое"
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
          if (!prob(state.stomper)) this.hungry += (s.fvalue ?? 50)*(o.faze == 1 ? o.grow/s.faze:1); //Прибавление сытости и свойство "Топотун"
          if (p.type == "plant") if (prob(s.cleaner) && this.hungry > state.hungry) this.hungry = state.hungry; //Свойство "Очистка"
          o.dead(); //Растение погибает
          if (prob(s.toxic)) { //Свойство "Ядовитое"
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
    if (this.hungry < 0) return void this.dead(true); //Смерть от голода
  }
  render() { //Метод отрисовки
    const state = animals[this.state]; //Вид животного
    function fig(size) {
      const s = style.size*size;
      ctx.beginPath();
      if (this.hide) { //Броня
        ctx.moveTo(S((this.x-s/6)*scale+15), S((this.y-s/2)*scale+15));
        ctx.lineTo(S((this.x+s/6)*scale+15), S((this.y-s/2)*scale+15));
        ctx.lineTo(S((this.x+s/2)*scale+15), S((this.y-s/6)*scale+15));
        ctx.lineTo(S((this.x+s/2)*scale+15), S((this.y+s/6)*scale+15));
        ctx.lineTo(S((this.x+s/6)*scale+15), S((this.y+s/2)*scale+15));
        ctx.lineTo(S((this.x-s/6)*scale+15), S((this.y+s/2)*scale+15));
        ctx.lineTo(S((this.x-s/2)*scale+15), S((this.y+s/6)*scale+15));
        ctx.lineTo(S((this.x-s/2)*scale+15), S((this.y-s/6)*scale+15));
      } else {
        ctx.moveTo(S(this.x*scale+15), S((this.y-s/2)*scale+15));
        ctx.lineTo(S((this.x+s/2)*scale+15), S(this.y*scale+15));
        ctx.lineTo(S(this.x*scale+15), S((this.y+s/2)*scale+15));
        ctx.lineTo(S((this.x-s/2)*scale+15), S(this.y*scale+15));
      }
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
  anim(len) { //Метод анимации
    //Сохранение параметров:
    this.atime = timeNow();
    this.alen = len;
  }
}

class Mushroom { //Класс грибов-плодов
  constructor(state, x, y) {
    this.grow = 0; //Счётчик роста
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
    
    if (gnd.water && !state.water) return void this.dead(); //Смерть от наводнения
    
    //Потребление:
    res &&= gnd.red(state.consr);
    res &&= gnd.green(state.consg);
    res &&= gnd.blue(state.consb);
    
    if (!res) return void this.dead(); //Смерть от недостатка минералов
    
    this.grow++; //Рост
    if (this.grow >= this.ngrow) { //Полный рост
      new Mycelium(this.state, this.x, this.y);
      return void this.dead();
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
    
    let saves = state.expecs ?? 0; //Счётчик исключений
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
      
      if (g.water && !state.water) res = false; //Смерть от наводнения
      
      //Потребление:
      res &&= g.red(state.consr*cc);
      res &&= g.green(state.consg*cc);
      res &&= g.blue(state.consb*cc);
      
      if (!res) { //Смерть от недостатка минералов
        if (saves >= 1) saves--; //Если есть исключения, трата исключения
        else return void this.dead(); //Если нет — смерть
      }
    }
    
    if (!consair(state, gnds.length**1.5)) return void this.dead(); //Потребление газов
    
    if (prob(state.mul)) new Mushroom(this.state, rand(this.x-this.grow/2, this.x+this.grow/2), rand(this.y-this.grow/2, this.y+this.grow/2)); //Размножение
    this.grow = Math.min(this.grow+(state.grow ?? 1), state.max); //Рост
  }
  render() {
    if (style.funga) {
      const state = funguses[this.state]; //Вид грибницы
      const fsize = options.size*options.gsize; //Полный размер
      const f = x => Math.min(Math.max(x, 0), fsize);
      const h = this.grow/2;
      const x = this.x;
      const y = this.y;
      ctx.fillStyle = state.color+hex(style.funga);
      
      function draw(x0, y0, x1, y1) {
        ctx.beginPath();
        ctx.moveTo(S(f(x0)*scale+15), S(f(y0)*scale+15));
        ctx.lineTo(S(f(x1)*scale+15), S(f(y0)*scale+15));
        ctx.lineTo(S(f(x1)*scale+15), S(f(y1)*scale+15));
        ctx.lineTo(S(f(x0)*scale+15), S(f(y1)*scale+15));
        ctx.closePath();
        ctx.fill();
      }
      
      draw(x-h, y-h, x+h, y+h);
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
    
    if (gnd.water && !state.water) return void this.dead(); //Смерть от наводнения
    if (!consair(state)) return void this.dead(); //Потребление газов
    
    if (state.quprob && state.quzone) forall(this, ["fire"], function(p, o) { //Свойство "Тушение"
      if (zone(o, this, state.quzone)) if (prob(state.quprob)) o.dead();
    });
    
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
      if (zone(o, this, state.pazone)) if (prob(state.paprob)) { //Если растение в зоне и вероятность сбылась
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
        
        if (this.faze > 1) this.anim(300); //Анимация
        
        if (this.faze == 4) { //Полный рост
          this.fruits(); //Разброс плодов
          
          if (state.repeat > this.repeat) { //Свойство "Повтор"
            this.repeat++; //Обновление счётчика повторений
            this.ngrow = rand(state.rtimemin, state.rtimemax); //Установка таймера
          } else return void this.dead(); //Смерть (конец жизненного цикла)
        }
      }
      
      if (this.faze == 5) this.faze = 2; //Конец отдыха
    } else return void this.dead(); //Минерала недостаточно — смерть
    
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
      if (c < state.creeper && prob(state.creeprob)) return void this.dead(); //Если растений недостаточно и вероятность сбылась — смерть
    }
    
    if (this.faze && prob(state.fire)) { //Свойство "Возгорание"
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
  fruits() { //Метод разброса семян
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

function start(seed) { //Метод инициализации
  //Случайные числа:
  rseed = seed ?? (Math.random()*99999+1);
  rseed = Math.floor(rseed);
  RANDOM = randf(rseed);
  
  frame = 0; //Сброс счётчика
  lastFrame = performance.now(); //Сброс последнего кадра
  time = 0; //Сброс реального времени
  ptime = fpsTime/options.showspeed; //Сброс времени на расчёт
  stime = performance.now(); //Сохранение текущего времени
  timer = 0; //Сброс таймера
  arr = []; //Очистка массива объектов
  pause = false; //Не пауза
  const fsize = options.size*options.gsize; //Полный размер поля
  scale = 420/fsize; //Установка масштаба
  
  stats = { //Очистка сохранённой статистики
    air: {
      red: [],
      green: [],
      blue: []
    },
    ground: {
      red: [],
      green: [],
      blue: []
    },
    fly: [],
    fire: [],
    water: [],
    plants: [],
    animals: [],
    funguses: [],
    perf: {
      len: [],
      time: [],
      sum: []
    }
  };
  counters = { //Устновка счётчиков
    air: {
      red: options.airred,
      green: options.airgreen,
      blue: options.airblue
    },
    ground: {
      red: options.airred,
      green: options.airgreen,
      blue: options.airblue
    },
    fly: { count: 0, history: 0 },
    fire: { count: 0, history: 0 },
    water: { count: 0, history: 0 },
    plants: [],
    animals: [],
    funguses: [],
    clicks: 0,
    randoms: 0
  };
  
  mods = { //Установка модификаций
    add: false,
    draw: false,
    cblock: false
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
  
  for (let i = 0; i < options.flycount; i++) new Fly(); //Инициализация мух
  
  sort(); //Сортировка
  
  interval = setInterval(frame_, fpsTime/options.showspeed); //Установка интервала
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
  
  if (mods.draw) return; //Остановка при рисовании
  
  if (astats) { //Расширенная статистика
    if (arendered) return; //Если уже отрисованно — пропустить
    
    clear();
    ctx.fillStyle = "#d0d0d0";
    ctx.beginPath();
    ctx.moveTo(S(45), S(20));
    ctx.lineTo(S(20), S(35));
    ctx.lineTo(S(45), S(50));
    ctx.closePath();
    ctx.fill();
    
    if (astats < 8) {
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
          
          //Отрисовка статистики:
          const size = Math.min(200/sorted.length, 18); //Размер шрифта
          ctx.font = S(size)+"px "+font;
          for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i]; //Объект
            const s = p.state; //Вид
            const c = p.counter; //Счётчик
            
            let str = c.count.toString();
            if (c.eggs) str += " ("+c.eggs+")";
            if (c.fruits) str += " ("+c.fruits+")";
            str += " | ";
            str += s.name;
            
            ctx.fillStyle = s.color;
            ctx.fillText(str, S(80), S(80+i*size*1.6), S(380));
          }
          
          rgraph(sorted.map(x => ({ state: x.state, value: x.counter.count })), 700, 225, 150, mods.stats);
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
          
          //Отрисова статистики:
          const size = Math.min(200/sorted.length, 18); //Размер шрифта
          ctx.font = S(size)+"px "+font;
          for (let i = 0; i < sorted.length; i++) {
            const p = sorted[i]; //Объект
            const s = p.state; //Вид
            const c = p.counter.history; //Счётчик
            
            ctx.fillStyle = s.color;
            ctx.fillText(c+" | "+s.name, S(80), S(80+i*size*1.6), S(380));
          }
          
          rgraph(sorted.map(x => ({ state: x.state, value: x.counter.history })), 700, 225, 150, mods.stats);
        }
        break;
      case 3:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("График:", S(450), S(30));
          ctx.textAlign = "left";
          
          graph(860, 20, 20, mods.stats, false, mods.crop, mods.start, mods.max);
        }
        break;
      case 4:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Другие объекты:", S(450), S(30));
          ctx.font = S(18)+"px "+font;
          ctx.fillText("Мухи:", S(235), S(60));
          ctx.fillText("Пожар:", S(655), S(60));
          ctx.fillText("Наводнение:", S(235), S(260));
          ctx.fillText("Минералы:", S(655), S(260));
          ctx.textAlign = "left";
          
          sgraph([{ arr: stats.fly, state: { color: style.flycolor } }], 50, 60, 350, 175, mods.stats, false, mods.crop, mods.start, mods.max);
          sgraph([{ arr: stats.fire, state: { color: style.firecolor } }], 470, 60, 350, 175, mods.stats, false, mods.crop, mods.start, mods.max);
          sgraph([{ arr: stats.water, state: { color: style.waterstcolor } }], 50, 260, 350, 175, mods.stats, false, mods.crop, mods.start, mods.max);
          sgraph([
            { arr: stats.ground.red, state: { color: "#a00000" } },
            { arr: stats.ground.green, state: { color: "#00a000" } },
            { arr: stats.ground.blue, state: { color: "#0000a0" } }
          ], 470, 260, 350, 175, mods.stats, false, mods.crop, mods.start, mods.max);
        }
        break;
      case 5:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Состояние земли:", S(450), S(30));
          ctx.textAlign = "left";
          
          //Количество минералов:
          const r = counters.ground.red;
          const g = counters.ground.green;
          const b = counters.ground.blue;
          
          //Отрисовка количества минералов:
          ctx.font = S(18)+"px "+font;
          ctx.fillStyle = "#a00000";
          ctx.fillText(numstr(r)+" | красный", S(80), S(80), S(380));
          ctx.fillStyle = "#00a000";
          ctx.fillText(numstr(g)+" | зелёный", S(80), S(110), S(380));
          ctx.fillStyle = "#0000a0";
          ctx.fillText(numstr(b)+" | синий", S(80), S(140), S(380));
          
          //Отрисовка суммарного состояния:
          ctx.font = S(24)+"px "+font;
          ctx.fillStyle = "#000000";
          const c = options.size**2;
          ctx.fillText(flr((r+g+b)/Math.max(options.gred+options.ggreen+options.gblue, 1)/c*100)+"%", S(80), S(170), S(380));
          
          //Отрисовка "Карты минералов":
          const f = (x, m) => hex(x/m*128+127);
          const s = 200/options.size;
          for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) {
            const gnd = ground[x][y];
            ctx.fillStyle = "#"+f(gnd.r, options.gred)+f(gnd.g, options.ggreen)+f(gnd.b, options.gblue);
            ctx.fillRect(S(80+x*s), S(200+y*s), S(s), S(s));
          }
          
          //Обработка выделения:
          const d = mods.stats;
          if (d) if (d.x >= 80 && d.x < 280 && d.y >= 200 && d.y < 400) {
            const g = ground[Math.floor((d.x-80)/s)][Math.floor((d.y-200)/s)];
            ctx.textAlign = "center";
            ctx.font = S(8)+"px "+font;
            ctx.shadowColor = "#000000";
            ctx.shadowBlur = S(5);
            ctx.fillStyle = "#ffffff";
            ctx.fillText(flr((g.r+g.g+g.b)/(options.gred+options.ggreen+options.gblue)*100, 100)+"%", S(d.x), S(d.y-8));
            ctx.shadowBlur = 0;
            ctx.textAlign = "left";
          }
          
          rgraph([
            { state: { color: "#a00000", name: "красный" }, value: r },
            { state: { color: "#00a000", name: "зелёный" }, value: g },
            { state: { color: "#0000a0", name: "синий" }, value: b }
          ], 700, 225, 150, mods.stats);
        }
        break;
      case 6:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Состояние атмосферы:", S(450), S(30));
          ctx.textAlign = "left";
          
          const r = counters.air.red, g = counters.air.green, b = counters.air.blue; //Количество газов
          
          //Отрисовка количества газов:
          ctx.font = S(18)+"px "+font;
          ctx.fillStyle = "#a00000";
          ctx.fillText(numstr(r)+" | углекислый газ", S(80), S(80), S(380));
          ctx.fillStyle = "#00a000";
          ctx.fillText(numstr(g)+" | метан", S(80), S(110), S(380));
          ctx.fillStyle = "#0000a0";
          ctx.fillText(numstr(b)+" | кислород", S(80), S(140), S(380));
          
          //Отрисовка суммарного состояния:
          ctx.font = S(24)+"px "+font;
          ctx.fillStyle = "#000000";
          ctx.fillText(flr((r+g+b)/Math.max(options.airred+options.airgreen+options.airblue, 1)*100)+"%", S(80), S(170), S(380));
          
          sgraph([
            { arr: stats.air.red, state: { color: "#a00000" } },
            { arr: stats.air.green, state: { color: "#00a000" } },
            { arr: stats.air.blue, state: { color: "#0000a0" } }
          ], 50, 240, 350, 175, mods.stats, false, mods.crop, mods.start, mods.max);
          
          rgraph([
            { state: { color: "#a00000", name: "углекислый газ" }, value: r },
            { state: { color: "#00a000", name: "метан" }, value: g },
            { state: { color: "#0000a0", name: "кислород" }, value: b }
          ], 700, 225, 150, mods.stats);
        }
        break;
      case 7:
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
          ctx.fillText("Количество случайных чисел: "+numstr(counters.randoms), S(20), S(260), S(860));
          ctx.fillText("Случайное семя: "+rseed, S(20), S(290), S(860));
          ctx.fillText("Количество добавок кликом: "+counters.clicks, S(20), S(320), S(860));
        }
        break;
      case 8:
        {
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.font = S(24)+"px "+font;
          ctx.fillText("Производительность:", S(450), S(30));
          ctx.font = S(18)+"px "+font;
          ctx.fillText("Расчёт:", S(235), S(110));
          ctx.fillText("Количество ячеек:", S(685), S(110));
          ctx.textAlign = "left";
          
          sgraph([
            { arr: stats.perf.time, state: { color: "#000000" } },
            { arr: new Array(stats.perf.time.length).fill(fpsTime/(options.showspeed ?? 1)), state: { color: "#00a00080" } }
          ], 20, 120, 430, 215, mods.stats, false, mods.crop, mods.start, mods.max);
          sgraph([
            { arr: stats.perf.len, state: { color: "#000000" } },
            { arr: stats.perf.sum, state: { color: "#00a00080" } }
          ], 470, 120, 430, 215, mods.stats, false, mods.crop, mods.start, mods.max);
        }
        break;
    }
    arendered = true;
    
    //Кнопка "Скриншот":
    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(S(850), S(405), S(30), S(20));
    ctx.fillRect(S(870), S(400), S(5), S(5));
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(S(860), S(410), S(10), S(10));
    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(S(863), S(413), S(4), S(4));
    return;
  }
  
  if (!pause && timer && timeNow() >= timer) { //Обработка таймера
    timer = 0;
    vib([1000, 500, 1000]);
    pause = true;
  }
  
  if (!pause) {
    //Сохранение популяций:
    for (let i = 0; i < plants.length; i++) stats.plants[i].push(counters.plants[i].count);
    for (let i = 0; i < animals.length; i++) stats.animals[i].push(counters.animals[i].count);
    for (let i = 0; i < funguses.length; i++) stats.funguses[i].push(counters.funguses[i].count);
    
    //Расчёт суммарной популяции:
    let sum = 0;
    for (let i = 0; i < sorted.length; i++) if (!sorted[i].type != "water") {
      sum += sorted[i].counter.count;
      sum += sorted[i].counter.eggs ?? 0;
      sum += sorted[i].counter.fruits ?? 0;
    }
    
    //Подсчёт минералов:
    counters.ground.red = 0;
    counters.ground.green = 0;
    counters.ground.blue = 0;
    for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) {
      const gnd = ground[x][y];
      counters.ground.red += gnd.r;
      counters.ground.green += gnd.g;
      counters.ground.blue += gnd.b;
    }
    
    //Сохранение производительности:
    stats.perf.len.push(arr.length);
    stats.perf.time.push(ptime);
    stats.perf.sum.push(sum);
    
    //Сохранение других объектов:
    stats.fly.push(counters.fly.count);
    stats.fire.push(counters.fire.count);
    stats.water.push(counters.water.count);
    
    //Сохранение атмосферы:
    stats.air.red.push(counters.air.red);
    stats.air.green.push(counters.air.green);
    stats.air.blue.push(counters.air.blue);
    
    //Сохранение минералов:
    stats.ground.red.push(counters.ground.red);
    stats.ground.green.push(counters.ground.green);
    stats.ground.blue.push(counters.ground.blue);
    
    if (options.flyadd && prob(options.flyadd)) for (let i = 0; i < options.flyaddc && counters.fly.count < options.flymax; i++) new Fly(); //Добавка мух
    for (let i = 0; i < arr.length; i++) if (arr[i].avail) arr[i].obj.handler(); //Обработка объектов
    for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) ground[x][y].handler(); //Обработка земли
  }
  
  while (arr.length && !arr[arr.length-1].avail) arr.pop(); //Очистка массива
  
  clear();
  if (style.ground) for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) ground[x][y].render(x*options.gsize*scale+15, y*options.gsize*scale+15, options.gsize*scale, options.gsize*scale); //Отрисовка земли
  for (let i = 0; i < arr.length; i++) if (arr[i].avail) arr[i].obj.render(); //Отрисовка объекто
  
  //Отрисовка атмосферы:
  if (options.airred) { //Отрисовка углекислого газа:
    ctx.fillStyle = "#a00000"+hex((1-counters.air.red/options.airred)*style.air);
    ctx.fillRect(S(5), S(5), S(440), S(440));
  }
  if (options.airgreen) { //Отрисовка метана:
    ctx.fillStyle = "#00a000"+hex((1-counters.air.green/options.airgreen)*style.air);
    ctx.fillRect(S(5), S(5), S(440), S(440));
  }
  if (options.airblue) { //Отрисовка кислорода:
    ctx.fillStyle = "#0000a0"+hex((1-counters.air.blue/options.airblue)*style.air);
    ctx.fillRect(S(5), S(5), S(440), S(440));
  }
  
  //Отрисовка "бортиков":
  ctx.fillStyle = "#d0d0d0";
  ctx.fillRect(0, 0, S(450), S(15));
  ctx.fillRect(0, S(435), S(450), S(15));
  ctx.fillRect(0, 0, S(15), S(450));
  ctx.fillRect(S(435), 0, S(15), S(450));
  
  if (!style.onlygame) { //Отрисовка доп-информации
    if (!style.biggraph) {
      sort(); //Сортировка статистики
      
      //Отрисовка статистики:
      const size = Math.min(140/sorted.length, 18); //Размер текста
      ctx.fillStyle = "#000000";
      ctx.font = S(18)+"px "+font;
      ctx.fillText("Статистика:", S(490), S(120))
      ctx.font = S(size)+"px "+font;
      for (let i = 0; i < sorted.length; i++) { //Отрисовка статистики
        const p = sorted[i];
        const c = p.counter;
        const s = p.state;
        let str = "";
        str += c.count;
        if (c.eggs) str += " ("+c.eggs+")";
        if (c.fruits) str += " ("+c.fruits+")";
        str += " | ";
        str += s.name;
        ctx.fillStyle = s.color;
        ctx.fillText(str, S(490), S(180+i*size*1.6), S(380));
      }
      
      graph(200, 670, 10); //Стандартный график
    } else graph(420, 470, 10); //Большой график
    
    ctx.fillStyle = "#000000";
    ctx.font = S(18)+"px "+font;
    
    //Расчёт суммарной популяции:
    let sum = 0;
    for (let i = 0; i < sorted.length; i++) if (!sorted[i].type != "water") sum += sorted[i].counter.count;
    
    ctx.fillText(sum + " | сумма", S(490), S(style.biggraph ? 350:150));
    
    //Отрисовка мини-статистики:
    ctx.fillText("Время: "+flr(timeNow()/1000)+"с", S(490), S(style.biggraph ? 260:30), S(style.biggraph ? 400:180)); //Игровое время
    ctx.fillText("FPS: "+flr(FPS)+" x"+options.showspeed, S(490), S(style.biggraph ? 290:60), S(style.biggraph ? 400:180)); //Текущее количество кадров в секунду
    
    const pt = performance.now()-lastFrame; //Расчёт
    ctx.fillText("Расчёт: "+Math.floor(pt)+"мс", S(490), S(style.biggraph ? 320:90), S(style.biggraph ? 400:180)); //Время на расчёт кадра
    if (!pause) ptime = pt; //Сохранение производительности
  }
  
  if (pause) { //Отрисовка меню возможностей
    ctx.fillStyle = "#d0d0d0";
    
    //Кнопка "Продолжить":
    ctx.beginPath();
    ctx.moveTo(S(850), S(400));
    ctx.lineTo(S(870), S(415));
    ctx.lineTo(S(850), S(430));
    ctx.closePath();
    ctx.fill();
    
    //Кнопка "Заново":
    ctx.fillRect(S(800), S(400), S(30), S(30));
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(S(807), S(407), S(16), S(16));
    ctx.fillRect(S(820), S(415), S(16), S(20));
    ctx.fillStyle = "#d0d0d0";
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(S(730), S(410), S(10), S(10));
    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(S(733), S(413), S(4), S(4));
    
    //Кнопка "Статистика":
    ctx.beginPath();
    ctx.moveTo(S(695), S(415));
    ctx.arc(S(695), S(415), S(12), 0, d2r(300));
    ctx.fill();
    
    //Кнопка "Таймер":
    ctx.beginPath();
    ctx.arc(S(657), S(415), S(12), 0, PI*2);
    ctx.fill();
    ctx.fillRect(S(654), S(400), S(6), S(10));
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(S(657), S(415), S(9), 0, PI*2);
    ctx.fill();
    ctx.fillStyle = timer ? "#d08080":"#d0d0d0";
    ctx.fillRect(S(656), S(413), S(7), S(2));
    ctx.fillRect(S(656), S(408), S(2), S(7));
    ctx.fillStyle = "#d0d0d0";
    
    //Кнопка "Семя":
    ctx.beginPath();
    ctx.arc(S(617), S(415), S(12), 0, PI*2);
    ctx.fill();
    ctx.fillRect(S(614), S(400), S(6), S(10));
    ctx.fillRect(S(614), S(421), S(6), S(10));
    ctx.fillRect(S(602), S(412), S(10), S(6));
    ctx.fillRect(S(622), S(412), S(10), S(6));
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(S(617), S(415), S(8), 0, PI*2);
    ctx.fill();
  } else {
    //Кнопка "Пауза":
    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(S(850), S(400), S(10), S(30));
    ctx.fillRect(S(870), S(400), S(10), S(30));
    
    frame++; //Обновление счётчика кадров
  }
}

function srand() { //Установка семени
  const r = pnum("Введите семя:", 0, 100000);
  if (r) restart(r);
}

function gcancel() { //Сброс
  mods.crop = null;
  mods.start = null;
  mods.max = null;
  arendered = false;
}
function gcrop() { //Обрезка графика
  const r = pnum("Введите конец обрезки:", 0, frame/fps);
  mods.crop = r === null ? null:r*fps;
  arendered = false;
}
function gstart() { //Начало графика
  const r = pnum("Введите начало обрезки:", 0, frame/fps);
  mods.start = r === null ? null:r*fps;
  arendered = false;
}
function gup() { //Максимальный график
  mods.max = pnum("Введите максимальное значение:", 2, Infinity);
  arendered = false;
}

function stimer() { //Метод таймера
  const r = pnum("Введите длину таймера:", 0, Infinity);
  timer = r === null ? 0:timeNow()+r*1000;
}

function screenshot() { //Метод скришота
  //Создание копии холста:
  const s = $create('canvas');
  const scr = s.getContext('2d');
  s.width = canvas.width;
  s.height = canvas.height;
  scr.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
  
  //Изменение изображения (нанесение водяного знака):
  scr.fillStyle = "#ffffff";
  scr.fillRect(S(590), S(400), S(310), S(50));
  scr.font = S(24)+"px "+font;
  scr.fillStyle = "#000000";
  scr.fillText("Plant Simulator", S(630), S(430));
  
  const url = s.toDataURL('image/png'); //Получение base64-изображения
  download(url, `plant_simulator_screenshot_${obj.name}.png`); //Скачивание изображения
}
function sscreenshot() { //Метод скришота статистики
  //Создание копии холста:
  const s = $create('canvas');
  const scr = s.getContext('2d');
  s.width = canvas.width;
  s.height = canvas.height;
  scr.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
  
  //Изменение изображения (нанесение водяного знака):
  scr.fillStyle = "#ffffff";
  scr.fillRect(S(850), S(400), S(50), S(25));
  scr.fillRect(S(850), S(0), S(50), S(50));
  scr.fillRect(S(0), S(0), S(50), S(50));
  scr.font = S(18)+"px "+font;
  scr.fillStyle = "#000000";
  scr.fillText("Plant Simulator", S(700), S(30));
  
  const url = s.toDataURL('image/png'); //Получение base64-изображения
  download(url, `plant_simulator_screenshot_${obj.name}.png`); //Скачивание изображения
}

function sspeed() {
  const r = pnum("Введите скорость:", 0.001, 10);
  if (r !== null) {
    options.showspeed = r;
    clearInterval(interval);
    interval = setInterval(frame_, fpsTime/options.showspeed);
  }
}

//Передвижения по расширенной статистике:
function sleft() { //Влево
  arendered = false;
  astats--;
  if (!astats) {
    mods.stats = null;
    gcancel();
  }
}
function sright() { //Вправо
  if (astats < 8) {
    arendered = false;
    astats++;
    return true;
  }
  return false;
}

function restart(seed) { //Перезапуск симуляции
  clearInterval(interval);
  start(seed);
}

function cadd(x, y) { //Добавкка кликом
  if (mods.cblock) return; //Блокировка добавок
  
  const gnd = ground[Math.floor((x-15)/scale/options.gsize)][Math.floor((y-15)/scale/options.gsize)];
  gnd.click();
  counters.clicks++;
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
  
  if (x < 0 || x >= 900 || y < 0 || y >= 900) return; //Пропустить клик, если он за пределами холста
  
  if (astats) { //Расширенная статистика
    if (x < 50 && y < 50) { //Кнопка "Назад"
      vib(100);
      sleft();
    }
    if (x > 850 && y < 50) if (sright()) vib(100); //Кнопка "Вперёд"
    
    if (x > 850 && y > 400) { //Кнопка "Скриншот"
      vib(100);
      sscreenshot();
    }
    return;
  }
  
  if (x > 835 && y > 400) { //Кнопка "Пауза/Продолжить"
    vib(50);
    pause = !pause;
  }
  
  if (pause && x > 800 && x < 835 && y > 400) { //Кнопка "Заново"
    vib(100);
    restart();
  }
  if (pause && x > 760 && x < 790 && y > 400) { //Кнопка "Полный экран"
    vib(100);
    fullScreen(document.documentElement);
  }
  if (pause && x > 720 && x < 750 && y > 400) { //Кнопка "Скриншот"
    vib(100);
    screenshot();
  }
  if (pause && x > 680 && x < 710 && y > 400) { //Кнопка "Статистика"
    vib(100);
    astats = 1;
  }
  if (pause && x > 640 && x < 670 && y > 400) { //Кнопка "Таймер"
    vib(100);
    stimer();
  }
  if (pause && x > 600 && x < 630 && y > 400) { //Кнопка "Семя"
    vib(100);
    keydown({ code: "KeyG" });
  }
  
  if (x >= 15 && x < 435 && y >= 15 && y < 435 && !pause) { //Добавка кликом
    vib(30);
    cadd(x, y);
  }
}

function keydown(e) { //Зажатие клавиши
  if (!started) {
    if (e.code == "Space") click(); //Стартовый пробел
    return;
  }
  if (mods.add || mods.draw) return; //Необрабатывается при модификациях
  
  const key = e.code; //Код клавиши
  switch (key) {
    case "Space": if (!astats) pause = !pause; break;
    case "KeyA": if (!astats) mods.add = true; break;
    case "KeyS": if (!astats) pause = true; break;
    case "KeyD": mods.draw = true; break;
    case "KeyQ": if (pause && !astats) astats = 1; break;
    case "KeyW": if (pause) if (!astats) screenshot(); break;
    case "KeyE": if (pause) fullScreen(document.documentElement); break;
    case "KeyR": if (pause && !astats) restart(); break;
    case "KeyT": if (pause) stimer(); break;
    case "KeyF": if (astats) sscreenshot(); break;
    case "KeyB": style.biggraph = !style.biggraph; break;
    case "KeyN": style.onlygame = !style.onlygame; break;
    case "KeyM": style.graphmove = !style.graphmove; break;
    case "KeyC": if (astats == 3 || astats == 4 || astats == 6 || astats == 8) gstart(); break;
    case "KeyV": if (astats == 3 || astats == 4 || astats == 6 || astats == 8) gcrop(); break;
    case "KeyX": if (astats == 3 || astats == 4 || astats == 6 || astats == 8) gup(); break;
    case "KeyZ": if (astats == 3 || astats == 4 || astats == 6 || astats == 8) gcancel(); break;
    case "KeyG": if (!astats) srand(); break;
    case "KeyH": if (!astats) alert("Случайное семя: "+rseed); break;
    case "KeyP": if (!astats) sspeed(); break;
    case "KeyL": mods.cblock = !mods.cblock; break;
    case "ArrowLeft": if (astats) sleft(); break;
    case "ArrowRight": if (astats) sright(); break;
  }
}
function keyup(e) { //Поднятие клавиши
  if (!started) return;
  
  const key = e.code; //Код клавиши
  switch (key) {
    case "KeyA": if (!astats) mods.add = false; break;
    case "KeyS": if (!astats) pause = false; break;
    case "KeyD": mods.draw = false; ctx.shadowBlur = 0; arendered = 0; break;
  }
  mods.last = null;
}

function mousemove(e) { //Движение мышью
  if (!started) return;
  
  //Получение координат мыши:
  const x = ((e.pageX ?? e.touches[0].pageX)-cprops.left)/cprops.width*900;
  const y = ((e.pageY ?? e.touches[0].pageY)-cprops.top)/cprops.height*450;
  
  if (mods.add && x >= 15 && x < 435 && y >= 15 && y < 435) cadd(x, y); //Модификация "Добавка"
  
  if (mods.draw) { //Модификация "Рисование"
    ctx.strokeStyle = "#a00000";
    ctx.lineWidth = S(3);
    ctx.lineCap = "round";
    ctx.shadowColor = "#a00000";
    ctx.shadowBlur = S(5);
    ctx.beginPath();
    ctx.moveTo(S(mods.last?.x ?? x), S(mods.last?.y ?? y));
    ctx.lineTo(S(x), S(y));
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  
  if (astats) { //Выделение статистики
    mods.stats = { x, y };
    arendered = false;
  }
  
  mods.last = { x, y };
}

window.onload = function() {
  //Установка значений по умолчанию:
  options.showspeed ??= 1;
  style.flycolor ??= "#00000080";
  style.firecolor ??= "#a03000";
  style.waterstcolor ??= "#00a0a0";
  options.airred ??= 0;
  options.airgreen ??= 0;
  options.airblue ??= 0;
  
  resize();
  window.addEventListener('resize', resize);
  if (ejson) sessionStorage.setItem('plant_simulator_json', ""); //Очистка JSON
  wakelock();
  document.addEventListener('click', click); //Объявление обработчика кликов
  
  //Объявление обработчика движения мышью:
  if ('ontouchmove' in document) {
    document.addEventListener('touchstart', mousemove);
    document.addEventListener('touchmove', mousemove);
  } else document.addEventListener('mousemove', mousemove);
  
  //Объявление обработчиков клавиш:
  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
};