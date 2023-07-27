const version = "1.1.19";  //Версия программы
const options_list = [ //Список настроек
  { id: "size", type: "num", default: 28, check: [8, 50, true], label: "Размер поля: ", f: x => x, g: x => x },
  { id: "ggreen", type: "num", default: 250, check: [50, 10000, false], label: "Изначальный зелёный: ", f: x => x, g: x => x },
  { id: "gblue", type: "num", default: 250, check: [50, 10000, false], label: "Изначальный синий: ", f: x => x, g: x => x },
  { id: "gred", type: "num", default: 250, check: [50, 10000, false], label: "Изначальный красный: ", f: x => x, g: x => x },
  { id: "gigreen", type: "num", default: 0.025, check: [0, 100, false], label: "Восстановление зелёного: ", f: x => x, g: x => x },
  { id: "giblue", type: "num", default: 0.025, check: [0, 100, false], label: "Восстановление синего: ", f: x => x, g: x => x },
  { id: "gired", type: "num", default: 0.025, check: [0, 100, false], label: "Восстановление красного: ", f: x => x, g: x => x },
  { id: "gsize", type: "num", default: 15, check: [7, 50, true], label: "Размер клетки земли: ", f: x => x, g: x => x },
  { id: "flycount", type: "num", default: 0, check: [0, 1000, true], label: "Количество мух: ", f: x => x, g: x => x },
  { id: "flymul", type: "num", default: 1, check: [0, 10, false], label: "Размножение мух: ", f: x => x/100, g: x => x*100 },
  { id: "flyspeed", type: "num", default: 5, check: [1, 10, false], label: "Скорость мух: ", f: x => x, g: x => x },
  { id: "cgreen", type: "num", default: 100, check: [0, 10000, false], label: "Добавка зелёного: ", f: x => x, g: x => x },
  { id: "cblue", type: "num", default: 100, check: [0, 10000, false], label: "Добавка синего: ", f: x => x, g: x => x },
  { id: "cred", type: "num", default: 100, check: [0, 10000, false], label: "Добавка красного: ", f: x => x, g: x => x },
  { id: "btype", type: "sel", cases: () => ["зацикленные", "зеркальные", "обычные"], label: "Тип бортиков: ", f: x => ["thor", "bounce", "lemit"][x], g: x => ["thor", "bounce", "lemit"].indexOf(x) }
];
const plants_props_list = [ //Список свойств растений
  { id: "faze", type: "num", default: 12, check: [1, 500, true], label: "Длина фазы: ", f: x => x, g: x => x },
  { id: "consg", type: "num", default: 1, check: [0, 100, false], label: "Потребление зелёного: ", add: true, f: x => x, g: x => x },
  { id: "consb", type: "num", default: 1, check: [0, 100, false], label: "Потребление синего: ", add: true, f: x => x, g: x => x },
  { id: "consr", type: "num", default: 1, check: [0, 100, false], label: "Потребление красного: ", add: true, f: x => x, g: x => x },
  { id: "initial", type: "num", default: 1, check: [0, 1000, true], label: "Изначальная популяция: ", f: x => x, g: x => x },
  { id: "fruitsmin", type: "num", default: 1, check: [0, 100, true], label: "Количиство плодов (мин.): ", f: x => x, g: x => x },
  { id: "fruitsmax", type: "num", default: 3, check: [0, 100, true], label: "Количиство плодов (макс.): ", f: x => x+1, g: x => x-1 },
  { id: "fzone", type: "num", default: 50, check: [0, 2500, false], label: "Зона плодов: ", f: x => x, g: x => x },
  { id: "ngrowmin", type: "num", default: 2, check: [0, 1000, false], label: "Рост семени (мин.): ", add: true, f: x => x, g: x => x },
  { id: "ngrowmax", type: "num", default: 40, check: [0, 1000, false], label: "Рост семени (макс.): ", add: true, f: x => x+1, g: x => x-1 },
  { id: "repeat", type: "num", default: 1, check: [1, 1000, false], label: "Количество циклов: ", add: true, f: x => x-1, g: x => x+1 },
  { id: "rtimemin", type: "num", default: 2, check: [1, 1000, false], label: "Длина отдыха (мин.): ", add: true, f: x => x, g: x => x },
  { id: "rtimemax", type: "num", default: 40, check: [1, 1000, false], label: "Длина отдыха (макс.): ", add: true, f: x => x-1, g: x => x+1 },
  { id: "attack", type: "num", default: 0, check: [0, 100, false], label: "Атака — вероятность: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "azone", type: "num", default: 50, check: [1, 2500, false], label: "Атака — зона: ", add: true, f: x => x, g: x => x },
  { id: "protect", type: "num", default: 0, check: [0, 100, false], label: "Защита: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "carn", type: "num", default: 0, check: [0, 100, false], label: "Хищное — вероятность: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "czone", type: "num", default: 50, check: [0, 2500, false], label: "Хищное — зона: ", add: true, f: x => x, g: x => x },
  { id: "cadd", type: "num", default: 10, check: [0, 500, true], label: "Хищное — ценность: ", add: true, f: x => x, g: x => x },
  { id: "boom", type: "num", default: 0, check: [0, 100, false], label: "Взрывное: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "add", type: "num", default: 1, check: [0, 5, false], label: "Скорость роста: ", add: true, f: x => x, g: x => x },
  { id: "fvalue", type: "num", default: 10, check: [0, 1000, false], label: "Питательность: ", add: true, f: x => x, g: x => x },
  { id: "toxic", type: "num", default: 0, check: [0, 100, false], label: "Ядовитое: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "mgzone", type: "num", default: 100, check: [0, 2500, false], label: "Приманка — зона: ", add: true, f: x => x, g: x => x },
  { id: "mgpow", type: "num", default: 0, check: [0, 15, false], label: "Приманка — сила: ", add: true, f: x => x, g: x => x },
  { id: "cleaner", type: "num", default: 0, check: [0, 100, false], label: "Очистка: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "sleprob", type: "num", default: 0, check: [0, 100, false], label: "Сон — вероятность: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "slezone", type: "num", default: 50, check: [0, 2500, false], label: "Сон — зона: ", add: true, f: x => x, g: x => x },
  { id: "sleep", type: "num", default: 1, check: [0, 120, false], label: "Сон — длительность: ", add: true, f: x => x*1000, g: x => x/1000 },
  { id: "paprob", type: "num", default: 0, check: [0, 100, false], label: "Паразит — вероятность: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "pazone", type: "num", default: 50, check: [0, 2500, false], label: "Паразит — зона: ", add: true, f: x => x, g: x => x },
  { id: "parasite", type: "num", default: 1, check: [0, 100, false], label: "Паразит — количество: ", add: true, f: x => x, g: x => x },
  { id: "big", type: "chk", default: false, label: "Большое", add: true, f: x => x, g: x => x },
  { id: "obscure", type: "chk", default: false, label: "Незаметное", add: true, f: x => x, g: x => x },
  { id: "nutrient", type: "chk", default: false, label: "Питательное", add: true, f: x => x, g: x => x }
];
const animals_props_list = [ //Список свойств животных
  { id: "initial", type: "num", default: 1, check: [0, 1000, true], label: "Изначальная популяция: ", f: x => x, g: x => x },
  { id: "hungry", type: "num", default: 200, check: [1, 10000, false], label: "Изначальная сытость: ", f: x => x, g: x => x },
  { id: "speed", type: "num", default: 5, check: [1, 10, false], label: "Скорость: ", f: x => x, g: x => x },
  { id: "prob", type: "num", default: 2, check: [0, 100, false], label: "Вероятность: ", f: x => x/100, g: x => x*100 },
  { id: "zone", type: "num", default: 50, check: [0, 100, false], label: "Зона: ", f: x => x, g: x => x },

  { id: "hinc", type: "num", default: 0.5, check: [0, 10, false], label: "Прожорливость: ", add: true, f: x => x, g: x => x },
  { id: "muln", type: "num", default: 400, check: [0, 20000, false], label: "Порог размножения: ", add: true, f: x => x, g: x => x },
  { id: "cleprob", type: "num", default: 0, check: [0, 100, false], label: "Умное — вероятность: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "clezone", type: "num", default: 100, check: [0, 2500, false], label: "Умное — зона: ", add: true, f: x => x, g: x => x },
  { id: "stomper", type: "num", default: 0, check: [0, 100, false], label: "Топотун: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "fvalue", type: "num", default: 10, check: [0, 1000, false], label: "Питательность: ", add: true, f: x => x, g: x => x },
  { id: "toxic", type: "num", default: 0, check: [0, 100, false], label: "Ядовитое: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "protect", type: "num", default: 0, check: [0, 100, false], label: "Защита: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "slehun", type: "num", default: 0, check: [0, 10, false], label: "Прожорливость во сне: ", add: true, f: x => x, g: x => x },
  { id: "gred", type: "num", default: 0, check: [0, 1000, false], label: "Разложение — красный: ", add: true, f: x => x, g: x => x },
  { id: "ggreen", type: "num", default: 0, check: [0, 1000, false], label: "Разложение — зелёный: ", add: true, f: x => x, g: x => x },
  { id: "gblue", type: "num", default: 0, check: [0, 1000, false], label: "Разложение — синий: ", add: true, f: x => x, g: x => x },
  { id: "protect", type: "num", default: 0, check: [0, 100, false], label: "Защита: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "asleep", type: "num", default: 0, check: [0, 100, false], label: "Антисон: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "egrowmin", type: "num", default: 100, check: [0, 1000, false], label: "Рост яйца (мин.): ", add: true, f: x => x, g: x => x },
  { id: "egrowmax", type: "num", default: 200, check: [0, 1000, false], label: "Рост яйца (макс.): ", add: true, f: x => x+1, g: x => x-1 },
  { id: "big", type: "chk", default: false, label: "Большое", add: true, f: x => x, g: x => x },
  { id: "carn", type: "chk", default: false, label: "Хищное", add: true, f: x => x, g: x => x },
  { id: "eggs", type: "chk", default: false, label: "Яйценос", add: true, f: x => x, g: x => x },
  { id: "obscure", type: "chk", default: false, label: "Незаметное", add: true, f: x => x, g: x => x }
];
const funguses_props_list = [ //Список свойств грибов
  { id: "max", type: "num", default: 420, check: [1, 2500, true], label: "Максимальный размер: ", f: x => x, g: x => x },
  { id: "consg", type: "num", default: 0.03, check: [0, 100, false], label: "Потребление зелёного: ", add: true, f: x => x, g: x => x },
  { id: "consb", type: "num", default: 0.03, check: [0, 100, false], label: "Потребление синего: ", add: true, f: x => x, g: x => x },
  { id: "consr", type: "num", default: 0.03, check: [0, 100, false], label: "Потребление красного: ", add: true, f: x => x, g: x => x },
  { id: "initial", type: "num", default: 1, check: [0, 1000, true], label: "Изначальная популяция: ", f: x => x, g: x => x },
  { id: "mul", type: "num", default: 0.5, check: [0, 10, true], label: "Размножение: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "ngrowmin", type: "num", default: 100, check: [0, 1000, false], label: "Рост гриба-плода (мин.): ", add: true, f: x => x, g: x => x },
  { id: "ngrowmax", type: "num", default: 200, check: [0, 1000, false], label: "Рост гриба-плода (макс.): ", add: true, f: x => x+1, g: x => x-1 },
  { id: "protect", type: "num", default: 0, check: [0, 100, false], label: "Защита: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "grow", type: "num", default: 0.5, check: [0, 5, false], label: "Скорость роста: ", add: true, f: x => x, g: x => x },
  { id: "toxic", type: "num", default: 0, check: [0, 100, false], label: "Ядовитый: ", add: true, f: x => x/100, g: x => x*100 },
  { id: "big", type: "chk", default: false, label: "Большой", add: true, f: x => x, g: x => x }
];

var name = "без названия"; //Имя симуляции
var planti = 0; //Индекс растения
var plantsid = []; //Массив индефикаторов растений
var plants_addprops = []; //Массив дополнительных свойств растений
var animali = 0; //Индекс животного
var animalsid = []; //Массив индефикаторов животных
var animals_addprops = []; //Массив дополнительных свойств животных
var fungusi = 0; //Индекс животного
var fungusesid = []; //Массив индефикаторов животных
var funguses_addprops = []; //Массив дополнительных свойств животных
var addopen = false;
var description = ""; //Описание
var resolution = 1800; //Разрешение
var showspeed = 1; //Скорость показа
var music = true; //Музыка
var vibrate = false; //Вибрации
var biggraph = false; //Большой график
var graphmove = true; //Сдвиг графика
var musictype = 0; //Тип музыки

function check(num, arr) { //Функция проверки числа
  if (arr[2]) num = Math.floor(num);
  return Math.min(Math.max(num ?? 0, arr[0]), arr[1]);
}

function json() { //Функция создания JSON симуляции
  const style = { //Стиль симуляции
    size: 5,
    resolution: resolution,
    sort: true,
    flysize: 3,
    flyanim: 10,
    flycolor: "#00000080",
    ground: 35,
    graphmove: graphmove,
    biggraph: biggraph
  };
  const options = { //Настройки симуляции
    flych: 0.01,
    flymax: 1000,
    showspeed: showspeed,
    music: music,
    musictype: musictype,
    vibrate: vibrate
  };
  
  //Получение настроек:
  for (let i = 0; i < options_list.length; i++) {
    const p = options_list[i];
    const v = $("options_"+p.id);
    switch (p.type) {
      case "num": options[p.id] = p.f(Number(v.value)); break;
      case "sel": options[p.id] = p.f(Number(v.value)); break;
      case "chk": options[p.id] = p.f(v.checked); break;
    }
  }
  
  const plants = []; //Массив видов растений
  const animals = []; //Массив видов животных
  const funguses = []; //Массив видов грибов
  
  //Получение видов растений:
  for (let i = 0; i < plantsid.length; i++) {
    const id = plantsid[i];
    plants[i] = {
      name: $("plant_name"+id).value,
      color: $("plant_color"+id).value,
      hiddenstat: !$("plant_hiddenstat"+id).checked,
      hiddengraph: !$("plant_hiddengraph"+id).checked
    };
    for (let j = 0; j < plants_props_list.length; j++) {
      const p = plants_props_list[j];
      const v = $("plant_"+p.id+id);
      switch (p.type) {
        case "num": plants[i][p.id] = p.f(Number(v.value)); break;
        case "sel": plants[i][p.id] = p.f(Number(v.value)); break;
        case "chk": plants[i][p.id] = p.f(v.checked); break;
      }
    }
  }
  
  //Получение видов животных:
  for (let i = 0; i < animalsid.length; i++) {
    const id = animalsid[i];
    animals[i] = {
      name: $("animal_name"+id).value,
      color: $("animal_color"+id).value,
      hiddenstat: !$("animal_hiddenstat"+id).checked,
      hiddengraph: !$("animal_hiddengraph"+id).checked,
      change: 0.01
    };
    for (let j = 0; j < animals_props_list.length; j++) {
      const p = animals_props_list[j];
      const v = $("animal_"+p.id+id);
      switch (p.type) {
        case "num": animals[i][p.id] = p.f(Number(v.value)); break;
        case "sel": animals[i][p.id] = p.f(Number(v.value)); break;
        case "chk": animals[i][p.id] = p.f(v.checked); break;
      }
    }
  }
  
  //Получение видов грибов:
  for (let i = 0; i < fungusesid.length; i++) {
    const id = fungusesid[i];
    funguses[i] = {
      name: $("fungus_name"+id).value,
      color: $("fungus_color"+id).value,
      hiddenstat: !$("fungus_hiddenstat"+id).checked,
      hiddengraph: !$("fungus_hiddengraph"+id).checked
    };
    for (let j = 0; j < funguses_props_list.length; j++) {
      const p = funguses_props_list[j];
      const v = $("fungus_"+p.id+id);
      switch (p.type) {
        case "num": funguses[i][p.id] = p.f(Number(v.value)); break;
        case "sel": funguses[i][p.id] = p.f(Number(v.value)); break;
        case "chk": funguses[i][p.id] = p.f(v.checked); break;
      }
    }
  }
  
  const obj = { //Объект симуляции
    name: name,
    description: description,
    version: version,
    style: style,
    options: options,
    plants: plants,
    animals: animals,
    funguses: funguses
  };
  return JSON.stringify(obj); //Создание JSON
}

function newplant(name) { //Новый вид растения
  //Индефикаторы:
  const id = planti++;
  plantsid.push(id);
  
  let props = ""; //Основные свойства
  let aprops = ""; //Дополнительные свойства
  
  for (let i = 0; i < plants_props_list.length; i++) {
    const p = plants_props_list[i];
    let str;
    switch (p.type) {
      case "num": str = `<div><label class="label" for="plant_${p.id}${id}">${p.label}</label><input id="plant_${p.id}${id}" type="number" onchange="this.value = check(this.value, ${JSON.stringify(p.check)})" value="${p.default}"></div>`; break;
      case "chk": str = `<div><input id="plant_${p.id}${id}" type="checkbox" ${p.default ? "checked":""}><label class="label" for="plant_${p.id}${id}">${p.label}</label></div>`; break;
    }
    if (p.add) aprops += str;
    else props += str;
  }
  
  const div = $create('div');
  div.id = "plant"+id;
  div.innerHTML = `
  <div class="namediv">
    <input class="name" type="text" id="plant_name${id}" value="${name ?? "без названия"}">
    <button style="background-color: #00000000; border: none; display: inline;" onclick="deleteplant(${id})"><img src="assets/delete.svg" height="12"></button>
    <button style="background-color: #00000000; border: none; display: inline;" onclick="copyplant(${id})"><img src="assets/copy.svg" height="12"></button>
    <input type="checkbox" id="plant_hiddenstat${id}" style="display: inline" checked>
    <input type="checkbox" id="plant_hiddengraph${id}" style="display: inline" checked>
  </div>
  <div>
    <input type="color" id="plant_color${id}" class="colorsel" value="#000000">
    <button class="color" style="background-color: #a00000; border-color: #900000;" onclick="$('plant_color${id}').value='#a00000'"></button>
    <button class="color" style="background-color: #a02800; border-color: #902400;" onclick="$('plant_color${id}').value='#a02800'"></button>
    <button class="color" style="background-color: #a05000; border-color: #904800;" onclick="$('plant_color${id}').value='#a05000'"></button>
    <button class="color" style="background-color: #a07800; border-color: #906c00;" onclick="$('plant_color${id}').value='#a07800'"></button>
    <button class="color" style="background-color: #a0a000; border-color: #909000;" onclick="$('plant_color${id}').value='#a0a000'"></button>
    <button class="color" style="background-color: #78a000; border-color: #6c9000;" onclick="$('plant_color${id}').value='#78a000'"></button>
    <button class="color" style="background-color: #50a000; border-color: #489000;" onclick="$('plant_color${id}').value='#50a000'"></button>
    <button class="color" style="background-color: #28a000; border-color: #249000;" onclick="$('plant_color${id}').value='#28a000'"></button>
    <button class="color" style="background-color: #00a000; border-color: #009000;" onclick="$('plant_color${id}').value='#00a000'"></button>
    <button class="color" style="background-color: #00a028; border-color: #009024;" onclick="$('plant_color${id}').value='#00a028'"></button>
    <button class="color" style="background-color: #00a050; border-color: #009048;" onclick="$('plant_color${id}').value='#00a050'"></button>
    <button class="color" style="background-color: #00a078; border-color: #00906c;" onclick="$('plant_color${id}').value='#00a078'"></button>
    <button class="color" style="background-color: #00a0a0; border-color: #009090;" onclick="$('plant_color${id}').value='#00a0a0'"></button>
    <button class="color" style="background-color: #0078a0; border-color: #006c90;" onclick="$('plant_color${id}').value='#0078a0'"></button>
    <button class="color" style="background-color: #0050a0; border-color: #004890;" onclick="$('plant_color${id}').value='#0050a0'"></button>
    <button class="color" style="background-color: #0028a0; border-color: #002490;" onclick="$('plant_color${id}').value='#0028a0'"></button>
    <button class="color" style="background-color: #0000a0; border-color: #000090;" onclick="$('plant_color${id}').value='#0000a0'"></button>
    <button class="color" style="background-color: #2800a0; border-color: #240090;" onclick="$('plant_color${id}').value='#2800a0'"></button>
    <button class="color" style="background-color: #5000a0; border-color: #480090;" onclick="$('plant_color${id}').value='#5000a0'"></button>
    <button class="color" style="background-color: #7800a0; border-color: #6c0090;" onclick="$('plant_color${id}').value='#7800a0'"></button>
    <button class="color" style="background-color: #a000a0; border-color: #900090;" onclick="$('plant_color${id}').value='#a000a0'"></button>
    <button class="color" style="background-color: #a00078; border-color: #90006c;" onclick="$('plant_color${id}').value='#a00078'"></button>
    <button class="color" style="background-color: #a00050; border-color: #900048;" onclick="$('plant_color${id}').value='#a00050'"></button>
    <button class="color" style="background-color: #a00028; border-color: #900024;" onclick="$('plant_color${id}').value='#a00028'"></button>
    <button class="color" style="background-color: #000000; border-color: #202020;" onclick="$('plant_color${id}').value='#000000'"></button>
    <button class="color" style="background-color: #808080; border-color: #707070;" onclick="$('plant_color${id}').value='#808080'"></button>
  </div>
  ${props}
  <p class="add" onclick="add(${id})">Дополнительно <img id="plant_aopen${id}" src="assets/down.svg" width="12"></p>
  <div id="plant_add${id}" style="display: none">${aprops}</div>`;
  $('plants').appendChild(div);
  return id;
}

function deleteplant(id) { //Удаление вида растения
  $("plant"+id).remove(); //Удаление HTML
  
  //Поиск индефикатора в списке:
  for (let i = 0; i < plantsid.length; i++) if (plantsid[i] == id) plantsid.splice(i, 1); //Удаление
}
function copyplant(id) { //Копирование вида растения
  //Получение нового имени:
  const name = $("plant_name"+id).value;
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let str = "";
  let wstr = "";
  let b = true;
  for (let i = name.length-1; i >= 0; i--) {
    if (nums.includes(name[i]) && b) str = name[i]+str;
    else {
      wstr = name[i] + wstr;
      b = false;
    }
  }
  let nname = name;
  if (str.length) nname = wstr+(Number(str)+1);
  else nname += " 2";
  
  const nid = newplant(nname);
  
  //Копирование свойств:
  $("plant_color"+nid).value = $("plant_color"+id).value;
  for (let i = 0; i < plants_props_list.length; i++) {
    const p = plants_props_list[i];
    switch (p.type) {
      case "num": $("plant_"+p.id+nid).value = $("plant_"+p.id+id).value;
      case "sel": $("plant_"+p.id+nid).value = $("plant_"+p.id+id).value;
      case "chk": $("plant_"+p.id+nid).checked = $("plant_"+p.id+id).checked;
    }
  }
}

function smusictype(i) { //Тип музыки
  if (typeof i == "number") musictype = i;
  else musictype = (musictype+1)%2;
  $('musictype').innerHTML = ["", "*"][musictype];
}

function newanimal(name) { //Новый вид животного
  //Индефикаторы:
  const id = animali++;
  animalsid.push(id);
  
  let props = ""; //Основные свойства
  let aprops = ""; //Дополнительные свойства
  
  for (let i = 0; i < animals_props_list.length; i++) {
    const p = animals_props_list[i];
    let str;
    switch (p.type) {
      case "num": str = `<div><label class="label" for="animal_${p.id}${id}">${p.label}</label><input id="animal_${p.id}${id}" type="number" onchange="this.value = check(this.value, ${JSON.stringify(p.check)})" value="${p.default}"></div>`; break;
      case "chk": str = `<div><input id="animal_${p.id}${id}" type="checkbox" ${p.default ? "checked":""}><label class="label" for="animal_${p.id}${id}">${p.label}</label></div>`; break;
    }
    if (p.add) aprops += str;
    else props += str;
  }
  
  const div = $create('div');
  div.id = "animal"+id;
  div.innerHTML = `
  <div class="namediv">
    <input class="name" type="text" id="animal_name${id}" value="${name ?? "без названия"}">
    <button style="background-color: #00000000; border: none; display: inline;" onclick="deleteanimal(${id})"><img src="assets/delete.svg" height="12"></button>
    <button style="background-color: #00000000; border: none; display: inline;" onclick="copyanimal(${id})"><img src="assets/copy.svg" height="12"></button>
    <input type="checkbox" id="animal_hiddenstat${id}" style="display: inline" checked>
    <input type="checkbox" id="animal_hiddengraph${id}" style="display: inline" checked>
  </div>
  <div>
    <input type="color" id="animal_color${id}" class="colorsel" value="#000000">
    <button class="color" style="background-color: #a00000; border-color: #900000;" onclick="$('animal_color${id}').value='#a00000'"></button>
    <button class="color" style="background-color: #a02800; border-color: #902400;" onclick="$('animal_color${id}').value='#a02800'"></button>
    <button class="color" style="background-color: #a05000; border-color: #904800;" onclick="$('animal_color${id}').value='#a05000'"></button>
    <button class="color" style="background-color: #a07800; border-color: #906c00;" onclick="$('animal_color${id}').value='#a07800'"></button>
    <button class="color" style="background-color: #a0a000; border-color: #909000;" onclick="$('animal_color${id}').value='#a0a000'"></button>
    <button class="color" style="background-color: #78a000; border-color: #6c9000;" onclick="$('animal_color${id}').value='#78a000'"></button>
    <button class="color" style="background-color: #50a000; border-color: #489000;" onclick="$('animal_color${id}').value='#50a000'"></button>
    <button class="color" style="background-color: #28a000; border-color: #249000;" onclick="$('animal_color${id}').value='#28a000'"></button>
    <button class="color" style="background-color: #00a000; border-color: #009000;" onclick="$('animal_color${id}').value='#00a000'"></button>
    <button class="color" style="background-color: #00a028; border-color: #009024;" onclick="$('animal_color${id}').value='#00a028'"></button>
    <button class="color" style="background-color: #00a050; border-color: #009048;" onclick="$('animal_color${id}').value='#00a050'"></button>
    <button class="color" style="background-color: #00a078; border-color: #00906c;" onclick="$('animal_color${id}').value='#00a078'"></button>
    <button class="color" style="background-color: #00a0a0; border-color: #009090;" onclick="$('animal_color${id}').value='#00a0a0'"></button>
    <button class="color" style="background-color: #0078a0; border-color: #006c90;" onclick="$('animal_color${id}').value='#0078a0'"></button>
    <button class="color" style="background-color: #0050a0; border-color: #004890;" onclick="$('animal_color${id}').value='#0050a0'"></button>
    <button class="color" style="background-color: #0028a0; border-color: #002490;" onclick="$('animal_color${id}').value='#0028a0'"></button>
    <button class="color" style="background-color: #0000a0; border-color: #000090;" onclick="$('animal_color${id}').value='#0000a0'"></button>
    <button class="color" style="background-color: #2800a0; border-color: #240090;" onclick="$('animal_color${id}').value='#2800a0'"></button>
    <button class="color" style="background-color: #5000a0; border-color: #480090;" onclick="$('animal_color${id}').value='#5000a0'"></button>
    <button class="color" style="background-color: #7800a0; border-color: #6c0090;" onclick="$('animal_color${id}').value='#7800a0'"></button>
    <button class="color" style="background-color: #a000a0; border-color: #900090;" onclick="$('animal_color${id}').value='#a000a0'"></button>
    <button class="color" style="background-color: #a00078; border-color: #90006c;" onclick="$('animal_color${id}').value='#a00078'"></button>
    <button class="color" style="background-color: #a00050; border-color: #900048;" onclick="$('animal_color${id}').value='#a00050'"></button>
    <button class="color" style="background-color: #a00028; border-color: #900024;" onclick="$('animal_color${id}').value='#a00028'"></button>
    <button class="color" style="background-color: #000000; border-color: #202020;" onclick="$('animal_color${id}').value='#000000'"></button>
    <button class="color" style="background-color: #808080; border-color: #707070;" onclick="$('animal_color${id}').value='#808080'"></button>
  </div>
  ${props}
  <p class="add" onclick="aadd(${id})">Дополнительно <img id="animal_aopen${id}" src="assets/down.svg" width="12"></p>
  <div id="animal_add${id}" style="display: none">${aprops}</div>`;
  $('animals').appendChild(div);
  return id;
}

function deleteanimal(id) { //Удаление вида растения
  $("animal"+id).remove(); //Удаление HTML
  
  //Поиск индефикатора в списке:
  for (let i = 0; i < animalsid.length; i++) if (animalsid[i] == id) animalsid.splice(i, 1); //Удаление
}
function copyanimal(id) { //Копирование вида растения
  //Получение нового имени:
  const name = $("animal_name"+id).value;
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let str = "";
  let wstr = "";
  let b = true;
  for (let i = name.length-1; i >= 0; i--) {
    if (nums.includes(name[i]) && b) str = name[i]+str;
    else {
      wstr = name[i] + wstr;
      b = false;
    }
  }
  let nname = name;
  if (str.length) nname = wstr+(Number(str)+1);
  else nname += " 2";
  
  const nid = newanimal(nname);
  
  //Копирование свойств:
  $("animal_color"+nid).value = $("animal_color"+id).value;
  for (let i = 0; i < animals_props_list.length; i++) {
    const p = animals_props_list[i];
    switch (p.type) {
      case "num": $("animal_"+p.id+nid).value = $("animal_"+p.id+id).value;
      case "sel": $("animal_"+p.id+nid).value = $("animal_"+p.id+id).value;
      case "chk": $("animal_"+p.id+nid).checked = $("animal_"+p.id+id).checked;
    }
  }
}

function newfungus(name) { //Новый вид гриба
  //Индефикаторы:
  const id = fungusi++;
  fungusesid.push(id);
  
  let props = ""; //Основные свойства
  let aprops = ""; //Дополнительные свойства
  
  for (let i = 0; i < funguses_props_list.length; i++) {
    const p = funguses_props_list[i];
    let str;
    switch (p.type) {
      case "num": str = `<div><label class="label" for="fungus_${p.id}${id}">${p.label}</label><input id="fungus_${p.id}${id}" type="number" onchange="this.value = check(this.value, ${JSON.stringify(p.check)})" value="${p.default}"></div>`; break;
      case "chk": str = `<div><input id="fungus_${p.id}${id}" type="checkbox" ${p.default ? "checked":""}><label class="label" for="fungus_${p.id}${id}">${p.label}</label></div>`; break;
    }
    if (p.add) aprops += str;
    else props += str;
  }
  
  const div = $create('div');
  div.id = "fungus"+id;
  div.innerHTML = `
  <div class="namediv">
    <input class="name" type="text" id="fungus_name${id}" value="${name ?? "без названия"}">
    <button style="background-color: #00000000; border: none; display: inline;" onclick="deleteplant(${id})"><img src="assets/delete.svg" height="12"></button>
    <button style="background-color: #00000000; border: none; display: inline;" onclick="copyplant(${id})"><img src="assets/copy.svg" height="12"></button>
    <input type="checkbox" id="fungus_hiddenstat${id}" style="display: inline" checked>
    <input type="checkbox" id="fungus_hiddengraph${id}" style="display: inline" checked>
  </div>
  <div>
    <input type="color" id="fungus_color${id}" class="colorsel" value="#804000">
    <button class="color" style="background-color: #a00000; border-color: #900000;" onclick="$('fungus_color${id}').value='#a00000'"></button>
    <button class="color" style="background-color: #a02800; border-color: #902400;" onclick="$('fungus_color${id}').value='#a02800'"></button>
    <button class="color" style="background-color: #a05000; border-color: #904800;" onclick="$('fungus_color${id}').value='#a05000'"></button>
    <button class="color" style="background-color: #a07800; border-color: #906c00;" onclick="$('fungus_color${id}').value='#a07800'"></button>
    <button class="color" style="background-color: #a0a000; border-color: #909000;" onclick="$('fungus_color${id}').value='#a0a000'"></button>
    <button class="color" style="background-color: #78a000; border-color: #6c9000;" onclick="$('fungus_color${id}').value='#78a000'"></button>
    <button class="color" style="background-color: #50a000; border-color: #489000;" onclick="$('fungus_color${id}').value='#50a000'"></button>
    <button class="color" style="background-color: #28a000; border-color: #249000;" onclick="$('fungus_color${id}').value='#28a000'"></button>
    <button class="color" style="background-color: #00a000; border-color: #009000;" onclick="$('fungus_color${id}').value='#00a000'"></button>
    <button class="color" style="background-color: #00a028; border-color: #009024;" onclick="$('fungus_color${id}').value='#00a028'"></button>
    <button class="color" style="background-color: #00a050; border-color: #009048;" onclick="$('fungus_color${id}').value='#00a050'"></button>
    <button class="color" style="background-color: #00a078; border-color: #00906c;" onclick="$('fungus_color${id}').value='#00a078'"></button>
    <button class="color" style="background-color: #00a0a0; border-color: #009090;" onclick="$('fungus_color${id}').value='#00a0a0'"></button>
    <button class="color" style="background-color: #0078a0; border-color: #006c90;" onclick="$('fungus_color${id}').value='#0078a0'"></button>
    <button class="color" style="background-color: #0050a0; border-color: #004890;" onclick="$('fungus_color${id}').value='#0050a0'"></button>
    <button class="color" style="background-color: #0028a0; border-color: #002490;" onclick="$('fungus_color${id}').value='#0028a0'"></button>
    <button class="color" style="background-color: #0000a0; border-color: #000090;" onclick="$('fungus_color${id}').value='#0000a0'"></button>
    <button class="color" style="background-color: #2800a0; border-color: #240090;" onclick="$('fungus_color${id}').value='#2800a0'"></button>
    <button class="color" style="background-color: #5000a0; border-color: #480090;" onclick="$('fungus_color${id}').value='#5000a0'"></button>
    <button class="color" style="background-color: #7800a0; border-color: #6c0090;" onclick="$('fungus_color${id}').value='#7800a0'"></button>
    <button class="color" style="background-color: #a000a0; border-color: #900090;" onclick="$('fungus_color${id}').value='#a000a0'"></button>
    <button class="color" style="background-color: #a00078; border-color: #90006c;" onclick="$('fungus_color${id}').value='#a00078'"></button>
    <button class="color" style="background-color: #a00050; border-color: #900048;" onclick="$('fungus_color${id}').value='#a00050'"></button>
    <button class="color" style="background-color: #a00028; border-color: #900024;" onclick="$('fungus_color${id}').value='#a00028'"></button>
    <button class="color" style="background-color: #000000; border-color: #202020;" onclick="$('fungus_color${id}').value='#000000'"></button>
    <button class="color" style="background-color: #808080; border-color: #707070;" onclick="$('fungus_color${id}').value='#808080'"></button>
    <button class="color" style="background-color: #804000; border-color: #703000;" onclick="$('fungus_color${id}').value='#804000'"></button>
  </div>
  ${props}
  <p class="add" onclick="fadd(${id})">Дополнительно <img id="fungus_aopen${id}" src="assets/down.svg" width="12"></p>
  <div id="fungus_add${id}" style="display: none">${aprops}</div>`;
  $('funguses').appendChild(div);
  return id;
}

function deletefungus(id) { //Удаление вида растения
  $("fungus"+id).remove(); //Удаление HTML
  
  //Поиск индефикатора в списке:
  for (let i = 0; i < fungusesid.length; i++) if (fungusesid[i] == id) fungusesid.splice(i, 1); //Удаление
}
function copyplant(id) { //Копирование вида растения
  //Получение нового имени:
  const name = $("fungus_name"+id).value;
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let str = "";
  let wstr = "";
  let b = true;
  for (let i = name.length-1; i >= 0; i--) {
    if (nums.includes(name[i]) && b) str = name[i]+str;
    else {
      wstr = name[i] + wstr;
      b = false;
    }
  }
  let nname = name;
  if (str.length) nname = wstr+(Number(str)+1);
  else nname += " 2";
  
  const nid = newfungus(nname);
  
  //Копирование свойств:
  $("fungus_color"+nid).value = $("fungus_color"+id).value;
  for (let i = 0; i < fungus_props_list.length; i++) {
    const p = fungus_props_list[i];
    switch (p.type) {
      case "num": $("fungus_"+p.id+nid).value = $("fungus_"+p.id+id).value;
      case "sel": $("fungus_"+p.id+nid).value = $("fungus_"+p.id+id).value;
      case "chk": $("fungus_"+p.id+nid).checked = $("fungus_"+p.id+id).checked;
    }
  }
}

function add(id) { //Скрыть/показать дополнительные свойства растений
  if (plants_addprops[id]) {
    plants_addprops[id] = false;
    $("plant_aopen"+id).src = "assets/down.svg";
    $hide("plant_add"+id);
  } else {
    plants_addprops[id] = true;
    $("plant_aopen"+id).src = "assets/up.svg";
    $show("plant_add"+id);
  }
}

function aadd(id) { //Скрыть/показать дополнительные свойства животных
  if (animals_addprops[id]) {
    animals_addprops[id] = false;
    $("animal_aopen"+id).src = "assets/down.svg";
    $hide("animal_add"+id);
  } else {
    animals_addprops[id] = true;
    $("animal_aopen"+id).src = "assets/up.svg";
    $show("animal_add"+id);
  }
}

function fadd(id) { //Скрыть/показать дополнительные свойства грибов
  if (funguses_addprops[id]) {
    funguses_addprops[id] = false;
    $("fungus_aopen"+id).src = "assets/down.svg";
    $hide("animal_add"+id);
  } else {
    funguses_addprops[id] = true;
    $("fungus_aopen"+id).src = "assets/up.svg";
    $show("fungus_add"+id);
  }
}

function addopt() { //Скрыть/показать дополнительные настройки
  if (addopen) {
    addopen = false;
    $("aopen").src = "assets/down.svg";
    $hide("add");
  } else {
    addopen = true;
    $("aopen").src = "assets/up.svg";
    $show("add");
  }
}

function playgame() { //Метод запуска симуляции
  sessionStorage.setItem('plant_simulator_json', json());
  window.open('game.html');
}
function downloadgame() { //Скачивание JSON симуляции
  const blob = new Blob([json()], { type: "application/json" });
  download(URL.createObjectURL(blob), name+".json");
}

function savesets() { //Сохраниение дополнительных настроек
  localStorage.setItem("plant_simulator_settings", JSON.stringify({
    vibrate: vibrate,
    music: music,
    resolution: resolution,
    biggraph: biggraph,
    graphmove: graphmove,
    musictype: musictype
  }));
}

function lssg() { //Создание точки сохраниения
  localStorage.setItem('plant_simulator_savepoint', json());
}
function lsog() { //Открытие точки сохраниения
  readgame(localStorage.getItem('plant_simulator_savepoint'));
}

function opengame(file) { //Открытие JSON
  $('console').value = ""; //Очистка консоли
  
  //Чтение файла:
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    readgame(reader.result);
  };
  reader.onerror = function() {
    $('console').value = "Ошибка при чтении файла";
  };
}
function readgame(json) { //Чтение JSON
  $('console').value = ""; //Очистка консоли
  
  const log = x => $('console').value += x+"\n";
  const isObject = x => typeof x == "object" && x !== null;
  let obj;
  try {
    obj = JSON.parse(json ?? "{}");
  } catch {
    log("Ошибка при чтении JSON");
    return;
  }
  if (!isObject(obj.options)) {
    log("Ошибка: options не существует.");
    return;
  }
  if (!isObject(obj.style)) {
    log("Ошибка: style не существует.");
    return;
  }
  if (!isObject(obj.plants)) {
    log("Ошибка: plants не существует.");
    return;
  }
  log("Загрузка...");
  name = obj.name ?? "без названия";
  description = obj.description ?? "";
  obj.plants ??= [];
  obj.animals ??= [];
  obj.funguses ??= [];
  $('description').value = description;
  $('name').value = name;
  
  //Расшифровка растений:
  $('plants').innerHTML = "";
  plantsi = 0;
  plantsid = [];
  for (let i = 0; i < obj.plants.length; i++) {
    const p = obj.plants[i];
    newplant(p.name);
    $("plant_color"+i).value = p.color;
    $("plant_hiddenstat"+i).checked = !p.hiddenstat;
    $("plant_hiddengraph"+i).checked = !p.hiddengraph;
    for (let j = 0; j < plants_props_list.length; j++) {
      const o = plants_props_list[j];
      const v = p[o.id];
      switch (o.type) {
        case "num": $("plant_"+o.id+i).value = typeof v == "undefined" ? o.default:o.g(v); break;
        case "sel": $("plant_"+o.id+i).value = typeof v == "undefined" ? o.default:o.g(v); break;
        case "chk": $("plant_"+o.id+i).checked = typeof v == "undefined" ? o.default:o.g(v); break;
      }
    }
  }
  
  //Расшифровка животных:
  $('animals').innerHTML = "";
  animali = 0;
  animalsid = [];
  for (let i = 0; i < obj.animals.length; i++) {
    const p = obj.animals[i];
    newanimal(p.name);
    $("animal_color"+i).value = p.color;
    $("animal_hiddenstat"+i).checked = !p.hiddenstat;
    $("animal_hiddengraph"+i).checked = !p.hiddengraph;
    for (let j = 0; j < animals_props_list.length; j++) {
      const o = animals_props_list[j];
      const v = p[o.id];
      switch (o.type) {
        case "num": $("animal_"+o.id+i).value = typeof v == "undefined" ? o.default:o.g(v); break;
        case "sel": $("animal_"+o.id+i).value = typeof v == "undefined" ? o.default:o.g(v); break;
        case "chk": $("animal_"+o.id+i).checked = typeof v == "undefined" ? o.default:o.g(v); break;
      }
    }
  }
  
  //Расшифровка грибов:
  $('funguses').innerHTML = "";
  animali = 0;
  animalsid = [];
  for (let i = 0; i < obj.funguses.length; i++) {
    const p = obj.funguses[i];
    newfungus(p.name);
    $("fungus_color"+i).value = p.color;
    $("fungus_hiddenstat"+i).checked = !p.hiddenstat;
    $("fungus_hiddengraph"+i).checked = !p.hiddengraph;
    for (let j = 0; j < funguses_props_list.length; j++) {
      const o = funguses_props_list[j];
      const v = p[o.id];
      switch (o.type) {
        case "num": $("fungus_"+o.id+i).value = typeof v == "undefined" ? o.default:o.g(v); break;
        case "sel": $("fungus_"+o.id+i).value = typeof v == "undefined" ? o.default:o.g(v); break;
        case "chk": $("fungus_"+o.id+i).checked = typeof v == "undefined" ? o.default:o.g(v); break;
      }
    }
  }
  
  //Расшифровка настроек:
  for (let i = 0; i < options_list.length; i++) {
    const o = options_list[i];
    const v = obj.options[o.id];
    switch (o.type) {
      case "num": $("options_"+o.id).value = typeof v == "undefined" ? o.default:o.g(v); break;
      case "sel": $("options_"+o.id).value = typeof v == "undefined" ? o.default:o.g(v); break;
      case "chk": $("options_"+o.id).checked = typeof v == "undefined" ? o.default:o.g(v); break;
    }
  }
  
  log("Загрузка завершена...");
  $hide('opengame');
  $show('editor');
}

window.onload = function() {
  //Инициализация HTML:
  for (let i = 0; i < options_list.length; i++) {
    const p = options_list[i];
    switch (p.type) {
      case "num": $add('options', `<div><label class="label" for="options_${p.id}">${p.label}</label><input id="options_${p.id}" type="number" value="${p.default}" onchange="this.value = check(this.value, ${JSON.stringify(p.check)})"></div>`); break;
      case "sel": {
          const cases = p.cases();
          let sels = "";
          for (let i = 0; i < cases.length; i++) sels += `<option value="${i}">${cases[i]}</option>`;
          $add('options', `<div><label class="label" for="options_${p.id}">${p.label}</label><select class="pselect" id="options_${p.id}">${sels}</select></div>`);
        } break;
    }
  }
  const saved = JSON.parse(localStorage.getItem("plant_simulator_settings"));
  if (typeof navigator.vibrate == "function") {
    if (saved) {
      $('vibrate').checked = saved.vibrate;
      vibrate = saved.vibrate;
    }
    $show('vibratediv');
  }
  if (saved) {
    $('music').checked = saved.music;
    music = saved.music;
    $('resshow').innerHTML = `${saved.resolution}р `;
    resolution = saved.resolution;
    $('graphmove').checked = saved.graphmove;
    graphmove = saved.graphmove;
    $('biggraph').checked = saved.biggraph;
    biggraph = saved.biggraph;
    smusictype(saved.musictype);
  }
  const open = sessionStorage.getItem("plant_simulator_open");
  if (open) {
    readgame(open);
    sessionStorage.setItem("plant_simulator_open", "");
  }
  $show('editor');
};