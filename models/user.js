// ##user.js
// ###This is an example of a mongodb model that doesn't use mongoose

// require in some necessary stuff
var cryptography = require('../cryptography');
var db = require('../mongo');

// saves the provided [user] to the database
module.exports.save = function(user, callback){
  user.password = cryptography.createHash(user.password);
  db.insert(user, 'users', function userWasInserted(result){
    callback(user);
  });
};


// if you're doing auth stuff, take a look at this example of
// how to validate a users password against the hash stored in
// the database. 
module.exports.signin = function(login, password, func){
	var ret = undefined;

	db.find('users', {login:{$regex:login, $options: 'i'}}, function(users){
		if((users) && (users.length === 1)){
			if(!cryptography.validateHash(users[0].password, password)){
				console.log('incorrect password');
				ret = {"status":{"code":'error',"Password incorrect":''},"data":undefined};
			}
			else{
				ret = {"status":{"code":'OK',"message":undefined},"data":users[0]};
			}
		}
		else{
			ret = {"status":{"code":'error',"user not found":''},"data":undefined};
		}
		func(ret);
	});
}





