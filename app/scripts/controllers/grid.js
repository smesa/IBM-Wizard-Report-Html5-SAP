'use strict';

/**
 * @ngdoc function
 * @name sapWizardReportApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the sapWizardReportApp
 */
angular.module('sapWizardReportApp')
  .controller('GridCtrl',['$scope','$rootScope','crud','$routeParams','$location','$window','uiGridConstants',
    function ($scope,$root,$crud, $routeParams,$location,$window,uiGridConstants) {

    var key =  $routeParams.key;
    var mandt = '100';

    var today = new Date();
var nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

$scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
  if( col.filters[0].term ){
    return 'header-filtered';
  } else {
    return '';
  }
};

    $crud.getDataForms(mandt,key).then(function(resp){
      $scope.gridOptions.data = resp;
    });

    $scope.gridOptions = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  }]);
