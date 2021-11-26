var createError = require('http-errors');
var express = require('express');
var cors=require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var channelsRouter = require('./routes/channels');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

var corsOptions = {origin: process.env.sageh || 'http://localhost:3000'}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// })

// app.use(logger('dev'));
app.use(express.json(true));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
  return res.send('hello ansar!');
});

const x=[
  {key : 1 ,id: 1},
  {key : 2 , id: 2}
];
app.use('/channels', channelsRouter);
app.get('/toObj', (req,res)=>{

  res.send({...x});
});

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;