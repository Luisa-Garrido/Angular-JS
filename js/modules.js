(function () {
  'use strict';
  // Definidos antes dos arquivos que registram os componentes.
  angular.module('cafeteria.services', []);
  angular.module('cafeteria.filters', []);
  angular.module('cafeteria.components', ['cafeteria.services']);
  angular.module('cafeteria.controllers', ['cafeteria.services']);
}());
