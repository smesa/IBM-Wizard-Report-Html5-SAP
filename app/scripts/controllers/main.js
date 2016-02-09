'use strict';

/**
 * @ngdoc function
 * @name sapWizardReportApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapWizardReportApp
 */
angular.module('sapWizardReportApp')
  .controller('MainCtrl',['$scope','$rootScope','crud','$routeParams','$location',
    function ($scope,$root,$crud, $routeParams,$location) {

    var mandt =  100;
    $scope.viewDetail = false;
    $scope.key    = '';
    $scope.delOpc = '';
    $scope.messagePrompt = '';
    $scope.data = [];
    $scope.tables = [];
    $scope.conditions = [];
    $scope.conditionsSel = [];
    $scope.condField1List = [];
    $scope.condField2List = [];
    $scope.fields = [];


    $crud.get(mandt).then(function(resp){
      $root.data = resp;
    });

    $root.$watch('data', function(newValue, oldValue) {
      $scope.data = $root.data;;
    });

    $scope.$watch('tables',function(newValue,oldValue){
      $scope.getAllFieldFromTables();
    })

    $scope.basicInfo = function(id){
      $location.path('/basic_info/' + id)
    }

    $scope.back = function(){
      window.history.back();
    }

    $scope.new = function(){
      $('#create-report-modal').modal('show');
    }

    $scope.getInfo = function(key){
      $scope.viewDetail = true;
      $scope.key = key;
      $crud.getTablesById(mandt,key).then(function(resp){
        $scope.tables = resp;
      });
      $crud.getConditionsById(mandt,key).then(function(resp){
        $scope.conditions = resp;
      });

      $crud.getConditionsSelById(mandt,key).then(function(resp){
        $scope.conditionsSel = resp;
      });

    }

    $scope.getAllFieldFromTables = function(){
      $scope.fields = [];
      angular.forEach($scope.tables,function(item){
        $crud.getTableFields(mandt,item.tabname).then(function(resp){
          angular.forEach(resp,function(field){
            $scope.fields.push(field);
          })
        });
      })
    }

    $scope.getFieldCond = function(tab){

      switch (tab) {
        case 1:
          $crud.getTableFields(mandt,$scope.tab1).then(function(resp){
            $scope.condField1List = resp;
          });
          break;
        case 2:
          $crud.getTableFields(mandt,$scope.tab2).then(function(resp){
            $scope.condField2List = resp;
          });
          break;
        default:
      }

    }

    $scope.data = {};
    $scope.data.tecname = '';
    $scope.data.title = '';
    $scope.data.description = '';

    $scope.save = function(){

      $crud.create($scope.data).then(function(resp){

        $('#create-report-modal').modal('hide');
        $scope.data = {}
        $crud.get(mandt).then(function(resp){
          $root.data = resp;
        })

      })
    }

    $scope.add = function(){
      $crud.setTable(mandt,$scope.key,$scope.tabname).then(function(resp){
        $scope.tabname = '';
        $crud.getTablesById(mandt,$scope.key).then(function(resp){
          $scope.tables = resp;
        });
        $('#add-table-modal').modal('hide');
      });
    }

    $scope.addCond = function(){
      $crud.setCondition(mandt,$scope.key,$scope.tab1,$scope.tab2,$scope.field1,$scope.field2).then(function(resp){
        $scope.tab1 = '';
        $scope.tab2 = '';
        $scope.field1 = '';
        $scope.field2 = '';
        $crud.getConditionsById(mandt,$scope.key).then(function(resp){
          $scope.conditions = resp;
        });
        $('#add-condition-modal').modal('hide');
      });
    }

    $scope.addCondSel = function(){
      $crud.setConditionSel(mandt,$scope.key,$scope.tab1,$scope.field1,$scope.operator,$scope.value,$scope.connector).then(function(resp){
        $scope.tab1 = '';
        $scope.field1 = '';
        $scope.operator = '';
        $scope.value = '';
        $scope.connector = '';
        $crud.getConditionsSelById(mandt,$scope.key).then(function(resp){
          $scope.conditionsSel = resp;
        });
        $('#add-condition-sel-modal').modal('hide');
      });
    }

    $scope.delReportPrompt = function(key){
      $scope.key = key;
      $scope.delOpc = 'hd';
      $scope.messagePrompt = 'Esta acción eliminara todos los datos relacionados con este reporte';
      $('#delete-prompt-modal').modal('show');
    }

    $scope.delTablePrompt = function(tab){
      $scope.tab1 = tab;
      $scope.delOpc = 'tb';
      $scope.messagePrompt = 'Esta acción eliminara todas las condiciones de conexión, condiciones de selección y campos seleccionados que esten relacionados con la tabla a eliminar';
      $('#delete-prompt-modal').modal('show');
    }

    $scope.delCondPrompt = function(condid){
      $scope.condid = condid;
      $scope.delOpc = 'cd';
      $scope.messagePrompt = 'Esta acción eliminara la condición de conexión seleccionada';
      $('#delete-prompt-modal').modal('show');
    }
    $scope.delCondSelPrompt = function(condid){
      $scope.condid = condid;
      $scope.delOpc = 'cs';
      $scope.messagePrompt = 'Esta acción eliminara la condición de selección';
      $('#delete-prompt-modal').modal('show');
    }

    $scope.deleteData = function(){
      $crud.destroy(mandt,$scope.delOpc,$scope.key,$scope.tab1,$scope.condid).then(function(resp){
        $crud.get(mandt).then(function(resp){
          $root.data = resp;
        });
        $crud.getTablesById(mandt,$scope.key).then(function(resp){
          $scope.tables = resp;
        });
        $crud.getConditionsById(mandt,$scope.key).then(function(resp){
          $scope.conditions = resp;
        });
        $crud.getConditionsSelById(mandt,$scope.key).then(function(resp){
          $scope.conditionsSel = resp;
        });
        $('#delete-prompt-modal').modal('hide');
      })
    }

    $scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };


  }]);
