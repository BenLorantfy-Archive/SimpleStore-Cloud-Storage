// Project  : SOA - Assignment 5
// Prof     : Ed Barsalou
// Students : Amshar Basheer, Grigory Kozyrev, Kyle Stevenson, Ben Lorantfy
// Date     : 2016-11-17

// [ Dependencies ]
var express = require('express');           // Routing
var cors    = require('cors');              // Getting around cross domain restrictions
var fs      = require('fs');                // File system access
var path    = require('path');              // File Path parsing
var knex    = require("knex");              // SQL query builder
var bcrypt  = require("bcrypt-nodejs");     // Password hashing
var winston = require('winston');           // Logging
var Promise = require('promise');           // Promises
    
// [ Config file with db credentials ]
var config  = require("./config.json");     // Config file with database username and password
var database_manager = require("./database_manager");

// [ Start server ]
console.log("Starting server...");

// [ The Knex query builder instance ]
var db = knex(config);

// [ attach log file ]
winston.add(winston.transports.File, { filename: 'server_logs.log' });

// [ Create the express app ]
var app = express();

// [ Enum for error codes to avoid magic numbers ]
var errors = {
     MALFORMED_JSON:1
    ,ONLY_JSON_OBJECTS:2
    ,MISSING_BODY:3
    ,MISSING_FIELD:4
    ,BAD_DATA_TYPE:5
    ,TOO_LONG:6
    ,NO_USER:7
    ,BAD_PASSWORD:8
    ,PASSWORDS_NOT_MATCHING:9
}

var base = path.join(path.dirname(require.main.filename),'UploadedFiles');

// [ Middleware to get the request body ]
app.use (function(req, res, next) {
    var json='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       json += chunk;
    });

    req.on('end', function() {    
        if(json == ""){
            next();
        }else{
            try{
                // [ If valid json, set req.body ]
                var data = JSON.parse(json);
                if(isPlainObj(data)){
                    req.body = data;
                    next();
                }else{
                    // [ Tell user json was naughty ]
                    res.end(error("Not a valid JSON object", errors.ONLY_JSON_OBJECTS));
                }
                
            }catch(e){
                // [ Tell user json was naughty ]
                res.end(error("Malformed json", errors.MALFORMED_JSON));
            }            
        }        
    });
});

// [ Utilities ]
function error(message,code){
    if(!code){
        var code = 0;
    }
    winston.log('error', message, { "user": "place current user here"});

    return JSON.stringify({
        message:message,
        code:code,
        error:true
    });
}

function success(message,code){
    if(!code){
        var code = 0;
    }
    winston.log('info', message, { "user": "place current user here"});

    return JSON.stringify({
        message:message,
        code:code,
        error:false
    });
}

function isPlainObj(o) {
  return typeof o == 'object' && o.constructor == Object;
}

function generateGUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });   
}

function isPathValid(filepath){

    if(filepath.includes('..') || filepath.includes('.')) {
        return false;
    }

    //todo: add regex for valid path
    return true;
}

function generateUserPath(username){

    //if UploadedFiles folder doesnt exist, create it..
    if(!fs.existsSync(base)) {
        fs.mkdirSync(base);
    }

    //generate user path
    var user_path =  path.join(base,username);

    //if user folder doesnt exist, create it..
    if(!fs.existsSync(user_path)) {
        fs.mkdirSync(user_path);
    }

    return user_path;
}

// [ Allows cross origin requests ]
// https://www.html5rocks.com/en/tutorials/cors/
//app.use(cors());

