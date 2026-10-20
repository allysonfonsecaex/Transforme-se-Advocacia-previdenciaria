/* Páginas de artigos:
   - artigos.html  -> lista com busca e filtros (elemento #lista-artigos)
   - artigo.html   -> um artigo, escolhido por ?slug=... (elemento #artigo-conteudo) */
(function () {
  'use strict';
  var LEX = window.LEX;
  if (!LEX || !LEX.logica) return;
  var L = LEX.logica, esc = LEX.esc;

  /* ====================== LISTA ====================== */
  var lista = document.getElementById('lista-artigos');
  if (lista) {
    var campo = document.getElementById('busca-artigos');
    var contagem = document.getElementById('contagem-artigos');
    var botoesTipo = document.querySelectorAll('[data-filtro-tipo]');
    var chipsBox = document.getElementById('chips-tags');
    var filtro = { tipo: 'todos', tag: '', texto: '' };
    var todos = L.artigosVisiveis();

    // tags mais usadas viram atalhos de filtro
    var contagemTags = {};
    todos.forEach(function (a) { (a.tags || []).forEach(function (t) { contagemTags[t] = (contagemTags[t] || 0) + 1; }); });
    var tagsOrdenadas = Object.keys(contagemTags).sort(function (a, b) { return contagemTags[b] - contagemTags[a] || a.localeCompare(b); }).slice(0, 10);
    chipsBox.innerHTML = tagsOrdenadas.map(function (t) {
      return '<button type="button" class="chip" data-tag="' + esc(t) + '" aria-pressed="false">' + esc(t) + '</button>';
    }).join('');

    function aplicar() {
      var termos = L.normalizar(filtro.texto);
      var itens = todos.filter(function (a) {
        if (filtro.tipo !== 'todos' && a.tipo !== filtro.tipo) return false;
        if (filtro.tag && (a.tags || []).indexOf(filtro.tag) === -1) return false;
        if (termos) {
          var palha = L.normalizar(a.titulo + ' ' + a.resumo + ' ' + (a.tags || []).join(' ') + ' ' + L.textoSimples(a.corpo));
          return termos.split(' ').every(function (t) { return palha.indexOf(t) !== -1; });
        }
        return true;
      });
      if (!itens.length) {
        lista.innerHTML = '<p class="vazio">Nenhum conteúdo encontrado com esses filtros. Tente outro termo ou <a href="../CentralLex/central.html#pesquisa">pesquise em todo o site</a>.</p>';
      } else {
        lista.innerHTML = itens.map(LEX.cartaoArtigo).join('');
      }
      contagem.textContent = itens.length === 1 ? '1 conteúdo encontrado.' : itens.length + ' conteúdos encontrados.';
    }

    campo.addEventListener('input', function () { filtro.texto = campo.value; aplicar(); });
    Array.prototype.forEach.call(botoesTipo, function (b) {
      b.addEventListener('click', function () {
        filtro.tipo = b.getAttribute('data-filtro-tipo');
        Array.prototype.forEach.call(botoesTipo, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        aplicar();
      });
    });
    chipsBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tag]');
      if (!b) return;
      var mesma = filtro.tag === b.getAttribute('data-tag');
      filtro.tag = mesma ? '' : b.getAttribute('data-tag');
      Array.prototype.forEach.call(chipsBox.querySelectorAll('[data-tag]'), function (x) {
        x.setAttribute('aria-pressed', String(!mesma && x === b));
      });
      aplicar();
    });

    aplicar();
  }

  /* ====================== ARTIGO ====================== */
  var caixa = document.getElementById('artigo-conteudo');
  if (caixa) {
    var slug = new URLSearchParams(window.location.search).get('slug');
    var artigo = L.artigosVisiveis().filter(function (a) { return a.slug === slug; })[0];
    var trilha = document.getElementById('trilha-atual');

    if (!artigo) {
      document.title = 'Conteúdo não encontrado | Taís Almeida Advocacia Previdenciária';
      trilha.textContent = 'Não encontrado';
      caixa.innerHTML =
        '<h1>Conteúdo não encontrado</h1>' +
        '<p>O endereço pode estar incorreto ou o conteúdo ainda não foi publicado.</p>' +
        '<p><a class="lex-btn" href="artigos.html">Ver todos os artigos</a></p>';
    } else {
      document.title = artigo.titulo + ' | Taís Almeida Advocacia Previdenciária';
      trilha.textContent = artigo.titulo;

      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', artigo.resumo || '');

      var url = window.location.href;
      var tagsHtml = (artigo.tags || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      var textoCompartilhar = encodeURIComponent(artigo.titulo + ' ' + url);

      caixa.innerHTML =
        '<header class="artigo-topo">' +
        '<p class="artigo-selo">' + (artigo.tipo === 'noticia' ? 'Notícia' : 'Artigo') + '</p>' +
        '<h1>' + esc(artigo.titulo) + '</h1>' +
        '<p class="artigo-data"><time datetime="' + esc(artigo.data) + '">' + L.dataBR(artigo.data) + '</time></p>' +
        (tagsHtml ? '<ul class="artigo-tags" aria-label="Temas">' + tagsHtml + '</ul>' : '') +
        '</header>' +
        '<div class="artigo-corpo">' + artigo.corpo + '</div>' +
        '<footer class="artigo-rodape nao-imprimir">' +
        '<p class="artigo-cta">Ficou com dúvida sobre o seu caso? <a href="' + esc(LEX.config.whatsapp) + '" target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp</a> ou <a href="../index.html#duvidas-form">envie sua dúvida</a>.</p>' +
        '<div class="artigo-compartilhar">' +
        '<a class="lex-btn lex-btn-sec" href="https://wa.me/?text=' + textoCompartilhar + '" target="_blank" rel="noopener noreferrer">Compartilhar no WhatsApp</a>' +
        '<button type="button" class="lex-btn lex-btn-sec" id="copiar-link">Copiar link</button>' +
        '<button type="button" class="lex-btn lex-btn-sec" id="imprimir-artigo">Imprimir</button>' +
        '</div><p id="copiar-status" class="status-copia" role="status" aria-live="polite"></p>' +
        '</footer>';

      document.getElementById('imprimir-artigo').addEventListener('click', function () { window.print(); });
      document.getElementById('copiar-link').addEventListener('click', function () {
        var status = document.getElementById('copiar-status');
        function ok() { status.textContent = 'Link copiado.'; }
        function falhou() { status.textContent = 'Não foi possível copiar. Copie o endereço na barra do navegador.'; }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(ok, falhou);
        else falhou();
      });

      // dados estruturados para buscadores
      try {
        var ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: artigo.titulo,
          datePublished: artigo.data,
          description: artigo.resumo,
          author: { '@type': 'Person', name: 'Taís Almeida' }
        });
        document.head.appendChild(ld);
      } catch (e) { }

      // relacionados: mesmas tags
      var rel = L.artigosVisiveis().filter(function (a) {
        return a.slug !== artigo.slug && (a.tags || []).some(function (t) { return (artigo.tags || []).indexOf(t) !== -1; });
      }).slice(0, 3);
      if (!rel.length) {
        rel = L.artigosVisiveis().filter(function (a) { return a.slug !== artigo.slug; }).slice(0, 3);
      }
      var boxRel = document.getElementById('artigo-relacionados');
      if (rel.length && boxRel) {
        document.getElementById('relacionados-grade').innerHTML = rel.map(LEX.cartaoArtigo).join('');
        boxRel.hidden = false;
      }
    }
  }
})();
