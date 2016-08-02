var easycast = angular.module('easycast', ['ngResource', 'ngTable']);

easycast.config(function($routeProvider) {

  $routeProvider.
      when('/dashboard', {
      	controller: 'DashboardCtrl',
        templateUrl: '/js/views/dashboard.html'
      }).
      when('/integrations', {
        controller: 'IntegrationsCtrl',
        templateUrl: '/js/views/integrations.html'
      }).
      otherwise({redirectTo: '/dashboard'});
});