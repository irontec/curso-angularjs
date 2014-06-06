```javascript
describe('button directive', function () {
    var $compile, $rootScope;
    beforeEach(module('directives.button'));
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    it('adds a "btn" class to the button element', function() {
        var element = $compile('<button></button>')($rootScope);
        expect(element.hasClass('btn')).toBe(true);
    });
});
```