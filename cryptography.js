// ##cryptography.js
// ####used to hash passwords for login
var crypto = require('crypto');

var SaltLength = 9;

var createHash = function (password) {
  var salt = generateSalt(SaltLength);
  var hash = md5(password + salt);
  return salt + hash;
}

var validateHash = function (hash, password) {
  var salt = hash.substr(0, SaltLength);
  var validHash = salt + md5(password + salt);
  return hash === validHash;
}

function generateSalt(len) {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
      setLen = set.length,
      salt = '';
  for (var i = 0; i < len; i++) {
    var p = Math.floor(Math.random() * setLen);
    salt += set[p];
  }
  return salt;
}

function md5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}


exports.createHash = createHash;
exports.validateHash = validateHash;