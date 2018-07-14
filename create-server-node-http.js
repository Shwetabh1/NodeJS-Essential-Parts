const http = require('http');
const fs = require('fs');

//creating a simple server in node

let port = 3000;
let host = '127.0.0.1';

var server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  console.log("server Working");
  // serve any html page on request
  fs.readFile('abc.html', (err, data)=> {
  	if (err) {console.log(err, 'ERROR')}
  		response.end(data);
  })
});

server.listen(port,host, (error) => {  
  if (error) {
    return console.log('Error occured : ', error );
  }

  console.log('server is listening on ' + host + ':'+ port);
});

/*
  fs.exists('audio.mp3',function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream('audio.mp3');
			rstream.pipe(res);
		}
		else
		{
			res.end("Its a 404");
		} piping for byte data
*/