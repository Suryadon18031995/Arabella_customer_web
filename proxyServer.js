const http = require("http");

http.createServer((request, response) => {
    response.writeHead(301, { Location: `https://${request.headers.host}${request.url}` });
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end();
}).listen(80);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');

// app.listen(80, () => console.log('Example app listening on port 80!'));
