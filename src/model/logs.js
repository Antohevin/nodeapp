
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
  var LogSchema = new Schema({
    date : Date,
    email : String,
    newslettername : Number,
    createdby : String,
    createdat : Date,
    modifiedby : String,
    modifiedat : Date,
    statusflag : String

    
  });
  
 
 module.exports = mongoose.model('Log', LogSchema);
