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

angular.module('app', ['ngRoute', 'ngResource', 'angular-loading-bar', 'angular-toArrayFilter'])
  // Services

  // We use the ngResource module, which makes it easy to interact with REST APIs
  .factory('Groups', ['$resource', function($resource){
    // We're defining a "get()" function on the Groups factory that
    // runs a basic GET with no parameters on the /papi/v0/groups endpoint
    return $resource('/papi/v0/groups', null, {
      'get': { method:'GET' }
    });
  }])

  // Add this, which uses the "query" method of ngResource to make a GET request
  // with URL parameters appended (the "query()" function accepts an object of
  // key/value pairs that maps to the URL params we want to send)
  .factory('Properties', ['$resource', function($resource){
    return $resource('/papi/v0/properties', null, {
      'query': { method:'GET' }
    });
  }])

  // Same as the Properties factory above but for rules
  .factory('PropertyRules', ['$resource', function($resource){
    return $resource('/papi/v0/properties/:propertyId/versions/:propertyVersion/rules', null, {
      'query': { method:'GET' },
      'put': { method:'PUT' }
    });
  }])

  // Controllers

  // When we run this controller, we call the "get()" function on Groups
  // and when the request succeeds, we set `groups` on our $scope to the
  // correct sub-item of the JSON response from the server
  .controller('GroupsController', ['$scope', 'Groups', function ($scope, Groups) {
    $scope.groups = Groups.get({}, function(res) {
      $scope.groups = res.data.groups.items;
    });
  }])

  // The PropertiesController expects properties called "group" and "contract"
  // on the URL when it's called (we get this from the $routeParams service module
  // which we pass to this controller)
  .controller('PropertiesController', ['$scope', '$routeParams', 'Properties', function ($scope, $routeParams, Properties) {
    // get the params off the URL
    var group = $routeParams.group;
    var contract = $routeParams.contract;
    // pass the params as an object to API proxy, using "groupId" and "contractId"
    // since that's what the API expects
    $scope.properties = Properties.query({groupId: group, contractId: contract}, function(res) {
      $scope.properties = res.data.properties.items;
    });
  }])

  // The PropertyRulesController expects properties called "group" and "contract"
  // and "propertyId" and "propertyVersion"
  .controller('PropertyRulesController', ['$scope', '$routeParams', 'PropertyRules', '$log', function ($scope, $routeParams, PropertyRules, $log) {
    $scope.options = {
      caching: {
        behavior: [
          'no-store',
          'bypass-cache'
        ]
      },
      origin: {
        'http_port': [
          '80',
          '8080'
        ]
      }
    };
    // get the params off the URL
    var group = $routeParams.group;
    var contract = $routeParams.contract;
    var propertyId = $routeParams.propertyId;
    var propertyVersion = $routeParams.propertyVersion;
    // pass the params as an object to API proxy, using "groupId" and "contractId"
    // since that's what the API expects
    $scope.propertyRules = PropertyRules.query({groupId: group, contractId: contract, propertyId: propertyId, propertyVersion: propertyVersion}, function(res) {
      $scope.propertyRules = res.data.rules;

      for (key in $scope.options) {
        // find the index of the subobject in the propertyRules collection matching our key
        var index = $scope.propertyRules.behaviors.map(function(el) { return el.name; }).indexOf(key);

        // set a new selectOptions object in that subobject containing our new values
        if(index != -1) $scope.propertyRules.behaviors[index].selectOptions = $scope.options[key];
      }
    });

    $scope.typeOf = function(value) {
      return typeof value;
    };

    // called when we click the save button, fires off our PUT request
    $scope.save = function() {
      // create a temp object where we store our modified property rules,
      // but then delete all instances of selectOptions and uuid since that will cause
      // PAPI to throw an error due to receiving an unexpected object
      var payload = $scope.propertyRules;
      delete $scope.propertyRules.uuid;
      for (var i=0; i < $scope.propertyRules.behaviors.length; i++) {
        delete $scope.propertyRules.behaviors[i].selectOptions;
        delete $scope.propertyRules.behaviors[i].uuid;
      }
      PropertyRules.put({ groupId: group, contractId: contract, propertyId: propertyId, propertyVersion: propertyVersion }, {
        rules: payload
      });
    };
  }])

  // Routes

  // When a browser points to the root of our server, we serve up the
  // groups.html template and run the GroupsController
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/groups.html',
        controller: 'GroupsController'
      })

      // if the browser points to "/properties" we serve up the
      // properties.html template and run the PropertiesController
      .when('/properties', {
        templateUrl: '/properties.html',
        controller: 'PropertiesController'
     })

      // if the browser points to "/properties/rules" we serve up the
      // properties.html template and run the PropertiesController
      .when('/propertyRules', {
        templateUrl: '/propertyRules.html',
        controller: 'PropertyRulesController'
     });

  }]);
