(function () {
  'use strict';
  angular.module('cafeteria.components').directive('cafeToast', ["ToastService", function (ToastService) {
    return {
      restrict: 'E',
      scope: {},
      template: "<div class=\"toasts\" aria-live=\"polite\" aria-atomic=\"false\" aria-relevant=\"additions\"><div class=\"toast\" ng-repeat=\"toast in notificacoes track by toast.id\" ng-class=\"toast.tipo\"><span class=\"toast-icone\" aria-hidden=\"true\">{{toast.tipo === 'erro' ? '!' : (toast.tipo === 'sucesso' ? '✓' : 'i')}}</span><p><strong>{{toast.tipo === 'erro' ? 'Atenção' : (toast.tipo === 'sucesso' ? 'Tudo certo' : 'Informação')}}</strong>{{toast.mensagem}}</p><button type=\"button\" ng-click=\"fechar(toast.id)\" aria-label=\"Fechar notificação\">×</button></div></div>",
      link: function (scope) {
        scope.notificacoes = ToastService.notificacoes;
        scope.fechar = ToastService.fechar;
      }
    };
  }]);
}());
