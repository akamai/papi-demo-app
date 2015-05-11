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

angular.module('app', ['ngRoute', 'ngResource'])
  // Services

  // We use the ngResource module, which makes it easy to interact with REST APIs
  .factory('Groups', ['$resource', function($resource){
    // We're defining a "get()" function on the Groups factory that
    // runs a basic GET with no parameters on the /papi/v0/groups endpoint
    return $resource('/papi/v0/groups', null, {
      'get': { method:'GET' }
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

  // Routes

  // When a browser points to the root of our server, we serve up the
  // groups.html template and run the GroupsController
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/groups.html',
        controller: 'GroupsController'
      })
  }]);
