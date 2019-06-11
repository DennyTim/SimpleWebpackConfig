let IMethod = function(name, methods) {
  if (arguments.length != 2) {
    throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
  }

  this.name = name;
  this.methods = [];

  for (let i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== 'string') {
        throw new Error("Interface constructor expects method names to be passed in as a string.");
    }

    this.methods.push(methods[i]);
  }
};

// Static class method.
IMethod.ensureImplements = function(object) {
  if (arguments.length < 2) {
      throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
  }

  for (let i = 1, len = arguments.length; i < len; i++) {
      let contract = arguments[i];
      if (contract.constructor !== IMethod) {
          throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface.");
      }

      for (let j = 0, methodsLen = contract.methods.length; j < methodsLen; j++) {
          let method = contract.methods[j];
          if (!object[method] || typeof object[method] !== 'function') {
              throw new Error("Function Interface.ensureImplements: object does not implement the " + contract.name + " interface. Method " + method + " was not found.");
          }
      }
  }
};

export default IMethod;