/*--------------Modules--------------*/

/* Main StatusLex App Module */
var statuslex = angular.module('statuslex', [ 'ngRoute', 'ngSanitize', 'slDirectives', 'slControllers', 'slServices', 'uiGmapgoogle-maps', 'ngCsv']);

/* Directives Module */
var slDirectives = angular.module('slDirectives', []);

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
      /* Test Search */
      when('/test-search', {
        templateUrl: 'templates/test-search.html',
        controller: 'TestSearchCtrl'
      }).
      /* Bulding Permit Search */
      when('/bldg-permits', {
        templateUrl: 'templates/bi-search.html',
        controller: 'PermitSearchCtrl'
      }).
      /* Code Cases Record */
      when('/code-cases/:param', {
        templateUrl: 'templates/ce-record.html',
        controller: 'CodeDetailCtrl'
      }).
      /* Code Cases Search */
      when('/code-cases', {
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
      /* About */
      when('/about', {
        templateUrl: 'templates/about.html'
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

/* Test Search */
slControllers.controller('TestSearchCtrl', ['$scope', '$location', 'CKAN', 'search', 'pagination',
  function ($scope, $location, CKAN, search, pagination) {
	$scope.sort = $location.search().sort + ' ' + $location.search().dir
	$scope.sortfield = $location.search().sort
	$scope.sortdir =  $location.search().dir
	$scope.keyword = $location.search().q
	$scope.limit = $location.search().limit
    $scope.page = $location.search().page

    $scope.fields = [
  	{field: 'Date', display: "Date", sortlow: "Oldest", sorthigh: "Newest" },
  	{field: 'Address', display: "Address", sortlow: "A", sorthigh: "Z" },
  	{field: 'PermitType', display: "Permit Type", sortlow: "A", sorthigh: "Z" },
  	{field: 'ConstructionCost', display: "Construction Cost", sortlow: "Low", sorthigh: "High" },
  	{field: 'OwnerName', display: "Owner", sortlow: "A", sorthigh: "Z" },
  	{field: 'Contractor', display: "Contractor", sortlow: "A", sorthigh: "Z" }
  	]

  	$scope.first = function(){$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: 1})}
  	$scope.prev = function() {if ($scope.disableprev) {} else {$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: parseInt($location.search().page) - 1})}}
	$scope.next = function() {if ($scope.disablenext) {} else {$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: parseInt($location.search().page) + 1})}}
  	$scope.last = function(){$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: $scope.totalpages})}

  	CKAN.query2(bi_resource, $location.search().q, $location.search().sort, $location.search().dir, $location.search().limit, ($location.search().page - 1) * $location.search().limit).success(function(data) {
  			 $scope.rows = data.result.records
  	})
  	
  	CKAN.count2(bi_resource, $location.search().q).success(function(data) {
  		  	$scope.RecordCount = data.result.records[0].count;
  		  	$scope.totalpages = Math.ceil($scope.RecordCount / $location.search().limit)
         	$scope.disablefirst = pagination.controls(parseInt($location.search().page), $scope.totalpages)[0]
         	$scope.disableprev = pagination.controls(parseInt($location.search().page), $scope.totalpages)[1]
         	$scope.disablenext = pagination.controls(parseInt($location.search().page), $scope.totalpages)[2]
         	$scope.disablelast = pagination.controls(parseInt($location.search().page), $scope.totalpages)[3]
  	})
  }]);

/* Bulding Permit Search */
slControllers.controller('PermitSearchCtrl', ['$scope', '$location', 'CKAN', 'search', 'pagination',
  function ($scope, $location, CKAN, search, pagination) {
	$scope.sort = $location.search().sort + ' ' + $location.search().dir
	$scope.sortfield = $location.search().sort
	$scope.sortdir =  $location.search().dir
	$scope.keyword = $location.search().q
	$scope.limit = $location.search().limit
    $scope.page = $location.search().page

    $scope.fields = [
  	{field: 'Date', display: "Date", sortlow: "Oldest", sorthigh: "Newest" },
  	{field: 'Address', display: "Address", sortlow: "A", sorthigh: "Z" },
  	{field: 'PermitType', display: "Permit Type", sortlow: "A", sorthigh: "Z" },
  	{field: 'ConstructionCost', display: "Construction Cost", sortlow: "Low", sorthigh: "High" },
  	{field: 'OwnerName', display: "Owner", sortlow: "A", sorthigh: "Z" },
  	{field: 'Contractor', display: "Contractor", sortlow: "A", sorthigh: "Z" }
  	]

  	$scope.first = function(){$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: 1})}
  	$scope.prev = function() {if ($scope.disableprev) {} else {$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: parseInt($location.search().page) - 1})}}
	$scope.next = function() {if ($scope.disablenext) {} else {$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: parseInt($location.search().page) + 1})}}
  	$scope.last = function(){$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: $scope.totalpages})}

  	CKAN.query2(bi_resource, $location.search().q, $location.search().sort, $location.search().dir, $location.search().limit, ($location.search().page - 1) * $location.search().limit).success(function(data) {
  			 $scope.rows = data.result.records
  	})
  	
  	CKAN.count2(bi_resource, $location.search().q).success(function(data) {
  		  	$scope.RecordCount = data.result.records[0].count;
  		  	$scope.totalpages = Math.ceil($scope.RecordCount / $location.search().limit)
         	$scope.disablefirst = pagination.controls(parseInt($location.search().page), $scope.totalpages)[0]
         	$scope.disableprev = pagination.controls(parseInt($location.search().page), $scope.totalpages)[1]
         	$scope.disablenext = pagination.controls(parseInt($location.search().page), $scope.totalpages)[2]
         	$scope.disablelast = pagination.controls(parseInt($location.search().page), $scope.totalpages)[3]
  	})
  }]);

