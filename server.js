const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const api = require('./api/index');
const render = require('./render/index');
const {port, _db} = require('./config');

mongoose.connect(_db, {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));

// Use ejs and express layouts
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);


app.use(expressLayouts);

// Route our app
app.use('/', render);
app.use('/api/', api);

app.use(express.static(__dirname + '/resources'));

io.on('connection', (socket) => {
  io.sockets.emit('connect', ' Successfully Connected!! ');
})

http.listen(port, () => console.log(`server running on *port ${port}`));
