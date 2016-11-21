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
var jszip   = require('jszip');             // Zip files
var formidable = require('formidable');     // Formidable

// [ Config file with db credentials ]
var config  = require("./config.json");     // Config file with database username and password
//var database_manager = require("./database_manager");

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
    ,MISSING_DIR:10
    ,MISSING_TOKEN:11
    ,BAD_DIR_PATH:12
    ,REQUEST_FAILED:13
    ,USER_ALREADY_EXISTS:14
}

// [ MySQL errors ]
var mysqlErrors = {
    DUPLICATE_KEY:1062
}

var base = path.join(path.dirname(require.main.filename),'UploadedFiles');
var tempDir = path.join(path.dirname(require.main.filename),'TempFiles');

// [ Middleware to get the request body ]
app.use (function(req, res, next) {
    // [ Skip json check for uploads ]
    if(req.path == "/upload"){
        next();
        return;
    }

    var json='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       json += chunk;
    });

    req.on('end', function() {    
        console.log(json);
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

// [ Middleware to try to detect hacking attempts ]
app.use (function(req, res, next) {
    
    // [ If not requesting token, make sure token isn't empty ]
    if(req.path != "/token" && req.path != "/token/"){
        var token = req.headers["x-token"];
        if(!token || token == ""){
            logSecurityEvent("Empty token header"); 
            next();
            return;
        }  
    }
    
    // [ Passed all security checks, proceed ]
    next();
    return;

    function logSecurityEvent(reason){
        var ip = req.connection.remoteAddress;
        
        var userAgent = req.headers['user-agent'];
        var token = req.headers['x-token'];
        var screenWidth = req.headers['x-screen-width'];
        var screenHeight = req.headers['x-screen-height'];
        var metadata = req.headers['metadata'];
        var allHeaders = JSON.stringify(req.headers);
        var date = (new Date()).toISOString();
        var country = null;
        var city = null;
        var region = null;
        
        
        // [ Makes a call to a free geoip service for location info ]
        // - rate limited :(
        // - database updated automatically :)

        var options = {
          host: 'freegeoip.net',
          path: '/json/' + ip
        };

        callback = function(response) {
            var json = '';
            response.on('data', function (chunk) { json += chunk; });

            response.on('end', function () {
                try{
                    var data = JSON.parse(json);
                    if(data.country_name){
                        country = data.country_name;
                    }
                    if(data.region_name){
                        region = data.region_name;
                    }
                    if(data.city){
                        city = data.city;
                    }
                    
                    doTheInsert();
                }catch(e){
                    doTheInsert();
                }
            });
        }
        
        try{
            require('http').request(options, callback).end();
        }catch(e){
            doTheInsert();
        }
        
        
        function doTheInsert(){
            db("SecurityLog")
                .insert({
                     "reason": reason
                    ,"ip": ip
                    ,"userAgent":userAgent
                    ,"token":token
                    ,"screenWidth":screenWidth
                    ,"screenHeight":screenHeight
                    ,"metadata":metadata
                    ,"allHeaders":allHeaders
                    ,"date":date
                    ,"country":country
                    ,"region":region
                    ,"city":city
                })
                .then();              
        }

        
        
      
    }
});

// [ Middleware to authenticate user ]
app.use (function(req, res, next) {
    if(req.path == "/token" || req.path == "/token/"){
        // User doesn't need to be authenticated to ask for token, anyone is allowed to do that
        
        next();
        return;
    }
    
    // [ Make sure token is valid ]
    var token = req.headers["x-token"];
    if(!token || token == ""){
        res.end(error("Missing token from request",errors.MISSING_TOKEN));
        return;
    }
    
    // [ Check db for token record that matches ]
    db("Token")
        .leftJoin("User","Token.userId","User.id")
        .select("User.id","User.username")
        .where("token",token)
        .where("revoked",0)
        .then(function(row){
            if(row.length == 1){
                req.user = {
                     username:row[0].username
                    ,id:row[0].id
                }
                winston.log('info', req.method + " " + req.url, {"user" :  req.user.username});
                next();
                return;
            }
        
            res.end(error("No matching token in database"));
        });
    
});

// [ Utilities ]
function error(message,code){
    if(!code){
        var code = 0;
    }
   winston.log('error', message);

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
    winston.log('info', message);

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

    var parsedPath = path.parse(filepath);

    if(parsedPath.dir.includes('..') || parsedPath.dir.includes('.') || parsedPath.dir == "\\") {
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
    console.log("wtf");
    
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
                // [ Create User Directory ]
                generateUserPath(data.username);
            
                // [ Now authenticate after user has been created ]
                authenticate();
            })
            .catch(function(err){
                if(err.errno == mysqlErrors.DUPLICATE_KEY){
                    res.end(error("User already exists", errors.USER_ALREADY_EXISTS));
                }else{
                    console.log(err);
                    res.end(error("Database error"));
                }
            });
        
    }else{
        // [ If user doesn't want to sign up, skip to authentication step ]
        authenticate();
    }
    

});

