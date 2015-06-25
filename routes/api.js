//Copyright 2015 Akamai Technologies, Inc. All Rights Reserved.
// 
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//
//You may obtain a copy of the License at 
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.

var express = require('express');  
var router = express.Router();  
  
/* handle a GET request to papi/v0/whatever-we-want */  
router.get('/', function(req, res, next) {  
  var eg = req.app.get('eg');  
  // call the endpoint (e.g., "papi/v0/groups/")  
  eg.auth({  
    'path': req.originalUrl, // the endpoint we got from the documentation  
    'method': 'GET', // our method type, also from the docs  
    'headers': {}, // no special headers mentioned in the reference guide  
    'body': '' // no body required as this is a GET request  
  });  
  // actually kick off our request to the API server  
  eg.send(function(data, response) {  
    res.json({  
      status: response.statusCode,  
      data: JSON.parse(data)  
    });  
  });  
});  
  
/* handle a PUT request to papi/v0/whatever-we-want */
router.put('/', function(req, res, next) {
  var eg = req.app.get('eg');
  // call the endpoint (e.g., "papi/v0/groups/")
  eg.auth({
    'path': req.originalUrl, // the endpoint we got from the documentation
    'method': 'PUT', // our method type, also from the docs
    'headers': {
      'Content-Type': 'application/vnd.akamai.papirules.latest+json'
    }, // we need to include the Content-Type header noted in the docs
    'body': JSON.stringify(req.body) // pass along the body of our request
  });
  // actually kick off our request to the API server
  eg.send(function(data, response) {
    res.json({
      status: response.statusCode,
      data: JSON.parse(data)
    });
  });
});

module.exports = router;  
