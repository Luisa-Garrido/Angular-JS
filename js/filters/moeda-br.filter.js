(function () {
  'use strict';
  angular.module('cafeteria.filters').filter('moedaBR', ['$filter', function ($filter) {
    return function (valor) {
      var numero = Number(valor);
      return $filter('currency')(isFinite(numero) ? numero : 0, 'R$ ', 2);
    };
  }]);
}());
