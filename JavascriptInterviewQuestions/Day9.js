// JS interview questions
// ( Promises ) - Polyfills, Callbacks, Async/await, Output Based, etc

// If we request some data from an API, then FE sends a GET request and BE promises to send that data
// to Front-end. If we received the data that means the promise is fulfilled and it got resolved then
// we can use that fetched data. But if we don't receive any data that means the promise got rejected
// then we have to show some error.

// First let's discuss about Synchronous and Asynchronous code.
// Because promise is an asynchronous code.

// Synchronous code

console.log("start");
console.log("Middle part of the code");
console.log("Finish");

// JS is an interpreted language therefore the above code gets executed line by line and this is the
// example to synchronous code. Because here the interpreter doesn't wait for any part
// of code which cannot execute completely at the same moment.

// Asynchronous code

console.log("start");
setTimeout(() => {
  console.log("asynchronous part of the code");
}, 1000);
console.log("Middle part of the code");
console.log("Finish");

// JS is a single threaded language and cannot execute a piece of code parallely with the other piece
// of code. Therefore it continues and execute the rest of the code and then go back to the code where
// some time was requested for execution. Calling API is also an asynchronous process. JS executes
// synchronous code first then it moves to asynchronous part of the code.

// The above part of code is the asynchronous code where the setTimeout gives the promise to the
// interpreter that it will give the result after some time till then the rest of the code can
// be executed.

console.log("start");
function importantAction(username) {
  setTimeout(() => {
    return `This is an important action ${username}`;
  }, 1000);
}
const message = importantAction("Rishabh");
console.log(message); // undefined
console.log("Stop");

// Since in the above code setTimeout is the asynchronous code therefore the output comes out to be
// somewhat late. Till then message will be printed undefined. And now we are receiving undefined.
// But the execution is in process therefore to print the execution we can use callbacks().

// When we pass a function in another function argument. We call that function a callback().

console.log("start");
function importantAction2(username, callback) {
  setTimeout(() => {
    callback(`This is an important action 2 ${username}`);
  }, 0); // 0 doesn't matter here, still the setTimeout will be executed after all code execution gets finished
  // SetTimeout will still be considered as asynchronous code.
}
const message2 = importantAction2("Rishabh", function (message) {
  // callback passed into importantAction2 function
  console.log(message);
});
console.log(message); // This is an important action 2 Rishabh
console.log("Stop");

// Callback hell
console.log("start");
function importantAction3(username, callback) {
  setTimeout(() => {
    callback(`This is an important action 3 ${username}`);
  }, 0); // 0 doesn't matter here, still the setTimeout will be executed after all code execution gets finished
  // SetTimeout will still be considered as asynchronous code.
}
function shareTheVideo(video, callback) {
  setTimeout(() => {
    return callback(`share this ${video} video`);
  }, 1000);
}
function likeTheVideo(video, callback) {
  setTimeout(() => {
    return callback(`Like this ${video} video`);
  }, 1000);
}
const message3 = importantAction3("Rishabh", function (message) {
  // callback passed into importantAction2 function
  console.log(message);
  likeTheVideo("JS interview question", (action) => {
    console.log(action);
    shareTheVideo("JS interview question", (action) => {
      console.log(action);
    });
  });
});
console.log(message); // This is an important action 2 Rishabh
console.log("Stop");

// The callbacks passed into the functions parameters will only executes when the current function
// execution get completed. Only then the callback will be triggered.

// The above nesting of callbacks in the above code is known as the callback hell, because it makes things
// clutter and confusing.

// The solution for this problem of callback hell is Promises.
// So the promise represents the upcoming completion/success/resolve or failure/reject of an asynchronous event
// and its resulting value. To implement this we can use Promise class in JS.

console.log("start");
const sub = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = true;
    if (result) resolve("The promise is resolved successfully");
    else reject(new Error("Not resolved"));
  }, 1000);
});

