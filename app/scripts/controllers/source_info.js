'use strict';

/**
 * @ngdoc function
 * @name sapWizardReportApp.controller:SourceInfoCtrl
 * @description
 * # SourceInfoCtrl
 * Controller of the sapWizardReportApp
 */
angular.module('sapWizardReportApp')
  .controller('SourceInfoCtrl', ['$scope','$rootScope','$routeParams','$location', 'crud',
    function ($scope,$root,$routeParams,$location,$crud) {
      var id = $routeParams.id;

      var mandt =  100;
      $scope.data = [];

      $crud.get(mandt).then(function(resp){
        $root.data = resp;
      },function(error){

      })

      $root.$watch('data', function(newValue, oldValue) {
        $scope.data = $root.data;;
      });

      $scope.goTo = function(site){
        switch (site) {
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
