function Fetch() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var xhr = new XMLHttpRequest();
  this.onFufillment = [];
  this.onError = [];
  this.onCompletion = [];
  var method = "GET" || options.method;
  var internalFetchContext = this;
  xhr.onreadystatechange = function () {
    var _data = this;
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is read;
      internalFetchContext.onFufillment.forEach(function (callback) {
        callback(_data);
      });
      internalFetchContext.onCompletion.forEach(function (callback) {
        callback(_data);
      });
    } else if (this.readyState == 4 && this.status !== 200) {
      internalFetchContext.onError.forEach(function (callback) {
        callback(_data);
      });
      internalFetchContext.onCompletion.forEach(function (callback) {
        callback(_data);
      });
    }
  };
  xhr.open(method, url, true);
  xhr.send();
};

Fetch.prototype.then = function (fufillmentFunction) {
  this.onFufillment.push(fufillmentFunction);
  return this;
};
Fetch.prototype.catch = function (errorFunction) {
  this.onError.push(errorFunction);
  return this;
};
Fetch.prototype.finally = function (completionFunction) {
  this.onCompletion.push(completionFunction);
  return this;
};

export default Fetch;