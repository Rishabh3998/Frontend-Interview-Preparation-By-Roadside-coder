// JS interview questions - Roadside coder
//  ( Functions ) - Hoisting, Scope, Callback, Arrow Functions etc
// Question 1 -> What is function declaration ?

// The below code is a normal function declaration. This is also called function definition
// or function statement
function square(number) {
  return number * number;
}

const result = square(2);
console.log(result);

// Question 2 -> What is function expression ?
// When we store a function inside a variable then it is called as a function expression.

const functionExpression = function (number) {
  // convert number to string
  return String(number);
};

const result2 = functionExpression(2);
console.log(typeof result2, result2);

// A function with no name is considered to be a anonymous function like the above code.
// This anonymous function can be assigned to a variable or we can pass it as a callback in methods.

// Question 3 ->  What are first class function ?
// When a function can be treated like a variable, we call it a first class function.
// In these cases functions can be passed into another functions can be used, manipulated and returned
// from those functions, basically everything a variable can do a function can also do.

function cube(number) {
  return number * number * number;
}

function display(fun, number) {
  console.log("cube of the number is: " + fun(number));
}

display(cube, 3); // Here we are passing function and a variable in display function

// Question 4 ->  What is IIFE ?
// IIFE -> Immediately invoked function expressions

(function iife(number) {
  console.log("input number is", number);
})(8);

// Question 5 -> O/P based question
(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);

// Here in the above code line 53 will search for x in the function y scope if not found then it
// will search for x in its parents scope and there x is present. Reason for this is closures.

// The ability of a function to access the functions and variables that are lexically out of its
// scope are called closures. closures are created whenever a new function is created. cause the
// function has the reference to its outer scope.

// Question 6 -> Function scope
// The following variables are defined in the global scope
const num1 = 20;
const num2 = 3;
const name = "Chamakh";

// This function is defined in the global scope
function multiply() {
  // Here num1 and num2 will be taken from the global scope num1 and num2
  return num1 * num2;
}

console.log(multiply()); // 60

// A nested function example
function getScore() {
  const num1 = 2;
  const num2 = 3;

  // here name will be taken from global scope
  // num1 and num2 will be taken from local function scope defined above
  // The above num1 and num2 will shadow the global scope num1 and num2
  function add() {
    return `${name} scored ${num1 + num2}`;
  }

  return add();
}

console.log(getScore()); // "Chamakh scored 5"

// Question 7 -> O/P based question
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); // this will print i after every delay
  }, i * 1000); // delay is i * 1000 which will increase after every change of i
}

// if we use let output will be 0,1,2,3,4
// Reason: since we are using let for declaring variable i which comes out to be block scope
// whenever for loop runs an entirely new block scope will be created for setTimeout/code block
// present in the for loop and the new iteration will only trigger when code present in the previous
// block scope gets executed.

// for var the output will be 5,5,5,5,5
// There will be no block scope for var

// Hoisting in functions
// functions are hoisted differently then variables

function displayName(name) {
  console.log(name);
}

displayName("Rishabh");

// functions are hoisted completely: example below code
// we are invoking function before definition but still it is not throwing any error or giving undefined.
// But variables do give undefined if accessed before declaration due to hoisting.
// In function hoisting entire function is copied in creation phase.
// so it doesn't matter if we invoke function after or before declaration.
// inside function we have function scope which works exactly like global scope
displayHoisted("Ritik");

function displayHoisted(name) {
  console.log(name);
}

// Function hoisting -> O/P based question
var x = 21;
var fun = function () {
  console.log(x); // undefined
  var x = 31;
};
fun();

// A separate execution context will be created for that function/local scope.
// where local x will be declared.
// When a variable is present in a block scope we will not look in global scope.
// we will always refer to the current local scope.

// Parameters vs Arguments
function depends(params) {
  // A definition of a function depends upon the params
  // Rest of the operations works on the params
  console.log(params);
}

depends("arguments"); // The value passed in function call is arguments

// Spread operator:
// It is used to take out the values from array generally

const array = [1, 2, 5, 3, 2];
const shallowCopy = [...array];

console.log(shallowCopy);

function rest(...nums) {
  // ...nums in function is rest
  console.log(nums);
}

rest(...array); // spread

const displayRest = (first, second, ...rest) => {
  // rest operator should be use only at last in args
  console.log(first, second, rest); // Here rest will be shown as array of given args
  console.log(first, second, ...rest);
};

displayRest("first", "second", "third", "fourth");

// Callback function: A function passed into another function as an arg is known as callback function.
// Which is invoked inside the outer function to complete some kind of action
// Example: setTimeout, array methods, map, filter, reduce, event listeners

// document.addEventListener("click", callback); // second arg is callback

// Arrow functions
// This is function declaration concept introduces in ES6 version.

// Normal function
function normal() {
  console.log("normal");
}

// Arrow function
const arrowFunction = () => {
  console.log("this is an arrow function");
};

// Normal vs Arrow function

// 1. Syntax
// Normal function
function normalSyntax(params) {
  console.log(params);
}

// Arrow function
const arrowFunctionSyntax = (params) => {
  console.log(params);
};

// 2. Implicit 'return' keyword
// Applicable in arrow functions
const double = (number) => number * 2;

// 3. Arguments keywords

// If we don't add any parameters in function definition we can still access them via arguments
// keyword inside function which is an object.
function fn() {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
}

fn(1, 2, 3);

const fnArrow = () => {
  console.log(arguments); // arguments is not defined
};

// fnArrow(1, 2, 3);

// 4. 'this' keyword
let userNormalFunction = {
  username: "Rishabh",
  rc1() {
    console.log(this.username);
  },
  rc2() {
    console.log(this.username);
  },
};

let userArrowFunction = {
  username: "Ritik",
  rc1: () => {
    console.log(this.username);
  },
  rc2: () => {
    console.log(this.username);
  },
};

userNormalFunction.rc1(); // Rishabh Here 'this' is pointing to userNormalFunction object
userArrowFunction.rc1(); // undefined Here 'this' is pointing to global object
