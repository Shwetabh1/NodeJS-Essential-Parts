Finding a Suitable Node JS Candidate.

Problem Solving is required for any candidate. He must be good in algorithms and data structures.
JavaScript is the base of all other frameworks. Candidate must be proficient in it. 

1. Basic JavaScript Questions:
2. Problem Solving - 
 Should be able to answer few questions I have listed here[TODO].
3. Node JS Interview Questions
	3.1 What is a promise?Explain with examples.

	3.2 [code]  Write a promise chain where each promise waits for 2 seconds and then prints hello.

	3.3 [advance promise questions] Can we cancel a promise in between?!
		executing an iterable of promises and so on?

	3.4 What is the difference between setImmediate() and setTimeout();

	3.5 Write a program read all the files from a directory. Each file name is a country name. 
		Write them into directories based on continent name.

	3.6 what do you know about npm? how does package.json help?

	3.7 create a server.

	3.8 create a restful api.
	    How will you secure your API. What do you know about Token Based Authentication.

	3.9 explain this line of code i.e how require works.

		const fs = require('fs');


	3.10 Test Frameworks. Mocha Chai basics

 	3.11  What are “streams” in Node.js? Explain the different types of streams present in Node.js.

	Streams are objects that allow reading of data from the source and writing of data to the destination as a continuous process.
	There are four types of streams.

  	to facilitate the reading operation
	to facilitate the writing operation
	to facilitate both read and write operations
	is a form of Duplex stream that performs computations based on the available input 
 

	3.12 Explain me about Process.nextTick()
		use process.nextTick to execute callbacks immediately

	3.13 What is event loop.

	3.14 What is event emitter.

	3.15 Difference between setTimeout and setImmediate and Process.nextTick.
	Actually both process.nextTick() and setImmediate() was named wrongly. If we swap the names of those then the names will match the functionality. However as in JavaScript, they do not deprecate/change apis, so the named continued as wrong. 
	In terms of functionality, process.nextTick() is actually the way to invoke a callback immediately. Callback in setImmediate() will be triggered during/next iteration.

	3.16 Can you block the event loop in Node.JS without using for loop?

	3.17 Why Choose Node? What seperates Node from other languages such as Ruby, Pyhton or Java?
