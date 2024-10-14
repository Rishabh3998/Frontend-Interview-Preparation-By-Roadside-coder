// Promises Interview questions

// Question 1: What's the output ?
console.log("start");

const promise = new Promise((resolve, reject) => {
  console.log(1); // synchronous code
  resolve(2); // asynchronous code
});

promise.then((res) => {
  console.log(res);
});

console.log("stop");

// Since we know that promise is an asynchronous process therefore when interpreter executes the above code
// line by line it will print 'start' then '1' then 'stop' then '2' because .then will be executed after all
// code is executed but console.log(1) will be executed since interpreter will execute the promise but take
// some time to resolve it but log statement here is synchronous code.

// Output will be:
// start
// 1
// stop
// 2

// Question 2: What's the output ?
console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1); // synchronous code
  resolve(2); // asynchronous code
  console.log(3); // synchronous code
});

promise1.then((res) => {
  console.log(res);
});

console.log("stop");

// Since we know that promise is an asynchronous process therefore when interpreter executes the above code
// line by line it will print 'start' then '1' then then '3' then 'stop' then '2' because .then will be executed after all
// code is executed but console.log(1) will be executed since interpreter will execute the promise but take
// some time to resolve it but log statement here is synchronous code.

// Output will be:
// start
// 1
// 3
// stop
// 2

// Question 3: What's the output ?
console.log("start");

const promise2 = new Promise((resolve, reject) => {
  console.log(1); // synchronous code
  console.log(3); // synchronous code
});

promise2.then((res) => {
  console.log(res);
});

console.log("stop");

// In the above code since we don't have resolve inside the promise therefore .then will never executes.
// Output will be:
// start
// 1
// 3
// stop

// Question 4: What's the output ?
console.log("start");

const fn = () => {
  return new Promise((resolve, reject) => {
    console.log(1); // synchronous code
    resolve("success"); // Asynchronous code
  });
};

console.log("middle");

fn().then((res) => {
  console.log(res);
});

console.log("stop");

// Logic: In the above code the fn was never invoked before middle statement therefore middle will be
// printed first.

// Output:
// start
// middle
// 1
// stop
// success

// Question 5: Promise chaining what is the output?

function job() {
  return new Promise((resolve, reject) => {
    reject();
  });
}

let promiseJob = job();

promiseJob
  .then(function () {
    console.log("success 1");
  })
  .then(function () {
    console.log("success 2");
  })
  .then(function () {
    console.log("success 3");
  })
  .catch(function () {
    console.log("Error 1");
  })
  .then(function () {
    console.log("success 4");
  });

// Output:
// Error 1
// success 4

// Advance version:

function jobState(state) {
  return new Promise((resolve, reject) => {
    if (state) resolve("success");
    else reject("error");
  });
}

let promiseJobState = jobState(true);

promiseJobState
  .then(function (data) {
    console.log(data);
    return jobState(false); // calling promise again with false state and this will reject the promise.
  })
  .catch(function (error) {
    console.log("Error: ", error);
    return "Error caught";
  })
  .then(function (data) {
    console.log(data);
    return jobState(true); // This will resolve the promise but since there is no .then in further chaining
    // code will stop here.
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });

// Output:
// success
// error
// Error caught

// Go through with the video: https://www.youtube.com/watch?v=HaJdoFp2OEc&list=PLKhlp2qtUcSaCVJEt4ogEFs6I41pNnMU5&index=9
// for some more output questions

// Question 6: Promise chaining one promise dependent on other

const firstPromise = new Promise((resolve, reject) => {
  resolve("First!");
});

const secondPromise = new Promise((resolve, reject) => {
  // This promise is returning a promise itself
  resolve(firstPromise);
});

secondPromise
  .then((res) => {
    // this second promise will return firstPromise as the result
    return res;
  })
  .then((res) => console.log(res));

// Output:
// First!

// Question 7: Rewrite the example code using async/await instead of using .then/.catch

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("https://fakeurl.com/no-such-user.json").catch((error) =>
  console.log(error)
);

// conversion to async/await

const loadJsonRefactored = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const jsonData = await response.json();
      return jsonData;
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Question 9: solve promise recursively

function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`This is an important action 3 ${username}`);
    }, 0);
  });
}
function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`share this ${video} video`);
    }, 1000);
  });
}
function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like this ${video} video`);
    }, 1000);
  });
}

function promRecursive(funcPromises) {
  // This function will take array of promises and execute them recursively
  // handling edge cases or Base case
  if (funcPromises.length === 0 || Array.isArray(funcPromises) === false)
    return;
  // implementation
  const currentPromise = funcPromises.shift();
  // shift will remove the first element from the array
  // Example
  //   let temp = [1,2,3];
  //   temp.shift();
  //   temp will be [2,3]
  // funcPromises.shift() this will give the very first promise

  currentPromise
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  promRecursive(funcPromises); // currentPromise got removed from the given array and now this function will
  // invoke on the rest of the promises.
}

promRecursive([
  importantAction("Rishabh"),
  likeTheVideo("Vansh"),
  shareTheVideo("Ritik"),
]);

// Question 10: Promise polyfills
function PromisePolyFill(executer) {
  // implementation
}

const example = new PromisePolyFill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

example.then((res) => console.log(res)).catch((err) => console.log(err));
