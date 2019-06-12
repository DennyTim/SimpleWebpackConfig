//1. Модуль валидации
//2. Паттерн строитель для разметки.
//3. Интерфейс
import IMethod from './imethod';
import checkContract from './iproperty';
import mapPrototype from './prototype';
import ChangeDoctor from './fabric';
import Fetch from './apifetch';

function Creator() {
  this.store = {};
}

//Привязываем прототип фу-и
Creator.prototype = mapPrototype;
Creator.prototype.constructor = Creator;

function Visit(args) {
  const { header, description, day = new Date(), fullname, doctorType, implementation,
    ...parameters } = args;

  let obj = new Creator();

  try {
    //Проверяем, что внутри обьекта храняться методы
    let mapPrototypeI = new IMethod(`mapPrototype`, Object.keys(obj.__proto__));
    IMethod.ensureImplements(obj.__proto__, mapPrototypeI);
    obj
      .set(Object.keys({ header })[0], header)
      .set(Object.keys({ description })[0], description)
      .set(Object.keys({ day })[0], day)
      .set(Object.keys({ fullname })[0], fullname)
      .set('doctor', ChangeDoctor.createDoctor(doctorType, parameters))

    obj.getDay = function () {
      return implementation.getDay(obj.store.day)
    }
    //Проверяем контракт, что внутри обьекта нужные типы данных
    checkContract(obj.store)
  } catch (error) {
    console.log(error);
  }

  return obj;
}


const singleton = (function () {
  let instance = [];

  function createInstance() {
    let visit = new Visit({
      header: 'Title',
      description: 'Description',
      day: '23-09-11',
      fullname: 'Тимохин Денис Владиславович',
      doctorType: 'dentist',
      implementation: {
        getDay: (day) => day
      }
    });
    instance.push(visit)
    return visit;
  }

  return {
    instance,
    createInstance
  }
});

let myapi = new Fetch('../json/data.json', { method: 'GET' });
myapi.then(function (data) {
  let result = JSON.parse(data.response);
  console.log(result);
})

let data = singleton();

console.log(data.createInstance());
console.log(data.createInstance());
console.log(data.createInstance());
console.log(data.createInstance());
console.log(data.instance);