'use strict';

describe('Controller: CreatereportCtrl', function () {

  // load the controller's module
  beforeEach(module('sapWizardReportApp'));

  var CreatereportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatereportCtrl = $controller('CreatereportCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreatereportCtrl.awesomeThings.length).toBe(3);
  });
});
