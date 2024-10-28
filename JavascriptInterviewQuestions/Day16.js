// class and constructors

// classes were introduced in ES6 version of JS.

// classes are basically blueprints for creating objects which consists properties and methods that
// define the behavior and characteristics of those objects.

// Function constructors
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

// Classes
class Teacher {
  // Used to initialize the properties for a function or for a class
  constructor(name, channel, likes = 0) {
    this.name = name;
    this.channel = channel;
    this.videoLikes = likes;
  }

  intro() {
    return `Hey, It's ${this.name}! Welcome to ${this.channel}`;
  }

  like() {
    this.videoLikes++;
    return `Liked this video, Current likes: ${this.videoLikes}`;
  }
}

const Rishabh = new Teacher("Rishabh kumar", "Teacher");
const Ritik = new Teacher("Ritik kumar", "Businessman");
console.log(Rishabh);
console.log(Rishabh.intro());
console.log(Rishabh.like());

// Converting the above code to function constructor
function TeacherFn(name, channel, likes = 0) {
  this.name = name;
  this.channel = channel;
  this.videoLikes = likes;
}

TeacherFn.prototype.introFn = function () {
  return `Hey, It's ${this.name}! Welcome to ${this.channel} Fn`;
};

TeacherFn.prototype.likeFn = function () {
  this.videoLikes++;
  return `Liked this video, Current likes: ${this.videoLikes} Fn`;
};

const RishabhFn = new TeacherFn("Rishabh", "Youtube");
console.log(RishabhFn);
console.log(RishabhFn.introFn());

// Inheritance
class YoutubeTeacher extends Teacher {
  constructor(name, channel, likes, subscribers) {
    // Gives something that our parent class requires
    super(name, channel, likes);
    // Unique key in this class only
    this.subscribers = subscribers;
  }

  // After using static we made this function in-accessible to outside and inside of this class
  // We can use these static methods as factory methods which can helps us to create instances of
  // a class or for handling specific object creation logic.
  static paidCourse() {
    // we cannot accessing anything inside this function.
    // Instead of returning a string let's instantiate one object
    // return `Frontend interview prep course ${this.channel}`;
    return new YoutubeTeacher("Rishabh", "InvestWise", 12, "100k");
  }

  subscribersCount() {
    return `This ${this.channel} has ${this.subscribers} subscribers`;
  }
}

const ytTeacher = new YoutubeTeacher("Rishabh", "InvestWise", 12, "100k");
console.log(ytTeacher.like());
console.log(ytTeacher.subscribersCount());

const paidCourse = YoutubeTeacher.paidCourse();
console.log(paidCourse);

// Output:
// {
//     "name": "Rishabh",
//     "channel": "InvestWise",
//     "videoLikes": 12,
//     "subscribers": "100k"
// }

// 1. Explain the difference between a class and an object in JS.
//  -   class is a blueprint that defines a structure and behavior of the object.
//  -   And object are the instances of that class that posses properties and methods defined by class.

// 2. What is the output?
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const sq = new Rectangle(5, 5);
const dq = new Rectangle(4, 6);

console.log(sq.area());
console.log(dq.area());

// 3. How does inheritance work in JS classes?
//  -   Inheritance in JS classes is achieved using the extends keyword. It allows a sub class (child class)
//      to inherit properties and methods from a super class (parent class).

// 4. What's the output?
class Employee {
  constructor() {
    this.name = "John";
  }
  //   constructor() {
  //     this.age = 30;
  //   }
}

let employeeObject = new Employee();
console.log(employeeObject.name); // Error: A class may only have one constructor.

// 5. Which approach is better and why?
const jamesBond = {
  firstName: "Rishabh",
  lastName: "Kumar",
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`.trim();
  },
};

console.log(jamesBond.getFullName());

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`.trim();
};

const jamesBond2 = new Person("Rishabh", "Kumar");
console.log(jamesBond2.getFullName());

// Actually the second approach is better since in the first approach a closure is maintained for each
// copy of an object containing the getFullName method. While in the second approach the methods is
// registered in the prototype rather than in every single object, thus this is more memory efficient
// object.

// 6. Implement this
// const result = calc.add(10).subtract(5).multiply(2).divide(4).getResult();
// console.log(result);

class Calculation {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
    return this;
  }

  subtract(num) {
    this.result -= num;
    return this;
  }

  multiply(num) {
    this.result *= num;
    return this;
  }

  divide(num) {
    if (num !== 0) {
      this.result /= num;
    } else {
      console.log("Cannot divide by 0");
    }
    return this;
  }

  getResult() {
    return this.result;
  }
}

const calc = new Calculation();
const result = calc.add(10).subtract(5).multiply(2).divide(4).getResult();
console.log(result);

// 7. Inheritance and polymorphism
// Implement a `Shape` class with an `area()` method.
// Create sub-class `Circle` and `Square` that inherit from `Shape` and override the `area()` method
// to calculate their respective areas.

class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  area() {
    return this.side ** 2;
  }
}

const circle = new Circle(5);
const square = new Square(4);

console.log(circle.area(), square.area());

// 8. What are getters and setters in JS?

// Getter and setters are methods used to control access to the properties of a class.

class TeacherGetterAndSetter {
  // Used to initialize the properties for a function or for a class
  constructor(name, channel) {
    this.name = name;
    this.channel = channel;
    // videoLikes is a private property
    this._videoLikes = 0;
  }

  intro() {
    return `Hey, It's ${this.name}! Welcome to ${this.channel}`;
  }

  like() {
    this.videoLikes++;
    return `Liked this video, Current likes: ${this.videoLikes}`;
  }

  // Getter
  get videoLikes() {
    return this._videoLikes;
  }

  set videoLikes(likes) {
    // We can add validations inside these getter ans setter functions
    if (likes < 0) throw new Error("Likes must be greater than 0");
    this._videoLikes = likes;
  }
}

const roadSideCoder = new TeacherGetterAndSetter("Piyush", "RoadSideCoder");
roadSideCoder.videoLikes; // Here we are accessing the get method not the _videoLikes key because
// it is private
roadSideCoder.videoLikes = 100;
console.log(roadSideCoder.videoLikes);
