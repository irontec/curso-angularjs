angular.module("angular-pagedown", []);
angular.module("angular-pagedown").directive('pagedown', function($compile) {
    var nextId = 0;
    
    // Make converter only once to save a bit of load each time - thanks to ajoslin
    var markdownConverter = new Markdown.Converter();
    
    return {
        restrict: 'E',
        scope: {
          ngModel: '=',
          help: '='
        },
        template:
            '<div class="wmd-panel">' + 
               '<div class="wmd-button"></div>' +
               '<textarea class="wmd-input"></textarea>' +
            '</div>' +
            '<div class="wmd-panel wmd-preview"></div>',

        link: function(scope, element, attrs) {
            var editorUniqueId = nextId++;

            // Add unique ids
            element.find(".wmd-button").attr("id","wmd-button-bar-" + editorUniqueId);
            element.find(".wmd-input").attr("id","wmd-input-" + editorUniqueId);
            element.find(".wmd-preview").attr("id","wmd-preview-" + editorUniqueId);

            var converter = new Markdown.Converter();
            var editor = new Markdown.Editor(converter, "-" + editorUniqueId, {
                //handler: help
            });
            editor.run()

            var $panel = $(element.find(".wmd-panel")[0]);
            var $wmdInput = element.find(".wmd-input");
            $wmdInput.on('blur keyup change', function (ev) {
                scope.$apply(function() {
                    scope.ngModel = $wmdInput.val();
                });
            });

            scope.$watch('ngModel', function(newValue, oldValue) {
                $wmdInput.val(newValue);
                editor.refreshPreview();
            });

            $panel.hide();

            element.on("click", function(ev) {
                $panel.show();
                $wmdInput.focus();
            });

            $wmdInput.on("blur", function(ev) {
                $panel.hide();
            });
        }
    }
});