/* Code Cases Search */
slControllers.controller('CodeSearchCtrl', ['$scope', '$location', 'CKAN', 'search', 'pagination',
  function ($scope, $location, CKAN, search, pagination) {
	$scope.sort = $location.search().sort + ' ' + $location.search().dir
	$scope.sortfield = $location.search().sort
	$scope.sortdir =  $location.search().dir
	$scope.keyword = $location.search().q
	$scope.limit = $location.search().limit
    $scope.page = $location.search().page

  	$scope.fields = [
  	{field: 'DateOpened', display: "Date Opened", sortlow: "Oldest", sorthigh: "Newest" },
  	{field: 'Address', display: "Address", sortlow: "A", sorthigh: "Z" },
  	{field: 'CaseType', display: "Case Type", sortlow: "A", sorthigh: "Z" },
  	{field: 'Status', display: "Status", sortlow: "Low", sorthigh: "High" },
  	{field: 'StatusDate', display: "Status Date", sortlow: "Oldest", sorthigh: "Newest" }]

  	$scope.first = function(){$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: 1})}
  	$scope.prev = function() {if ($scope.disableprev) {} else {$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: parseInt($location.search().page) - 1})}}
	$scope.next = function() {if ($scope.disablenext) {} else {$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: parseInt($location.search().page) + 1})}}
  	$scope.last = function(){$location.search({q : $scope.keyword, sort : $scope.sort.split(" ")[0], dir: $scope.sort.split(" ")[1], limit: $scope.limit, page: $scope.totalpages})}

  	CKAN.query2(ce_resource, $location.search().q, $location.search().sort, $location.search().dir, $location.search().limit, ($location.search().page - 1) * $location.search().limit).success(function(data) {
  			 $scope.rows = data.result.records
  	})
  	
  	CKAN.count2(ce_resource, $location.search().q).success(function(data) {
  		  	$scope.RecordCount = data.result.records[0].count;
  		  	$scope.totalpages = Math.ceil($scope.RecordCount / $location.search().limit)
         	$scope.disablefirst = pagination.controls(parseInt($location.search().page), $scope.totalpages)[0]
         	$scope.disableprev = pagination.controls(parseInt($location.search().page), $scope.totalpages)[1]
         	$scope.disablenext = pagination.controls(parseInt($location.search().page), $scope.totalpages)[2]
         	$scope.disablelast = pagination.controls(parseInt($location.search().page), $scope.totalpages)[3]
  	})
  }]);

