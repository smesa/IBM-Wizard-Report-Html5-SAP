'use strict';

/**
 * @ngdoc function
 * @name sapWizardReportApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapWizardReportApp
 */
angular.module('sapWizardReportApp')
  .controller('MainCtrl',['$scope','$rootScope','crud','$routeParams','$location','$window',
    function ($scope,$root,$crud, $routeParams,$location,$window) {

    var mandt =  110;
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
    $scope.fieldsReport = [];
    $scope.data = {};
    $scope.data.tecname = '';
    $scope.data.title = '';
    $scope.data.description = '';
    $scope.tab = 1;


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

      $crud.getFields(mandt,key).then(function(resp){
        $scope.fieldsReport = resp;
      });

    }

    $scope.getAllFieldFromTables = function(){
      $scope.fields = [];
      angular.forEach($scope.tables,function(item){
        $crud.getTableFields(mandt,$scope.key,item.tabname).then(function(resp){
          angular.forEach(resp,function(field){
            $scope.fields.push(field);
          })
        });
      })
    }

    $scope.getFieldCond = function(tab){

      switch (tab) {
        case 1:
          $crud.getTableFields(mandt,'',$scope.tab1).then(function(resp){
            $scope.condField1List = resp;
          });
          break;
        case 2:
          $crud.getTableFields(mandt,'',$scope.tab2).then(function(resp){
            $scope.condField2List = resp;
          });
          break;
        default:
      }

    }


    $scope.save = function(){

      $crud.create(mandt,$scope.data).then(function(resp){

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

    $scope.delFieldPrompt = function(table,fieldname){
      $scope.tab1 = table;
      $scope.fieldname = fieldname;
      $scope.delOpc = 'fl';
      $scope.messagePrompt = 'Esta acción eliminara el elemento seleccionado';
      $('#delete-prompt-modal').modal('show');
    }

    $scope.deleteData = function(){
      $crud.destroy(mandt,$scope.delOpc,$scope.key,$scope.tab1,$scope.condid,$scope.fieldname).then(function(resp){
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
        $crud.getFields(mandt,$scope.key).then(function(resp){
          $scope.fieldsReport = resp;
        });
        $('#delete-prompt-modal').modal('hide');
      })
    }

    $scope.addField = function(item){

      $crud.setFields(mandt,$scope.key,item.tabname,item.fieldname,item.scrtext_m).then(function(info){
        $crud.getFields(mandt,$scope.key).then(function(resp){
          $scope.fieldsReport = resp;
        });
      });
    }

    $scope.sortField = function(option,sort){

      switch (option) {
        case 'U':
          var sort_new = parseInt(sort) - 1;
          $crud.sortField(mandt,$scope.key,sort_new, sort).then(function(resp){
            $crud.getFields(mandt,$scope.key).then(function(resp){
              $scope.fieldsReport = resp;
            });
          });
          break;
        case 'D':
          var sort_new = parseInt(sort) + 1;
          $crud.sortField(mandt,$scope.key,sort_new, sort).then(function(resp){
            $crud.getFields(mandt,$scope.key).then(function(resp){
              $scope.fieldsReport = resp;
            });
          });
          break;
      }
    }

    $scope.setCheck = function(field,flag,fieldname,tabname){
      $crud.setCheck(mandt,$scope.key,tabname,fieldname,field,flag).then(function(resp){
        $crud.getFields(mandt,$scope.key).then(function(resp){
          $scope.fieldsReport = resp;
        });
      });
    }

    $scope.setDesc = function(){
      $crud.setDesc(mandt,$scope.key,tabname,fieldname,field,flag).then(function(resp){
        $crud.getFields(mandt,$scope.key).then(function(resp){
          $scope.fieldsReport = resp;
        });
      });
    }

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.changeFieldPrompt = function(tab1, fieldname, desc){
      $scope.tab1 = tab1;
      $scope.fieldname = fieldname;
      $scope.desc = desc;
      $('#edit-field-modal').modal('show');
    }

    $scope.changeField = function(){
      $crud.changeField(mandt,$scope.key,$scope.tab1,$scope.fieldname,$scope.desc).then(function(resp){
        $crud.getFields(mandt,$scope.key).then(function(resp){
          $scope.fieldsReport = resp;
        });
      });
      $('#edit-field-modal').modal('hide');
    }

    $scope.openPreview = function(){
      console.log($location)
      var locationnew = $location.$$absUrl.replace($location.$$path,'') + '/grid/' + $scope.key;
      $window.open(locationnew, '_blank');
    }

  }]);
