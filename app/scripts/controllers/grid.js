'use strict';

/**
 * @ngdoc function
 * @name sapWizardReportApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the sapWizardReportApp
 */
angular.module('sapWizardReportApp')
  .controller('GridCtrl',['$scope','$rootScope','crud','$routeParams','$location','$window','uiGridConstants','uiGridGroupingConstants',
    function ($scope,$root,$crud, $routeParams,$location,$window,uiGridConstants,uiGridGroupingConstants) {

    var key =  $routeParams.key;
    var mandt = '110';

    $scope.viewFilter = false;
    $scope.viewReport = false;
    $scope.tam = 500;

    $scope.gridOptions = {
      enableFiltering: false,
      showColumnFooter: true,
      enableColumnResizing: true,
      treeRowHeaderAlwaysVisible: false,
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      },
      columnDefs: []
    };

    $scope.toggleFiltering = function(){
       $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
       $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    };

    $scope.logo = 'https://gestiondesempeno.compensar.com/gestiondesempeno/imagenes/logo_compensar.png';

    $crud.getById(mandt,key).then(function(resp){
      angular.forEach(resp,function(item){
          $scope.title = item.title;
      })
    });

    $crud.getFields(mandt,key).then(function(resp){
      $scope.fieldsReport = resp;

      angular.forEach(resp,function(item){

        if(item.filter == true){

          $scope.viewFilter     = true;

          var newDiv 				    = document.createElement('div');
          newDiv.className 		  = 'form-group col-md-3';

          var newLabel 			    = document.createElement('label');
          newLabel.innerHTML  	= item.description;

          var newDiv2 				  = document.createElement('div');
          newDiv2.className 		= 'input-group';

          var newInput 			    = document.createElement('input');
          newInput.type 			  = 'text';
          newInput.className  	= 'form-control';

          var newSpan 			    = document.createElement('span');
          newSpan.className 	  = 'input-group-addon';

          switch (item.datatype.toLowerCase()) {
            case 'char':
              var icon = 'fa-text-width'
              break;
            case 'dats':
              var icon = 'fa-calendar'
              break;
            case 'tims':
              var icon = 'fa-clock-o'
              break;
            case 'cuky':
              var icon = 'fa-money'
              break;
            case 'curr':
              var icon = 'fa-usd'
              break;
            default:
              var icon = 'fa-text-width'
              break;
          }

          var newIcon 			    = document.createElement('i');
          newIcon.className 	  = 'fa ' + icon;

          newDiv.appendChild(newLabel);
          newDiv.appendChild(newDiv2);
          newDiv2.appendChild(newInput);
          newDiv2.appendChild(newSpan);
          newSpan.appendChild(newIcon);

          var elmparent = $('#filters');
          elmparent.append(newDiv);
        }
      })
    });

    $scope.$watch('fieldsReport',function(newValue,oldValue){
      if($scope.viewFilter == false && $scope.fieldsReport){
          $scope.getDataForms();
      }
    })

    $scope.getDataForms = function(){
      $crud.getDataForms(mandt,key).then(function(resp){
        $scope.viewReport = true;

        var fields = JSON.parse(JSON.stringify($scope.fieldsReport));
        var cntGroup = 0;
        angular.forEach(fields,function(item){
          item.fieldname = item.fieldname.toLowerCase();
          var properties = {};
          properties.field = item.fieldname;
          properties.displayName = item.description;
          properties.enableColumnResizing = true;

          if(item.sumby == true){
            properties.aggregationType = uiGridConstants.aggregationTypes.sum
          }

          if(item.groupby == true){
            properties.grouping = { groupPriority: cntGroup }
            cntGroup = cntGroup + 1;
          }

          $scope.gridOptions.columnDefs.push(properties)
        })

        $scope.gridOptions.data = resp;
      });
    }
  }]);
