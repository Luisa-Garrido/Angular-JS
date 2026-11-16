(function () {
  'use strict';
  angular.module('cafeteria.components').directive('cafeTabs', function () {
    return {
      restrict: 'E',
      scope: {items:'<', onSelect:'&'},
      template: "<div><div class=\"abas\" role=\"tablist\" aria-label=\"Categorias do cardápio\"><button type=\"button\" role=\"tab\" ng-repeat=\"item in items track by item.id\" id=\"{{prefixo}}-aba-{{$index}}\" ng-click=\"selecionar($index)\" ng-keydown=\"teclado($event,$index)\" ng-class=\"{ativo:ativa === $index}\" ng-attr-tabindex=\"{{ativa === $index ? 0 : -1}}\" ng-attr-aria-selected=\"{{ativa === $index}}\" aria-controls=\"{{prefixo}}-painel-{{$index}}\">{{item.titulo}}</button></div><div class=\"painel-aba\" ng-repeat=\"item in items track by item.id\" ng-show=\"ativa === $index\" role=\"tabpanel\" id=\"{{prefixo}}-painel-{{$index}}\" aria-labelledby=\"{{prefixo}}-aba-{{$index}}\">{{item.conteudo}}</div></div>",
      link: function (scope, element) {
        scope.prefixo = 'abas-' + scope.$id;
        scope.ativa = 0;
        scope.selecionar = function (indice) { scope.ativa = indice; scope.onSelect({item:scope.items[indice]}); };
        scope.teclado = function (event, indice) {
          var total = scope.items.length, novo;
          if (event.key === 'ArrowRight') { novo = (indice + 1) % total; }
          else if (event.key === 'ArrowLeft') { novo = (indice + total - 1) % total; }
          else if (event.key === 'Home') { novo = 0; }
          else if (event.key === 'End') { novo = total - 1; }
          else { return; }
          event.preventDefault(); scope.selecionar(novo);
          element[0].querySelectorAll('[role="tab"]')[novo].focus();
        };
      }
    };
  });
}());
