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

/* handle a GET request to the subdirectory root. */  
router.get('/', function(req, res, next) {  
  // get our EdgeGrid client with credentials  
  var eg = req.app.get('eg');  
  // make an authenticated call to the Groups endpoint to get a list of groups  
  eg.auth({  
    'path': 'papi/v0/groups/', // the endpoint we got from the documentation  
    'method': 'GET', // our method type, also from the docs  
    'headers': {}, // no special headers mentioned in the reference guide  
    'body': '' // no body required as this is a GET request  
  });  
  // actually kick off our request to the API server  
  eg.send(function(data, response) {  
    // for now, we'll handle errors by printing the status code on our web page  
    if (response.statusCode !== 200) {  
      console.log('Error', response.statusCode);  
      res.render('groups', { title: 'Error ' + response.statusCode, data: []});  
    }  
    // assuming a 200 Success status code...  
    else {  
      // parse the raw text data as JSON  
      data = JSON.parse(data);  
      // extract groups names from the data object  
      names = data.groups.items.map(function(group) {  
        return group.groupName;  
      });  
      // render our template using our real group names  
      res.render('groups', { title: 'List of Property Manager Groups', data: names});  
    }  
  });  
});

module.exports = router;
