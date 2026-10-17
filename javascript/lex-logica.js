/* Central Lex: guia de documentos, calculadoras, assistente,
   organizador de pendências e pesquisa. */
(function () {
  'use strict';
  var LEX = window.LEX;
  if (!LEX || !LEX.logica || !LEX.guia || !LEX.assistente) return;
  var L = LEX.logica, esc = LEX.esc;
  var RAIZ = '../';

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function plural(n, um, varios) { return n + ' ' + (n === 1 ? um : varios); }
  function situacao(id) {
    return LEX.guia.situacoes.filter(function (s) { return s.id === id; })[0] || LEX.guia.situacoes[0];
  }
  function preencherSituacoes(sel) {
    sel.innerHTML = LEX.guia.situacoes.map(function (s) {
      return '<option value="' + esc(s.id) + '">' + esc(s.nome) + '</option>';
    }).join('');
  }

  /* ============================ ABAS ============================ */
  var NOMES = ['guia', 'calculadoras', 'assistente', 'pendencias', 'pesquisa'];
  var abas = NOMES.map(function (n) { return $('#aba-' + n); });
  var paineis = NOMES.map(function (n) { return $('#painel-' + n); });

  function abrirPainel(nome, opcoes) {
    opcoes = opcoes || {};
    if (NOMES.indexOf(nome) === -1) nome = 'guia';
    NOMES.forEach(function (n, i) {
      var ativa = n === nome;
      abas[i].setAttribute('aria-selected', String(ativa));
      abas[i].tabIndex = ativa ? 0 : -1;
      paineis[i].hidden = !ativa;
    });
    if (opcoes.hash !== false) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search + '#' + nome); } catch (e) { }
    }
    if (opcoes.foco) {
      var alvo = $('#painel-' + nome + ' h2');
      if (alvo) { alvo.setAttribute('tabindex', '-1'); alvo.focus(); }
      if (alvo && alvo.scrollIntoView) alvo.scrollIntoView({ block: 'start' });
    }
  }

  abas.forEach(function (aba, i) {
    aba.addEventListener('click', function () { abrirPainel(NOMES[i]); });
    aba.addEventListener('keydown', function (e) {
      var novo = null;
      if (e.key === 'ArrowRight') novo = (i + 1) % NOMES.length;
      else if (e.key === 'ArrowLeft') novo = (i - 1 + NOMES.length) % NOMES.length;
      else if (e.key === 'Home') novo = 0;
      else if (e.key === 'End') novo = NOMES.length - 1;
      if (novo === null) return;
      e.preventDefault();
      abrirPainel(NOMES[novo]);
      abas[novo].focus();
    });
  });
  window.addEventListener('hashchange', function () {
    abrirPainel(window.location.hash.replace('#', ''), { hash: false });
  });

  /* ============================ 1. GUIA DE DOCUMENTOS ============================ */
  var selGuia = $('#guia-sit');
  var saidaGuia = $('#guia-resultado');
  preencherSituacoes(selGuia);

  function renderGuia() {
    var s = situacao(selGuia.value);
    var html = '<h3>' + esc(s.nome) + '</h3><p>' + esc(s.descricao) + '</p>';
    s.grupos.forEach(function (g) {
      html += '<div class="grupo-docs"><h4>' + esc(g.titulo) + '</h4><ul class="lista-docs">';
      g.itens.forEach(function (i) {
        html += '<li>' + esc(i.texto) + (i.dica ? '<small>' + esc(i.dica) + '</small>' : '') + '</li>';
      });
      html += '</ul></div>';
    });
    html += '<div class="acoes nao-imprimir">' +
      '<button type="button" class="lex-btn" data-ir="pendencias">Montar minha lista de pendências</button>' +
      '<button type="button" class="lex-btn lex-btn-sec" data-ir="assistente">Não sei por onde começar</button></div>' +
      '<p class="nota">A lista é geral e pode variar conforme o caso. Nem todos os itens se aplicam a todas as pessoas.</p>';
    saidaGuia.innerHTML = html;
  }
  selGuia.addEventListener('change', renderGuia);
  saidaGuia.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ir]');
    if (!b) return;
    if (b.getAttribute('data-ir') === 'pendencias') {
      selPend.value = selGuia.value;
      renderPend();
    }
    abrirPainel(b.getAttribute('data-ir'), { foco: true });
  });

  /* ============================ 2. CALCULADORAS ============================ */

  /* --- tempo de contribuição --- */
  var linhas = $('#contrib-linhas');
  var saidaContrib = $('#contrib-resultado');
  var contadorLinhas = 0;

  function novaLinha() {
    contadorLinhas++;
    var n = contadorLinhas;
    var div = document.createElement('div');
    div.className = 'linha-periodo';
    div.innerHTML =
      '<div class="campo"><label for="p-desc-' + n + '">Descrição (opcional)</label>' +
      '<input type="text" id="p-desc-' + n + '" placeholder="Ex.: empresa ou carnê"></div>' +
      '<div class="campo"><label for="p-ini-' + n + '">Início</label><input type="date" id="p-ini-' + n + '"></div>' +
      '<div class="campo"><label for="p-fim-' + n + '">Fim</label><input type="date" id="p-fim-' + n + '"></div>' +
      '<button type="button" class="lex-btn lex-btn-sec btn-remover" data-remover>Remover este período</button>';
    linhas.appendChild(div);
    return div;
  }
  novaLinha();

  $('#contrib-adicionar').addEventListener('click', function () {
    var l = novaLinha();
    $('input', l).focus();
  });
  linhas.addEventListener('click', function (e) {
    var b = e.target.closest('[data-remover]');
    if (!b) return;
    var linha = b.closest('.linha-periodo');
    if (linhas.children.length === 1) {
      $$('input', linha).forEach(function (i) { i.value = ''; });
    } else {
      linha.parentNode.removeChild(linha);
    }
    saidaContrib.innerHTML = '';
  });

  $('#contrib-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var periodos = [], posicoes = [];
    $$('.linha-periodo', linhas).forEach(function (l, idx) {
      var ini = $$('input', l)[1].value, fim = $$('input', l)[2].value;
      if (!ini && !fim) return;
      periodos.push({ inicio: ini, fim: fim });
      posicoes.push(idx + 1);
    });
    if (!periodos.length) {
      saidaContrib.innerHTML = '<div class="resultado-caixa erro"><p>Informe pelo menos um período, com data de início e de fim.</p></div>';
      return;
    }
    var r = L.somarContribuicao(periodos);
    var avisos = r.invalidos.map(function (inv) {
      var qual = 'Período ' + posicoes[inv.indice];
      return '<li>' + qual + ': ' + (inv.motivo === 'fim_antes_inicio'
        ? 'a data final é anterior à data inicial, e o período foi ignorado.'
        : 'preencha as duas datas. O período foi ignorado.') + '</li>';
    }).join('');

    var html;
    if (!r.periodosValidos) {
      html = '<div class="resultado-caixa erro"><p>Não foi possível calcular.</p><ul>' + avisos + '</ul></div>';
    } else {
      html = '<div class="resultado-caixa ok"><p><strong>Tempo estimado: ' +
        plural(r.anos, 'ano', 'anos') + ', ' + plural(r.meses, 'mês', 'meses') + ' e ' + plural(r.dias, 'dia', 'dias') +
        '</strong> (' + r.totalDias.toLocaleString('pt-BR') + ' dias).</p>' +
        (r.diasSobrepostos > 0 ? '<p>Períodos que se sobrepõem foram contados uma única vez (' + plural(r.diasSobrepostos, 'dia descontado', 'dias descontados') + ').</p>' : '') +
        '</div>' +
        (avisos ? '<div class="resultado-caixa erro"><ul>' + avisos + '</ul></div>' : '') +
        '<div class="aviso-caixa"><p><strong>Leia antes de usar o resultado:</strong> é uma estimativa simples. ' +
        'Considera 1 ano = 365 dias e 1 mês = 30 dias e não inclui conversão de tempo especial, carência, ' +
        'qualidade de segurado, regras de transição nem o valor do benefício. O INSS pode reconhecer um tempo diferente. ' +
        'O resultado não garante direito a nenhum benefício.</p></div>';
    }
    saidaContrib.innerHTML = html;
  });

  /* --- prazo de recurso --- */
  var saidaPrazo = $('#prazo-resultado');
  $('#prazo-data').value = '';
  $('#prazo-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var r = L.prazoRecurso($('#prazo-data').value, L.hojeISO());
    if (!r) {
      saidaPrazo.innerHTML = '<div class="resultado-caixa erro"><p>Informe a data em que você tomou conhecimento da decisão.</p></div>';
      return;
    }
    var classe, frase;
    if (r.situacao === 'vencido') {
      classe = 'erro';
      frase = 'Pela contagem estimada, o prazo terminou há ' + plural(Math.abs(r.diasRestantes), 'dia', 'dias') + '. Mesmo assim, podem existir outros caminhos. Procure orientação.';
    } else if (r.situacao === 'ultimo') {
      classe = 'erro';
      frase = 'Pela contagem estimada, <strong>hoje é o último dia</strong>. Procure orientação imediatamente.';
    } else {
      classe = r.diasRestantes <= 7 ? '' : 'ok';
      frase = 'Faltam ' + plural(r.diasRestantes, 'dia', 'dias') + (r.diasRestantes <= 7 ? '. O prazo está próximo: não deixe para a última hora.' : '.');
    }
    saidaPrazo.innerHTML =
      '<div class="resultado-caixa ' + classe + '"><p><strong>Data limite estimada: ' + r.diaSemana + ', ' + L.dataBR(r.ultimoDia) + '.</strong></p>' +
      '<p>' + frase + '</p>' +
      (r.prorrogado ? '<p>O 30º dia (' + L.dataBR(r.diaOriginal) + ') cai em fim de semana, por isso a data foi levada para o dia útil seguinte.</p>' : '') +
      '</div>' +
      '<div class="aviso-caixa"><p><strong>Atenção:</strong> a conta usa 30 dias corridos a partir do dia seguinte à ciência e ' +
      '<strong>não considera feriados</strong>. O prazo pode variar conforme o tipo de recurso e o que consta na decisão. ' +
      'Confira a data na própria carta do INSS e, na dúvida, não espere.</p></div>';
  });

  /* --- BPC: renda por pessoa --- */
  var saidaBpc = $('#bpc-resultado');
  $('#bpc-sm').value = LEX.config.salarioMinimo.toFixed(2);
  $('#bpc-sm-ano').textContent = LEX.config.salarioMinimoAno;
  $('#bpc-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var renda = parseFloat($('#bpc-renda').value);
    var pessoas = parseInt($('#bpc-pessoas').value, 10);
    var sm = parseFloat($('#bpc-sm').value);
    var r = L.rendaPerCapita(renda, pessoas, sm);
    if (!r) {
      saidaBpc.innerHTML = '<div class="resultado-caixa erro"><p>Preencha a renda total, o número de pessoas (pelo menos 1) e o salário mínimo.</p></div>';
      return;
    }
    var texto = r.abaixo
      ? 'Pela conta simples, a renda por pessoa está <strong>abaixo</strong> do limite de 1/4 do salário mínimo (' + L.moeda(r.diferenca) + ' a menos). Isso é apenas um indicativo e não garante o benefício.'
      : 'Pela conta simples, a renda por pessoa está <strong>igual ou acima</strong> do limite de 1/4 do salário mínimo (' + L.moeda(r.diferenca) + ' a mais). Em alguns casos outros fatores são considerados, por isso vale uma análise individual.';
    saidaBpc.innerHTML =
      '<div class="resultado-caixa ' + (r.abaixo ? 'ok' : '') + '"><p><strong>Renda por pessoa: ' + L.moeda(r.perCapita) + '</strong> &middot; limite de 1/4: ' + L.moeda(r.limite) + '.</p><p>' + texto + '</p></div>' +
      '<div class="aviso-caixa"><p><strong>Atenção:</strong> o INSS analisa quais rendas entram na conta e também avalia a condição da pessoa (idade ou deficiência) e a situação social. ' +
      'Confirme o salário mínimo vigente e use este resultado só como referência.</p></div>';
  });

  /* ============================ 3. ASSISTENTE ============================ */
  var caixaAss = $('#assistente-caixa');
  var historico = [LEX.assistente.inicio];

  function irParaCalc(nome) {
    abrirPainel('calculadoras');
    var alvo = $('#calc-' + nome + ' h3');
    if (alvo) {
      alvo.setAttribute('tabindex', '-1');
      alvo.focus();
      if (alvo.scrollIntoView) alvo.scrollIntoView({ block: 'start' });
    }
  }

  function renderAssistente(foco) {
    var id = historico[historico.length - 1];
    var no = LEX.assistente.nos[id];
    var html = '';
    if (!no) { historico = [LEX.assistente.inicio]; return renderAssistente(foco); }

    if (!no.fim) {
      html += '<p class="ass-progresso">Pergunta ' + historico.length + '</p>' +
        '<h3 id="ass-titulo" tabindex="-1">' + esc(no.pergunta) + '</h3>' +
        (no.ajuda ? '<p class="ass-ajuda">' + esc(no.ajuda) + '</p>' : '') +
        '<div class="ass-opcoes">' + no.opcoes.map(function (o, i) {
          return '<button type="button" class="ass-opcao" data-opcao="' + i + '">' + esc(o.texto) + '</button>';
        }).join('') + '</div>';
    } else {
      html += '<p class="ass-progresso">Orientação inicial</p>' +
        '<h3 id="ass-titulo" tabindex="-1">' + esc(no.titulo) + '</h3>' +
        '<p>' + esc(no.resumo) + '</p>' +
        '<h4>Próximos passos</h4><ol class="ass-passos">' + no.passos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
        (no.alerta ? '<div class="aviso-caixa"><p>' + esc(no.alerta) + '</p></div>' : '') +
        '<div class="acoes">' +
        (no.calc ? '<button type="button" class="lex-btn" data-calc="' + no.calc + '">Abrir a calculadora</button>' : '') +
        (no.guia ? '<button type="button" class="lex-btn lex-btn-sec" data-guia="' + no.guia + '">Ver documentos necessários</button>' +
          '<button type="button" class="lex-btn lex-btn-sec" data-pend="' + no.guia + '">Montar lista de pendências</button>' : '') +
        '</div>' +
        '<div class="acoes"><a class="lex-btn" href="' + RAIZ + 'index.html#duvidas-form">Enviar minha dúvida</a>' +
        '<a class="lex-btn lex-btn-sec" href="' + esc(LEX.config.whatsapp) + '" target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a></div>' +
        '<p class="nota">Esta orientação é geral e não substitui a análise do seu caso por um profissional.</p>';
    }

    html += '<div class="acoes ass-nav">' +
      (historico.length > 1 ? '<button type="button" class="lex-btn lex-btn-sec" data-voltar>&larr; Voltar</button>' : '') +
      (historico.length > 1 ? '<button type="button" class="lex-btn lex-btn-sec" data-recomecar>Recomeçar</button>' : '') +
      '</div>';

    caixaAss.innerHTML = html;
    if (foco) { var t = $('#ass-titulo'); if (t) t.focus(); }
  }

  caixaAss.addEventListener('click', function (e) {
    var t = e.target;
    var op = t.closest('[data-opcao]');
    if (op) {
      var no = LEX.assistente.nos[historico[historico.length - 1]];
      historico.push(no.opcoes[parseInt(op.getAttribute('data-opcao'), 10)].vai);
      renderAssistente(true);
      return;
    }
    if (t.closest('[data-voltar]')) { historico.pop(); renderAssistente(true); return; }
    if (t.closest('[data-recomecar]')) { historico = [LEX.assistente.inicio]; renderAssistente(true); return; }
    var calc = t.closest('[data-calc]');
    if (calc) { irParaCalc(calc.getAttribute('data-calc')); return; }
    var guia = t.closest('[data-guia]');
    if (guia) { selGuia.value = guia.getAttribute('data-guia'); renderGuia(); abrirPainel('guia', { foco: true }); return; }
    var pend = t.closest('[data-pend]');
    if (pend) { selPend.value = pend.getAttribute('data-pend'); renderPend(); abrirPainel('pendencias', { foco: true }); }
  });

  /* ============================ 4. ORGANIZADOR DE PENDÊNCIAS ============================ */
  var selPend = $('#pend-sit');
  var listaPend = $('#pend-lista');
  var textoProg = $('#pend-progresso-texto');
  var barraProg = $('#pend-barra');
  var nomePend = $('#pend-nome');
  var tituloImp = $('#pend-impressao-titulo');
  var nomeImp = $('#pend-impressao-nome');
  var dataImp = $('#pend-impressao-data');
  preencherSituacoes(selPend);
  var pend = { feitos: {}, extras: [], nome: '' };

  function chavePend() { return 'lexOrg:' + selPend.value; }
  function carregarPend() {
    var guardado = null;
    try { guardado = JSON.parse(localStorage.getItem(chavePend())); } catch (e) { }
    pend = guardado || {};
    pend.feitos = pend.feitos || {};
    pend.extras = pend.extras || [];
    pend.nome = pend.nome || '';
  }
  function salvarPend() { try { localStorage.setItem(chavePend(), JSON.stringify(pend)); } catch (e) { } }

  function itensPend() {
    var itens = [];
    situacao(selPend.value).grupos.forEach(function (g) {
      g.itens.forEach(function (i) { itens.push({ id: 'g:' + i.id, texto: i.texto, dica: i.dica, grupo: g.titulo }); });
    });
    pend.extras.forEach(function (x) { itens.push({ id: 'e:' + x.id, texto: x.texto, grupo: 'Itens adicionados por você', extra: x.id }); });
    return itens;
  }

  function renderPend() {
    carregarPend();
    var itens = itensPend();
    var grupos = [], porNome = {};
    itens.forEach(function (i) {
      if (!porNome[i.grupo]) { porNome[i.grupo] = []; grupos.push(i.grupo); }
      porNome[i.grupo].push(i);
    });
    var html = '';
    grupos.forEach(function (nome) {
      html += '<fieldset class="pend-grupo"><legend>' + esc(nome) + '</legend><ul class="pend-itens">';
      porNome[nome].forEach(function (i) {
        var idCampo = 'chk-' + i.id.replace(/[^a-z0-9]/gi, '-');
        html += '<li class="pend-item"><input type="checkbox" id="' + idCampo + '" data-id="' + esc(i.id) + '"' + (pend.feitos[i.id] ? ' checked' : '') + '>' +
          '<label for="' + idCampo + '">' + esc(i.texto) + (i.dica ? '<small>' + esc(i.dica) + '</small>' : '') + '</label>' +
          (i.extra ? '<button type="button" class="chip nao-imprimir" data-remover-extra="' + esc(i.extra) + '" aria-label="Remover item: ' + esc(i.texto) + '">Remover</button>' : '') +
          '</li>';
      });
      html += '</ul></fieldset>';
    });
    listaPend.innerHTML = html;
    nomePend.value = pend.nome;
    atualizarProgresso();
  }

  function atualizarProgresso() {
    var itens = itensPend();
    var feitos = itens.filter(function (i) { return pend.feitos[i.id]; }).length;
    barraProg.max = itens.length;
    barraProg.value = feitos;
    textoProg.textContent = feitos + ' de ' + itens.length + ' itens já reunidos. Faltam ' + (itens.length - feitos) + '.';
  }

  listaPend.addEventListener('change', function (e) {
    var c = e.target.closest('input[type="checkbox"]');
    if (!c) return;
    pend.feitos[c.getAttribute('data-id')] = c.checked;
    salvarPend();
    atualizarProgresso();
  });
  listaPend.addEventListener('click', function (e) {
    var b = e.target.closest('[data-remover-extra]');
    if (!b) return;
    var id = b.getAttribute('data-remover-extra');
    pend.extras = pend.extras.filter(function (x) { return String(x.id) !== id; });
    delete pend.feitos['e:' + id];
    salvarPend();
    renderPend();
    $('#pend-extra-texto').focus();
  });
  selPend.addEventListener('change', renderPend);
  nomePend.addEventListener('input', function () { pend.nome = nomePend.value; salvarPend(); });

  $('#pend-extra-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var campo = $('#pend-extra-texto');
    var texto = campo.value.trim();
    if (!texto) { campo.focus(); return; }
    pend.extras.push({ id: Date.now(), texto: texto });
    salvarPend();
    campo.value = '';
    renderPend();
    campo.focus();
  });

  $('#pend-imprimir').addEventListener('click', function () {
    tituloImp.textContent = 'Lista de documentos: ' + situacao(selPend.value).nome;
    nomeImp.textContent = pend.nome ? 'Nome: ' + pend.nome : '';
    dataImp.textContent = 'Emitida em ' + L.dataBR(L.hojeISO());
    window.print();
  });
  $('#pend-limpar').addEventListener('click', function () {
    if (!window.confirm('Desmarcar todos os itens e apagar os itens adicionados por você nesta lista?')) return;
    pend.feitos = {};
    pend.extras = [];
    salvarPend();
    renderPend();
  });

  /* ============================ 5. PESQUISA ============================ */
  var indice = L.construirIndice(RAIZ);
  var formPesq = $('#pesq-form');
  var campoPesq = $('#pesq-q');
  var listaPesq = $('#pesq-resultados');
  var statusPesq = $('#pesq-status');
  var timerPesq = null;

  function pesquisar() {
    var q = campoPesq.value.trim();
    if (L.normalizar(q).length < 2) {
      listaPesq.innerHTML = '';
      statusPesq.textContent = q ? 'Digite pelo menos 2 letras.' : '';
      return;
    }
    var achados = L.buscar(q, indice);
    if (!achados.length) {
      listaPesq.innerHTML = '<li class="vazio">Nenhum resultado para <strong>' + esc(q) + '</strong>. ' +
        'Tente outra palavra ou <a href="' + esc(LEX.config.whatsapp) + '" target="_blank" rel="noopener noreferrer">fale pelo WhatsApp</a>.</li>';
      statusPesq.textContent = 'Nenhum resultado.';
      return;
    }
    listaPesq.innerHTML = achados.slice(0, 20).map(function (d) {
      var resumo = d.resumo.length > 200 ? d.resumo.slice(0, 197) + '...' : d.resumo;
      return '<li class="resultado-item"><span class="selo">' + esc(d.tipo) + '</span>' +
        '<h3><a href="' + esc(d.url) + '">' + esc(d.titulo) + '</a></h3>' +
        '<p>' + esc(resumo) + '</p></li>';
    }).join('');
    statusPesq.textContent = achados.length === 1 ? '1 resultado.' : achados.length + ' resultados.';
  }

  formPesq.addEventListener('submit', function (e) { e.preventDefault(); pesquisar(); });
  campoPesq.addEventListener('input', function () {
    clearTimeout(timerPesq);
    timerPesq = setTimeout(pesquisar, 250);
  });
  $('#pesq-sugestoes').addEventListener('click', function (e) {
    var b = e.target.closest('[data-termo]');
    if (!b) return;
    campoPesq.value = b.getAttribute('data-termo');
    pesquisar();
    campoPesq.focus();
  });

  /* ============================ INÍCIO ============================ */
  var params = new URLSearchParams(window.location.search);
  var sitUrl = params.get('sit');
  if (sitUrl && LEX.guia.situacoes.some(function (s) { return s.id === sitUrl; })) {
    selGuia.value = sitUrl;
    selPend.value = sitUrl;
  }
  renderGuia();
  renderPend();
  renderAssistente(false);

  var qUrl = params.get('q');
  if (qUrl) { campoPesq.value = qUrl; pesquisar(); }

  var inicial = window.location.hash.replace('#', '') || (qUrl ? 'pesquisa' : 'guia');
  abrirPainel(inicial, { hash: !!window.location.hash });
  if (inicial === 'pesquisa' && !qUrl) campoPesq.focus();
})();
