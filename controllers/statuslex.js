var recordID = '4545'
var resourceID = '2691aff1-e555-48d3-9188-aebf1fa8323e'

var param = $location.search()

console.log(param)

/* Controllers */

var statuslex = angular.module('statuslex', []);

statuslex.controller('DetailCtrl', ['$scope', '$http',
  function ($scope, $http) {
  	var DataURL = 'http://www.civicdata.com/api/action/datastore_search_sql?sql=SELECT * FROM "' + resourceID + '" WHERE "_id"  =' + recordID
    $http.get(DataURL).success(function(data) {
      $scope.DetailData = data.result.records;
    });
}]);