// JS interview questions
// ( Currying ) - Output based Questions, Partial Application

// What is currying ?
// Currying is a function that takes one argument at a time and returns a new function
// expecting a next new argument.

// It is a conversion of function from callable as f(a,b) to f(a)(b)
// Curried function are constructed by chaining closures by immediately returning their inner
// function simultaneously

// Example: convert f(a, b) to f(a)(b)

function f(a, b) {
  console.log(a, b);
}

f(2, 3);

function func(a) {
  return function (b) {
    console.log(a, b);
  };
}

func(2)(3);

// Why should we use currying ?
// -> To avoid passing the same variable again and again.
// -> To create higher order functions
// -> To make function pure and less prone to error
// BLog: https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbXRaS1o5NXcyekZadGxVSTJBTmlhcXV3MHBVZ3xBQ3Jtc0tuRkprbHpDMkF6d3FSWHFQU0tJWW1GUW12ckZyTGVmN1phempWNUhFS0M1WVd5N3JOMlpBOVRYaXV4Qy1sR0lrV0U2Y0pSdTh1a0JmaHNYdGdvQVBoeEFNbUttazBWMUJuMkt1bWFadG9OY3JrLTRLYw&q=https%3A%2F%2Froadsidecoder.hashnode.dev%2Fjavascript-interview-questions-currying-output-based-questions-partial-application-and-more&v=k5TC9i5HonI

// Question 1: find sum(2)(6)(1) using currying

function sum(a) {
  return function (b) {
    return function (c) {
      console.log(a + b + c);
    };
  };
}

sum(2)(6)(1);

// Question 2:
// evaluate("sum")(4)(2) => 6
// evaluate("multiply")(4)(2) => 8
// evaluate("divide")(4)(2) => 2
// evaluate("multiply")(4)(2) => 8

function evaluate(operation) {
  if (operation === "sum") {
    return function (num1) {
      return function (num2) {
        return num1 + num2;
      };
    };
  } else if (operation === "multiply") {
    return function (num1) {
      return function (num2) {
        return num1 * num2;
      };
    };
  } else if (operation === "subtract") {
    return function (num1) {
      return function (num2) {
        return num1 - num2;
      };
    };
  } else if (operation === "divide") {
    // divide
    return function (num1) {
      return function (num2) {
        return num1 / num2;
      };
    };
  } else {
    return "Invalid operation";
  }
}

// Above and below both are correct way to code the solution

function evaluate2(operation) {
  return function (num1) {
    return function (num2) {
      if (operation === "sum") {
        return num1 + num2;
      } else if (operation === "multiply") {
        return num1 * num2;
      } else if (operation === "divide") {
        return num1 / num2;
      } else if (operation === "subtract") {
        return num1 - num2;
      } else {
        return "Invalid operation";
      }
    };
  };
}

console.log(evaluate2("sum")(4)(2));
console.log(evaluate2("multiply")(4)(2));
console.log(evaluate2("divide")(4)(2));
console.log(evaluate2("subtract")(4)(2));

// Question 3: Infinite currying -> sum(2)(3)...(n)
// We have to write a function which we can call with n number of args

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

console.log(add(4)(2)(5)(2)());

// Question 4: Currying vs Partial application

// The number of nested functions a curried function has will depends on the number of args
// it receives. This is the concept which makes it a curry. A curry function will only take
// one argument at a time while executing.

// So what is partial application: The below function expects 3 args but contains only 2 function.
// The partial application doesn't follow the curry function rules
// Partial application transforms a function into another function with small arity (number of operands or args a function receives)

function addFunction(a) {
  return function (b, c) {
    return a + b + c;
  };
}

const x = addFunction(2);
console.log(x(4, 5));

// OR

console.log(addFunction(4)(5, 7));

// Question 5: Real world scenario for using currying, Manipulating DOM
// function updateElementText(id) {
//   return function (content) {
//     document.querySelector(`#${id}`).textContent = content;
//   };
// }

// const updateHeader = updateElementText("heading");
// updateHeader("Hello Rishabh");
// updateHeader("Hey");

// Question 6: curry() implementation
// f(a,b,c) to f(a)(b)(c)

function curry(func) {
  return function curriedFunc(...args) {
    if (func.length <= args.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const sumNormal = (a, b, c) => a + b + c;
const totalSum = curry(sumNormal);
console.log(totalSum(1)(2)(3));
