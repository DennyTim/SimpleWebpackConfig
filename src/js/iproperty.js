let checkContract = function(obj) {
  const contract = {
    header: 'string',
    description: 'string',
    day: 'string',
    fullname: 'string',
    doctor: 'object'
  };

  for (let key in contract) {
    if (!obj.hasOwnProperty(key) || typeof obj[key] !== contract[key] || !obj[key]) {
      throw new Error('Object does not implement the inside contract!');
    }
  }
  return true;
};

export default checkContract;