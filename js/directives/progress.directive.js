(function () {
  'use strict';
  angular.module('cafeteria.components').directive('cafeProgress', function () {
    return {
      restrict: 'E',
      scope: {value:'<', label:'@'},
      template: "<div class=\"progresso\"><div class=\"progresso-rotulo\"><span>{{label}}</span><strong>{{percentual}}%</strong></div><div class=\"trilha\" role=\"progressbar\" aria-label=\"{{label}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" ng-attr-aria-valuenow=\"{{percentual}}\"><div class=\"preenchimento\" ng-style=\"{width:percentual + '%'}\"></div></div></div>",
      link: function (scope) {
        scope.$watch('value', function (valor) {
          var numero = Number(valor);
          scope.percentual = isFinite(numero) ? Math.max(0, Math.min(100, Math.round(numero))) : 0;
        });
      }
    };
  });
}());
