/*--------------Modules--------------*/


/* Main StatusLex App Module */
var statuslex = angular.module('statuslex', [ 'ngRoute', 'slControllers', 'slServices', 'uiGmapgoogle-maps', 'smart-table', 'ui.grid', 'ui.grid.resizeColumns']);

/* Controllers Module */
var slControllers = angular.module('slControllers', []);

/* Services Module */
var slServices = angular.module('slServices', []);

/*--------------Routing--------------*/


statuslex.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    /* Bulding Permit Record */
      when('/bldg-permits/:param', {
        templateUrl: 'templates/bi-record.html',
        controller: 'PermitDetailCtrl'
      }).
      /* Bulding Permit Search */
      when('/bldg-permits-search', {
        templateUrl: 'templates/bi-search.html',
        controller: 'PermitSearchCtrl'
      }).
      /* Code Cases Record */
      when('/code-cases/:param', {
        templateUrl: 'templates/ce-record.html',
        controller: 'CodeDetailCtrl'
      }).
      /* Code Cases Search */
      when('/code-cases-search', {
        templateUrl: 'templates/ce-search.html',
        controller: 'CodeSearchCtrl'
      }).
      /* ROW Permit Record */
      when('/row-permits/:param', {
        templateUrl: 'templates/row-record.html',
        controller: 'ROWDetailCtrl'
      }).
      /* ROW Permit Search */
      when('/row-permits-search', {
        templateUrl: 'templates/row-search.html',
        controller: 'ROWSearchCtrl'
      }).
      /* Everything Else to Home Page */
      otherwise({
        templateUrl: 'templates/home.html'
      });

  }]);

/*--------------Controllers--------------*/
var bi_resource = '2691aff1-e555-48d3-9188-aebf1fa8323e'
var ce_resource = 'ad346da7-ce88-4c77-a0e1-10ff09bb0622'
var row_resource = 'f64d48f2-3d01-499e-b182-7793eb7bff7c'

/* Bulding Permit Search */
slControllers.controller('PermitSearchCtrl', ['$scope', '$http','$filter',
  function ($scope, $http, $filter) {
  
  var fields = '"Date", "Address", "PermitType", "ConstructionCost", "OwnerName", "Contractor"'
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT ' + fields + ' FROM "' + bi_resource + '" ORDER BY "Date" DESC, "_id" DESC LIMIT 2000' 
  
  $http.get(DataURL).success(function(data) {
  $scope.PermitOptions.data = data.result.records;
})

  $scope.PermitOptions = {
    enableSorting: true,
    enableFiltering: true,
    columnDefs: [
      { field: 'Date' },
      { field: 'Address' },
      { field: 'PermitType'},
      { field: 'ConstructionCost'},
      { field: 'OwnerName'},
      { field: 'Contractor'}
    ]};

}]);

/* Code Cases Search */
slControllers.controller('CodeSearchCtrl', ['$scope', '$http',
  function ($scope, $http) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + ce_resource + '" ORDER BY "DateOpened" DESC, "_id" DESC LIMIT 500'
  var CountURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT COUNT(*) FROM "' + ce_resource + '"'
  
  $http.get(DataURL).success(function(data) {
  $scope.rowCollection = data.result.records;
  $scope.displayedCollection = [].concat($scope.rowCollection);
    });

  $scope.getters={
  Address: function (value) {return value.Address.replace(/[^a-z]/gi,'')}};

  $http.get(CountURL).success(function(data) {
  $scope.RecordCount = data.result.records[0].count;
    });
}]);

/* ROW Permit Search */
slControllers.controller('ROWSearchCtrl', ['$scope', '$http',
  function ($scope, $http) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + row_resource + '" ORDER BY "IssueDate" DESC, "_id" DESC LIMIT 500'
  var CountURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT COUNT(*) FROM "' + row_resource + '"'
    
  $http.get(DataURL).success(function(data) {
  $scope.rowCollection = data.result.records;
  $scope.displayedCollection = [].concat($scope.rowCollection);
    });

  $scope.getters={
  Address: function (value) {return value.Address.replace(/[^a-z]/gi,'')}};

  $http.get(CountURL).success(function(data) {
  $scope.RecordCount = data.result.records[0].count;
    });
}]);


/* Bulding Permit Record */
slControllers.controller('PermitDetailCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + bi_resource + '" WHERE "_id"  =' + $routeParams.param
    $http.get(DataURL).success(function(data) {
    $scope.DetailData = data.result.records;
    var lng = data.result.records[0].lat
    var lat = data.result.records[0].lng
    $scope.map = { center: { latitude: lat, longitude: lng }, zoom: 17 };
    $scope.marker = { id: 0, coords: { latitude: lat, longitude: lng }}
    $scope.infowindow = {show: true}
   });
    $scope.RecordType = 'Building Permit'
    $scope.Meta = 'Building permits are issued by the Division of Building Inspection and the Division of Planning for a variety of activities including construction and certification of compliance with zoning. The permit information above is submitted by the applicant.'
    $scope.Contact = 'If you have questions or concerns about building permits, please contact the the Division of Building Inspection at (859) 425-2255.'
}]);


/* Code Case Record */
slControllers.controller('CodeDetailCtrl', ['$scope', '$http','$routeParams',
  function ($scope, $http, $routeParams) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + ce_resource + '" WHERE "_id"  =' + $routeParams.param
    $http.get(DataURL).success(function(data) {
    $scope.DetailData = data.result.records;
    var lng = data.result.records[0].lat
    var lat = data.result.records[0].lng
    $scope.map = { center: { latitude: lat, longitude: lng }, zoom: 17 };
    $scope.marker = { id: 0, coords: { latitude: lat, longitude: lng }}
    $scope.infowindow = {show: true}
    });
    $scope.RecordType = 'Code Enforcement Case'
    $scope.Meta = 'Code enforcement cases are opened based on citizen complaints for violations of nuisance code, the International Property Maintenance Code, and sidewalk regulations.'
    $scope.Contact = 'If you have questions or concerns about code enforcement cases, please contact the the Division of Code Enforcement at (859) 425-2255.'
}]);

/* ROW Permit Record */
slControllers.controller('ROWDetailCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + row_resource + '" WHERE "_id"  =' + $routeParams.param
    $http.get(DataURL).success(function(data) {
    $scope.DetailData = data.result.records;
    var lng = data.result.records[0].lat
    var lat = data.result.records[0].lng
    $scope.map = { center: { latitude: lat, longitude: lng }, zoom: 17 };
    $scope.marker = { id: 0, coords: { latitude: lat, longitude: lng }}
    $scope.infowindow = {show: true}
   });
    $scope.RecordType = 'Right of Way Permit'
    $scope.Meta = 'Right-of-Way Permits are issued by the Division of Engineering for work performed by utility companies and other entities within the public right-of-way.'
    $scope.Contact = 'If you have questions or concerns about right-of-way permits, please contact the the Division of Engineering, Right-of-Way Section at (859) 425-2255.'
}]);

/*--------------Filters--------------*/

/* titlecase filter */
statuslex.filter('titlecase', function () {
  return function (input) {
    var bigwords = /\b(LFUCG|ac|aka|llc|hvac|[a-z]\/[a-z]|i|ii|iii|iv|v|vi|vii|viii|ix)\b/i;
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

/*--------------Services--------------*/