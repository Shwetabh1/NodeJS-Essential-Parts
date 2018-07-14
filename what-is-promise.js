/*

A promise is an object that will produce a single value in the future..either a resolved value or the reasaon it wasn't resolved.
A promise is an object which can be returned synchronously from an asynchronous function.
It will be in one of 3 possible states:

Fulfilled: onFulfilled() will be called (e.g., resolve() was called)
Rejected: onRejected() will be called (e.g., reject() was called)
Pending: not yet fulfilled or rejected

*/

//promises are immutable.Once settled, a promise can not be resettled. Calling resolve() or reject() again will have no effect.


promise.cancel()

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

-----------------------------------------------------------------------------------------------------------

promise.race()
The Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or 
rejects, with the value or reason from that promise.

promise.all()
The Promise.all(iterable) method returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises. 
It rejects with the reason of the first promise that rejects.

var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]


promise.map 
promise.mapSeries


