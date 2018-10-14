var http = require('http');
var express = require('express'),
    app = module.exports.app = express();
var L = require("i18n");
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()
var upload = require('express-fileupload');
const https = require("https");
const fs = require("fs");

L.configure({
  locales:['tr'],
  directory: __dirname + '/languages'
});

L.setLocale('tr');

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(upload());

app.get("/", function (req, res) {
  res.send('Test Api')
})

app.use("/eNabiz", require("./pages/eNabiz"))
app.use("/ilac", require("./pages/ilac"))
app.use("/hastane", require("./pages/hastane"))
app.use(express.static('uploads'));



var server = http.createServer(app);
server.listen(4234);