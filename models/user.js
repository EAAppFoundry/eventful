var cryptography = require('../cryptography');
var db = require('../mongo');


module.exports.save = function(user, callback){
  user.password = cryptography.createHash(user.password);
  db.insert(user, 'users', function userWasInserted(result){
    callback(user);
  });
};



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





