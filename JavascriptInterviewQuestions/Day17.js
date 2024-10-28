// Event loop

// Interview questions

// 1. What is event loop?
//  -   JS is a single threaded language and the event loop is responsible for how its async behavior
//      happens. The event loop is like a traffic controller in JS, that manages the execution of code.
//      It ensures that tasks are processed in an orderly manner, handling async operations by
//      continuously checking if there are pending tasks in queues (microtasks and macro-tasks).

// 2. Why do we need this event loop to manage these task and microtask queue?
//  -   Because priorities can vary for async operations, it may happen that some task have the highest
//      priority and we cannot just leave them behind other async operations like setTimeout.

// 3. What is the output?

// blockMainThread();
// console.log("start");
// const blockMainThread = () => {
//   const start = new Date.now();
//   while (Date.now() - start < 3000) {}
//   console.log("running");
// };
// console.log("end");

// Output:
// running....
// start
// end

// 4. What is the output?

setTimeout(function a() {
  console.log("a");
}, 1000);
setTimeout(function b() {
  console.log("b");
}, 500);
setTimeout(function c() {
  console.log("c");
}, 0);
function d() {
  console.log("d runs");
}
d();

// Theory:
// Task queue: a, b, c
// call stack: d()

// Output:
// d runs
// c
// b
// a

// 5. What is the output?

function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
}

a();

// Theory:
// Task queue:  3 3 3
// call stack: a()

// Output:
// 3 3 3 (because we are using var here and var is function scoped so i will point to its reference and at
// the end of the loop the value of i will be = 3)

// 6. What is the output?

function b() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i);
    }, i * 1000);
  }
}

b();

// output: (As we are using let here and it is blocked scope the value of i will be intact)
// 0 1 2

// 7. What is the output?

Promise.resolve()
  .then(function a() {
    Promise.resolve().then(function d() {
      console.log("d runs");
    });
    Promise.resolve().then(function e() {
      console.log("e runs");
    });
    throw new Error("Error occurred"); // after this line code will not move forward
    Promise.resolve().then(function f() {
      console.log("f runs");
    });
  })
  .catch(function b() {
    // this also returns a promise so code can go further
    console.log("b runs");
  })
  .then(function c() {
    console.log("c runs");
  });

// Theory:

// Microtask queue: a()
// call stack:

// Microtask queue: d() e()
// call stack: a()

// Microtask queue: d() e() b() c()
// call stack: a()

// Output:
// d runs
// e runs
// b runs
// c runs

// 8. What is the output?

Promise.resolve()
  .then(function a() {
    Promise.resolve().then(
      setTimeout(function d() {
        console.log("d runs");
      }, 0)
    );
    Promise.resolve().then(function e() {
      console.log("e runs");
    });
    throw new Error("Error occurred"); // after this line code will not move forward
    Promise.resolve().then(function f() {
      console.log("f runs");
    });
  })
  .catch(function b() {
    // this also returns a promise so code can go further
    console.log("b runs");
  })
  .then(function c() {
    console.log("c runs");
  });

// Theory:

// Task queue: d()
// Microtask queue: e() b() c()
// call stack:

// Output:
// e runs
// b runs
// c runs
// d runs

// 9. What's the output?

function pause(millis) {
  return new Promise(function p(resolve) {
    setTimeout(function s() {
      resolve("resolved");
    }, millis);
  });
}

const start = Date.now();
console.log("start");

pause(1000).then((res) => {
  const end = Date.now();
  const secs = (end - start) / 1000;
  console.log(res, ":", secs);
});

// Theory:

// start
// call stack: pause(1000)
// Task queue: s()
// Microtask queue:  p(resolve)

// start
// call stack: pause(1000) p(resolve)
// Task queue: s()
// Microtask queue:
// resolved: 1.3 sec

// Output:
// start
// resolved: 1.3
