// JS interview questions
// ( Objects ) - Output Based, Destructuring, Object Referencing, etc

// First of all everything in JS is an object
// An object is a collection of properties,
// and a property is an association between a name (or key) and a value.
// A property's value can be a function, in which case the property is known as a method.

const _ = require("lodash");

const user = {
  name: "Rishabh",
  age: 25,
  role: "Software engineer",
  company: "Attentive AI",
};

// accessing the values via key in the user
console.log(user.name, user.age);
console.log(user["name"], user["age"]);

// modification of any key
user.name = "Ritik";
console.log(user.name);

// delete any key
delete user.age;
console.log(user);

// interview question on delete keyword
const func = (function (a) {
  // here a is the local variable
  // we only use delete keyword only when we want to delete any key in the object
  // therefore the returned value will be a and a will not be effected by delete.
  delete a;
  return a;
})(5);

console.log(func);

// Adding a property with spaces
const username = {
  name: "Vansh",
  age: 18,
  "property with spaces": true,
};

console.log(username["property with spaces"]);
delete username["property with spaces"];
console.log(username);

// How to add dynamic key value pairs to object
const property = "firstName";
const name = "Rishabh";

const person = {
  [property]: name,
};

console.log(person);
console.log(person.firstName);

// looping through objects
for (key in user) {
  console.log(key, user[key]);
}

// Output based questions
// Question 1: What wil be the O/P

const object = {
  a: "One",
  b: "Two",
  a: "Three",
};

// the same name key will be updated according to the last data present for it
console.log(object);

// Question 2: Create a function multiplyByTwo(obj) that multiplies all numeric property
// value of nums by 2

let nums = {
  a: 100,
  b: 200,
  title: "My name",
};

const multiplyByTwo = (obj) => {
  for (key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] = obj[key] * 2;
    }
  }
};

multiplyByTwo(nums);
console.log(nums);

// Question 3: What is the O/P of the following code?
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123; // a['[object, object]']
a[c] = 456; // a['[object, object]']

// In the above code when we are trying to add 'b' in 'a' object JS is trying to convert {key: 'b'}
// to the string but since this is an object the resultant string comes out to be '[object, object]'
// this same happens when we try to add 'c' in 'a' object.
// so the key name becomes same and values get override.

console.log(a);
console.log(a[b]); // 456

// Question 4: What is JSON.stringify and JSON.parse ?
// To solve the above problem we can use JSON.stringify to stringify the key before adding it in 'a' object.

const a1 = {};
const b1 = { key: "b" };
const c1 = { key: "c" };

a1[JSON.stringify(b)] = 123; // a[{ key: "b" }: 123]
a1[JSON.stringify(c)] = 456; // a[{ key: "c" }: 456]

console.log(a1);
console.log(a1[JSON.stringify(b)]); // 123

const human = {
  name: "Vansh",
  age: 18,
};

const objectToString = JSON.stringify(human);
console.log(objectToString);

const stringToObject = JSON.parse(objectToString);
console.log(stringToObject);

// Application of the above feature is mostly around storing data in localStorage
// when we setItem and getItem
// since we cannot store object inside value in local storage therefore we stringify the object before
// storing and when we fetch this value from storage we parse it and convert it into an object

// localStorage.setItem("test", objectToString);
// if we try to assign the object directly it will ultimately converted to [object, object]

// console.log(JSON.parse(localStorage.getItem("test")));

// Question 5: O/P
console.log([..."name"]); // [ 'n', 'a', 'm', 'e' ]

// Question 6: O/P
const userName = { name: "Rishabh", age: 25 };
const admin = { admin: true, ...userName }; // here we are spreading userName object inside admin object

console.log(admin); // { admin: true, name: 'Rishabh', age: 25 }

// Question 7: O/P
const settings = {
  userName: "Rishabh",
  level: 20,
  health: 100,
};

const data = JSON.stringify(settings, ["level", "health"]); // only stringify the given key names
console.log(data); // {"level":20,"health":100}

// Question 8: O/P
const shape = {
  radius: 10,
  diameter() {
    // normal function
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius, // arrow function, 'this' is pointing to window object
  // where radius doesn't exist
};

console.log(shape.diameter()); // 'this' is referencing to shape object
console.log(shape.perimeter()); // 'this' is referencing to window object

// Question 9: What is destructuring in objects ?
let student = {
  name: "Piyush",
  age: 24,
  fullName: {
    firstName: "Rishabh",
    lastName: "Kumar",
    combinedName: "Rishabh kumar",
  },
};

const {
  name: studentName,
  age,
  fullName: { combinedName },
} = student;
console.log(studentName, age, combinedName);

// Question 10: O/P
function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit];
}

// Rest operator should always be accessed in the last. We cannot insert it in between
// Spread operator can be used in between
console.log(getItems(["Banana", "Apple"], "Pear", "Orange"));

// Question 11: Object referencing
let obj = { greeting: "Hey!!" };
let obj2;
obj2 = obj;
obj.greeting = "hello";
console.log("obj", obj.greeting);
console.log("obj2", obj2.greeting);

