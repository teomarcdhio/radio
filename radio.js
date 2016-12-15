var internetradio = require('node-internet-radio');
var testStream = "http://cabhs30.sonixcast.com:9774";

//Get the station details
internetradio.getStationInfo(testStream, function(error, station) {
  console.log(station);
}, internetradio.StreamSource.STREAM);

//to play on HTML5 <audio controls="controls" autoplay="autoplay" src="http://cabhs30.sonixcast.com:9774/;">
