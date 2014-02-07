var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/timeline', {
		templateUrl: 'partials/timeline.html',
		controller: 'timelineCtrl'
	}).when('/connect', {
		templateUrl: 'partials/connect.html',
		controller: 'connectCtrl'
	}).otherwise({
		redirectTo: '/connect'
	});
	$locationProvider.html5Mode(false);
});


demoApp.controller('connectCtrl', function connectCtrl($scope, $rootScope, $location) {
	OAuth.initialize("hOxmiXE3X55tcdK0kDbjd_YZ1G8");
	$scope.connect = function() {
		OAuth.popup("twitter", function(err, res) {
			if (err) return alert(err);
			$rootScope.twitter = res;
			$location.path('/timeline');
			$scope.$apply();
		});
	}
});

demoApp.controller('timelineCtrl', function timelineCtrl($scope, $rootScope) {
  $scope.search = function() {
	$rootScope.twitter.get('/1.1/search/tweets.json', {data: {q: $scope.query}}).done(function(data) {
    if (data.statuses) {
      $scope.tw_timeline = data.statuses;
      $scope.$apply();
    }
	});
  };
});