// If the promise is fulfilled we can use then keyword and pass a callback in then to perform any operations
// on the response received from promise.

sub
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    // If promise is not fulfilled then we can print the error received in catch block
    console.log(error);
  });
console.log("stop");

// What if we need to resolve or reject this promise directly.
Promise.resolve("Fulfilled"); // This promise will be by default fulfilled. But still this is an async process.
// Same can be done with reject too.

// Callback hell refactor with promises
console.log("start");
function importantAction4(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`This is an important action 3 ${username}`);
    }, 0);
  });
}
function shareTheVideo2(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`share this ${video} video`);
    }, 1000);
  });
}
function likeTheVideo2(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like this ${video} video`);
    }, 1000);
  });
}
const message4 = importantAction4("Rishabh")
  .then((response) => {
    console.log(response);
    likeTheVideo2("Dummy")
      .then((res) => {
        console.log(res);
        shareTheVideo2("Dummy2")
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => console.log(error));
console.log(message); // This is an important action 2 Rishabh
console.log("Stop");

// Still we can see that Promise hell is also there so we can solve this by promise chaining.
const message5 = importantAction4("Rishabh")
  .then((response) => {
    console.log(response);
    return likeTheVideo2("Dummy");
  })
  .then((res) => {
    console.log(res);
    return shareTheVideo2("Dummy2");
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// Here in the above code we are returning a new promise after one is resolved and then executing that newly
// returned promise.

// The above code can be further refactor. By using Promise combinator. These combinators helps to execute
// more than one promise at one time, then return the result accordingly.

// There are 4 types of combinators:

// 1. Promise.all(): So if we have multiple promises to execute at a same time but all of them have different
// execution time then we can pass them to Promise.all() which will execute all of them parallely. Then it will
// return an array of fulfilled promises. but if any one of the promise get failed then whole Promise.all()
// will be failed.

Promise.all([
  importantAction4("Rishabh"),
  shareTheVideo2("Vansh"),
  likeTheVideo2("Ritik"),
])
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));

// Output for promise.all():
// [
//   'This is an important action 3 Rishabh',
//   'share this Vansh video',
//   'Like this Ritik video'
// ]

// 2. Promise.race(): The syntax for this is same as Promise.all() but this one returns the first promise
// which is fulfilled or rejected.

Promise.race([
  importantAction4("Rishabh race"),
  shareTheVideo2("Vansh"),
  likeTheVideo2("Ritik"),
])
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));

// 3. Promise.allSettled(): The syntax for this is same as Promise.all() but the output is different whereas in
// Promise.all() when any promise gets failed whole Promise.all() gets failed but Promise.allSettled will return
// all the promises i.e rejected and resolved ones both types will be there in output with there execution
// status.

Promise.allSettled([
  importantAction4("Rishabh race"),
  shareTheVideo2("Vansh"),
  likeTheVideo2("Ritik"),
])
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));

// 4. Promise.any(): The syntax for this is same as Promise.all() and same as Promise.any() this will only return
// the first fulfilled promise and ignores all the rejected ones even if they are executed before the fulfilled.
// i.e in this one we will always get the fulfilled promise first but if all the promises got rejected then this
// will give the error all promises are rejected .

Promise.any([
  importantAction4("Rishabh race"),
  shareTheVideo2("Vansh"),
  likeTheVideo2("Ritik"),
])
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));

// Modern approach of handling promises i.e using async and await
// This is one of the best approach when we want to execute the promises one after the other.

async function dummyFunc(params) {} // async normal func

const result = async () => {
  // async arrow func
  // to handle error in async/await we use try catch block
  try {
    const message = await importantAction4("Rishabh"); // await will wait till the promise gets fulfilled or rejected.
    const message2 = await shareTheVideo2("Ritik");
    const message3 = await likeTheVideo2("Vansh");
    console.log({ message, message2, message3 });
  } catch (error) {
    console.log(error);
  }
};

result();
