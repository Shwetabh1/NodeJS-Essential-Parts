//Streams in NodeJS
There are 4 types of streams:

stream.Readable(options);
stream.Writable(options); 
stream.Duplex(options); //allows reading writing both
stream.Transform(options); //allows transforming data on the fly. e.g zlib.create()
Both Writable and Readable streams will store data 
in an internal buffer that can be retrieved using writable.writableBuffer or readable.readableBuffer, respectively.

We can control the size of the buffer.

What is a passthrough stream?
The stream.PassThrough class is a trivial implementation of a Transform stream that simply passes the input bytes across to the output. Its purpose is primarily for examples and testing, but there are some use cases where stream.
PassThrough is useful as a building block for novel sorts of streams.