/* ROW Permit Search */
slControllers.controller('ROWSearchCtrl', ['$scope', '$http',
  function ($scope, $http) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + row_resource + '" ORDER BY "IssueDate" DESC, "_id " DESC LIMIT 500'
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
slControllers.controller('PermitDetailCtrl', ['$scope', '$routeParams', 'CKAN',
  function ($scope, $routeParams, CKAN) {
	CKAN.record(bi_resource, $routeParams.param).success(function(data){
	     $scope.DetailData = data.result.records;
	     var lng = data.result.records[0].lat
	     var lat = data.result.records[0].lng
	     $scope.map = { center: { latitude: lat, longitude: lng }, zoom: 17 };
	     $scope.marker = { id: 0, coords: { latitude: lat, longitude: lng }}
	     $scope.infowindow = {show: true}	
     })

    $scope.RecordType = 'Building Permit'
    $scope.Meta = 'Building permits are issued by the Division of Building Inspection and the Division of Planning for a variety of activities including construction and certification of compliance with zoning. The permit information above is submitted by the applicant.'
    $scope.Contact = 'If you have questions or concerns about building permits, please contact the the Division of Building Inspection at (859) 425-2255.'
}]);


/* Code Case Record */
slControllers.controller('CodeDetailCtrl', ['$scope', '$routeParams', 'CKAN',
  function ($scope, $routeParams, CKAN) {
	
	CKAN.record(ce_resource, $routeParams.param).success(function(data){
	     $scope.DetailData = data.result.records;
	     var lng = data.result.records[0].lat
	     var lat = data.result.records[0].lng
	     $scope.map = { center: { latitude: lat, longitude: lng }, zoom: 17 };
	     $scope.marker = { id: 0, coords: { latitude: lat, longitude: lng }}
	     $scope.infowindow = {show: true}	
     }) 

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

/*--------------Directives--------------*/

slDirectives.directive('paginate', function () {
    return {
        restrict: 'A',
        template:
          '<p class="text-center">Page {{page | number}} of {{totalpages | number}}</p>' +
          '<p class="text-center">Your search returned {{RecordCount | number}} records.</p>' +
          '<ul class="pagination">' +
            '<li ng-class="{\'disabled\': disablefirst}" class="pointer" ng-click=\'first()\'><a>First</a></li>' +
            '<li ng-class="{\'disabled\': disableprev}" class="pointer" ng-click=\'prev()\'><a>Previous</a></li>' +
            '<li ng-class="{\'disabled\': disablenext}" class="pointer" ng-click=\'next()\'><a>Next</a></li>' +
            '<li ng-class="{\'disabled\': disablelast}" class="pointer" ng-click=\'last()\'><a>Last</a></li>' +
          '</ul>'
    };
});

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

/* Gets Data from CKAN, query returns search results, record return an individual record, and count counts the records in the result*/
slServices.factory('CKAN', ['$http','search', function($http, search){
	return {
		query: function(dataset, terms, sort, limit, offset){
		if (terms != ''){
			var fulltext = ' WHERE "_full_text" @@ to_tsquery(\'' + search.clean(terms) + '\') '}
		else {
			var fulltext = ''}	
		var dataurl1 = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + dataset + '"' + fulltext + 'ORDER BY ' + sort +', "_id" DESC' + ' LIMIT ' + limit + ' OFFSET ' + offset
		return $http.get(dataurl1)
		},
		query2: function(dataset, terms, sortfield, sortdir, limit, offset){
		if (!terms){
			var fulltext = ''}
		else {
			var fulltext = ' WHERE "_full_text" @@ to_tsquery(\'' + search.clean(terms) + '\') '}	
		var dataurl1 = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + dataset + '"' + fulltext + 'ORDER BY "' + sortfield + '" ' + sortdir + ', "_id" DESC' + ' LIMIT ' + limit + ' OFFSET ' + offset
		return $http.get(dataurl1)
		},
		record: function(dataset, id){
		var dataurl2 = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + dataset + '" WHERE "_id" = ' + id
		return $http.get(dataurl2)
		},
		count: function(dataset, terms){
		if (terms != ''){
			var fulltext = ' WHERE "_full_text" @@ to_tsquery(\'' + search.clean(terms) + '\') '}
		else {
			var fulltext = ''}	
		var dataurl3 = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT COUNT(*) FROM "' + dataset + '"' + fulltext
		return $http.get(dataurl3)
		},
		count2: function(dataset, terms){
		if (!terms){
			var fulltext = ''}
		else {
			var fulltext = ' WHERE "_full_text" @@ to_tsquery(\'' + search.clean(terms) + '\') '}	
		var dataurl3 = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT COUNT(*) FROM "' + dataset + '"' + fulltext
		return $http.get(dataurl3)
		},
}
}])

/* Cleans Search Input for CKAN API */
slServices.factory('searchbox', [function(){
	return {
	input: function(input){
	var wordarray = input.trim().split(/\s+/gim)  
	for (i = 0; i < wordarray.length; i++) { 
	wordarray[i] = wordarray[i].replace(/[\W]|[_]|/gim,"").toUpperCase()
	}
	return wordarray.toString().replace(/,+/gim,",").replace(/,$/gim,"").replace(/,/gim,"%26")}	
}
}])


slServices.factory('search', ['$location', function($location){
	return {
		go: function (base, keyword, sortfield, sortdir, limit, page ){
		if (keyword === ''){
  			var link = '/' + base + '/' + 'null' + '/' + sortfield + '/' + sortdir + '/' + limit + '/' + page}
  		else { 	
    		var link = '/' + base + '/' + keyword + '/' + sortfield + '/' + sortdir + '/' + limit + '/' + page}
		return $location.path(link)
		},
		checknull: function (input){
  		if (input === 'null')
  		{return ''}
  		else {return input}
  		},
  		clean: function(input){
		var wordarray = input.trim().split(/\s+/gim)  
		for (i = 0; i < wordarray.length; i++) { 
		wordarray[i] = wordarray[i].replace(/[\W]|[_]|/gim,"").toUpperCase()
		}
		return wordarray.toString().replace(/,+/gim,",").replace(/,$/gim,"").replace(/,/gim,"%26")}	
}
}])

/* Disabled pagination button, returns an arrary of boolean values in the order of [first, prev, next, last] */
slServices.factory('pagination', [function(){
  return {
  controls: function(page, totalpages){
        if (totalpages === 1 && page === 1){
        var result = [true, true, true, true]
        }
        else if (totalpages > 1 && page === 1){
        var result = [true, true, false, false] 
        }
        else if (totalpages > 1  && page === totalpages){
        var result = [false, false, true, true] 
        }
        else {
        var result = [false, false, false, false] 
        }
      return result
  }    
}}])