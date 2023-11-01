//Create web server 
// Run: node comments.js
// Verify: http://localhost:8080/comments

var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res){
	switch(req.method){
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk){
				item += chunk;
			});
			req.on('end', function(){
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			items.forEach(function(item, i){
				res.write(i + ') ' + item + '\n');
			});
			res.end();
			break;
	}
});

server.listen(8080);
console.log('Server running at http://localhost:8080/comments');

// Test
// curl http://localhost:8080/comments -d "item 1"
// curl http://localhost:8080/comments -d "item 2"
// curl http://localhost:8080/comments -d "item 3"
// curl http://localhost:8080/comments -d "item 4"
// curl http://localhost:8080/comments