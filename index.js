// app

//pull in the required packages
var express = require('express');
var bodyParser = require ('body-parser');
var mongoose = require('mongoose');
var internetradio = require('node-internet-radio');

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

//single radio details
router.get('/station/:_id', function(req,res){
  Station.find({_id: req.params },function(err, station){
    if (err)
    res.send(err);

      //Get the station details
    let stationinfo = station[0].url;

    internetradio.getStationInfo(stationinfo, function(error, stationinfo) {
      console.log(stationinfo);
      console.log(station);
    }, internetradio.StreamSource.STREAM);

    res.json(station);

  });

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
    station.url = req.body.url;
    //save the new instance
    station.save(function(err){
      if(err)
        res.send(err);

      res.json({message: station.name + ' created on ' + station.url});
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

  api.route('/stations')
  //Delete functions
  .delete(function(req, res){

    let name = req.body.name;
    Station.remove({name: name},function(err){
      if(err)
      res.send(err);

      res.json({message:  name + ' deleted.'});
    });
  });


app.listen(port);
console.log('Server running on port' + port);
