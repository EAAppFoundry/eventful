var config = require('../config');
config.setDevelopmentConfig();
var db = require('../mongo');
var user = require('.././models/user');

var myawn = {login:'myawn',firstName:'Mickey',lastName:'Yawn',email:'mickey.yawn@turner.com',phone:'404-245-0482', type:'ADMIN', password:'1234567'};
var dbrowning = {login:'donwb',firstName:'Don',lastName:'Browning',email:'don.browning@turner.com',phone:'asdfasdfasdf', type:'ADMIN', password:'1234567'};


db.removeAll('users', function(){
  user.save(myawn, function(result){
    console.log(result);
  });
  user.save(dbrowning, function(result){
    console.log(result);
  });
});

process.exit();
