(function () {
  'use strict';
  angular.module('cafeteria.components').directive('cafeDropdown', ["$document", "$timeout", function ($document, $timeout) {
    return {
      restrict: 'E',
      scope: {label:'@', options:'<', selected:'<', onSelect:'&'},
      template: "<div class=\"dropdown\"><span class=\"rotulo\" id=\"{{prefixo}}-rotulo\">{{label}}</span><button type=\"button\" class=\"dropdown-botao\" aria-labelledby=\"{{prefixo}}-rotulo {{prefixo}}-texto\" ng-click=\"aberto = !aberto\" ng-keydown=\"abrirTeclado($event)\" ng-attr-aria-expanded=\"{{aberto}}\" aria-controls=\"{{prefixo}}-lista\"><span id=\"{{prefixo}}-texto\">{{textoSelecionado()}}</span><span aria-hidden=\"true\">⌄</span></button><ul class=\"dropdown-lista\" id=\"{{prefixo}}-lista\" ng-show=\"aberto\" aria-labelledby=\"{{prefixo}}-rotulo\"><li ng-repeat=\"opcao in options track by opcao.value\"><button type=\"button\" ng-click=\"escolher(opcao)\" ng-class=\"{selecionado:selected === opcao.value}\" ng-attr-aria-current=\"{{selected === opcao.value ? 'true' : undefined}}\">{{opcao.label}}<span ng-if=\"selected === opcao.value\" aria-hidden=\"true\"> ✓</span></button></li></ul></div>",
      link: function (scope, element) {
        var focoTimer = null;
        scope.prefixo = 'dropdown-' + scope.$id;
        scope.aberto = false;
        scope.textoSelecionado = function () {
          var opcoes = scope.options || [];
          for (var i = 0; i < opcoes.length; i++) { if (opcoes[i].value === scope.selected) { return opcoes[i].label; } }
          return 'Selecione';
        };
        function focarBotao() { element[0].querySelector('.dropdown-botao').focus(); }
        scope.escolher = function (opcao) { scope.aberto = false; scope.onSelect({option:opcao}); focarBotao(); };
        scope.abrirTeclado = function (event) {
          if (event.key !== 'ArrowDown') { return; }
          event.preventDefault(); scope.aberto = true;
          if (focoTimer) { $timeout.cancel(focoTimer); }
          focoTimer = $timeout(function () {
            var botao = element[0].querySelector('.dropdown-lista button');
            if (scope.aberto && botao) { botao.focus(); }
            focoTimer = null;
          }, 0);
        };
        function fora(event) {
          if (scope.aberto && !element[0].contains(event.target)) { scope.$applyAsync(function () { scope.aberto = false; }); }
        }
        function tecla(event) {
          if (scope.aberto && event.key === 'Escape') {
            scope.$applyAsync(function () { scope.aberto = false; });
            if (element[0].contains(event.target)) { focarBotao(); }
          }
        }
        $document.on('click', fora); $document.on('focusin', fora); $document.on('keydown', tecla);
        scope.$on('$destroy', function () {
          $document.off('click', fora); $document.off('focusin', fora); $document.off('keydown', tecla);
          if (focoTimer) { $timeout.cancel(focoTimer); }
        });
      }
    };
  }]);
}());
