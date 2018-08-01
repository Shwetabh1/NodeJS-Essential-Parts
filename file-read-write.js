/*
 * fs is used for file handling operations.
 * 1.READ- readFile(), readFileSync(), createReadStream()
 * 2.WRITE- writeFile(), writeFileSync(), createWriteStream()
 * 3.APPEND- use writeFile() with append flag. Don't use appendFile!
 * 4.RENAME- rename()
 * 5.DELETE- unlink(), unlinkSync()
 * 6.READDIRECTORY- readdir(), readdirSync()
 * 7.STAT: stat() to check file permissions and its existence
 * 8. difference between OPEN & READ
 * check if file exists (correct method not deprecated) - fs.stat(), acess(). Don't use these to check the file first incase you want to 
   open it. They introduce a race condition
 * 10.file flags
 */

const fs = require('fs');

//1. reading file(stream based solution)
//use this approach for reading big files
let streamChunk = 0;
let stream = fs.createReadStream('abc.html');
stream.on('data', (data)=> {
	console.log('chunk ',++streamChunk);
	
})
stream.on('end', ()=> {
	console.log('File Ended');
})
stream.on('err', ()=> {
	console.log('error', err);
})

let stream2 = fs.createReadStream('abc.html');
stream2.pipe(process.stdout);

//1.1 reading file asynchronously.
fs.readFile('abc.html', (err, data) => {
	if (err) {
		console.log('error!')
	} else {
		//write file or play around with it
		console.log(data);
	}

})

//1.2 reading file synchronously
var k = fs.readFileSync('abc.html', 'utf8');
console.log(k);

//2writing file 
//2.1 using streams
let stream = fs.createReadStream('abc.html');
var wstream = fs.createWriteStream('newfile1.txt');
stream.pipe(wstream); // creates a new file in the current directory with the name newFile.txt
// 2.1 writing file async
var str = "some random string!";
fs.writeFile('newFile2.txt', str, utf8, (err) => {
	if (err) {
		console.log('could not right!');
	}
	console.log('Successfully Written!');
})

// 2.2 also write it synchrnously using writeFileSync()

//3.append file
//also check the file flags section
fs.writeFile('fileToAppend.txt', 'Keep Appending', {flag:'a'}, (err) => {
	if (err) {
		console.log('Error', err);
	}
	console.log('successfully appended');
});

//5. delete a file
fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('successfully deleted /tmp/hello');
});

//6.read all file in a directory
fs.readdir('d:\\', (err, pathArray) => {
	console.log('pathArray contains the list of file in array', pathArray);
})

//7.stat
fs.stat('abc.html', (err, stats) => {
  if (err) throw err;
  console.log(`stats: ${JSON.stringify(stats)}`);
});

/* file flags
   https://nodejs.org/api/fs.html#fs_file_system_flags

'a' - Open file for appending. The file is created if it does not exist.

'ax' - Like 'a' but fails if the path exists.

'a+' - Open file for reading and appending. The file is created if it does not exist.

'ax+' - Like 'a+' but fails if the path exists.

'as' - Open file for appending in synchronous mode. The file is created if it does not exist.

'as+' - Open file for reading and appending in synchronous mode. The file is created if it does not exist.

'r' - Open file for reading. An exception occurs if the file does not exist.

'r+' - Open file for reading and writing. An exception occurs if the file does not exist.

'rs+' - Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.

This is primarily useful for opening files on NFS mounts as it allows skipping the potentially stale local cache. It has a very real impact on I/O performance so using this flag is not recommended unless it is needed.

Note that this doesn't turn fs.open() or fsPromises.open() into a synchronous blocking call. If synchronous operation is desired, something like fs.openSync() should be used.

'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).

'wx' - Like 'w' but fails if the path exists.

'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).

'wx+' - Like 'w+' but fails if the path exists.
*/