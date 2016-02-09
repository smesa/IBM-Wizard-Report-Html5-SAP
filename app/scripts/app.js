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
      .when('/basic_info/:id', {
        templateUrl: 'views/basic_info.html',
        controller: 'BasicInfoCtrl',
        controllerAs: 'basicInfo'
      })
      .when('/source_info/:id', {
        templateUrl: 'views/source_info.html',
        controller: 'SourceInfoCtrl',
        controllerAs: 'sourceInfo'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
