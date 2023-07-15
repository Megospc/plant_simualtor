//////////////////////////////////////////////////////////
/////               СИМУЛЯТОР РАСТЕНИЙ               /////
/////                                                /////
/////                 ######   ######                /////
/////                #::::::# #::::::#               /////
/////                #::::::# #::::::#               /////
/////                #::::::#@#::::::#               /////
/////                 ######@@@######                /////
/////                #::::::#@#::::::#               /////
/////                #::::::###::::::#               /////
/////                #::::::###::::::#               /////
/////                 ###### ########                /////
/////                        ##                      /////
/////                        ##                      /////
/////                       ##                       /////
/////                      ##                        /////
/////                                                /////
//////////////////////////////////////////////////////////

const version = "0.5.0"; //Версия программы
const fps = 30; //Количество кадров в секунду
const fpsTime = 1000/fps; //Миллисекунд на кадр
const font = "Monospace"; //Шрифт текста
const defaultJSON = `{
  "name": "Plant Simulator default",
  "options": {
    "ggreen": 250,
    "gblue": 250,
    "gred": 250,
    "gigreen": 0.025,
    "giblue": 0.025,
    "gired": 0.025,
    "size": 28,
    "gsize": 15,
    "flycount": 10,
    "flych": 0.1,
    "flymul": 0.01,
    "flyspeed": 5,
    "vibrate": true,
    "cgreen": 250,
    "cblue": 250,
    "cred": 250,
    "btype": "thor",
    "music": true
  },
  "style": {
    "size": 5,
    "resolution": 1800,
    "sort": true,
    "graphmove": true,
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
      "initial": 1,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 210,
      "ngrowmin": 2,
      "ngrowmax": 40,
      "repeat": 1,
      "rtimemin": 2,
      "rtimemax": 40
    },
    {
      "name": "растение 2",
      "color": "#a00000",
      "faze": 12,
      "consg": 1,
      "consb": 1,
      "consr": 1,
      "initial": 1,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 40,
      "ngrowmin": 2,
      "ngrowmax": 40
    },
    {
      "name": "растение 3",
      "color": "#0000a0",
      "faze": 12,
      "consg": 1,
      "consb": 1,
      "consr": 1,
      "initial": 1,
      "fruitsmin": 1,
      "fruitsmax": 6,
      "fzone": 40,
      "ngrowmin": 2,
      "ngrowmax": 40
    },
    {
      "name": "атака",
      "color": "#000000",
      "faze": 30,
      "consg": 1,
      "consb": 1,
      "consr": 1,
      "initial": 1,
      "fruitsmin": 1,
      "fruitsmax": 4,
      "fzone": 80,
      "ngrowmin": 2,
      "ngrowmax": 40,
      "attack": 0.01,
      "azone": 60,
      "carn": 0.01,
      "czone": 60,
      "cadd": 10
    }
  ]
}`; //JSON симуляции по-умолчанию
const json = sessionStorage.getItem('plant_simulator_json') ?? defaultJSON; //JSON симуляции
const obj = JSON.parse(json); //Объект симуляции
const options = obj.options; //Объект настроек
const style = obj.style; //Объект стиля
const plants = obj.plants; //Массив состояний
const canvas = $('canvas'); //Объект холста
const ctx = canvas.getContext('2d'); //Контекст холста
const music = new Audio("assets/music.mp3"); //Музыка от zvukipro.com
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
  const min = size/2;
  const max = fsize-size/2;
  switch (options.btype ?? "thor") { //Тип "бортиков"
    case "limited": return Math.min(Math.max(x, min), max);
    case "bounce":
      if (x < min) return min+(min-x);
      else if (x > max) return max-(x-max);
      else return x;
    case "thor":
      if (x < min) return max-(min-x);
      else if (x > max) return min+(x-max);
      else return x;
  }
  Math.max(Math.min(x, options.size*options.gsize-size/2), size/2); //Функция проверки координат
}

function centreText(text, x, y) { //Метод отрисовки текста по центру
  const m = ctx.measureText(text);
  ctx.fillText(text, x-m.width/2, y);
}

function startrender() {
  clear();
  
  //Отрисовка текста:
  ctx.fillStyle = "#00a000a0";
  ctx.font = S(20)+"px "+font;
  centreText("Кликните, чтобы продолжить", S(450), S(250));
  ctx.fillStyle = "#00a000a0";
  ctx.font = S(36)+"px "+font;
  centreText("Симулятор Растений", S(450), S(150));
  ctx.fillStyle = "#00a000a0";
  ctx.font = S(15)+"px "+font;
  centreText("Загрузка завершена...", S(450), S(300));
}

