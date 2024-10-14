// JS interview questions (Roadside coder)
//  ( Var, Let and Const ) - Hoisting, Scoping, Shadowing and more

// These are the three ways to declare variables in JS i.e var, let and const.
// Example
var x = 43;
let y = 54;
const z = 544;

// Scope: It is a certain region of a program where a defined variable exists and can be recognized
// and beyond that scope it cannot be recognized.

// There can be multiple types of scopes
// 1. Global scope
// 2. Block scope
// 3. Function/Functional scope

// The above region where we defined three variables x,y and z is the global scope.
// because no block, function is existing as layer above these variables.

function myFunc() {
  // Function scope
}

{
  // Block scope
}

var a = 5; // This is in its global scope and can be accessed anywhere.
console.log(a);

// var is functional scope
// let and const are block scope

// Example
{
  var functionalScope = "functionalScope"; // This time it is declared in a block but still we
  // can access this entirely anywhere in the whole program.
}

console.log(functionalScope); // This will not throw error.

{
  let blockScope = "blockScope"; // This is accessible only in this current block scope.
  console.log("inside block", blockScope);
}

// console.log(blockScope); // This will give reference error that blockScope is not defined.
// cause it is not accessible outside of the above block scope. But this is not the case with var
// we can access var type variables anywhere in the program since it is functional scope.

// same concept is their for const since it is also block scoped.

// Shadowing is the concept related to this scoping concept.
// Variable shadowing
// In ES6 the introduction of let and const with block scoping
// also introduces the concept of variable shadowing

function shadowing() {
  let a = "Hello";
  if (true) {
    // block scope
    let a = "Hi";
    console.log(a);
  }

  console.log(a);
}

// Summary of the above code
// JS interpreter will interpret this code line by line
// so a will be initialized with Hello but when it goes inside the block scope
// a variable with the same name is also present there therefore the concept of shadowing
// will execute here and block scope variable a will shadow the a present outside the block scope.
// so it will console Hi at line 64 and when interpreter will go outside the block the shadowing will
// removed and inside a 'Hello' will be there so at line 67 Hello will be printed.

// O/P will be
// Hi
// Hello

shadowing();

// While shadowing a variable it should not cross the boundary of scope
// that means we can shadow var variable by let since var is functional scope
// but not vice versa

function shadowingLet() {
  var a = "Hello";
  if (true) {
    // block scope
    let a = "Hi";
    console.log(a);
  }

  console.log(a);
}

shadowingLet();

// function shadowingVar() {
//   let a = "Hello";
//   if (true) {
//   ---block scope---
//     var a = "Hi";  // Error: cannot redeclare block-scoped variable 'a'
//     console.log(a);
//   }

//   console.log(a);
// }

// shadowingVar();

// redeclaration of any block scoped variable is not going to happen
// but it is possible in function scope

var t = 5;
var t = 43;
let g = 4;
// let g = 78; // Error: cannot redeclare block-scoped variable 'g'
const o = 5; // PS: initialization of const variable is a must
// const o = 7; // Error: cannot redeclare block-scoped variable 'o'

let k = 5;
{
  let k = 8; // This is completely fine since this comes under shadowing
}

// Declaration without initialization
var init; // This will store undefined by default
let initLet; // This will store undefined by default
const initConst = 56; // This one needs initialization, but this will not change because const is immutable.
// So this has to be initialized while declaring cause later initialization is not possible.

// Re-initialization of variable
var reInit = 5;
reInit = 7;
let reInitLet = 10;
reInitLet = 20;
const reInitConst = 10;
// reInitConst = 87; // Cannot re-initialize a constant

// Hoisting
// JS execution context

// sample code
let sample = 10;
function multiply(x) {
  return x * 10;
}

let result = multiply(sample);
console.log(result);

// Whenever we try to execute our JS code. It goes through by 2 phases
// 1. Creation phase:
// In creation phase 3 things happen:

// first: it creates a window or a global object

// second: it setup a memory heap for storing variables and function references
// it takes the variables and functions and stores them inside the window object.

// third: it initializes those variables declarations with undefined and functions with the
// whole piece of code present in that function inside the window object.

// And this is the exact reason why hoisting occurs.

// 2. Execution phase:
// During this execution phase JS engine execute the code line by line
// assigning the values to variables and executes the function calls.

// For every new function created JS engine creates a new execution context altogether.
// console statements gets executed in the execution phase.

// JS also uses a call stack to keep the track of all the function calls.

// Hoisting: During the creation phase JS engines moves the variables and function declarations to
// the top of the code and this is known as hoisting.

console.log(count); // undefined (Due to hoisting)
var count = 1;

// console.log(countLet);  // cannot access countLet before initialization
// let countLet = 2;

// Well let variable are also hoisted as well but they are present/hoisted in the temporal dead zone.
// Temporal dead zone: It is the time between the declaration and initialization of the
// let and const variables.
// A state where variables are in the scope but they are not yet declared.

// Interview Question
// What will be the output of a
function func() {
  console.log(a); // undefined due to hoisting
  var a = 10;
}

func();

// Approach:
// As we are using var over here for declaration then at the time of creation phase
// this function will be initialized with its piece of code and the variable inside
// it will be initialized with undefined
// and since it a functional scope type variable it is accessible before declaration.
// and before declaration this variable would be holding undefined as the value.
// hence the output for a is undefined.

// What will be the output of a, b, c
function newFunc() {
  console.log(a, b, c);
  const c = 30;
  let b = 20;
  var a = 10;
}

// We are going to receive the error for the above code. But b and c are also hoisted
// but the case is that they are present in the temporal dead zone.
