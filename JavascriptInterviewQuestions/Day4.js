// JS interview questions
// Closures
// A closure is a function that references variables in the outer scope from its inner scope.

// Closures depends upon the concept of how lexical scope works

// Lexical scope
// It is a scope refers to the current context of your code. It can be either globally or locally defined.
// As we are using ES6 now block scope is also introduced.

var name = "Rishabh"; // global scope

// global scope
function local() {
  // -----local scope-----
  var username;
  console.log(name); // accessible due to concept of lexical scoping
}

// console.log(username); // username is not defined
local();

// so lexical scope concept refers that a variable defined outside the function in global scope can be
// accessed inside an another function defined after declaring a variable but vice versa is not true.
// A variable defined inside the function is not accessible outside that function.

// Example:
// global scope
function x() {
  // outer function scope
  var user = "Rishabh";
  function y() {
    //inner scope
    console.log(user); // user is accessible since user is defined above due to lexical scope concept
  }
  y(); // Here this function y is closure cause we are accessing a variable referencing
  // outside of the closures function present in inner scope 2
}

x();

// Closure: A closure is the combination of a function bundled together (enclosed) with
// references to its surrounding state (the lexical environment).
// In other words, a closure gives you access to an outer function's scope
// from an inner function. In JavaScript, closures are created every time a function is
// created, at function creation time.

// Lexical scoping
function init() {
  var name = "Mozilla"; // name is a local variable created by init
  function displayName() {
    // displayName() is the inner function, that forms the closure
    console.log(name); // use variable declared in the parent function
  }
  displayName();
}
init();

// Closure example
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc();

// Closure scope chain
// Every closure has three scopes:
// 1. Local scope (Own scope)
// 2. Enclosing scope (can be block, function, or module scope)
// 3. Global scope

// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20

// e is accessible in the innermost scope as well.

// Question 1 -> What will be logged to console ?
let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1;
    console.log(count); // 1 due to shadowing
  }
  console.log(count); // 0 due to lexical scoping
})();

// Question 2: Write a function that would allow you to do this
// var addSix = createBase(6);
// addSix(10); // return 16
// addSix(21); // return 27

function createBase(num) {
  return function addSix(number) {
    return num + number;
  };
}

var addSix = createBase(6); // Here createBase is returning a function so addSix is a closure
console.log(addSix(10)); // 16
console.log(addSix(21)); // 27

// One application of closure is that we can also create a closure that will keep the passed number
// in createBase function intact even after the addSix is returned.

// Question 3: Time optimization
// function find(index) {
//   let a = [];
//   for (let i = 0; i < 1000000; i++) {
//     a[i] = i * i;
//   }
//   console.log(a[index]);
// }

function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }

  return function (index) {
    console.log(a[index]);
  };
}

const closure = find(); // here find will return the closure where we have console statement
// and the above step of filling the every will happen only one time.
// So accessing the variable will be fast then previous.
console.time("6");
closure(6);
console.timeEnd("6");
console.time("12");
closure(12);
console.timeEnd("12");

// Question 4: Block scope and setTimeout
function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); // What is logged
    }, 1000);
  }
}
a();

// So in the above code the output will be 3 3 3
// cause the looping is employing a variable that is defined by function scope (var) variable type.
// In function scope JS engine waits till the whole code gets executed and in the last moment it
// executes the instruction on the basis of current values.
// Like in the above code the value of i after looping will be 3 so after the code execution gets done
// then at the time of printing JS engine will print 3 all the way.

function b() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); // What is logged
    }, 1000);
  }
}
b();

// output: 0 1 2
// But here in the above code the i is of block scope type so
// at every run of the loop a new block will be created hence the tracking of i will be easy
// and in every block the exact value of i at execution time will be intact.
// and JS engine will print i when every block gets executed one by one with its own i value.

// well we can still fix the above code with var using closures
function c() {
  for (var i = 0; i < 3; i++) {
    (function (i) {
      setTimeout(() => {
        console.log("closure: ", i);
      }, 1000 * i);
    })(i);
  }
}
c();

// By using closures the JS is going to create a whole new memory for every function call
// where the current track of i will be correct so we will get the correct output. since
// i will be considered as the local variable in the setTimeout rather then taking it from loop.

// Question 5: How would you use closure to create a private counter ?

function counter() {
  var _counter = 0; // private variable _namingSyntax
  function add(increment) {
    _counter += increment;
  }

  function retrieve() {
    return "Counter: " + _counter;
  }

  return {
    add,
    retrieve,
  };
}

const privateCounter = counter();
privateCounter.add(5);
console.log(privateCounter.retrieve());

// In the above code we are not directly mutating the _counter we are using the methods present
// inside the function counter.

// Question 6: Module pattern
var module = (function () {
  function privateMethod() {
    console.log("private");
  }
  return {
    publicMethod: function () {
      // this is a public method which has the access of the private method
      console.log("public");
    },
  };
})();

module.publicMethod();

// Question 7: Make this run only once
let view;
function likeTheVideo() {
  let called = 0;
  return function () {
    if (called <= 0) {
      view = "Rishabh";
      console.log("viewing", view);
      called++;
    } else {
      console.log("Already viewed");
    }
  };
}
const viewed = likeTheVideo();
viewed();
viewed();
viewed();
viewed();
viewed();

// Question 8: Once polyfill

function once(func, context) {
  let ran;
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

const hello = once(() => console.log("Hello"));
hello();
hello();
hello();
hello();

// Question 9: Memoize polyfill (Implement Caching/Memoize function)

// res object will look like
// res {
//     '5,6': 30
// }

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

const clumsyProduct = (num1, num2) => {
  for (let i = 0; i < 1000000000; i++) {}
  return num1 * num2;
};

const memoizeClumsyProduct = memoize(clumsyProduct);

console.time("First call");
console.log(memoizeClumsyProduct(9467, 7649));
console.timeEnd("First call");

console.time("Second call");
console.log(memoizeClumsyProduct(9467, 7649));
console.timeEnd("Second call");

// Difference between closure and scope
// Whenever we create a function within another function then the inner function is known as closure.
// This closure is usually returned so it can use the outer function variables at the later time.
// Scope in JS define what variable we have access to.
