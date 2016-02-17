'use strict';

/**
 * @ngdoc overview
 * @name sapWizardReportApp
 * @description
 * # sapWizardReportApp
 *
 * Main module of the application.
 */
angular
  .module('sapWizardReportApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.grid'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main/:mandt', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/grid/:key', {
        templateUrl: 'views/grid.html',
        controller: 'GridCtrl',
        controllerAs: 'grid'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
