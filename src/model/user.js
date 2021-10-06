
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
  var UserImageSchema = new Schema({
    firstname: String,
    lastname : String,
    email : String,
    age : Number,
    createdby : String,
    createdat : Date,
    modifiedby : String,
    modifiedat : Date,
    statusflag : String

    
  });
  
 
 module.exports = mongoose.model('User', UserImageSchema);
