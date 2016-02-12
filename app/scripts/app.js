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
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:mandt', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
