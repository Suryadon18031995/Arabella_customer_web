const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const cors = require('cors');
const favicon = require('serve-favicon');
const endsWith = require('lodash/endsWith');
const https = require('https');
require('dotenv').config();
const runner = require("child_process");

const fs = require('fs');
// console.log('process.env.CERT_FILE_PATH', process.env.CERT_FILE_PATH);
const httpsOptions = {
  key: fs.readFileSync(process.env.CERT_FILE_PATH),
  cert: fs.readFileSync(process.env.CERT_FILE_PATH),
  ca: [
    fs.readFileSync(process.env.CERT_FILE_PATH),
  ],
  // port: 443,
};

app.use(cors());
app.use(favicon(path.join(__dirname, '/src/assets/images/favicon.png')));
// use gzip compression for transfer of resources
app.use(compression());
app.use('/', express.static('dist'));

// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.get('/run-php', (req, res) => {
  // const phpScriptPath = path.join(__dirname, '/test1.php');
  const phpScriptPath = path.join(__dirname, '/sucuri-49c973c12c3b8cca7459fc924d06f899.php');
  runner.exec("php " + phpScriptPath + " " , function(err, phpResponse, stderr) {
    if(err){
      res.send(err);
    } 
    // console.log(err); /* log error */
  //  console.log( 'res:', phpResponse );
   else res.send(phpResponse);
   });
})

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/sitemap.xml'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '/robots.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/*', (req, res) => {
  if (endsWith(req.url, '.html')) {
    req.url = req.url.replace('.html', '');
  }
  res.sendFile(path.join(__dirname, '/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

https.createServer(httpsOptions, app, function (req, res) {
  // res.writeHead(200);
  // res.end("Welcome to Node.js HTTPS Servern");
  res.writeHead(301, { Location: `https://${request.headers.host}${request.url}` });
  res.end();
}).listen(3010);

// app.listen(3010, () => console.log('Example app listening on port 3010!')); // uncomment this line for running in local and comment out above create server
