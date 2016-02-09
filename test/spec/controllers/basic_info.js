'use strict';

describe('Controller: BasicInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('sapWizardReportApp'));

  var BasicInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BasicInfoCtrl = $controller('BasicInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BasicInfoCtrl.awesomeThings.length).toBe(3);
  });
});
