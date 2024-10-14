// JS interview questions
// ( Call, Bind and Apply ) - Polyfills, Output Based, Explicit Binding

// These 3 methods are available to all javascript functions
// which are used to set the 'this' keyword independent of how the function is called
// we can use these methods to tie a function to an object and call the function as it
// belongs to that object

let car = {
  name: "Aventador",
  color: "Black",
  company: "Lamborghini",
};

function purchaseCar() {
  console.log(`I have purchased ${this.name} having ${this.color} color`);
}

purchaseCar.call(car);
purchaseCar.apply(car);
purchaseCar.bind(car);

// Question 1: What is call?

var obj = { name: "Rishabh" };

function sayHello() {
  console.log(`Hello ${this.name}`); // this.name will comes out to be undefined. because here this
  // keyword is pointing to the window object as its parent object.
}

sayHello();

// Now how can i call this sayHello function so that this points to this obj object as parent.
sayHello.call(obj); // now this keyword will point obj as the parent object.
// call(currentObject, arguments)
// sayHello2.call(obj, 25, "software engineer");

// Question 1: What is apply?
// Apply works same as call works but apply takes a second params which is an argumentsArray
// apply(currentObject, argumentsArray)

function sayHello2(age, profession) {
  console.log(`Hello ${this.name} is ${age} years old ${profession}`);
}

sayHello2.apply(obj, [25, "software engineer"]);

// Question 3: What is Bind?
// Here when we use bind it returns a function which is reusable.

const bindFunction = sayHello2?.bind(obj);
bindFunction(25, "Software engineer"); // reusable function
bindFunction(20, "Student"); // reusable function

// Output based question:
// Question 1: What is the output?

const person = { name: "Rishabh" };

function sayHi(age) {
  return this.name + " is " + age;
}

console.log(sayHi.call(person, 24)); // Rishabh is 24
console.log(sayHi.bind(person, 24)); // log the reusable function that bind will provide

// Question 2: Call with function inside object

const age = 20;

var personObject = {
  name: "Vansh",
  age: 20,
  getAge: function () {
    return this.age;
  },
};

var person2 = { age: 24 };
console.log(personObject.getAge.call(person2)); // 24
console.log(personObject.getAge.apply(person2)); // 24
console.log(personObject.getAge.bind(person2)()); // 24

// The above code will log 24
// Reason: The getAge function is defined inside personObject, where the parent object for this key
// word in getAge function will be personObject but when we applied the 'call' on the getAge function
// having current object inside call() as person2 now the 'this' inside the getAge func will points
// toward the person2 object as its parent object.

// Question 6: What's the output?

const status = "smile";

setTimeout(() => {
  const status = "cry";

  const data = {
    status: "avocado",
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus()); // avocado
  console.log(data.getStatus.call(this)); // smile since here this is pointing to the global object
}, 0);

// Question 7: Call printAnimals such that it prints all animals in object
const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log(`# ${i} ${this.species} : ${this.name}`);
  };
  this.print();
}

printAnimals(); // This is pointing to the global object so will print undefined
for (let i = 0; i < animals.length; i++) {
  printAnimals.call(animals[i], i); // here we are dynamically providing the context of each object
  // present in animal array to the call() method. here we cannot pass animals directly since it
  // is an array not an object
}

// Question 8: Append an array to another array
// Here if user restricts to use concat() methods because it provides a new array
// and wants us to modify the existing array then we can use call method

const array = ["a", "b"];
const elements = [0, 1, 2];

// Now we have to modify the array by appending the elements array into it.
array.push.apply(array, elements); // passed elements as arguments
// Now push will take out each elements from argsArray and push them into array.

console.log(array);

// Question 9: Find min/max inside of an array
// we are going to use apply to enhance built in functions
const numbers = [5, 8, 1, 3, 4];
console.log(Math.max(numbers)); // NaN the max function doesn't work on arrays

// we can use loop based algorithm
let min = +Infinity;
let max = -Infinity;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
  if (numbers[i] < min) {
    min = numbers[i];
  }
}