function vib(len) {
  if (typeof navigator.vibrate == "function" && options.vibrate) navigator.vibrate(len);
}

function sort() { //Метод сортировки статистики
  sorted = []; //Очистка массива
  
  //Заполнение массива:
  for (let i = 0; i < plants.length; i++) {
    let st = plants[i];
    if (!(st.hidden || st.hiddenstat)) sorted.push(st); //Если не указанно "не отображать на статистике"
  }
  
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
  let max = 2;
  for (let t = start; t < stats.length; t++) {
    for (let i = 0; i < plants.length; i++) {
      if (!(plants[i].hidden || plants[i].hiddengraph)) { //Если не указанно "не отображать на графике"
        const count = stats[t][i];
        if (count > max) max = count;
      }
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
  if (frame) {
    for (let i = 0; i < plants.length; i++) { //Отрисовка линии вида
      if (!(plants[i].hidden || plants[i].hiddengraph)) { //Если не указанно "не отображать на графике"
        ctx.beginPath();
        for (let x = 0; x < 290; x++) {
          const ci = Math.floor(x/290*size)+start;
          const y = 160-(stats[ci][i]/max*160);
          if (x == 0) ctx.moveTo(S(x+530), S(y+40));
          else ctx.lineTo(S(x+530), S(y+40));
        }
        ctx.strokeStyle = plants[i].color;
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
  let max = 2;
  for (let t = start; t < stats.length; t++) {
    for (let i = 0; i < plants.length; i++) {
      if (!(plants[i].hidden || plants[i].hiddengraph)) {
        let ct = stats[t][i];
        if (ct > max) {
          max = ct;
        }
      }
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
  if (frame) {
    for (let i = 0; i < plants.length; i++) { //Отрисовка линии вида
      if (!(plants[i].hidden || plants[i].hiddengraph)) { //Если не указанно "не отображать на графике"
        ctx.beginPath();
        for (let x = 0; x < 160; x++) {
          const ci = Math.floor(x/160*size)+start;
          const y = 100-(stats[ci][i]/max*80);
          if (x == 0) ctx.moveTo(S(x+690), S(y));
          else ctx.lineTo(S(x+690), S(y));
        }
        ctx.strokeStyle = plants[i].color;
        ctx.stroke();
      }
    }
  }
}

function resize() { //Метод масштабирования холста
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
  
  //Сохраненин характеристик холста:
  cprops = {
    left: X,
    top: Y,
    width: W,
    height: H
  };
  
  if (!started) startrender();
}

function register(obj, type) { //Метод регистрации
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
    //Установка координат
    const fsize = options.size*options.gsize; //Полный размер поля
    this.x = testCord(x ?? random(fsize), style.flysize);
    this.y = testCord(y ?? random(fsize), style.flysize);
    this.rspeed(); //Установка скорости
    this.finc = random(360); //Инкремент анимации
    
    this.id = register(this, "fly"); //Регистрация мухи
  }
  dead() { //Метод смерти
    deregister(this.id); //Дерегистрация мухи
  }
  handler() { //Метод обработчика
    if (rnd() < options.flych) this.rspeed(); //Смена скорости
    if (rnd() < options.flymul) new Fly(this.x, this.y); //Размножение
    
    //Движение:
    this.x = testCord(this.x+this.speed.x, style.flysize);
    this.y = testCord(this.y+this.speed.y, style.flysize);
  }
  render() { //Метод отрисовки
    const r = d2r(frame*5+this.finc); //Поворот
    const fsize = options.size*options.gsize; //Полный размер
    const x = testCord(Math.cos(r)*style.flyanim+this.x, style.flysize);
    const y = testCord(Math.sin(r)*style.flyanim+this.y, style.flysize);
    ctx.fillStyle = style.flycolor;
    ctx.fillRect(S((x-style.flysize/2)*scale+15), S((y-style.flysize/2)*scale+15), S(style.flysize*scale), S(style.flysize*scale));
    ctx.fillRect(S((x-style.flysize/4)*scale+15), S((y-style.flysize/4)*scale+15), S(style.flysize/2*scale), S(style.flysize/2*scale));
  }
  rspeed() { //Метод установки скорсти
    this.speed = {
      x: rand(-options.flyspeed, options.flyspeed),
      y: rand(-options.flyspeed, options.flyspeed)
    };
  }
}

class Plant { //Класс растений
  constructor(state, x, y) {
    this.grow = 0; //Установка счётчика роста
    this.alive = true; //Живой?
    this.state = state; //Вид растения
    this.repeat = 0; //Счётчик повторений
    this.faze = 0; //Фаза растения:
    //0 — Семя
    //1 — Рост
    //2 — Цветение
    //3 — Плодонесение
    //4 — Отдых
    
    this.init(); //Инициализация
    
    //Установка координат:
    const fsize = options.size*options.gsize; //Полный размер поля
    this.x = testCord(x ?? random(fsize), style.size);
    this.y = testCord(y ?? random(fsize), style.size);
  }
  init() {
    const state = plants[this.state]; //Вид растения
    this.ngrow = rand(state.ngrowmin, state.ngrowmax); //Время роста семени
    state.counter++; //Обновление счётчика
    
    this.id = register(this, "plant"); //Регистрация растения
  }
  dead() { //Метод смерти
    const state = plants[this.state]; //Вид растения
    this.alive = false; //Не живой
    state.counter--; //Обновление счётчика
    
    deregister(this.id); //Дерегистрация растения
  }
  handler() { //Метод обработчика
    if (!this.alive) return; //Если не живой
    const state = plants[this.state]; //Вид растения
    const gnd = ground[Math.floor(this.x/options.gsize)][Math.floor(this.y/options.gsize)]; //Земля под растением
    
    if (state.carn && state.czone) { //Свойство "Хищное"
      for (let i = 0; i < arr.length; i++) { //Проверка всех мух
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
    
    let res = true; //Результат получения минерала
    switch (this.faze) { //Получение нужного минерала
      case 1: res = gnd.green(state.consg); break;
      case 2: res = gnd.blue(state.consb); break;
      case 3: res = gnd.red(state.consr); break;
      case 4: res = gnd.green(state.consg); break;
    }
    
    if (res) {
      this.grow += this.add ?? 1; //Получение удалось — прибавление роста
      const n = this.faze == 0 || this.faze == 4 ? this.ngrow:state.faze; //Необходимый рост
      if (this.grow >= n) { //Если рост достаточен
        this.faze++; //Новая фаза
        this.grow = 0; //Сброс роста
        if (this.faze == 4) { //Полный рост
          const fruits = Math.floor(rand(state.fruitsmin, state.fruitsmax));
          const hsize = style.size/2;
          for (let i = 0; i < fruits; i++) { //"Разброс" плодов
            const x = this.x+rand(-state.fzone, state.fzone);
            const y = this.y+rand(-state.fzone, state.fzone);
            new Plant(this.state, x, y);
          }
          if (state.repeat > this.repeat) { //Свойство "Повтор"
            this.repeat++; //Обновление счётчика повторений
            this.ngrow = rand(state.rtimemin, state.rtimemax); //Установка таймера
          } else {
            this.dead(); //Смерть (конец жизненнго цикла)
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
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        if (p.type != "plant") continue; //Если это не растение — пропустить
        if (!p.avail) continue; //Если растение мертво — пропустить
        const o = p.obj; //Объект растения
        if (o.state == this.state) continue; //Если растение того же вида — пропустить
        if (zone(o, this, state.azone)) if (rnd() < state.attack)  o.dead(); //Если растение в зоне атаки и вероятность сбылась, оно погибает
      }
    }
  }
  render() { //Метод отрисовки
    if (!this.alive) return; //Если не живой
    const state = plants[this.state]; //Вид растения
    const hsize = style.size/2; //Половина размера
    const color = state.color;
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
      case 3: //Плодонесение
        fig = function(size) {
          const s = style.size*size;
          ctx.beginPath();
          ctx.arc(S(this.x*scale+15), S(this.y*scale+15), S(s/2), 0, PI*2)
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
    ctx.fillStyle = color;
    fig.call(this, 1);
  }
}

function start() { //Метод инициализации
  frame = 0; //Сброс счётчика
  lastFrame = performance.now(); //Сброс последнего кадра
  const fsize = options.size*options.gsize; //Полный размер поля
  scale = 420/fsize; //Установка масштаба
  stats = []; //Очистка сохранённой статистики
  attacks = []; //Очистка атакующих растений
  arr = []; //Очистка массива объектов
  pause = false; //Не пауза
  
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
  
  //Инициализация мух:
  for (let i = 0; i < options.flycount; i++) new Fly();
  
  interval = setInterval(function() {
    if (performance.now() >= lastFrame+fpsTime/(options.showspeed ?? 1)) frame_();
  }, 1); //Установка интервала
}

function frame_() { //Метод кадра
  const FPS = 1000/(performance.now()-lastFrame); //Текущее количество кадров в секунду
  lastFrame = performance.now(); //Установка последнего кадра
  
  if (!pause) { //Сохранение популяций:
    //Расчёт суммарной популяции:
    let sum = 0;
    for (let i = 0; i < plants.length; i++) sum += plants[i].counter;
    
    let counts = [];
    for (let i = 0; i < plants.length; i++) counts[i] = plants[i].counter;
    counts.sum = sum;
    stats.push(counts);
    
    
    for (let i = 0; i < arr.length; i++) if (arr[i].avail) arr[i].obj.handler(); //Обработка объетков
    for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) ground[x][y].incr(); //Восстановление минералов
  }
  
  clear();
  if (style.ground) for (let x = 0; x < options.size; x++) for (let y = 0; y < options.size; y++) ground[x][y].render(x*options.gsize*scale+15, y*options.gsize*scale+15, options.gsize*scale, options.gsize*scale);
  for (let i = 0; i < arr.length; i++) if (arr[i].avail) arr[i].obj.render(); //Отрисовка объектов
  
  //Отрисовка "бортиков"
  ctx.fillStyle = theme.elements;
  ctx.fillRect(0, 0, S(450), S(15));
  ctx.fillRect(0, S(435), S(450), S(15));
  ctx.fillRect(0, 0, S(15), S(450));
  ctx.fillRect(S(435), 0, S(15), S(450));
  
  if (!style.onlygame) { //Отрисовка доп-информации
    if (!style.biggraph) {
      sort(); //Сортировка статистики
      
      //Отрисовка статистики:
      ctx.fillStyle = theme.text;
      ctx.font = S(18)+"px "+font;
      ctx.fillText("Статистика:", S(490), S(120))
      ctx.font = S(Math.min(Math.floor(9/plants.length*18), 18))+"px "+font;
      for (let i = 0; i < sorted.length; i++) { //Отрисовка статистики
        const state = sorted[i];
        ctx.fillStyle = state.color;
        ctx.fillText(state.counter+" | "+state.name, S(490), S(180+(i*Math.min(Math.floor(9/plants.length*30), 30))));
      }
      
      graph(); //Стандартный график
    } else biggraph(); //Большой график
    
    ctx.fillStyle = theme.text;
    ctx.font = S(18)+"px "+font;
    
    //Расчёт суммарной популяции:
    let sum = 0;
    for (let i = 0; i < plants.length; i++) sum += plants[i].counter;
    
    ctx.fillText(sum + " | сумма", S(490), S(style.biggraph ? 350:150));
    
    //Отрисовка мини-статистики:
    ctx.fillText("Время: "+flr(timeNow()/1000)+"с", S(490), S(style.biggraph ? 260:30)); //Игровое время
    ctx.fillText("FPS: "+flr(FPS)+" x"+(options.showspeed ?? 1), S(490), S(style.biggraph ? 290:60)); //Текущее количество кадров в секунду
    ctx.fillText(`Расчёт: ${Math.floor(performance.now()-lastFrame)}мс`, S(490), S(style.biggraph ? 320:90)); //Время на расчёт кадра
  }
  
  if (pause) { //Отрисовка "паузы"
    ctx.fillStyle = theme.elements;
    
    //Кнопка "продолжить":
    ctx.beginPath();
    ctx.moveTo(S(850), S(400));
    ctx.lineTo(S(870), S(415));
    ctx.lineTo(S(850), S(430));
    ctx.closePath();
    ctx.fill();
    
    //Кнопка "заново":
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
    
    //Кнопка "полный экран":
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
      
    //Кнопка "скриншот":
    ctx.fillRect(S(720), S(405), S(30), S(20));
    ctx.fillRect(S(740), S(400), S(5), S(5));
    ctx.fillStyle = theme.back;
    ctx.fillRect(S(730), S(410), S(10), S(10));
    ctx.fillStyle = theme.elements;
    ctx.fillRect(S(733), S(413), S(4), S(4));
  } else {
    //Кнопка "пауза":
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
  
  if (x > 850 && y > 400) { //Кнопка "пауза/продолжить"
    vib(50);
    pause = !pause;
  }
  
  if (pause && x > 800 && x < 850 && y > 400) { //Кнопка "заново"
    vib(100);
    start();
  }
  
  if (pause && x > 760 && x < 790 && y > 400) { //Кнопка "полный экран"
    vib(100);
    fullScreen(document.documentElement);
  }
  
  if (pause && x > 720 && x < 750 && y > 400) { //Кнопка "скриншот"
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
  
  if (x >= 15 && x < 435 && y >= 15 && y < 435) { //Добавка кликом
    vib(30);
    const gnd = ground[Math.floor((x-15)*scale/options.gsize)][Math.floor((y-15)*scale/options.gsize)];
    gnd.click();
  }
}

window.addEventListener('resize', resize);
window.onload = function() {
  resize();
  document.addEventListener('click', click); //Объявление обработчика кликов
};