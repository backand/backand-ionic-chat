var http = require('http');
var fs = require('fs');
var path = require('path');
http.createServer(function (request, response) {

	var filePath = '.' + request.url;
	if (filePath == './' || filePath.startsWith('./?'))
		filePath = './index.html';

	var extname = path.extname(filePath);
	var contentType = '';
  switch (extname) {
    case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
    default:
      contentType = 'text/html';
  }

	if (fs.existsSync(filePath)) {
		fs.readFile(filePath, function(error, content) {
			if (error) {
				response.writeHead(500);
				response.end();
			}
			else {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			}
		});
	}
	else {
		response.writeHead(404);
		response.end();
	}
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