console.log(min, max); // 1, 8

// Enhances Math.max
console.log(Math.max.apply(null, numbers)); // numbers will passed into max as arguments
console.log(Math.min.apply(null, numbers)); // numbers will passed into min as arguments
// in the above solution apply doesn't need any context for current object so we pass null

// Question 9: Bound function

function f() {
  console.log(this);
}
let userBound = {
  g: f.bind(null),
};

userBound.g(); // Here we will get the window or global object
// because we are using bind on f function and we are passing null as context for object
// therefore the parent object for f function will comes out to the window object
// on which the function is pointing

// Question 10: Bind chaining

function f2() {
  console.log(this.name);
}

f2 = f2.bind({ name: "Rishabh" }).bind({ name: "Vansh" });
f2();

// The above chaining will not work at all. Bind chaining doesn't exist. Once an object is provided
// as a context to bind it will be the sole context the bind would know. So if a function is bounded
// then we cannot rebound it with a new object.

// Question 11:

function checkPasswords(success, failed) {
  let password = "Rishabh";
  if (password === "Rishabh") success();
  else failed();
}

let userLogIn = {
  name: "Rishabh Kumar",
  loggedInSuccessful() {
    console.log(`${this.name} logged in successfully`);
  },
  loggedInFailed() {
    console.log(`${this.name} logged in failed`);
  },
};

checkPasswords(
  userLogIn.loggedInSuccessful.bind(userLogIn),
  userLogIn.loggedInFailed.bind(userLogIn)
);

// The logic for above code was to bind userLogIn object to functions before passing it to
// checkPasswords functions so that this function will points towards userLogIn object rather
// than global object.

// Question 12:

function checkPasswords2(ok, fail) {
  let password = "Rishabh";
  if (password === "Rishabh") ok();
  else fail();
}

let userLogIn2 = {
  name: "Rishabh",
  login(result) {
    console.log(
      `${this.name} ${result ? "login successfully" : "login failed"}`
    );
  },
};

checkPasswords2(
  userLogIn2.login.bind(userLogIn2, true),
  userLogIn2.login.bind(userLogIn2, false)
);

// Till now we were using only normal functions with call, bind and apply
// let's see what will happen with arrow functions.

// Question 13: Explicit binding with Arrow functions
const personAge = 10;

const personDetails = {
  name: "Rishabh kumar",
  age: 25,
  getAgeArrow: () => {
    console.log(`${this.age}`);
  },
  getAge() {
    console.log(`${this.age}`);
  },
};

var personDetails2 = { age: 20 };
personDetails.getAgeArrow.call(personDetails2); // undefined
personDetails.getAge.call(personDetails2); // 20

// The 'this' keyword in arrow functions takes the parent object of the normal function in which
// the arrow function is wrapped. But in the above code the arrow function is not wrapped inside a
// normal function therefore the parent object for that arrow function will be window object
// Hence we will get undefined

// PS: By using call, bind and apply we cannot manipulate the context of the object pointing to the function.

// Question 14: Polyfill for call method

let cars = {
  name: "Ferrari",
  color: "Red",
};

function purchaseCars(currency, price) {
  console.log(`I have purchased ${this.name} for ${currency}${price}`);
}

// purchaseCars.call(cars, "$", 50000);

// Own polyfill
// call syntax => callPolyfill(objectToMap, arguments)
// since call method depends upon the prototype/nature of function i.e: arrow or normal

// callPolyFill
Function.prototype.callPolyfill = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "is not callable");
  }
  context.fn = this;
  context.fn(...args);
};

// applyPolyFill
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

// bindPolyFill
Function.prototype.bindPolyfill = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "cannot be bound as it is not callable");
  }
  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

purchaseCars.callPolyfill(cars, "$", 50000);
purchaseCars.applyPolyfill(cars, ["$", 50000]);
const newFunc = purchaseCars.bindPolyfill(cars);
newFunc("$", 50000);
