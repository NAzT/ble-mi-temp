const orig = {};
const validator = {
  set: function (target, key, value, receiver) {
    console.log("====================");
    console.log(target[key]);
    target[key] = value;
    console.log(target[key]);
    console.log("property set: " + key);
    console.log("---------------------");
    return true;
  },
};

const store = new Proxy(orig, validator);

setInterval(() => {
  console.log(Object.keys(store))
}, 1000)

module.exports = {
  set: (key, val) => {
    if (store[key] === undefined) {
      store[key] = val;
      return true;
    } else {
      if (store[key].counter !== val.counter) {
        console.log(`counter: ${store[key].counter}=>${val.counter}`);
        store[key] = val;
        return true;
      } else {
        return false;
      }
    }
  },
};
