// Javascript Interview Questions ( Event Propagation ) - Bubbling, Capturing, and Delegation

// Events are a very important part of Javascript. Every button press, text, input, drag n drop, etc
// requires an event call to perform an action and we have to be very careful on where and when
// we are putting these events in our code because that can sometimes prove to be a hassle for us
// since these event may not always perform like they are supposed to for example, triggering an
// event which was added to its parent and that is when we start cursing Javascript for its weird
// behavior and one of those behavior is called event propagation. So that’s why we're gonna discuss the
// concept of event propagation in this video and all the interview questions that are asked on it in our
// front-end interviews.

// Ques 1: What is Event propagation ?

// Case study: What will happen if we attach/add an event listener on 3 elements button, div and form.
// and what will happen if we click on button present inside the div and form. When the button got clicked
// the form and div will also get clicked cause button is present inside these elements as the child.

// So in what sequence the events will gets trigger or executed.
// Example: button -> form -> div or div -> form -> button

// So this whole process to decide in which direction the events will propagate is known as event propagation.
// The whole event propagation concept contains some sub-concepts

// Ques 2: What is event bubbling ?

// In this concept of event bubbling the sequence of event execution follows the approach of bottom-up approach.
// i.e button -> form -> div => child to parent, and this is the default behavior

const div = document.querySelector(".div");
const form = document.querySelector(".form");
const button = document.querySelector(".clickMe");

div.addEventListener("click", () => {
  alert("div got clicked");
});
form.addEventListener("click", () => {
  alert("form got clicked");
});
button.addEventListener("click", () => {
  alert("button got clicked");
});

// Output: button -> form -> div (bottom-up , child to parent)
// PS: There are some events that do not bubble like focus, blur, hover, load, scroll, error
// https://stackoverflow.com/questions/5574207/html-dom-which-events-do-not-bubble
// Is there any way to stop this bubbling cause if we are clicking on the button we do not want to click
// on form or the div elements

// Ques 3: Difference between
// event.target, this.target, event.currentTarget

const div2 = document.querySelector(".div2");
const form2 = document.querySelector(".form2");
const button2 = document.querySelector(".clickMe2");

const func = (event) => {
  // currentTarget => gives the current target of the event while bubbling happens i.e button, form, div
  // target => gives the target of origin of the event triggered i.e button, button, button
  // this works same as currentTarget or gives undefined
  alert(
    `current target = ${event.currentTarget.tagName}, target = ${event.target.tagName}, this = ${this.tagName}`
  );
};

div2.addEventListener("click", func);
form2.addEventListener("click", func);
button2.addEventListener("click", func);

// Ques 4: What is event capturing or trickling ?

// You may remember that I mentioned that by default the event bubbling is the process that happens
// but there is another process called event capturing which makes events execute from top to bottom
// so if I click on this button. It’s gonna execute first div event, then form event, then button event.

// So how do we achieve that when we are adding a particular event listener on an element, what we are
// supposed to do we can add an object and we can add capture key and make it to be true. Now you’re
// gonna notice if I click on button, first button event will execute and then form. This is weird.
// Why did this happen? It’s because this complete div executed the capturing process but the form and
// button still had the default bubbling process inside of it.

// So how do we tackle this. We supposed to add this capture key in the event listeners of our Form and
// button as well so you gonna notice it’s gonna perform capturing for all of these three capturing or
// sometimes also known as strictly.

// This follows top to bottom approach

const div3 = document.querySelector(".div3");
const form3 = document.querySelector(".form3");
const button3 = document.querySelector(".clickMe3");

const func3 = (event) => {
  alert(`${event.currentTarget.tagName} clicked`);
};

div3.addEventListener("click", func3, {
  capture: true,
});
form3.addEventListener("click", func3, {
  capture: true,
});
button3.addEventListener("click", func3, {
  capture: true,
});

// Ques 5: How to stop event bubbling, capturing

// we can use event.stopPropagation()

const div4 = document.querySelector(".div4");
const form4 = document.querySelector(".form4");
const button4 = document.querySelector(".clickMe4");

const func4 = (event) => {
  event.stopPropagation();
  alert(`${event.currentTarget.tagName} clicked`);
};

div4.addEventListener("click", func4);
form4.addEventListener("click", func4);
button4.addEventListener("click", func4);

// Ques 6: What is event delegation?

// Case study:
// Suppose there are 100s of elements and they trigger the same type of event like click.
// So is this the right approach to add eventListener of 'click' on all the 100 element.
// No, therefore to solve this issue event delegation comes handy.

// Here we add the event listener to the parent element instead of adding them on every nth element

const products = document.querySelector(".products");
products.addEventListener("click", (event) => {
  console.log(event.target.closest("SPAN")); // give the closes tag to the span
  if (event.target.tagName === "SPAN") {
    window.location.href += "/" + event.target.className;
  }
});
