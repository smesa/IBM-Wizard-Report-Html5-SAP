'use strict';

/**
 * @ngdoc service
 * @name sapWizardReportApp.crud
 * @description
 * # crud
 * Factory in the sapWizardReportApp.
 */
angular.module('sapWizardReportApp')
  .factory('crud', ['$q','$http',function ($q,$http) {

    $.ajaxSetup({
      converters: {
          "text json": function (textValue) {
              return jQuery.parseJSON(textValue.replace(/(^|[^\\])\\'/g, "$1'"));
          }
      }
    });

    var origin = document.location.origin;
    var origin = 'http://ex3healthcare.softlayer.com:8000/'
    var url    = origin + 'sap/bc/ibmishc/abap_reports?sap-client=';

    function get(mandt){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function getById(mandt, id){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'byId',
        "reporid"     : id
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function getTablesById(mandt, id){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'tablesById',
        "reportid"     : id
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function getConditionsById(mandt, id){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'conditionsById',
        "reportid"     : id
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function getConditionsSelById(mandt, id){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'conditionsSelById',
        "reportid"     : id
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function getFields(mandt, id){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'getFields',
        "reportid"     : id
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function getTableFields(mandt,key,tabname){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'tabFields',
        "tabname"     : tabname,
        "reportid"    : key
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function getDataForms(mandt, id){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'getDataForm',
        "reportid"     : id
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function setTable(mandt,key,name){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'setTable',
        "tabname"     : name,
        "reportid"    : key,
        "_method"		  : 'POST',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          headers : { "Accept" : 'application/json' },
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function setCondition(mandt,key,tab1,tab2,field1,field2){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'setCondition',
        "table1"      : tab1,
        "table2"      : tab2,
        "field1"      : field1,
        "field2"      : field2,
        "reportid"    : key,
        "_method"		  : 'POST',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          headers : { "Accept" : 'application/json' },
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function setConditionSel(mandt,key,tab1,field1,operator,value,connector){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'setConditionSel',
        "table"      : tab1,
        "field"      : field1,
        "operator"    : operator,
        "value"       : value,
        "connector"   : connector,
        "reportid"    : key,
        "_method"		  : 'POST',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          headers : { "Accept" : 'application/json' },
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function setFields(mandt,key,tabname,field,description){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
              "reportid" 		: key,
              "table"       : tabname,
              "field"	      : field,
              "description" : description,
              "option"      : 'setField',
  	          "_method"		  : 'POST',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;

    }

    function sortField(mandt,key,sort_new,sort_old){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'sortField',
        "sort_new"    : sort_new,
        "sort_old"    : sort_old,
        "reportid"    : key,
        "_method"		  : 'POST',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          headers : { "Accept" : 'application/json' },
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function setCheck(mandt,key,tabname,fieldname,option,flag){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : option,
        "reportid"    : key,
        "tabname"     : tabname,
        "fieldname"   : fieldname,
        "flag"        : flag,
        "_method"		  : 'PUT',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          headers : { "Accept" : 'application/json' },
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }

    function changeField(mandt,key,tabname,fieldname,desc){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
        "_method"		  : 'GET',
        "option"      : 'changeField',
        "reportid"    : key,
        "tabname"     : tabname,
        "fieldname"   : fieldname,
        "desc"        : desc,
        "_method"		  : 'PUT',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          headers : { "Accept" : 'application/json' },
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;


    }

    function create(mandt,data){

      var deferred  = $q.defer();
      var sURL      = url + mandt;

      var oParameters = {
              "tecname" 		: data.tecname,
              "title"		    : data.title,
              "description"	: data.description,
              "option"      : 'report',
  	          "_method"		  : 'POST',
      };

      jQuery.ajax({
          url: sURL,
          async: true,
          dataType: 'json',
          data: oParameters,
          type: 'GET',

          success: function(oData) {
            return deferred.resolve(oData);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown){
            return deferred.reject(textStatus)
          }
      });

      return deferred.promise;
    }



    function destroy(mandt, option, key, tabname, condid, fieldname){

        var deferred  = $q.defer();
        var sURL      = url + mandt;

        var oParameters = {
                "option" 		  : option,
                "reportid"    : key,
                "tabname"     : tabname,
                "condid"      : condid,
                "fieldname"   : fieldname,
    	          "_method"		  : 'DELETE',
        };

        jQuery.ajax({
            url: sURL,
            async: true,
            dataType: 'json',
            data: oParameters,
            type: 'GET',

            success: function(oData) {
              return deferred.resolve(oData);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
              return deferred.reject(textStatus)
            }
        });

        return deferred.promise;


    }

    // Public API here
    return {
      get: get,
      getById: getById,
      getTablesById: getTablesById,
      getConditionsById: getConditionsById,
      getConditionsSelById: getConditionsSelById,
      getTableFields: getTableFields,
      getFields: getFields,
      getDataForms: getDataForms,
      setTable: setTable,
      setCondition: setCondition,
      setConditionSel: setConditionSel,
      setFields: setFields,
      sortField: sortField,
      setCheck: setCheck,
      changeField: changeField,
      create: create,
      destroy: destroy
    };


  }]);
