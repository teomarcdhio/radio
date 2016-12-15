//require mongoose
var mongoose = require('mongoose');

//create the Schema
var Schema = mongoose.Schema;

var stationSchema = new Schema({
  name: String
});

//export the Schema
module.exports = mongoose.model('Station', stationSchema);
