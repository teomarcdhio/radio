// app

//pull in the required packages
var express = require('express');
var bodyParser = require ('body-parser');
var mongoose = require('mongoose');

//pull in required model schema
var Station = require('./app/models/station');

//Create the express app
var app = express();

//configure bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure mongoose - 
mongoose.connect('mongodb://localhost/radio');

//Set the port for the app
var port = process.env.PORT || 8080;

//Enable Express Router
var api = express.Router();
var router = express.Router();

//set url root for router
app.use('/', router);
app.use('/api', api);

//Middleware for all requests on API
api.use(function(req, res, next){
  console.log('Checking every route');
  next();
});

//Routes
router.get('/', function(req,res){
  res.send('main page');
});

router.get('/about', function (req, res) {
  res.send('about page');
});

api.get('/', function(req,res){
  res.json({message: 'It works'});
});

api.route('/stations')
  //Post functions
  .post(function(req, res){
    //create new instance of Station -- see station.js
    var station = new Station();
    //set the name to the new instance based on the request
    station.name = req.body.name;
    //save the new instance
    station.save(function(err){
      if(err)
        res.send(err);

      res.json({message: 'Station created'});
    });
  });

api.route('/stations')
  //Get functions
  .get(function(req, res){

    Station.find(function(err, stations){
      if(err)
        res.send(err);

      res.json(stations);
    });
  });


app.listen(port);
console.log('Server running on port' + port);
