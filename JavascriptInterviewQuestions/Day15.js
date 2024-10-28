// Prototypes

// This lesson will make us believe that everything in JS is an object.
let obj = {
  name: "Rishabh kumar",
  age: 26,
};

console.log(obj.name, obj.age);
console.log(obj.toString()); // Will convert the obj to string "[Object, Object]"
console.log(Object.prototype); // Default properties defined of the object
console.log(obj.__proto__); // Same default properties

// When we are accessing any property inside the object the JS engine will first look inside
// the object but if the property is not there then it will look inside the prototype, but if
// still doesn't find the property then it will throw error. This is what we call prototype
// chaining.

let num = 10;
let name = "Rishabh";
let bool = true;

console.log(num.__proto__); // Number object with some default properties
console.log(num.__proto__.__proto__); // Object properties => so a number is also an object

function add(a, b) {
  return a + b;
}

console.log(add(1, 2));
console.log(add.__proto__);
console.log(add.__proto__.__proto__);

let person = {
  name: "Rishabh kumar",
  age: 26,
  toString: () => {
    console.log("converts to string");
  },
};

console.log(person.alias);
console.log(person.toString());

// Prototype inheritance
// constructor in JS are used to create objects with some specific properties and methods.

// Defined a constructor function
function Animal(name) {
  this.name = name;
}

// Add a method to the prototype
Animal.prototype.sayName = function () {
  console.log(this.name);
};

let animal = new Animal("Tiger");
console.log(animal);
animal.sayName();

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Getting properties present inside Animal
// and this will replace the constructor function of our Dog
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
  console.log("Woof");
};

let dog = new Dog("Max", "Husky");
dog.bark();
dog.sayName();

// 1. What will be the output of the following code?
function Vehicle() {}
Vehicle.prototype.drive = function () {
  console.log("Driving a vehicle");
};

function Car() {}
// Inherit step
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.drive = function () {
  console.log("Driving a car");
};

let vehicle = new Vehicle();
let car = new Car();

vehicle.drive(); // Driving a vehicle
car.drive(); // Driving a car

// 2. What is the difference between __proto__ and prototype in Javascript?
//  -   __proto__ is an object property which points to the prototype of the object. It is used for
//      inheritance and allows accessing of prototype chain.
//  -   Whereas prototype is the property exist on the Constructor functions. Like Vehicle, Animal
//      and it is used to setup the inheritance for objects created by the constructor functions.
//      also to define the methods and properties shared by all instances created by that constructor
//      functions.

let example = 10;
console.log(example.__proto__);

function Example(name) {
  this.name = name;
}
Example.prototype.ex = function () {
  console.log("Printing example");
};

let ex1 = new Example();
ex1.ex();

// 3. What is setPrototypeOf?

// Define a prototype object
let animalPrototype = {
  sound: function () {
    console.log("Making sound...");
  },
};

// Create an object with animalPrototype as its prototype
let cat = Object.create(animalPrototype);
cat.sound();

// Create another object with different prototype
let cow = {
  walk: function () {
    console.log("walking...");
  },
};

// Replace the prototype of cat with the cow's prototype
Object.setPrototypeOf(cat, cow);
cat.walk();
// cat.sound(); // Not exist

// 4. What is instanceOf?
function Animal1(name) {
  this.name = name;
}

// Add a method to the prototype
Animal1.prototype.sayName = function () {
  console.log(this.name);
};

let animal1 = new Animal1("Tiger");
console.log(animal1);
animal1.sayName();

function Dog1(name, breed) {
  Animal1.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog1.prototype.bark = function () {
  console.log("Woof");
};

let dog1 = new Dog1("Sheru", "Labrador");

Array.prototype.myArr = function () {
  console.log("This is my array " + this);
};

const arr = [1, 2, 3];

console.log(dog1 instanceof Animal); // This is an instance of Animal constructor

// 5. How can you create an object without a prototype in JS?
let obj1 = Object.create(null);
console.log(obj1); // Object without a prototype

// 6. What will be the output of the following code?
function A() {}
A.prototype.foo = 10;

function B() {}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.foo = 20;

function C() {}
C.prototype = Object.create(B.prototype);
C.prototype.constructor = C;
// C.prototype.foo = 30;

let obj_x = new A();
let obj_y = new B();
let obj_z = new C();

console.log(obj_x.foo); // 10
console.log(obj_y.foo); // 20
console.log(obj_z.foo); // 20 foo will not be there inside C so it will find it inside B

// &. Deep clone an object in JS.
let object = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};

let clonedObject = object; // Only the reference is passed here
clonedObject.a = 3;

let clonedObject2 = structuredClone(object); // Deep clone using in-built function

// Custom function to deep clone
function deepClone(obj) {
  // Handle null and non-object types
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // create a new object or array based on the type of the input object
  let clone = Array.isArray(obj) ? [] : {};

  // Iterate through each key in the input object
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

let clonedObject3 = deepClone(object);
console.log(clonedObject3);
