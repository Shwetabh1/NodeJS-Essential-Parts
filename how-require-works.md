http://fredkschott.com/post/2014/06/require-and-the-module-system/

How require works:

The stand-alone require function that we use is actually an abstraction over module.require  which is itself just a simple wrapper around Module._load. This load method handles the actual loading of each file, The core module to handle these kind of operation is module.js

Module._load = function(request, parent, isMain) {
  // 1. Check Module._cache for the cached module.
  // 2. Create a new Module instance if cache is empty.
  // 3. Save it to the cache.
  // 4. Call module.load() with your the given filename.
  //    This will call module.compile() after reading the file contents.
  // 5. If there was an error loading/parsing the file,
  //    delete the bad module from the cache
  // 6. return module.exports
};


Module._load is responsible for loading new modules and managing the module cache.



Module._compile

Module.prototype._compile = function(content, filename) {
  // 1. Create the standalone require function that calls module.require.
  // 2. Attach other helper methods to require.
  // 3. Wraps the JS code in a function that provides our require,
  //    module, etc. variables locally to the module scope.
  // 4. Run that function
};


This is where the real magic happens. First, a special standalone require function is created for that module. THIS is the require function that we are all familiar with. While the function itself is just a wrapper around Module.require, it also contains some lesser-known helper properties and methods for us to use:

require(): Loads an external module
require.resolve(): Resolves a module name to its absolute path
require.main: The main module
require.cache: All cached modules
require.extensions: Available compilation methods for each valid file type, based on its extension
Once require is ready, the entire loaded source code is wrapped in a new function, which takes in require, module, exports, and all other exposed variables as arguments. This creates a new functional scope just for that module so that there is no pollution of the rest of the Node.js environment.



