/* Lógica compartilhada: datas, cálculos, pesquisa.
   Sem acesso à página (DOM), por isso pode ser testada fora do navegador. */
(function (g) {
  'use strict';
  var LEX = g.LEX = g.LEX || {};
  var DIA = 86400000;
  var NOMES_DIA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

  /* ---------- texto e datas ---------- */

  function normalizar(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function textoSimples(html) {
    return String(html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // 'AAAA-MM-DD' -> milissegundos (UTC). Retorna NaN se inválida.
  function lerData(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    if (!m) return NaN;
    var ms = Date.UTC(+m[1], +m[2] - 1, +m[3]);
    var d = new Date(ms);
    if (d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) return NaN;
    return ms;
  }

  function paraISO(ms) { return new Date(ms).toISOString().slice(0, 10); }

  function hojeISO() {
    var d = new Date();
    var mm = ('0' + (d.getMonth() + 1)).slice(-2);
    var dd = ('0' + d.getDate()).slice(-2);
    return d.getFullYear() + '-' + mm + '-' + dd;
  }

  function dataBR(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    return m ? m[3] + '/' + m[2] + '/' + m[1] : '';
  }

  function moeda(n) {
    try { return Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
    catch (e) { return 'R$ ' + Number(n).toFixed(2).replace('.', ','); }
  }

  /* ---------- artigos ---------- */

  // Só aparecem artigos com data até hoje (permite agendar publicações).
  function artigosVisiveis(hoje) {
    var limite = hoje || hojeISO();
    return (LEX.artigos || [])
      .filter(function (a) { return a && a.slug && String(a.data) <= limite; })
      .sort(function (a, b) { return a.data < b.data ? 1 : a.data > b.data ? -1 : 0; });
  }

  /* ---------- calculadora: tempo de contribuição ---------- */
  // Estimativa: une períodos sobrepostos e converte dias em anos (365) e meses (30).
  function somarContribuicao(periodos) {
    var faixas = [], invalidos = [], bruto = 0;
    (periodos || []).forEach(function (p, i) {
      var a = lerData(p && p.inicio), b = lerData(p && p.fim);
      if (isNaN(a) || isNaN(b)) { invalidos.push({ indice: i, motivo: 'incompleto' }); return; }
      if (b < a) { invalidos.push({ indice: i, motivo: 'fim_antes_inicio' }); return; }
      var ini = a / DIA, fim = b / DIA;
      faixas.push([ini, fim]);
      bruto += fim - ini + 1;
    });
    faixas.sort(function (x, y) { return x[0] - y[0]; });

    var uniao = [];
    faixas.forEach(function (f) {
      var ult = uniao[uniao.length - 1];
      if (ult && f[0] <= ult[1]) { if (f[1] > ult[1]) ult[1] = f[1]; }
      else uniao.push([f[0], f[1]]);
    });

    var total = uniao.reduce(function (s, f) { return s + (f[1] - f[0] + 1); }, 0);
    var anos = Math.floor(total / 365);
    var resto = total % 365;
    return {
      totalDias: total,
      anos: anos,
      meses: Math.floor(resto / 30),
      dias: resto % 30,
      diasSobrepostos: bruto - total,
      periodosValidos: faixas.length,
      invalidos: invalidos
    };
  }

  /* ---------- calculadora: prazo de recurso ---------- */
  // 30 dias corridos a partir da ciência (o dia da ciência não conta).
  // Se o último dia cair em fim de semana, passa para a segunda-feira.
  // Feriados NÃO são considerados.
  function prazoRecurso(cienciaISO, hoje) {
    var c = lerData(cienciaISO);
    if (isNaN(c)) return null;
    var fim = c + 30 * DIA;
    var original = fim;
    var dow = new Date(fim).getUTCDay();
    var prorrogado = false;
    if (dow === 6) { fim += 2 * DIA; prorrogado = true; }
    else if (dow === 0) { fim += DIA; prorrogado = true; }

    var ref = lerData(hoje || hojeISO());
    var restantes = Math.round((fim - ref) / DIA);
    return {
      ultimoDia: paraISO(fim),
      diaSemana: NOMES_DIA[new Date(fim).getUTCDay()],
      prorrogado: prorrogado,
      diaOriginal: paraISO(original),
      diasRestantes: restantes,
      situacao: restantes < 0 ? 'vencido' : restantes === 0 ? 'ultimo' : 'dentro'
    };
  }

  /* ---------- calculadora: renda por pessoa (BPC) ---------- */
  function rendaPerCapita(renda, pessoas, salarioMinimo) {
    var r = Number(renda), p = Math.floor(Number(pessoas)), sm = Number(salarioMinimo);
    if (!(r >= 0) || !(p >= 1) || !(sm > 0)) return null;
    var perCapita = Math.round((r / p) * 100) / 100;
    var limite = Math.round((sm / 4) * 100) / 100;
    return {
      perCapita: perCapita,
      limite: limite,
      abaixo: perCapita < limite,
      diferenca: Math.round(Math.abs(perCapita - limite) * 100) / 100
    };
  }

  /* ---------- pesquisa ---------- */

  // Monta a lista de tudo que pode aparecer na pesquisa. "raiz" é o caminho
  // até a pasta principal do site ('' na página inicial, '../' nas subpastas).
  function construirIndice(raiz) {
    raiz = raiz || '';
    var docs = [];
    artigosVisiveis().forEach(function (a) {
      docs.push({
        tipo: a.tipo === 'noticia' ? 'Notícia' : 'Artigo',
        titulo: a.titulo,
        resumo: a.resumo || '',
        url: raiz + 'ArtigosHtml/artigo.html?slug=' + encodeURIComponent(a.slug),
        titulos: normalizar(a.titulo),
        tags: normalizar((a.tags || []).join(' ')),
        resumoN: normalizar(a.resumo),
        corpo: normalizar(textoSimples(a.corpo))
      });
    });
    (LEX.faq || []).forEach(function (f) {
      docs.push({
        tipo: 'Pergunta frequente',
        titulo: f.pergunta,
        resumo: f.resposta,
        url: raiz + 'Perguntas.html',
        titulos: normalizar(f.pergunta),
        tags: normalizar((f.tags || []).join(' ')),
        resumoN: normalizar(f.resposta),
        corpo: ''
      });
    });
    (LEX.paginas || []).forEach(function (p) {
      docs.push({
        tipo: /central\.html/.test(p.url) ? 'Central Lex' : 'Página',
        titulo: p.titulo,
        resumo: p.resumo || '',
        url: raiz + p.url,
        titulos: normalizar(p.titulo),
        tags: normalizar((p.tags || []).join(' ')),
        resumoN: normalizar(p.resumo),
        corpo: ''
      });
    });
    return docs;
  }

  // Todos os termos contam; quem casa mais termos e em campos mais importantes aparece antes.
  function buscar(consulta, indice) {
    var termos = normalizar(consulta).split(' ').filter(function (t) { return t.length > 1; });
    if (!termos.length) return [];
    var lista = [];
    indice.forEach(function (d) {
      var casados = 0, pontos = 0;
      termos.forEach(function (t) {
        var p = 0;
        if (d.titulos.indexOf(t) !== -1) p += 5;
        if (d.tags.indexOf(t) !== -1) p += 3;
        if (d.resumoN.indexOf(t) !== -1) p += 2;
        if (d.corpo && d.corpo.indexOf(t) !== -1) p += 1;
        if (p) { casados++; pontos += p; }
      });
      if (casados) lista.push({ doc: d, casados: casados, pontos: pontos });
    });
    lista.sort(function (a, b) { return b.casados - a.casados || b.pontos - a.pontos; });
    return lista.map(function (x) { return x.doc; });
  }

  LEX.logica = {
    normalizar: normalizar,
    textoSimples: textoSimples,
    lerData: lerData,
    hojeISO: hojeISO,
    dataBR: dataBR,
    moeda: moeda,
    artigosVisiveis: artigosVisiveis,
    somarContribuicao: somarContribuicao,
    prazoRecurso: prazoRecurso,
    rendaPerCapita: rendaPerCapita,
    construirIndice: construirIndice,
    buscar: buscar
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = LEX.logica;
})(typeof window !== 'undefined' ? window : globalThis);
