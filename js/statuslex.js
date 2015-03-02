/* Modules */


/* Main StatusLex App Module */
var statuslex = angular.module('statuslex', [  'ngRoute', 'slControllers']);

/* Controllers Module */
var slControllers = angular.module('slControllers', []);


/* Routing */


statuslex.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    /* Bulding Permit Record */
      when('/bldg-permits/:param', {
        templateUrl: 'templates/buildingpermits-record.html',
        controller: 'PermitDetailCtrl'
      }).
      /* Bulding Permit Search */
      when('/bldg-permits-search', {
        templateUrl: 'templates/buildingpermits-search.html',
        controller: 'PermitSearchCtrl'
      }).
      /* Code Cases Record */
      when('/code-cases/:param', {
        templateUrl: 'templates/codeenforcement-record.html',
        controller: 'CodeDetailCtrl'
      }).
      /* Code Cases Search */
      when('/code-cases-search', {
        templateUrl: 'templates/codeenforcement-search.html',
        controller: 'CodeSearchCtrl'
      }).
      /* Everything Else to Home Page */
      otherwise({
        templateUrl: 'templates/home.html'
      });
  }]);


/* Controllers */


/* Bulding Permit Record */
slControllers.controller('PermitDetailCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "2691aff1-e555-48d3-9188-aebf1fa8323e" WHERE "_id"  =' + $routeParams.param
    $http.get(DataURL).success(function(data) {
      $scope.DetailData = data.result.records;
    });
}]);

/* Bulding Permit Search */
slControllers.controller('PermitSearchCtrl', ['$scope', '$http',
  function ($scope, $http) {
  var order = '"Date" DESC'
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "2691aff1-e555-48d3-9188-aebf1fa8323e" ORDER BY ' + order + ' LIMIT 25'
    $http.get(DataURL).success(function(data) {
      $scope.SearchData = data.result.records;
    });
}]);

/* Code Case Record */
slControllers.controller('CodeDetailCtrl', ['$scope', '$http','$routeParams',
  function ($scope, $http, $routeParams) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "ad346da7-ce88-4c77-a0e1-10ff09bb0622" WHERE "_id"  =' + $routeParams.param
    $http.get(DataURL).success(function(data) {
      $scope.DetailData = data.result.records;
    });
}]);

/* Code Cases Search */
slControllers.controller('CodeSearchCtrl', ['$scope', '$http','$routeParams',
  function ($scope, $http, $routeParams) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "ad346da7-ce88-4c77-a0e1-10ff09bb0622" LIMIT 25'
    $http.get(DataURL).success(function(data) {
      $scope.SearchData = data.result.records;
    });
}]);


/* Filters */


/* titlecase filter */
statuslex.filter('titlecase', function () {
  return function (input) {
    var bigwords = /\b(aka|llc|hvac|[a-z]\/[a-z]|i|ii|iii|iv|v|vi|vii|viii|ix)\b/i;
	var smallwords = /\b(an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|to|vs)\b/i;
    var words = input.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i].match(bigwords) !== null) {words[i] = words[i].toUpperCase()}
      else if (words[i].match(smallwords) !== null)	{words[i] = words[i].toLowerCase()}
      else {words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)}
    }
    return words.join(' ');
  }
});