app.get("/files",function(req,res){
    var username = req.user.username;
    
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
                                        .then(function(){

                                            numDone++;
                                            if(numDone == files.length){
                                                fulfill();
                                            }
                                        })
                                        .catch(function(err){
                                            reject(err);
                                        });
                                }else{
                                    numDone++;
                                    if(numDone == files.length){
                                        fulfill();
                                    }
                                }


                            }).catch(function(err){
                                reject(err);
                            })                      
                        })(childItem,file);

                    }
                }else{
                    fulfill();
                }
            }).catch(function(err){
                reject(err); 
            }); 
        });

    })("/",root).then(function(){
        res.json(root);
    }).catch(function(){
        res.end(error("Couldn't find user's storage directory",errors.MISSING_DIR))
    });
});

app.post("/upload", function(req,res){
    // [ Get form data ]
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = tempDir;

    var selectedPath = req.headers["metadata"] + "";
    
    // [ Keeps track of every file that was sucessfully uploaded ]
    var uploadedFiles = [];
    
    // [ Rename uploaded file ]
    form.on('file', function(field, file) {
        var userPath = generateUserPath(req.user.username);    
        var newPath = path.join(userPath, path.join(selectedPath, file.name));  
        fs.rename(file.path, newPath);
        
        uploadedFiles.push({
             name:file.name
            ,path:path.join(selectedPath, file.name)
            ,isFile:true
            ,isFolder:false
        })
    });

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function() {
        console.log('success');
        res.json(uploadedFiles);
    });

    form.parse(req);
});

app.post("uploadDirectory", function(req,res){
    // [ Get form data ]
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = tempDir;

    var selectedPath = req.headers["metadata"] + "";

    // [ Keeps track of every file that was sucessfully uploaded ]
    var uploadedFiles = [];
    
    // [ Rename uploaded file ]
    form.on('file', function(field, file) {
        var userPath = generateUserPath(req.user.username);    
        var newPath = path.join(userPath, path.join(selectedPath, file.name));  
        fs.rename(file.path, newPath);
        
        uploadedFiles.push({
             name:file.name
            ,path:path.join(selectedPath, file.name)
            ,isFile:true
            ,isFolder:false
        })
    });

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function() {
        console.log('success');
        res.json(uploadedFiles);
    });

    form.parse(req);
})

app.delete("/files", function(req,res){

    var username = req.user.username;

    //check if body exists
    if(!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    var data = req.body;

    //check if path key exists
    if(!data.path) return res.end(error("Missing path", errors.MISSING_FIELD));

    //validate the requested path
    var new_path = path.normalize(data.path);
    if(!isPathValid(new_path))  return res.end(error("Invalid path", errors.BAD_DIR_PATH));

    //generate full path
    var full_path = path.join(generateUserPath(username), new_path);
    path.normalize(full_path);

    fs.unlink(full_path, function (err) {
       if(err){
           res.end(error(err.message, errors.REQUEST_FAILED));
       } else {
           res.end(success("File Removed"));
       }
    });
});

// [ creates a new directory under the current users base folder]
app.post("/folders", function(req,res) {
    
    //todo: get actual user form headers
    var username = req.user.username;

    //check if body exists
    if(!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    var data = req.body;

    //check if path key exists
    if(!data.path) return res.end(error("Missing path", errors.MISSING_FIELD));

    //validate path
    var new_path = path.normalize(data.path);
    if(!isPathValid(new_path))  return res.end(error("Invalid path", errors.BAD_DIR_PATH));

    //generate full path
    var full_path =  path.join(generateUserPath(username),new_path);
    path.normalize(full_path);

    //check if parent directory exists
    if(!fs.existsSync(path.dirname(full_path)))         return res.end(error("Parent Directory does not exist", errors.BAD_DIR_PATH));

    //create new dir
    fs.mkdir(full_path, function (data) {
        if(!data) {
            return res.end(success("Directory Created"));
        } else {
            return res.end(error(data.message, errors.REQUEST_FAILED));
        }
    });

});

// [ remove a directory under the current users base folder]
app.delete("/folders", function (req, res) {

    var username = req.user.username;

    //check if body exists
    if(!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    var data = req.body;

    //check if path key exists
    if(!data.path) return res.end(error("Missing path", errors.MISSING_FIELD));

    //validate the requested path
    var new_path = path.normalize(data.path);
    if(!isPathValid(new_path))  return res.end(error("Invalid path", errors.BAD_DIR_PATH));

    //generate full path
    var full_path = path.join(generateUserPath(username), new_path);
    path.normalize(full_path);

    //check if parent directory exists
    if(!fs.existsSync(path.dirname(full_path))) return res.end(error("Parent Directory does not exist", errors.BAD_DIR_PATH));

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
            res.end(error(err.message, errors.REQUEST_FAILED));
        } else {
            res.end(success("Directory Deleted"));
        }
    });
});

