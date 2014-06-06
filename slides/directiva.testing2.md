```javascript
describe('validateEquals directive', function() {
    var $scope, modelCtrl, modelValue;
    beforeEach(inject(function($compile, $rootScope) {
        ...
        modelValue = $scope.model = {};
        modelCtrl = $scope.testForm.testInput;
        ...
    }));
    ...
    describe('model value changes', function() {
        it('should be invalid if the model changes', function() {
            modelValue.testValue = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeFalsy();
            expect(modelCtrl.$viewValue).toBe(undefined);
        });
        it('should be invalid if the reference model changes', function() {
            modelValue.compareTo = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeFalsy();
            expect(modelCtrl.$viewValue).toBe(undefined);
        });
        it('should be valid if the modelValue changes to be the same as the reference', function() {
            modelValue.compareTo = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeFalsy();
            modelValue.testValue = 'different';
            $scope.$digest();
            expect(modelCtrl.$valid).toBeTruthy();
            expect(modelCtrl.$viewValue).toBe('different');
        });
});
```