// Objects are reference type and when we did the step in line 211.
// we assigned the reference of obj to obj2 and no copy of the obj gets created.
// Therefor if we change any one of them the other will be automatically change.

let object1 = { greeting: "Hey!!" };
let object2;
object2 = { ...object1 }; // here we used spread operator to create a copy of object 1 and assigned
// the copy to object2
object1.greeting = "hello";
console.log("object1", object1.greeting);
console.log("object2", object2.greeting);

// Question 12: O/P
console.log({ a: 1 } == { a: 1 }); // false
// console.log({ a: 1 } === { a: 1 }); // This condition will always return 'false'
// since JavaScript compares objects by reference, not value.
// All of these object are separate objects and have their own memory address
// The result will always be the same it doesn't matter if we compare them strictly (===)
// or non-strictly (==)

// Question 13: O/P
let person1 = { name: "Rishabh" };
let member = [person1]; // This is storing in member[0] and by making person1 null
// it doesn't affect the object.
// person1 = null;
console.log(member);
person1.name = null; // this will effect the name
console.log(member);

// Question 14: O/P
const value = { number: 10 };
const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply(); // 20
multiply(); // 20
multiply(value); // 20 using value object directly
multiply(value); // 40 value got modified due to last step

// Question 15: O/P
function changeAgeAndReference(person) {
  person.age = 25;
  person = {
    name: "John",
    age: 50,
  };
  return person;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

const personObj2 = changeAgeAndReference(personObj1); // personObj1 will be passed by reference in the func

console.log(personObj1); // { name: 'Alex', age: 25 } Here the age got modified due to function call
console.log(personObj2); // { name: 'John', age: 50 } Here the function returned a new object

// Question 16: Shallow copy and Deep copy

// Explanation: https://youtu.be/E3dboLSBeJc?si=-EszqZu0F4iLCRYN

// Shallow copy: When we copy an object to another object but still the other object got the
// references of some of the properties.
// when one object holds the reference of another object this is known as shallow copy

// Deep copy: When we completely cloned an object to a new variable where no reference exists between
// these 2 object we call this type of copy a deep copy

// How?
let base = {
  name: "Rishabh",
  age: 25,
  skills: {
    primary: "Front end",
    professional: [
      "software engineering",
      "3D development",
      "Game development",
    ],
    personal: ["Weight lifting", "Art"],
  },
  calculateAge: function () {
    return 30;
  },
  joiningDate: new Date(),
};

const objectClone = Object.assign({}, base); // This will not clone nested objects
objectClone.name = "Piyush";
// objectClone.skills.primary = "Full stack"; // This will change in all 4 objects since assign, parse
// and even spread operator are not the full proof solution for this problem.
const objectClone2 = JSON.parse(JSON.stringify(base)); // This is the proper solution to this problem
// But there is a catch with this parse and stringify method it doesn't account functions present
// inside the object and the date object will also converted to string
objectClone2.name = "Ritik";
const objectClone3 = { ...base };
objectClone3.name = "Ritik";
// objectClone3.skills.primary = "Back end";

console.log(base, objectClone, objectClone2, objectClone3);
// Output:
// {
//   name: 'Rishabh',
//   age: 25,
//   skills: {
//     primary: 'Front end',
//     professional: [ 'software engineering', '3D development', 'Game development' ],
//     personal: [ 'Weight lifting', 'Art' ]
//   },
//   calculateAge: [Function: calculateAge],
//   joiningDate: 2023-11-08T17:10:33.809Z
// } {
//   name: 'Piyush',
//   age: 25,
//   skills: {
//     primary: 'Front end',
//     professional: [ 'software engineering', '3D development', 'Game development' ],
//     personal: [ 'Weight lifting', 'Art' ]
//   },
//   calculateAge: [Function: calculateAge],
//   joiningDate: 2023-11-08T17:10:33.809Z
// } {
//   name: 'Ritik',
//   age: 25,
//   skills: {
//     primary: 'Front end',
//     professional: [ 'software engineering', '3D development', 'Game development' ],
//     personal: [ 'Weight lifting', 'Art' ]
//   },
//   joiningDate: '2023-11-08T17:10:33.809Z'
// } {
//   name: 'Ritik',
//   age: 25,
//   skills: {
//     primary: 'Front end',
//     professional: [ 'software engineering', '3D development', 'Game development' ],
//     personal: [ 'Weight lifting', 'Art' ]
//   },
//   calculateAge: [Function: calculateAge],
//   joiningDate: 2023-11-08T17:10:33.809Z
// }

// The complete solution for this issue is to use the library lodash
let fullClone = _.cloneDeep(base);
console.log("fully cloned object", fullClone);
// the reason certain things get lost using JSON.parse is
// because there's no equivalent type in JSON, such as functions in this example.

// Summary:

// way 1: partial deep cloning
// Object.assign() and spread operator (...)
// limitation: Doesn't work for nested objects

// way 2: JSON.parse(JSON.stringify(object))
// Was working with nested objects
// limitation: This doesn't work with functions and types

// way 3: lodash library
// used method: lodash.cloneDeep()
