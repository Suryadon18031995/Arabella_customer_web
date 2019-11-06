var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// use gzip compression for transfer of resources
app.use(compression());
app.use('/', express.static('dist'));

//server setting.

app.set('port', process.env.PORT || 3000);

var serve = app.listen(app.get('port'),function(){
    var port = serve.address().port;
    console.log('Started server at port',port);
});

