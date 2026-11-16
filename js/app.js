(function () {
  'use strict';
  // Módulo principal da aplicação.
  angular.module('cafeteriaApp', [
    'ngLocale', 'cafeteria.services', 'cafeteria.filters',
    'cafeteria.components', 'cafeteria.controllers'
  ]);
}());
