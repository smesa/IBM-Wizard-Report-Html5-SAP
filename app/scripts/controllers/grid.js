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
    var mandt = '110';

    var today = new Date();
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    $crud.getFields(mandt,key).then(function(resp){
      $scope.fieldsReport = resp;
    });

    $crud.getDataForms(mandt,key).then(function(resp){

      var values = JSON.stringify(resp);
      var fields = JSON.stringify($scope.fieldsReport);
      fields = JSON.parse(fields);

      angular.forEach(fields,function(item){

        item.fieldname = item.fieldname.toLowerCase();
        //item.description = item.description.replace(/ /g,'_')
        //item.description = item.description.split(' ').join('_');
        //item.description = item.description.replace(/./,'')
        values = values.split(item.fieldname).join(item.description);
        item.fieldname = item.fieldname.toUpperCase();
        values = values.split(item.fieldname).join(item.description);
      })

      var values = JSON.parse(values);
      $scope.gridOptions.data = values;
      //$scope.gridOptions.data = resp;

    });

    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
      if( col.filters[0].term ){
        return 'header-filtered';
      } else {
        return '';
      }
    };

    $scope.gridOptions = {
      enableFiltering: true,
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

  }]);
