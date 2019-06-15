import Log from './index2';
import Log2 from './index3';

Log();
Log2();

fetch('../json/data.json')
  .then(function (data) {
    return data.json();
  }).then(function (data) {
    console.log(data);
  }).catch(err => console.log(err));