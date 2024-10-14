// JS interview questions (Roadside coder)
//  Map, filter and reduce array methods

// These are basically array methods which are used to iterate over an array to perform some
// operations/transformation/computation using elements present inside the array using the
// callback function passed in the the first argument of these methods, each may or may not return
// a new array based on the passed function in first args.

// Map ----->
// What is map() ?
// A map is an array method which is used to create a new array by using an existing array.
// This happens via applying a function to each and every element of a the existing array.

// Syntax of map()
// const resultantArray = array.map(callbackFunction);
// This callback function can either be passed via proper declaration or we can pass an anonymous
// function as well as the callback function
// const callbackFunction = (currentElement, index, existingArray) => {
// ------steps of computation--------
// }
// first arg in callback is current element, second arg is current index at computation time
// third arg is whole existing array on which map is performing

// Here the callback function returns the computed output for each current element

const nums = [1, 2, 3, 4, 5];
const multiplyByThree = nums.map((currElement) => {
  return currElement * 3;
});
console.log(multiplyByThree);

// Filter ----->
// What is filter() ?
// A filter method is an array method which is used to filter out the data from an existing array
// on the basis of the conditions present in the callback function. This returns an array.
// This methods iterates on each and every element of an array an applies a conditions on it
// which are provided in the callback function. If condition gets fulfilled then the element
// is pushed into a new/output array which ultimately get returns after the iteration is over.

// Syntax of filter()
// const resultantArray = array.filter(callbackFunction);
// This callback function can either be passed via proper declaration or we can pass an anonymous
// function as well as the callback function
// const callbackFunction = (currentElement, index, existingArray) => {
// ------steps of computation--------
// }
// first arg in callback is current element, second arg is current index at computation time
// third arg is whole existing array on which map is performing

// here the callback function returns either true or false i.e either to keep the element in the
// output array or not.

const moreThanTwo = nums.filter((currElement) => {
  return currElement > 2;
});
console.log(moreThanTwo);

// Reduce ----->
// What is reduce()?
// The reduce method helps to reduce down the current array either into a singular computed value or
// an entirely new array with multiple computations on each and every element.

// Syntax of reduce
// const resultantValueOrArray = array.reduce(callbackFunction, initialValue);
// const callbackFunction = (accumulator, currentElement, currentIndex, existingArray) => {
// ----steps of computation----
// }
// accumulator is the result of the previous computation and the initialValue is for this accumulator

const sumOfNums = nums.reduce((acc, currElement) => {
  return acc + currElement;
}, 0);

console.log(sumOfNums);

// Polyfill for map()
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

// Polyfill for filter()
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

// Polyfill for reduce()
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

// maps() vs forEach() ??
// common behavior is that these both are array functions which can loop through the array
// forEach is just to loop through any array and perform some operations on each element.
// map is used to transform an existing array to a new one where existing array kept intact
// map always returns an output array
// Another advantage is that we can chain other methods on map but not on forEach

const arr = [2, 3, 5, 7];
console.log("original array", arr);

const mappedArr = arr
  .map((ele) => {
    return ele + 2;
  })
  .filter((ele) => ele > 5);

console.log("after map", mappedArr);
console.log("original array after map", arr);

const forEachArray = arr.forEach((ele, index) => {
  arr[index] = ele + 2;
});

console.log("after forEach", forEachArray); // undefined since foreach doesn't return anything
// it is just used to iterate through an array and perform some operations on elements present in it
console.log("after foreach", arr);

// map(), filter(), reduce() --> O/P based question
// Dummy data
let students = [
  { name: "Rishabh", rollNumber: 10, marks: 100 },
  { name: "Ritik", rollNumber: 12, marks: 80 },
  { name: "Vansh", rollNumber: 13, marks: 50 },
  { name: "Rahul", rollNumber: 14, marks: 90 },
];

// Question 1 --> Return only name of students in capital
// Approach 1 -> using map
const usingMap = students.map((student) => student.name.toUpperCase());
console.log(usingMap);

// Approach 2 -> using forEach
students.forEach(
  (student, index) => (students[index].name = student.name.toUpperCase())
);

for (let i = 0; i < students.length; i++) {
  console.log(students[i].name);
}

// Question 2 --> Return only details of those students scored more than 85
const filteredStudents = students.filter((student) => student.marks > 85);
console.log(filteredStudents);

// Question 3 --> More than 85 marks and rollNumber greater then 13
const filteredStudents2 = students.filter(
  (student) => student.marks > 85 && student.rollNumber > 13
);
console.log(filteredStudents2);

// Question 4 --> Sum of marks of all students
const sumOfMarks = students.reduce((acc, curr) => acc + curr.marks, 0);
console.log(sumOfMarks);

// Question 5 --> Return only names of those students scored more than 85
const filteredStudents3 = students
  .filter((student) => student.marks > 85)
  .map((student) => student.name);

console.log(filteredStudents3);

// Question 6 --> Return total marks for students with marks greater than 85
// after 20 marks have been added to those who scored less than 85

const result = students
  .filter((student) => student.marks < 85)
  .map((student) => {
    return {
      ...student,
      marks: (student.marks += 20),
    };
  })
  .filter((student) => student.marks > 85)
  .reduce((acc, curr) => acc + curr.marks, 0);

console.log(result);