// [ Accepts a request to create a token for a user ]
// - Only grants token if username and password match
app.post("/token",function(req,res){
    // [ Make sure body is present ]
    if(!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    
    var data = req.body;
    
    // [ Make sure username is present and valid ]
    if(!data.username)                      return res.end(error("Missing username", errors.MISSING_FIELD));
    if(typeof data.username !== "string")   return res.end(error("Username should be string", errors.BAD_DATA_TYPE));
    if(data.username > 100)                 return res.end(error("Username is too long", errors.TOO_LONG));
    
    // [ Make sure password is present and valid ]
    if(!data.password)                      return res.end(error("Missing password", errors.MISSING_FIELD));
    if(typeof data.password !== "string")   return res.end(error("Password should be string", errors.BAD_DATA_TYPE));
  
    // [ Authentcates user ]
    function authenticate(){
        // [ Tries to find requested user by username ]
        db("User")
            .select("id","username","hash")
            .where("username",data.username)
            .then(function(rows){
                // [ Checks if user was found ]
                if(rows.length == 0) return res.end(error("User doesn't exist", errors.NO_USER));
                var row = rows[0];

                // [ Checks if password matches hash ]
                var authenticated = bcrypt.compareSync(data.password, row.hash);

                // [ Returns error if not authenticated ]
                if(!authenticated) return res.end(error("Password doesn't match", errors.BAD_PASSWORD));

                // [ User is authenticated, create token ]
                var token = {
                     "token": generateGUID() + "-" + generateGUID() + "-" + generateGUID()
                    ,"dateIssued":(new Date()).toISOString()
                    ,"userId":row.id
                    ,"dateRevoked":null
                };

                db("Token").insert(token).then(function(){
                    res.json(token);                
                });
            });        
    }    
    
    // [ Check if user wants to sign up ]
    if(data.signup){
        // [ If user wants to sign up, check additional fields ]
        if(!data.confirmPassword) return res.end(error("Missing confirmation password", errors.MISSING_FIELD));
       
        // [ To avoid typos in passwords, make sure password matches confirmation password ]
        if(data.confirmPassword !== data.password) return res.end(error("Passwords don't match", errors.PASSWORDS_NOT_MATCHING));
        
        // [ Hash the password ]
        var hash = bcrypt.hashSync(data.password);
        
        // [ Insert new user ]
        db("User")
            .insert({
                 username:data.username
                ,hash:hash
                ,dateCreated:(new Date()).toISOString()
            })
            .then(function(){
                // [ Now authenticate after user has been created ]
                authenticate();
            });
        
    }else{
        // [ If user doesn't want to sign up, skip to authentication step ]
        authenticate();
    }
    

});

app.get("/files",function(req,res){
    var username = "ben";
    var root = {
         "name":"root"
        ,"isFolder":true
        ,"isFile":false
        ,"name":""
        ,"path":"/"
        ,children:[]
    };
    
    // [ If UploadedFiles folder doesnt exist, create it ]
    if(!fs.existsSync(base)) {
        fs.mkdirSync(base);
    }
    
    // [ Generate user path ]
    var user_path = path.join(base,username);
    
    // [ Convert fs.readdir to promise using function ]
    var readdir = Promise.denodeify(require('fs').readdir);
    var stat    = Promise.denodeify(require('fs').stat);
    
    // [ Recurssive function to search file tree ]
    (function getFiles(folder,item){
        return new Promise(function (fulfill, reject){
            var folderPath = path.join(user_path,folder);
            readdir(folderPath).then(function(files){
                if(files){
                    if(files.length == 0){
                        fulfill();
                        return;
                    }

                    var numDone = 0;
                    for(var i = 0; i < files.length; i++){
                        var file = files[i];

                        var childItem = {
                             "name":file
                            ,"isFolder":false
                            ,"isFile":true
                            ,"path":path.join(folder,file)
                            ,children:[]
                        };          

                        item.children.push(childItem);

                        (function(childItem,file){
                            stat(path.join(folderPath,file)).then(function(stat){


                                childItem.isFolder = stat.isDirectory();
                                childItem.isFile = !childItem.isFolder;

                                if(childItem.isFolder){
                                    var newFolder = path.join(folder,file);

                                    getFiles(newFolder,childItem)
                                        .done(function(){

                                            numDone++;
                                            if(numDone == files.length){
                                                fulfill();
                                            }
                                        })
                                }else{
                                    numDone++;
                                    if(numDone == files.length){
                                        fulfill();
                                    }
                                }


                            })                            
                        })(childItem,file);

                    }
                }else{
                    fulfill();
                }
            })           
        });

    })("/",root).done(function(){
        res.json(root);
    })
    
    
});

// [ creates a new directory under the current users base folder]
app.post("/folders", function(req,res) {

    //todo: get actual user form headers
    var username = 'kyle';

    //check if body exists
    if(!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    var data = req.body;

    //check if path key exists
    if(!data.path) return res.end(error("Missing path", errors.MISSING_FIELD));

    //validate path
    var new_path = path.normalize(data.path);
    if(!isPathValid(new_path))  return res.end(error("Invalid path", errors.MISSING_FIELD));

    //generate user path
    var user_path = generateUserPath(username);

    //generate full path
    var full_path =  path.join(user_path,new_path);
    path.normalize(full_path);

    //check if parent directory exists
    if(!fs.existsSync(path.dirname(full_path)))         return res.end(error("Parent Directory does not exist"));

    //create new dir
    fs.mkdir(full_path, function (data) {
        if(!data) {
            return res.end(success("Directory Created"));
        } else {
            return res.end(error(data.message));
        }
    });

});

// [ remove a directory under the current users base folder]
app.delete("/folders", function (req, res) {

    //todo: get actual user form headers
    var username = 'kyle';

    //check if body exists
    if(!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    var data = req.body;

    //check if path key exists
    if(!data.path) return res.end(error("Missing path", errors.MISSING_FIELD));

    //validate path
    var new_path = path.normalize(data.path);
    if(!isPathValid(new_path))  return res.end(error("Invalid path", errors.MISSING_FIELD));

    //generate user path
    var user_path = generateUserPath(username);

    //generate full path
    var full_path =  path.join(user_path,new_path);
    path.normalize(full_path);

    //check if parent directory exists
    if(!fs.existsSync(path.dirname(full_path)))         return res.end(error("Parent Directory does not exist"));

    // [ Recursive function to delete folder and all child folders/files ]
    (function removeFiles(dirPath, callback) {
        fs.readdir(dirPath, function(err, files) {
            if(err) {
                // Pass the error on to callback
                callback(err, []);
                return;
            }
            var wait = files.length,
                count = 0,
                folderDone = function(err) {
                    count++;
                    // If we cleaned out all the files, continue
                    if( count >= wait || err) {
                        fs.rmdir(dirPath,callback);
                    }
                };
            // Empty directory to bail early
            if(!wait) {
                folderDone();
                return;
            }

            dirPath = path.normalize(dirPath);
            files.forEach(function(file) {
                var curPath = path.join(dirPath,file);
                fs.lstat(curPath, function(err, stats) {
                    if( err ) {
                        callback(err, []);
                        return;
                    }
                    if( stats.isDirectory() ) {
                        removeFiles(curPath, folderDone);
                    } else {
                        fs.unlink(curPath, folderDone);
                    }
                });
            });
        });
    })(full_path, function(err){
        if (err){
            res.end(error(err.message));
        } else {
            res.end(success("Directory Deleted"));
        }
    });
});


// [ Listen for requests ]
(function(port){
    app.listen(port, function () {
        console.log('Web server listening on port ' + port + '...');
        database_manager.test();
    });    
})(1337);
