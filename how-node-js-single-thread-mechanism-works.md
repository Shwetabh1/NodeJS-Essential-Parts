How NodeJS single thread mechanism works?

NodeJS is single threaded. Period. It uses chrome's v8 engine for run time execution.
The memory model is almost similar to JavaScript. Here is how it works.
[image]


First thing there is not a single stack. In javascript there is only one stack. The call stack Node isn't the same.

Here is a high level view of how things work.

Here is an indepth explanation.


 Other programming langugages are Multi-threaded where each client request results in the instantiation of a new thread or even a process, but Node. js, requests are run on the same thread with even shared resources. All Node JS applications uses “Single Threaded Event Loop Model” architecture to handle multiple concurrent clients. So Yes NodeJS is single threaded, but this is a half truth, actually it is event-driven and single-threaded with background workers. The main event loop is single-threaded but most of the I/O works run on separate threads, because the I/O APIs in Node.js are asynchronous/non-blocking by design, in order to accommodate the event loop.


 
 ```
 var sockets = require('websocket.io'),httpServer = sockets.listen(4000);

httpServer.on('onConnection', function (socket) {

console.log('connected……');

httpServer.send('Web socket connected.');

httpServer.on('message', function (data) {

console.log('message received:', data);

});

httpServer.on('close', function () {

console.log('socket closed!');

});

});
 ```
a Web-Socket server is created on a single thread — event loop which listens continuously on port 4000. When a web or app client connects to it, it fires the ‘onConnection’ event which the loop picks up and immediately publishes to the thread pool and is ready to receive the next request and this is the main functionality differentiation between NodeJs based servers and other IIS/ Apache based servers, NodeJs for every connection request do not create a new thread instead it receives all request on single thread and delegates it to be handled by many background workers to do the task as required. Libuv library handles this workers in collaboration with OS kernel.


When operation is completed it is added to the poll queue for execution.

When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed.

In this single thread mechanism there are phases. It is not always listening but going through phases where it stays for a speicific time or when the queue gets empty.

timers: this phase executes callbacks scheduled by setTimeout() and setInterval(). A timer specifies the threshold after which a provided callback may be executed rather than the exact time a person wants it to be executed.
I/O callbacks: executes almost all callbacks with the exception of close callbacks, the ones scheduled by timers, and setImmediate().
idle, prepare: only used internally.
poll: retrieve new I/O events; node will block here when appropriate.
check: setImmediate() callbacks are invoked here.
close callbacks: e.g. socket.on('close', ...).

Tasks in nextTickQueue holds the callbacks invoked by using the api process.nextTick() and microTaskQueue holds those by resolved promises. 


So, when do the callbacks of these two queues run? They run as soon as possible and definitely before going to the next phase from the current one. Unlike other phases these two don’t have any system dependent max limit and node executes them till the time they are completely empty. However, nextTickQueue gets more priority over microTaskQueue


Why do we need setImmediate?
It is also placed right after poll phase, so any setImmediate callback invoked from a new incoming request will be executed soon.


Can JavaScript be blocked?
As we already have seen, nextTickQueue doesn’t have any limit of callback execution. So if you recursively call process.nextTick(), your program will never come out of it, irrespective of what all you have in other phases.
