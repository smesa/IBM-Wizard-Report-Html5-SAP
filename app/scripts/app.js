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
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.grouping',
    'ui.grid.exporter'
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

  })
 .run(function($locale){
    $locale.NUMBER_FORMATS.GROUP_SEP = '.';
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
 });
