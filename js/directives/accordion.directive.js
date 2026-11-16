(function () {
  'use strict';
  angular.module('cafeteria.components').directive('cafeAccordion', function () {
    return {
      restrict: 'E',
      scope: {items:'<'},
      template: "<div class=\"acordeao\"><section ng-repeat=\"item in items track by $index\"><h3><button type=\"button\" id=\"{{prefixo}}-botao-{{$index}}\" ng-click=\"alternar($index)\" ng-attr-aria-expanded=\"{{aberto === $index}}\" aria-controls=\"{{prefixo}}-painel-{{$index}}\">{{item.titulo}}<span aria-hidden=\"true\">{{aberto === $index ? '−' : '+'}}</span></button></h3><div class=\"painel-acordeao\" ng-class=\"{aberto:aberto === $index}\" id=\"{{prefixo}}-painel-{{$index}}\" role=\"region\" aria-labelledby=\"{{prefixo}}-botao-{{$index}}\" ng-attr-aria-hidden=\"{{aberto !== $index}}\"><div><p>{{item.conteudo}}</p></div></div></section></div>",
      link: function (scope) {
        scope.prefixo = 'acordeao-' + scope.$id;
        scope.aberto = -1;
        scope.alternar = function (indice) { scope.aberto = scope.aberto === indice ? -1 : indice; };
      }
    };
  });
}());
