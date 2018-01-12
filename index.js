var express = require('express')
var app = express()
var fs = require('fs')
var getStat = require('util').promisify(fs.stat);
var fileUpload = require('express-fileupload');

app.use(express.static('public'));
app.use(fileUpload());
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
var routes = require('./routes/routes');
routes(app);


app.listen(80, () => console.log('servidor rodando em localhost'));
