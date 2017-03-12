const internetradio = require('node-internet-radio');
const http = require('http');
const fs = require('fs');
var testStream = "http://cabhs30.sonixcast.com:9774";
var radioStream = "http://216.126.195.37:8078/stream";
var track = fs.createWriteStream('myOutput.mp3');
var options = {
  hostname: '216.126.195.37',
  port: 8078,
  agent: false,  // create a new agent just for this one request
  path: '/stream',
  headers: {
        'Icy-MetaData': '1'
    }

};

http.get( options
, (res) => {
  internetradio.getStationInfo(radioStream, function(error, station) {
    console.log(station.title);
  });
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });
  //'Icy-MetaData','1'
  //res.pipe(track);
});

//Get the station details
internetradio.getStationInfo(radioStream, function(error, station) {
  console.log(station.title);
});



//to play on HTML5 <audio controls="controls" autoplay="autoplay" src="http://cabhs30.sonixcast.com:9774/;">
