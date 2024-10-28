// Compose and pipe

const addFive = (num) => {
  return num + 5;
};

const subtractTwo = (num) => {
  return num - 2;
};

const multiplyFour = (num) => {
  return num * 4;
};

// const compose = (fun1, fun2, fun3) => {
//   return (initialValue) => {
//     return fun1(fun2(fun3(initialValue)));
//   };
// };

// const compose = (...fns) => {
//   return (initialValue) => {
//     let res = initialValue;
//     for (let i = fns.length - 1; i >= 0; i--) {
//       res = fns[i](res);
//     }
//     return res;
//   };
// };

const compose = (...fns) => {
  return (initialValue) => {
    return fns.reduceRight((acc, curr) => curr(acc), initialValue);
  };
};

// const pipe = (fun1, fun2, fun3) => {
//   return (initialValue) => {
//     return fun3(fun2(fun1(initialValue)));
//   };
// };

const pipe = (...fns) => {
  return (initialValue) => {
    let res = initialValue;
    for (let i = 0; i < fns.length; i++) {
      res = fns[i](res);
    }
    return res;
  };
};

const evaluateCompose = compose(addFive, subtractTwo, multiplyFour);

console.log(evaluateCompose(5));

const evaluatePipe = pipe(addFive, subtractTwo, multiplyFour);

console.log(evaluatePipe(5));
