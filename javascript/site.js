/* Comportamentos comuns a todas as páginas:
   - monta os cartões de "últimas notícias e artigos" (home) e a lista do rodapé
   - faz o ícone de busca do cabeçalho abrir a pesquisa da Central Lex
   Cada página informa onde está pela marca <body data-raiz="../"> (subpastas)
   ou sem a marca (página inicial). */
(function () {
  'use strict';
  var LEX = window.LEX;
  if (!LEX || !LEX.logica) return;
  var L = LEX.logica;
  var raiz = document.body.getAttribute('data-raiz') || '';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function urlArtigo(a) { return raiz + 'ArtigosHtml/artigo.html?slug=' + encodeURIComponent(a.slug); }

  function cartao(a) {
    var img = a.imagem || LEX.config.imagemPadrao;
    return '<article class="noticia-card">' +
      '<img src="' + esc(img) + '" alt="' + esc(a.imagemAlt || '') + '" loading="lazy" decoding="async">' +
      '<div class="noticia-conteudo">' +
      '<span class="data-noticia">' + L.dataBR(a.data) + '</span>' +
      '<h3>' + esc(a.titulo) + '</h3>' +
      '<p>' + esc(a.resumo) + '</p>' +
      '<a href="' + urlArtigo(a) + '" class="btn-ler-mais">Ler ' + (a.tipo === 'noticia' ? 'notícia' : 'artigo') + ' completo &rarr;</a>' +
      '</div></article>';
  }

  window.LEX.cartaoArtigo = cartao;
  window.LEX.urlArtigo = urlArtigo;
  window.LEX.esc = esc;

  function montarAutomaticos() {
    var visiveis = L.artigosVisiveis();

    var grades = document.querySelectorAll('[data-auto="ultimas"]');
    for (var i = 0; i < grades.length; i++) {
      var qtd = parseInt(grades[i].getAttribute('data-qtd'), 10) || 2;
      grades[i].innerHTML = visiveis.slice(0, qtd).map(cartao).join('');
    }

    var rodapes = document.querySelectorAll('[data-auto="rodape"]');
    for (var j = 0; j < rodapes.length; j++) {
      rodapes[j].innerHTML = visiveis.slice(0, 2).map(function (a) {
        return '<div class="noticia-item"><span class="data-noticia">' + L.dataBR(a.data) + '</span>' +
          '<p><a href="' + urlArtigo(a) + '">' + esc(a.titulo) + '</a></p></div>';
      }).join('');
    }
  }

  function ligarBuscaDoCabecalho() {
    var lupa = document.querySelector('.buscar');
    if (!lupa) return;
    lupa.style.cursor = 'pointer';
    lupa.addEventListener('click', function () {
      window.location.href = raiz + 'CentralLex/central.html#pesquisa';
    });
  }

  montarAutomaticos();
  ligarBuscaDoCabecalho();
})();
