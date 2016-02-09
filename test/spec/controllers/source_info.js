'use strict';

describe('Controller: SourceInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('sapWizardReportApp'));

  var SourceInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SourceInfoCtrl = $controller('SourceInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SourceInfoCtrl.awesomeThings.length).toBe(3);
  });
});
