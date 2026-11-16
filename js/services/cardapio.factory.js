(function () {
  'use strict';
  angular.module('cafeteria.services').factory('CardapioFactory', function () {
    // Fonte privada: os consumidores recebem cópias dos dados.
    var produtos = [
  {
    "id": 1,
    "nome": "Affogato",
    "descricao": "Espresso + Sorvete de Baunilha",
    "categoria": "gelados",
    "preco": 22,
    "imagem": "assets/menu/01-affogato.png",
    "destaque": true,
    "rotulo": "Bebidas geladas",
    "cor": "areia"
  },
  {
    "id": 2,
    "nome": "Americano",
    "descricao": "Espresso + Água quente",
    "categoria": "cafes",
    "preco": 10,
    "imagem": "assets/menu/02-americano.png",
    "destaque": true,
    "rotulo": "Cafés quentes",
    "cor": "rosa"
  },
  {
    "id": 3,
    "nome": "ChocoLatte",
    "descricao": "Espresso + Xarope de Chocolate + Leite vaporizado",
    "categoria": "cafes",
    "preco": 16,
    "imagem": "assets/menu/03-chocolatte.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "salvia"
  },
  {
    "id": 4,
    "nome": "Espresso",
    "descricao": "Dose de café puro",
    "categoria": "cafes",
    "preco": 8,
    "imagem": "assets/menu/04-espresso.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "cacau"
  },
  {
    "id": 5,
    "nome": "Latte",
    "descricao": "Leite vaporizado + Espresso",
    "categoria": "cafes",
    "preco": 14,
    "imagem": "assets/menu/05-latte.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "areia"
  },
  {
    "id": 6,
    "nome": "Botão de Lavanda",
    "descricao": "Espresso + Xarope de Lavanda + Água quente + Granulado + Fatias de morango",
    "categoria": "cafes",
    "preco": 18,
    "imagem": "assets/menu/06-botao-de-lavanda.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "rosa"
  },
  {
    "id": 7,
    "nome": "Latte de Lavanda",
    "descricao": "Espresso + Xarope de Lavanda + Leite vaporizado",
    "categoria": "cafes",
    "preco": 18,
    "imagem": "assets/menu/07-latte-de-lavanda.png",
    "destaque": true,
    "rotulo": "Cafés quentes",
    "cor": "salvia"
  },
  {
    "id": 8,
    "nome": "Latte de Menta",
    "descricao": "Espresso + Xarope de Menta + Leite vaporizado",
    "categoria": "cafes",
    "preco": 18,
    "imagem": "assets/menu/08-latte-de-menta.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "cacau"
  },
  {
    "id": 9,
    "nome": "Mocha",
    "descricao": "Espresso + Xarope de Chocolate + Leite vaporizado + Chantilly + Cacau em pó",
    "categoria": "cafes",
    "preco": 19,
    "imagem": "assets/menu/09-mocha.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "areia"
  },
  {
    "id": 10,
    "nome": "Napolitano",
    "descricao": "Purê de Morango + Espresso + Xarope de Chocolate + Leite integral + Chantilly + Fatias de morango + Gotas de chocolate + Fava de Baunilha",
    "categoria": "gelados",
    "preco": 24,
    "imagem": "assets/menu/10-napolitano.png",
    "destaque": false,
    "rotulo": "Bebidas geladas",
    "cor": "rosa"
  },
  {
    "id": 11,
    "nome": "Latte de Laranja",
    "descricao": "Espresso + Xarope de Laranja + Leite vaporizado",
    "categoria": "cafes",
    "preco": 18,
    "imagem": "assets/menu/11-latte-de-laranja.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "salvia"
  },
  {
    "id": 12,
    "nome": "Rosa-Choque",
    "descricao": "Espresso + Xarope de Morango + Leite integral + Chantilly + Fatias de morango",
    "categoria": "gelados",
    "preco": 22,
    "imagem": "assets/menu/12-rosa-choque.png",
    "destaque": false,
    "rotulo": "Bebidas geladas",
    "cor": "cacau"
  },
  {
    "id": 13,
    "nome": "Affogato de Morango",
    "descricao": "Espresso + Xarope de Morango + Leite vaporizado + Sorvete de Morango + Fatias de Morango",
    "categoria": "gelados",
    "preco": 26,
    "imagem": "assets/menu/13-affogato-de-morango.png",
    "destaque": true,
    "rotulo": "Bebidas geladas",
    "cor": "areia"
  },
  {
    "id": 14,
    "nome": "Latte de Morango",
    "descricao": "Espresso + Xarope de morango + Leite vaporizado",
    "categoria": "cafes",
    "preco": 18,
    "imagem": "assets/menu/14-latte-de-morango.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "rosa"
  },
  {
    "id": 15,
    "nome": "VelociDoce",
    "descricao": "Espresso + Xarope de Baunilha + Xarope de Morango + Leite integral + Granulado",
    "categoria": "gelados",
    "preco": 23,
    "imagem": "assets/menu/15-velocidoce.png",
    "destaque": false,
    "rotulo": "Bebidas geladas",
    "cor": "salvia"
  },
  {
    "id": 16,
    "nome": "Despedida de verão",
    "descricao": "Purê de abóbora + Xarope de Morango + Leite integral + Sorvete de Morango + Cereja",
    "categoria": "gelados",
    "preco": 26,
    "imagem": "assets/menu/16-despedida-de-verao.png",
    "destaque": false,
    "rotulo": "Bebidas geladas",
    "cor": "cacau"
  },
  {
    "id": 17,
    "nome": "Affogato de Baunilha",
    "descricao": "Espresso + Xarope de Baunilha + Leite vaporizado + Sorvete de Baunilha + Flor de Baunilha + Fava de baunilha",
    "categoria": "gelados",
    "preco": 25,
    "imagem": "assets/menu/17-afogatto-de-baunilha.png",
    "destaque": false,
    "rotulo": "Bebidas geladas",
    "cor": "areia"
  },
  {
    "id": 18,
    "nome": "Latte de Baunilha",
    "descricao": "Espresso + Xarope de Baunilha + Leite vaporizado",
    "categoria": "cafes",
    "preco": 18,
    "imagem": "assets/menu/18-latte-de-baunilha.png",
    "destaque": false,
    "rotulo": "Cafés quentes",
    "cor": "rosa"
  }
];
    var perguntas = [
  {
    "titulo": "Vocês têm opções sem lactose?",
    "conteudo": "Nesta cafeteria fictícia, alguns cafés podem ser preparados com bebida vegetal. Confirme disponibilidade, preço e alergênicos com a equipe. Isso não garante ausência de traços de leite."
  },
  {
    "titulo": "Posso levar meu café para viagem?",
    "conteudo": "Sim! Na proposta da Good Coffee, Great Coffee, as bebidas do cardápio podem ser embaladas para viagem. Os pedidos deste site são apenas uma demonstração."
  },
  {
    "titulo": "Como funciona o pedido pelo site?",
    "conteudo": "Adicione produtos, ajuste as quantidades e clique em Simular pedido. A barra demonstra o preparo. Nenhum pedido ou pagamento real é enviado."
  },
  {
    "titulo": "O espaço tem Wi-Fi?",
    "conteudo": "Na nossa cafeteria fictícia, sim: um ambiente acolhedor para estudar, trabalhar um pouquinho ou colocar a conversa em dia."
  }
];
    return {
      listarProdutos: function () { return angular.copy(produtos); },
      listarPerguntas: function () { return angular.copy(perguntas); }
    };
  });
}());
