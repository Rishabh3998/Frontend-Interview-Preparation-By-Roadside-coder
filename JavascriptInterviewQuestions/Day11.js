// Javascript Interview Questions ( Debouncing and Throttling ) - Implementation, Examples etc

// Debouncing and throttling are the 2 ways to optimize event handling in javascript.

// Case study: Debouncing

// Suppose you are typing a string in an input which is going to search some results
// related to that entered string. There are 2 sub-scenarios here
// either there will be a local search on the rendered options or existing options in the result.
// or we can call an API with the entered string as a keyword.
// we don't want to call an api on every entered alphabet we only call the API when there will be a few
// milliseconds delay.

// Debouncing helps us with the event handling optimization when we call some certain events.
// If we call API on every keystroke then there will be multiple unnecessary API calls to the BE which is not good.
// Debouncing limits the execution of a function call and wait for a certain amount of time before running it again,

// To avoid these issues we use debouncing

// Case study: Throttling

// So how throttling is used in real world.
// let's open twitter.com and over here and we can notice as soon as we scroll this scroll bar to a certain
// limit. It’s gonna make an API call and fetch more posts.
// If we scroll this and even notice as soon as it reaches a certain point it makes an API call and fetches
// more posts. So what’s happening over here so we have added throttling to this scroll action in the webpage
// and when it checks that let’s say this is around 500 pixels from reaching the very bottom of the post.
// Then it’s gonna call next few posts so that user can get an infinite scrolling effect.

// Throttling is a technique to limit the execution of an event handler function.
// Even when this event triggers continuously due to user actions like scrolling, window resizing etc

// Ques 1: Create a button UI
// 1. Show "Button presses <X> times" every time button is pressed.
// 2. Increase "Triggered <Y> times" count after 800ms of debounce

// import _ from "lodash";

const btn = document.querySelector(".button");
const pressed = document.querySelector(".pressed");
const count = document.querySelector(".count");

let pressedCount = 0;
let triggeredCount = 0;

const debounce = _.debounce(() => {
  count.innerHTML = ++triggeredCount;
}, 800);

btn.addEventListener("click", () => {
  pressed.innerHTML = ++pressedCount;
  //   setTimeout(() => (count.innerHTML = ++triggeredCount), 800); // It is not the solution
  debounce();
});

// To solve 2 step we can use debouncing
// so either we can create our own implementation of debounce or we can use a library like lodash

// Ques 2: Create a button UI and add throttle as follows
// 1. Show "Button presses <X> times" every time button is pressed.
// 2. Increase "Triggered <Y> times" count every 800ms of throttle

const btn2 = document.querySelector(".button2");
const pressed2 = document.querySelector(".pressed2");
const count2 = document.querySelector(".count2");

let pressedCount2 = 0;
let triggeredCount2 = 0;

const throttle = _.throttle(() => {
  count2.innerHTML = ++triggeredCount2;
}, 800);

btn2.addEventListener("click", () => {
  pressed2.innerHTML = ++pressedCount2;
  //   setTimeout(() => (count.innerHTML = ++triggeredCount), 800); // It is not the solution
  throttle();
});

// Ques3: Create Debounce() polyfill implementation

const btn3 = document.querySelector(".button3");
const pressed3 = document.querySelector(".pressed3");
const count3 = document.querySelector(".count3");

let pressedCount3 = 0;
let triggeredCount3 = 0;

const myDebounce = (callback, delayTime) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delayTime);
  };
};

const debounce2 = myDebounce(() => {
  count3.innerHTML = ++triggeredCount3;
}, 800);

btn3.addEventListener("click", () => {
  pressed3.innerHTML = ++pressedCount3;
  debounce2();
});

// Ques4: Create Throttle() polyfill implementation

const btn4 = document.querySelector(".button4");
const pressed4 = document.querySelector(".pressed4");
const count4 = document.querySelector(".count4");

let pressedCount4 = 0;
let triggeredCount4 = 0;

const myThrottle = (callback, delayTime) => {
  let last = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - last < delayTime) return;
    last = now;
    return callback(...args);
  };
};

const throttle2 = myThrottle(() => {
  count4.innerHTML = ++triggeredCount4;
}, 1000);

btn4.addEventListener("click", () => {
  pressed4.innerHTML = ++pressedCount4;
  throttle2();
});
