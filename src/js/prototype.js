let mapPrototype = {
  has(key) {
    return key in this.store
  },

  get(key) {
    return this.store[key]
  },

  set(key, value) {
    this.store[key] = value;
    return this;
  },

  size() {
    let size = 0;
    for(let key in this.store) {
      size += 1;
    }
    return size;
  },

  values() {
    let values = [];

    for(let key in this.store) {
      values.push(this.store[key]);
    }

    return values;
  },

  entries() {
    let arr = [];
    for(let key in this.store) {
      arr.push({
        key, 
        value: this.store[key]
      })
    }
    return arr;
  },

  clear() {
    this.store = {};

    return this;
  },

  [Symbol.iterator]() {
    //берем новый массив, чтобы не изменить старый из метода
    let values = this.values().slice();

    return {
      next(){
        let value = values.shift();

        return {
          value,  //Забирает с массива по одному элементу
          done: Boolean(value) ? false : true //false когда элементы массива закончатся 
        }
      }
    }
  }
}

export default mapPrototype;