/* Acessibilidade LexWeb
 * Funciona com os botões [data-acao] do painel .lex-acessibilidade.
 * Ações: diminuir, normal, aumentar, noturno, contraste, espacamento,
 *        links, ler, parar, restaurar.
 */
(function () {
  'use strict';

  var CHAVE = 'lexAcessibilidade';
  var PASSO_MIN = -2;
  var PASSO_MAX = 5;
  var INCREMENTO = 0.1; // 10% por clique

  var html = document.documentElement;
  var estado = {
    passo: 0,
    noturno: false,
    contraste: false,
    espacamento: false,
    links: false
  };

  var statusEl = null;
  var sintese = window.speechSynthesis || null;
  var timerResize = null;

  /* ---------- utilidades ---------- */

  function avisar(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function carregarEstado() {
    try {
      var salvo = JSON.parse(localStorage.getItem(CHAVE));
      if (!salvo) return;
      if (typeof salvo.passo === 'number') {
        estado.passo = Math.max(PASSO_MIN, Math.min(PASSO_MAX, Math.round(salvo.passo)));
      }
      ['noturno', 'contraste', 'espacamento', 'links'].forEach(function (k) {
        if (typeof salvo[k] === 'boolean') estado[k] = salvo[k];
      });
      if (estado.noturno && estado.contraste) estado.noturno = false;
    } catch (e) { /* localStorage indisponível: segue sem salvar */ }
  }

  function salvarEstado() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { }
  }

  /* ---------- tamanho do texto ---------- */
  var IGNORAR = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, LINK: 1, META: 1, HEAD: 1, TITLE: 1, BR: 1 };

  function limparFonte() {
    var marcados = document.querySelectorAll('[data-lex-fs]');
    for (var i = 0; i < marcados.length; i++) {
      var el = marcados[i];
      var original = el.getAttribute('data-lex-fs');
      if (original === '-') el.style.removeProperty('font-size');
      else el.style.fontSize = original;
      el.removeAttribute('data-lex-fs');
    }
  }

  function aplicarFonte() {
    limparFonte();
    if (estado.passo === 0) return;

    var fator = 1 + estado.passo * INCREMENTO;
    var todos = document.body.querySelectorAll('*');
    var lista = [];

    for (var i = 0; i < todos.length; i++) {
      var el = todos[i];
      if (IGNORAR[el.tagName]) continue;
      if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml') continue;
      if (el.closest('[vw]')) continue;
      var px = parseFloat(window.getComputedStyle(el).fontSize);
      if (px) lista.push([el, px]);
    }

    for (var j = 0; j < lista.length; j++) {
      var item = lista[j];
      item[0].setAttribute('data-lex-fs', item[0].style.fontSize || '-');
      item[0].style.setProperty('font-size', (item[1] * fator).toFixed(2) + 'px', 'important');
    }
  }

  function mudarFonte(acao) {
    var antes = estado.passo;
    if (acao === 'normal') estado.passo = 0;
    else if (acao === 'aumentar') estado.passo = Math.min(PASSO_MAX, estado.passo + 1);
    else if (acao === 'diminuir') estado.passo = Math.max(PASSO_MIN, estado.passo - 1);

    if (estado.passo === antes && acao !== 'normal') {
      avisar(acao === 'aumentar' ? 'Tamanho máximo do texto atingido.' : 'Tamanho mínimo do texto atingido.');
      return;
    }
    aplicarFonte();
    avisar('Tamanho do texto: ' + Math.round((1 + estado.passo * INCREMENTO) * 100) + '%.');
  }

  /* ---------- modos visuais ---------- */

  function botao(acao) {
    return document.querySelector('[data-acao="' + acao + '"]');
  }

  function aplicarClasses() {
    html.classList.toggle('lex-noturno', estado.noturno);
    html.classList.toggle('lex-contraste', estado.contraste);
    html.classList.toggle('lex-espacamento', estado.espacamento);
    html.classList.toggle('lex-links', estado.links);

    ['noturno', 'contraste', 'espacamento', 'links'].forEach(function (k) {
      var b = botao(k);
      if (b) b.setAttribute('aria-pressed', String(estado[k]));
    });
  }

  var NOMES = {
    noturno: 'Modo noturno',
    contraste: 'Alto contraste',
    espacamento: 'Espaçamento do texto',
    links: 'Destaque de links'
  };

  function alternar(modo) {
    estado[modo] = !estado[modo];
    if (modo === 'noturno' && estado.noturno) estado.contraste = false;
    if (modo === 'contraste' && estado.contraste) estado.noturno = false;
    aplicarClasses();
    avisar(NOMES[modo] + (estado[modo] ? ' ativado.' : ' desativado.'));
  }

  /* ---------- leitura em voz alta ---------- */

  function coletarTexto() {
    var partes = [];
    var ultimoBloco = null;
    var raizes = [document.querySelector('main'), document.querySelector('footer')];
    var BLOCOS = 'h1,h2,h3,h4,h5,h6,p,li,label,button,a,figcaption,td,th,blockquote';

    raizes.forEach(function (raiz) {
      if (!raiz) return;
      var walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
        acceptNode: function (no) {
          var pai = no.parentElement;
          if (!pai) return NodeFilter.FILTER_REJECT;
          if (!no.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (pai.closest('script,style,noscript,.lex-acessibilidade,[aria-hidden="true"],[vw]')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      while (walker.nextNode()) {
        var no = walker.currentNode;
        var texto = no.nodeValue.replace(/\s+/g, ' ').trim();
        var bloco = no.parentElement.closest(BLOCOS) || no.parentElement;
        if (bloco !== ultimoBloco && partes.length) {
          var ult = partes[partes.length - 1];
          if (!/[.!?:;,]$/.test(ult)) partes[partes.length - 1] = ult + '.';
        }
        partes.push(texto);
        ultimoBloco = bloco;
      }
    });
    return partes.join(' ');
  }

  function dividir(texto) {
    var frases = texto.match(/[^.!?]+[.!?]*\s*/g) || [];
    var pedacos = [];
    var atual = '';
    frases.forEach(function (f) {
      if ((atual + f).length > 180 && atual) {
        pedacos.push(atual.trim());
        atual = '';
      }
      atual += f;
    });
    if (atual.trim()) pedacos.push(atual.trim());
    return pedacos;
  }

  function escolherVoz() {
    var vozes = sintese.getVoices ? sintese.getVoices() : [];
    for (var i = 0; i < vozes.length; i++) {
      if (/^pt[-_]BR$/i.test(vozes[i].lang)) return vozes[i];
    }
    for (var j = 0; j < vozes.length; j++) {
      if (/^pt/i.test(vozes[j].lang)) return vozes[j];
    }
    return null;
  }

  function parar(silencioso) {
    if (sintese) sintese.cancel();
    if (!silencioso) avisar('Leitura interrompida.');
  }

  function ler() {
    if (!sintese || typeof window.SpeechSynthesisUtterance === 'undefined') {
      avisar('Seu navegador não oferece leitura em voz alta.');
      return;
    }
    parar(true);

    var pedacos = dividir(coletarTexto());
    if (!pedacos.length) {
      avisar('Não encontrei texto para ler nesta página.');
      return;
    }

    var voz = escolherVoz();
    pedacos.forEach(function (p, i) {
      var fala = new window.SpeechSynthesisUtterance(p);
      fala.lang = 'pt-BR';
      if (voz) fala.voice = voz;
      fala.onerror = function (e) {
        if (e.error === 'canceled' || e.error === 'interrupted') return;
        avisar('Não foi possível ler a página neste navegador.');
      };
      if (i === pedacos.length - 1) {
        fala.onend = function () { avisar('Leitura concluída.'); };
      }
      sintese.speak(fala);
    });
    avisar('Lendo a página. Use "Parar leitura" para interromper.');
  }

  function restaurar() {
    estado.passo = 0;
    estado.noturno = false;
    estado.contraste = false;
    estado.espacamento = false;
    estado.links = false;
    parar(true);
    aplicarFonte();
    aplicarClasses();
    avisar('Configurações de acessibilidade restauradas.');
  }

  function aoClicar(evento) {
    var alvo = evento.target.closest ? evento.target.closest('[data-acao]') : null;
    if (!alvo) return;
    var acao = alvo.getAttribute('data-acao');

    switch (acao) {
      case 'aumentar':
      case 'diminuir':
      case 'normal':
        mudarFonte(acao); break;
      case 'noturno':
      case 'contraste':
      case 'espacamento':
      case 'links':
        alternar(acao); break;
      case 'ler': ler(); return;
      case 'parar': parar(false); return;
      case 'restaurar': restaurar(); break;
      default: return;
    }
    salvarEstado();
  }

  function melhorarTeclado() {
    var main = document.querySelector('main');
    if (main) {
      if (!main.id) main.id = 'conteudo-principal';
      main.setAttribute('tabindex', '-1');
      var pular = document.createElement('a');
      pular.className = 'lex-pular';
      pular.href = '#' + main.id;
      pular.textContent = 'Pular para o conteúdo principal';
      document.body.insertBefore(pular, document.body.firstChild);
    }

    var falsos = document.querySelectorAll('[role="button"]:not(button):not(a)');
    for (var i = 0; i < falsos.length; i++) {
      (function (el) {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
          }
        });
      })(falsos[i]);
    }
  }

  /* ---------- Modificado para Abrir/Fechar o Painel ---------- */
  function criarBotaoFlutuante() {
    var painel = document.querySelector('.lex-acessibilidade');
    if (!painel) return;

    // Garante que o painel comece oculto se você quiser estilo "pop-up/gaveta"
    painel.classList.add('lex-painel-fechado');

    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'lex-ac-flutuante';
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-label', 'Abrir menu de acessibilidade');
    b.innerHTML = '<span aria-hidden="true">&#9855;</span> Acessibilidade';

    b.addEventListener('click', function () {
      var aberto = painel.classList.toggle('lex-painel-aberto');
      painel.classList.toggle('lex-painel-fechado', !aberto);
      
      b.setAttribute('aria-expanded', String(aberto));
      b.setAttribute('aria-label', aberto ? 'Fechar menu de acessibilidade' : 'Abrir menu de acessibilidade');

      if (aberto) {
        var primeiro = painel.querySelector('button, [tabindex="0"]');
        if (primeiro) primeiro.focus();
      }
    });

    document.body.appendChild(b);
  }

  function carregarVLibras() {
    if (document.querySelector('[vw]')) return;
    var w = document.createElement('div');
    w.setAttribute('vw', '');
    w.className = 'enabled';
    w.innerHTML =
      '<div vw-access-button class="active"></div>' +
      '<div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
    document.body.appendChild(w);

    var s = document.createElement('script');
    s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    s.onload = function () {
      try { new window.VLibras.Widget('https://vlibras.gov.br/app'); } catch (e) { }
    };
    document.body.appendChild(s);
  }

  function iniciar() {
    statusEl = document.getElementById('lex-ac-status');
    carregarEstado();
    aplicarClasses();
    aplicarFonte();
    melhorarTeclado();
    criarBotaoFlutuante();
    carregarVLibras();

    document.addEventListener('click', aoClicar);

    window.addEventListener('resize', function () {
      if (estado.passo === 0) return;
      clearTimeout(timerResize);
      timerResize = setTimeout(aplicarFonte, 250);
    });

    window.addEventListener('beforeunload', function () { parar(true); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();