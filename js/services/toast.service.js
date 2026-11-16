(function () {
  'use strict';
  angular.module('cafeteria.services').service('ToastService', ['$timeout', function ($timeout) {
    var self = this, proximoId = 0, timers = {};
    self.notificacoes = [];
    self.fechar = function (id) {
      if (timers[id]) { $timeout.cancel(timers[id]); delete timers[id]; }
      for (var i = self.notificacoes.length - 1; i >= 0; i--) {
        if (self.notificacoes[i].id === id) { self.notificacoes.splice(i, 1); }
      }
    };
    self.mostrar = function (mensagem, tipo, duracao) {
      if (self.notificacoes.length >= 3) { self.fechar(self.notificacoes[0].id); }
      var id = ++proximoId;
      self.notificacoes.push({id: id, mensagem: mensagem,
        tipo: ['sucesso', 'erro', 'info'].indexOf(tipo) >= 0 ? tipo : 'info'});
      timers[id] = $timeout(function () { self.fechar(id); }, duracao || 4200);
    };
  }]);
}());
