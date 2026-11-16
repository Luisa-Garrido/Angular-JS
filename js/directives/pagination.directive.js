(function () {
  'use strict';
  angular.module('cafeteria.components').directive('cafePagination', function () {
    return {
      restrict: 'E',
      scope: {totalPages:'<', currentPage:'<', onChange:'&'},
      template: "<nav class=\"paginacao\" ng-if=\"totalPages > 1\" aria-label=\"Paginação do cardápio\"><button type=\"button\" ng-click=\"ir(currentPage - 1)\" ng-disabled=\"currentPage <= 1\" aria-label=\"Página anterior\">← Anterior</button><button type=\"button\" ng-repeat=\"pagina in paginas track by pagina\" ng-click=\"ir(pagina)\" ng-class=\"{ativo:currentPage === pagina}\" ng-attr-aria-current=\"{{currentPage === pagina ? 'page' : undefined}}\" aria-label=\"Página {{pagina}}\">{{pagina}}</button><button type=\"button\" ng-click=\"ir(currentPage + 1)\" ng-disabled=\"currentPage >= totalPages\" aria-label=\"Próxima página\">Próxima →</button></nav>",
      link: function (scope) {
        scope.paginas = [];
        scope.$watch('totalPages', function (total) {
          scope.paginas = [];
          for (var i = 1; i <= Number(total || 0); i++) { scope.paginas.push(i); }
        });
        scope.ir = function (pagina) {
          if (pagina >= 1 && pagina <= scope.totalPages && pagina !== scope.currentPage) { scope.onChange({page:pagina}); }
        };
      }
    };
  });
}());
