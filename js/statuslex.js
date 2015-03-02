var recordID = '4548'

/* Modules */

var statuslex = angular.module('statuslex', []);

/* Controllers */

statuslex.controller('PermitDetailCtrl', ['$scope', '$http',
  function ($scope, $http) {
  var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "2691aff1-e555-48d3-9188-aebf1fa8323e" WHERE "_id"  =' + recordID
    $http.get(DataURL).success(function(data) {
      $scope.DetailData = data.result.records;
    });
}]);

/* Filters */