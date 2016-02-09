'use strict';

/**
 * @ngdoc function
 * @name sapWizardReportApp.controller:BasicInfoCtrl
 * @description
 * # BasicInfoCtrl
 * Controller of the sapWizardReportApp
 */
angular.module('sapWizardReportApp')
  .controller('BasicInfoCtrl',['$scope','$rootScope','$routeParams','$location',
    function ($scope,$root,$routeParams,$location) {

    var id = $routeParams.id;
    $scope.data = {};

    angular.forEach($root.data,function(val){
      if (val.reportid == id) {
        $scope.data = val
      }
    })

    $scope.back = function(){
      window.history.back();
    }

    $scope.goTo = function(site){
      switch (site) {
        case 0:
          $location.path('/100')
          break;
        case 1:
          $location.path('/basic_info/' + id)
          break;
        case 2:
          $location.path('/source_info/' + id)
          break;
        case 3:
          break;
        default:
      }
    }

  }]);
