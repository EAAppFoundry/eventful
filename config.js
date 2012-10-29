// ##Config.js
// Central place for configuration information

// config for development environment
function setDevelopmentConfig(){
    // mongodb port
    DatabaseConfig.port = 35747;
    // mongo db url (or ip address)
    DatabaseConfig.host = 'ds035747.mongolab.com';
    // database name
    DatabaseConfig.name = 'eventful';
    // database user
    DatabaseConfig.user = 'eventuser';
    // database password
    DatabaseConfig.pass = 'event1234';

    // webserver port number
    EnvConfig.port = 3000;
};

// config for production environment
function setProductionConfig(){
    DatabaseConfig.port = 35747;
    DatabaseConfig.host = 'ds035747.mongolab.com';
    DatabaseConfig.name = 'eventful';
    DatabaseConfig.user = 'eventuser';
    DatabaseConfig.pass = 'event1234';

    EnvConfig.port = 80;
};

/* --- no need to modify below this line -- */

// object that defines the database config
var DatabaseConfig = {
    port        : Number,
    host        : String,
    name        : String,
    user        : String,
    pass        : String
};

// object that defines the environment config
var EnvConfig = {
    port        : Number
};

// all the exports so data can be used outside this file
module.exports.DatabaseConfig = DatabaseConfig;
module.exports.EnvConfig = EnvConfig;
module.exports.setDevelopmentConfig = setDevelopmentConfig;
module.exports.setProductionConfig = setProductionConfig;