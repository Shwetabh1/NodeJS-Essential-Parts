/*
 * A promise is an object that will produce a single value in the future..either a resolved value or the reason it wasn't resolved.
 * We can also say a promise is an object which can be returned synchronously from an asynchronous function.
 * A promise is always  in one of 3 possible states:
    1.Fulfilled: onFulfilled() will be called (e.g., resolve() was called)
    2.Rejected: onRejected() will be called (e.g., reject() was called)
    3.Pending: not yet fulfilled or rejected
 * Note: promises are immutable. Once settled, a promise can not be resettled. Calling resolve() or reject() again will have no effect.   
*/

//example

function promiseExample() {
  return new Promise(function(resolve, reject) {
      setTimeout(resolve, 3000);
  });
}

/*
 * Can we cancel a promise in between?
 * The answer is yes. We can cancel a promise using two approaches:
    1. calling promise.cancel() [if you are using bluebird]
    2. Using a cancellation token. 
 */


//1. promise.cancel() is synchronous and calling it ensures the callback is not called.
//2. Using a cancellation token

function getWithCancel(url, token) { // the token is for cancellation
   var xhr = new XMLHttpRequest;
   xhr.open("GET", url);
   return new Promise(function(resolve, reject) {
      xhr.onload = function() { resolve(xhr.responseText); });
      token.cancel = function() {  // SPECIFY CANCELLATION
          xhr.abort(); // abort request
          reject(new Error("Cancelled")); // reject the promise
      };
      xhr.onerror = reject;
   });
};

//Which would let you do:

var token = {};
var promise = getWithCancel("/someUrl", token);

// later we want to abort the promise:
token.cancel();

/*
 * Various Promise Methods
    1. Promise.race()
    2. Promise.all()
    3. Promise.map()
    4. Promise.mapSeries() 
 *
 */

//Promise.race()
//The Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or 
//rejects, with the value or reason from that promise.

//Promise.all()
//The Promise.all(iterable) method returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises. 
//It rejects with the reason of the first promise that rejects.

var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]

Promise.race([promise1, promise2, promise3]).then(function(value) {
  console.log(value); //expected output is whatever is resolved first
});

// Promise.map 
// It iterates over an iterable and waits for the promise to resolve.
// The order in which map calls the mapper function on the array elements is not specific.
// For order guarantee in sequential execution - use Promise.mapSeries
// Why use Promise.map? 
// 1. removes boilerplate push + promise.all [example 1];
// 2. use of concurrency?
// It basically limits the number of promises created. Suppose the concurrency is 3. 
// At any time only 3 active promises will be there. New promise will be created only after one of them resolves.

//[example 1]
var promises = [];
for (var i = 0; i < fileNames.length; ++i) {
    promises.push(fs.readFileAsync(fileNames[i]));
}
Promise.all(promises).then(function() {
    console.log("done");
});

// Using Promise.map:
Promise.map(fileNames, function(fileName) {
    // Promise.map awaits for returned promises as well.
    return fs.readFileAsync(fileName);
}).then(function() {
    console.log("done");
});


// Promise.mapSeries
// Does the same thing as Promise.map but sequentially.

