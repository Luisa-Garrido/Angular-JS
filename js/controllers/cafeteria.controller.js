(function () {
  'use strict';
  angular.module('cafeteria.controllers').controller('CafeteriaController', [
    '$scope', '$interval', 'CardapioFactory', 'ToastService',
    function ($scope, $interval, CardapioFactory, ToastService) {
      var produtos = CardapioFactory.listarProdutos(), preparoTimer = null;
      $scope.ano = new Date().getFullYear();
      $scope.perguntas = CardapioFactory.listarPerguntas();
      $scope.categorias = [
        {id:'todos', titulo:'Todo o cardápio', conteudo:'Da primeira xícara ao último pedacinho: descubra os sabores da casa.'},
        {id:'cafes', titulo:'Cafés quentes', conteudo:'Aconchego em forma de café, preparado na hora para você.'},
        {id:'gelados', titulo:'Bebidas geladas', conteudo:'Affogatos e receitas geladas para uma pausa refrescante.'}
      ];
      $scope.ordenacoes = [
        {value:'destaques', label:'Destaques da casa'}, {value:'menor', label:'Menor preço'},
        {value:'maior', label:'Maior preço'}, {value:'nome', label:'Nome: A a Z'}
      ];
      $scope.filtros = {busca:'', categoria:'todos', ordem:'destaques'};
      $scope.paginacao = {atual:1, porPagina:6, total:1};
      $scope.carrinho = [];
      $scope.pedido = {emAndamento:false, progresso:0, status:'Pronto para escolher?'};

      function normalizar(texto) {
        var valor = String(texto || '').toLowerCase();
        return valor.normalize ? valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : valor;
      }
      function atualizarPagina() {
        var inicio = ($scope.paginacao.atual - 1) * $scope.paginacao.porPagina;
        $scope.paginaProdutos = $scope.filtrados.slice(inicio, inicio + $scope.paginacao.porPagina);
      }
      $scope.atualizarCardapio = function () {
        var termos = normalizar($scope.filtros.busca).trim().split(/\s+/);
        $scope.filtrados = produtos.filter(function (p) {
          var texto = normalizar(p.nome + ' ' + p.descricao + ' ' + p.rotulo);
          return ($scope.filtros.categoria === 'todos' || p.categoria === $scope.filtros.categoria) &&
            termos.every(function (termo) { return texto.indexOf(termo) >= 0; });
        });
        $scope.filtrados.sort(function (a, b) {
          switch ($scope.filtros.ordem) {
            case 'menor': return a.preco - b.preco || a.id - b.id;
            case 'maior': return b.preco - a.preco || a.id - b.id;
            case 'nome': return a.nome.localeCompare(b.nome, 'pt-BR');
            default: return Number(b.destaque) - Number(a.destaque) || a.id - b.id;
          }
        });
        // Filtra e ordena antes de calcular e aplicar a paginação.
        $scope.paginacao.total = Math.max(1, Math.ceil($scope.filtrados.length / $scope.paginacao.porPagina));
        $scope.paginacao.atual = 1;
        atualizarPagina();
      };
      $scope.selecionarCategoria = function (item) { $scope.filtros.categoria = item.id; $scope.atualizarCardapio(); };
      $scope.ordenar = function (option) { $scope.filtros.ordem = option.value; $scope.atualizarCardapio(); };
      $scope.limparBusca = function () { $scope.filtros.busca = ''; $scope.atualizarCardapio(); };
      $scope.mudarPagina = function (page) {
        if (page >= 1 && page <= $scope.paginacao.total) { $scope.paginacao.atual = page; atualizarPagina(); }
      };
      $scope.quantidadeItens = function () {
        return $scope.carrinho.reduce(function (soma, item) { return soma + item.quantidade; }, 0);
      };
      $scope.totalPedido = function () {
        // Soma em centavos para reduzir erros de precisão monetária.
        return $scope.carrinho.reduce(function (soma, item) {
          return soma + Math.round(item.produto.preco * 100) * item.quantidade;
        }, 0) / 100;
      };
      $scope.adicionar = function (produto) {
        if ($scope.pedido.emAndamento) { return; }
        if ($scope.pedido.progresso === 100) { $scope.pedido.progresso = 0; $scope.pedido.status = 'Monte uma nova pausa!'; }
        var item = $scope.carrinho.filter(function (linha) { return linha.produto.id === produto.id; })[0];
        if (item && item.quantidade >= 20) { ToastService.mostrar('Limite de 20 unidades por produto.', 'erro'); return; }
        if (item) { item.quantidade++; } else { $scope.carrinho.push({produto:produto, quantidade:1}); }
        ToastService.mostrar(produto.nome + ' adicionado ao pedido!', 'sucesso');
      };
      $scope.remover = function (item) {
        if ($scope.pedido.emAndamento) { return; }
        var indice = $scope.carrinho.indexOf(item);
        if (indice >= 0) { $scope.carrinho.splice(indice, 1); ToastService.mostrar('Produto removido.', 'info'); }
      };
      $scope.alterarQuantidade = function (item, diferenca) {
        if ($scope.pedido.emAndamento) { return; }
        if (item.quantidade + diferenca > 20) { ToastService.mostrar('Limite de 20 unidades por produto.', 'erro'); return; }
        item.quantidade += diferenca;
        if (item.quantidade <= 0) { $scope.remover(item); }
      };
      $scope.finalizarPedido = function () {
        if ($scope.pedido.emAndamento) { return; }
        if (!$scope.carrinho.length) { ToastService.mostrar('Adicione um produto antes de simular.', 'erro'); return; }
        $scope.pedido.emAndamento = true;
        $scope.pedido.progresso = 0;
        $scope.pedido.status = 'Pedido recebido — simulação';
        ToastService.mostrar('Simulação iniciada. Vamos preparar sua pausa!', 'info');
        preparoTimer = $interval(function () {
          $scope.pedido.progresso = Math.min(100, $scope.pedido.progresso + 10);
          var valor = $scope.pedido.progresso;
          $scope.pedido.status = valor < 40 ? 'Separando os ingredientes…' : (valor < 80 ? 'Preparando com carinho…' : 'Finalizando os detalhes…');
          if (valor === 100) {
            $interval.cancel(preparoTimer); preparoTimer = null;
            $scope.pedido.emAndamento = false;
            $scope.pedido.status = 'Tudo pronto! Simulação concluída.';
            $scope.carrinho.length = 0;
            ToastService.mostrar('Sua pausa está pronta! Este foi um pedido demonstrativo.', 'sucesso', 6000);
          }
        }, 650);
      };
      $scope.$on('$destroy', function () { if (preparoTimer) { $interval.cancel(preparoTimer); } });
      $scope.atualizarCardapio();
    }
  ]);
}());
