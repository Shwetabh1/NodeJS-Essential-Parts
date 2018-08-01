// How Garbage Collection works in JavaScript
How does V8 know when to de-allocate the memory? V8 keeps a graph of all variables in the program, starting from the root node. There are 4 types of data types in JavaScript: Boolean, String, Number, and Object. First 3 are simple types, and they can only hold on to the data that is assigned to them (i.e. string of text). Objects, and everything else in JavaScript is an object (i.e. Arrays are Objects), can keep references (pointers) to other objects.


Periodically V8 will walk through the Memory Graph, trying to identify groups of data that can no longer be reached from the root node. If it’s not reachable from the root node, V8 assumes that the data is no longer used and releases the memory. This process is called Garbage Collectio