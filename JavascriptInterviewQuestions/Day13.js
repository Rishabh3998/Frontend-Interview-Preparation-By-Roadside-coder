// 1. Promise polyfill implementation
function PromisePolyFill(executer) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isRejected = false,
    isCalled = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    if (typeof onResolve === "function") {
      isCalled = true;
      onResolve(val);
    }
  }

  function reject(value) {
    isRejected = true;
    value = val;
    if (typeof onReject === "function") {
      onReject(value);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (isFulfilled && !isCalled) {
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = (callback) => {
    onReject = callback;
    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  try {
    executer(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

const examplePromise = new PromisePolyFill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

examplePromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// 2. Promise.all polyfill implementation
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 5000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 8000);
});

Promise.allPolyfill = function (promises) {
  return Promise((resolve, reject) => {
    let results = [];
    if (!promises.length) {
      return resolve(results);
    }
    let pending = promises.length;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          results[index] = res;
          pending--;
          if (pending === 0) {
            return resolve(results);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  });
};

Promise.allPolyfill([p1, p2])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// 3. Polyfill for map()
// via prototype we can add a custom method inside any class present in JS
Array.prototype.myMap = function (callback) {
  // map creates an entirely new array
  // therefore we need a new array in which we push the result one by one till the last element
  // of the existing array.
  let temp = [];
  for (let index = 0; index < this.length; index++) {
    temp.push(callback(this[index], index, this));
  }
  return temp;
};
// Like in the above code we are adding myMap custom method into the Array class using the prototype
const multiplyByThreeCustom = nums.myMap((currElement) => {
  return currElement * 3;
});
console.log(multiplyByThreeCustom);

// 4. Polyfill for filter()
Array.prototype.myFilter = function (callback) {
  let temp = [];
  for (let index = 0; index < this.length; index++) {
    const result = callback(this[index], index, this);
    if (result) {
      temp.push(this[index]);
    }
  }
  return temp;
};

const moreThanTwoCustom = nums.myFilter((currElement) => {
  return currElement > 2;
});
console.log(moreThanTwoCustom);

// 5. Polyfill for reduce()
Array.prototype.myReduce = function (callback, initialValue) {
  let temp = initialValue;
  for (let index = 0; index < this.length; index++) {
    temp = temp ? callback(temp, this[index], index, this) : this[index];
  }
  return temp;
};

const sumOfNumsCustom = nums.myReduce((acc, currElement) => {
  return acc + currElement;
}, 0);

console.log(sumOfNumsCustom);

// 6. Once Polyfill
function once(func, context) {
  return function () {
    let ran;
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

// 7. Memoize polyfill
function memoize(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
}

// 8. callPolyFill
Function.prototype.callPolyfill = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "is not callable");
  }
  context.fn = this;
  context.fn(...args);
};

// 9. applyPolyFill
Function.prototype.applyPolyfill = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "is not callable");
  }
  if (!Array.isArray(args)) {
    throw new Error("CreateListFromArrayLike called on non-object");
  }
  context.fn = this;
  context.fn(...args);
};

// 10. bindPolyFill
Function.prototype.bindPolyfill = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it is not callable");
  }
  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

// 11. Debounce Polyfill
const myDebounce = (callback, delayTime) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delayTime);
  };
};

// 12. Throttle Polyfill
const myThrottle = (callback, delayTime) => {
  let last = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - last < delayTime) return;
    last = now;
    return callback(...args);
  };
};