// [ rename file or directory ]
app.post("/rename", function (req, res) {

    var username = req.user.username;

    //check if body exists
    if(!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    var data = req.body;

    //check if path key exists
    if(!data.path || !data.newname) return res.end(error("Missing path", errors.MISSING_FIELD));

    //validate the requested path
    var new_path = path.normalize(data.path);
    if(!isPathValid(new_path))  return res.end(error("Invalid path", errors.BAD_DIR_PATH));

    //generate full path
    var full_path = path.join(generateUserPath(username), new_path);
    path.normalize(full_path);

    //generate path with rename
    path.normalize(data.newname);
    var new_full_path = path.join(path.dirname(full_path), data.newname );

    //make sure parent paths are identical
    if(path.dirname(full_path) != path.dirname(new_full_path)) return res.end(error("renamed path does not match old path", errors.BAD_DIR_PATH));

    fs.rename(full_path, new_full_path ,function (err) {
        if(err){
            res.end(error(err.message, errors.REQUEST_FAILED));
        } else {
            fs.stat(new_full_path, function(err, stats){
                if(err){
                    res.end(error(err.message));
                } else {
                    if (stats.isFile()) {
                        res.end(success("File Renamed"));
                    } else {
                        res.end(success("Folder Renamed"));
                    }
                }
            });
        }
    });
});

app.post("/download", function (req, res) {

    var username = req.user.username;
    //check if body exists
    if (!req.body) return res.end(error("Missing json body", errors.MISSING_BODY));
    var data = req.body;
    //check if path field exists
    if (!data.items) return res.end(error("Missing path", errors.MISSING_FIELD));
    var items = data.items;

    var zip = new jszip();

    //check number of items to zip
    if(items.length == 1){

        //validate the requested path
        var download_path = path.normalize(items[0]);
        if (!isPathValid(download_path))   return res.end(error("Invalid path", errors.BAD_DIR_PATH));

        //generate full path
        var full_path = path.join(generateUserPath(username), download_path);
        path.normalize(full_path);

        //if item is a file, donit zip it, just send to client
        if(fs.statSync(full_path).isFile()) {
            res.download(full_path, function (err) {
                if (err) {
                    res.end(error(err.message), errors.REQUEST_FAILED);
                } else {
                    res.end(success('download complete'));
                }
            });
            // if its a folder, zip it
        } else {
            zip.folder(path.basename(items[0]), full_path);
            zip
                .generateNodeStream({type: 'nodebuffer', streamFiles: true})
                .pipe(res)
                .on('finish', function () {
                    console.log("zip written.");
                    //res.download(path.join(generateUserPath(username), 'out.zip'));
                });
        }
        //if multiple files/folders zip them
    }else if(items.length > 1) {

        for (var i = 0; i < items.length; i++) {

            //validate the requested path
            var download_path = path.normalize(items[i]);
            if (!isPathValid(download_path))   return res.end(error("Invalid path", errors.BAD_DIR_PATH));
            //generate full path
            var full_path = path.join(generateUserPath(username), download_path);
            path.normalize(full_path);

            if (fs.statSync(full_path).isFile()) {
                zip.file(path.basename(items[i]), full_path);
            } else {
                zip.folder(path.basename(items[i]), full_path);
            }
        }

        zip
        .generateNodeStream({type: 'nodebuffer', streamFiles: true})
        .pipe(res)
        .on('finish', function () {
            console.log("zip written.");
            //res.download(path.join(generateUserPath(username), 'out.zip'));
        });
    }
});

// [ Listen for requests ]
(function(port){
    app.listen(port, function () {
        console.log('Web server listening on port ' + port + '...');
//        database_manager.test();
    });    
})(1337);
