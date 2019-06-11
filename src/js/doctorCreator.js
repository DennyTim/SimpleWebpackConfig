function Doctor(nameDoctor, experienceDoctor) {
  let name = nameDoctor;
  let experience = experienceDoctor;

  Object.defineProperties(this, {
    'name': {
      get: function() { return name },
      enumerable: true
    },
    'experience': {
      get: function() { return experience },
      enumerable: true
    } 
  });

  this.setName = function(newName) {
    name = newName;
  }

  this.setExpririance = function(newExpiriance) {
    experience = newExpiriance;
  }
}

function Сardiologist(name, experience, pressure, indexOfMass, diseases) {
  Doctor.call(this, name, experience);   //вызываем родительский конструктор
  this.pressure = pressure;
  this.indexOfMass = indexOfMass;
  this.diseases = diseases;
}

//делаем цепочку прототипов, связывание одного прототипа с другим
Сardiologist.prototype = Object.create(Doctor.prototype);
Сardiologist.prototype.constructor = Сardiologist;        //указываем конструктор

function Therapist(name, experience) {
  Doctor.call(this, name, experience);  //вызываем родительский конструктор
}

//делаем цепочку прототипов, связывание одного прототипа с другим
Therapist.prototype = Object.create(Doctor.prototype);
Therapist.prototype.constructor = Therapist;           //указываем конструктор

function Dentist(name, experience) {
  Doctor.call(this, name, experience);  //вызываем родительский конструктор
}

//делаем цепочку прототипов, связывание одного прототипа с другим
Dentist.prototype = Object.create(Doctor.prototype);  
Dentist.prototype.constructor = Dentist;              //указываем конструктор

export {
  Сardiologist,
  Therapist,
  Dentist
}