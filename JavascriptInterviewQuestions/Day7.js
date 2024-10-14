// JS interview questions
// ( 'this' keyword ) - Output Based, Scope, Implicit Binding, etc

// There are 2 types when it comes to object binding in JS

// 1. Implicit: It is applied when we invoke a function in an object using dot notation.

// Example:
var calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  subtract(b) {
    this.total -= a;
    return this;
  },
};
const result = calc.add(10);
console.log(result);

// here this keyword is pointing to the object using which the function was invoked
// in this case it is calc object

// 2. Explicit: This can be applied using call(), bind(), and apply()

// In english we use this pronoun to reference something. For eg: we have a bucket of fruits then this
// will refer to the bucket itself. 'Fruits are kept in this bucket.'

// similarly in JS we use this keyword to reference something like an object.
// Everything in JS is an object. Even function are the first class object.
// so the meaning of 'this' will depend on the context we are currently in.
// Like we are writing currently in the global context.

this.a = 5;
console.log(this.a); // here this is representing the global object.
console.log(this); // this will print the window/global object

function getParam() {
  // For this function the current parent object is the global/window object.
  console.log(this);
}
getParam(); // this will log the global object

const getParamArrow = () => {
  console.log(this); // this will print the object {a: 5}
};

getParamArrow();

var parentObject = {
  parentFunction: function () {
    // For this function the parent object is parentObject
    console.log(this);
  },
};

parentObject.parentFunction(); // this will log the parentFunction

let user = {
  name: "Rishabh",
  age: 25,
  childObj: {
    newName: "Ritik",
    getDetailChildObj() {
      console.log(this.newName, "and", this.name);
    },
  },
  getDetails() {
    console.log(this); // will print whole user object
    console.log(this.name); // will print name
  },
  getAge: () => {
    console.log(this); // this is pointing to the window object
    console.log(this.age);
  },
};

user.getDetails(); // Rishabh, the parent object for this is user.
user.getAge(); // undefined
user.childObj.getDetailChildObj(); // Ritik and undefined, this function's parent function is childObj
// therefore this.name will not point out the user function now.

// In normal function this points to the parent object, but the arrow function points to the window object.

// 'this' in classes
class userClass {
  constructor(n) {
    this.name = n;
  }

  getName() {
    console.log(this.name); // this inside of a class will point to everything inside of the constructor.
  }
}

const User = new userClass("Rishabh");
console.log(User);
User.getName();

// Output based questions:
// Question 1:

const userQuestion = {
  firstName: "Rishabh",
  getName() {
    const firstName = "Rishabh kumar";
    return this.firstName; // 'this' will point to the user object not to the variable
    // defined inside the function.
  },
};

console.log(userQuestion.getName()); // Rishabh from user object.

// Question 2: What is the result of accessing its ref ? why ?
function makeUser() {
  return {
    name: "Rishabh",
    ref: this,
  };
}

// Here this will point to the parent object in the normal function
// and the parent object here is the window object.
// this will try to find out the parent object of function not itself's parent.
console.log(makeUser().ref);

// How to make this to fetch name in the returned object ?

function makeUser2() {
  return {
    name: "Rishabh",
    ref() {
      // Now this function will point to its parent object which is the returning object
      return this.name;
    },
  };
}

console.log(makeUser2().ref());

// Question 3: what is the output ?

const user3 = {
  name: "Rishabh",
  logMessage() {
    console.log(this.name);
  },
};

setTimeout(user3.logMessage, 1000); // This will print undefined.

// In the above code the setTimeout is taking the user3.logMessage as the callback therefore,
// the parent object for this keyword in setTimeout for logMessage function will comes out to be
// window object and the name key is not present in the window object.

// how can we fix this and access the name

setTimeout(function () {
  user3.logMessage();
}, 1000);

// Now the user.logMessage() will act as the method for the user3 object which is accessed inside
// the anonymous callback function in setTimeout.

const user4 = {
  name: "Rishabh",
  greet() {
    return `Hello ${this.name}`;
  },
  farewell: () => {
    return `Goodbye ${this.name}`;
  },
};

console.log(user4.greet()); // greet function will have the access for the user4 object as its parent
// object.
console.log(user4.farewell()); // farewell function will not have the access of the user4 object since
// it is an arrow function and they points to the window object.

// Question 5: Create an object calculator

let calculator = {
  num1: 0,
  num2: 0,
  read(a, b) {
    this.num1 = a;
    this.num2 = b;
  },
  sum() {
    return this.num1 + this.num2;
  },
  mul() {
    return this.num1 * this.num2;
  },
};

calculator.read(2, 4);
console.log(calculator.sum());
console.log(calculator.mul());

// Question 6:  What will be the output ?
var length = 4;
function callback() {
  console.log(this.length); // 4
}

const object = {
  length: 5,
  method(fun) {
    fun(); // since this function is called inside this function then
    // this will not target the object it will target the global object
  },
  method2() {
    console.log(arguments);
    arguments[0]();
  },
};

object.method(callback); // 4
object.method2(callback, 2, 3); // 3 (length of the arguments array length)

// In the method2 the arguments array is itself considered as object and for that object the length
// will be printed as the length of the arguments array.

// Question 7: Implement calc

const calc2 = {
  total: 0,
  add(a) {
    this.total += a;
    return this; // here we have to return tha whole object so we can access the other functions
    // via dot notation. This will help in chaining of multiple function calls inside same function.
  },
  multiply(b) {
    this.total *= b;
    return this;
  },
  subtract(c) {
    this.total -= c;
    return this;
  },
};

const resultLast = calc2.add(10).multiply(5).subtract(30).add(10);
console.log(resultLast.total);
