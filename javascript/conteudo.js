/* ==========================================================================
   CATÁLOGO DE CONTEÚDO DO SITE
   ========================================================================== */
(function (g) {
  var LEX = g.LEX = g.LEX || {};

  LEX.config = {
    whatsapp: 'https://wa.me/5511918598711',
    salarioMinimo: 1621.00,
    salarioMinimoAno: 2026,
    imagemPadrao: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
  };

  var AVISO =
    '<p class="aviso-artigo"><strong>Importante:</strong> este texto tem caráter informativo e geral. ' +
    'Cada caso depende de documentos e de circunstâncias individuais e não substitui uma ' +
    'consulta com profissional habilitado. Não há promessa de resultado.</p>';

  LEX.artigos = [

    {
      slug: 'planejamento-previdenciario-vale-a-pena',
      tipo: 'artigo',
      titulo: 'Planejamento Previdenciário: Por que vale a pena fazer antes de pedir a aposentadoria',
      data: '2026-10-19',
      resumo: 'Entenda como o planejamento previdenciário evita surpresas desagradáveis, corrige tempo de contribuição e garante o melhor benefício financeiro possível.',
      imagem: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Calculadora, caneta e gráficos financeiros de planejamento',
      tags: ['Planejamento', 'Aposentadoria', 'INSS', 'Dicas'],
      corpo: `
<p>Muitos segurados do INSS cometem o erro de solicitar a aposentadoria assim que atingem os requisitos mínimos, sem antes avaliar se essa é realmente a melhor opção financeira. É justamente nesse cenário que o <strong>planejamento previdenciário</strong> se torna indispensável.</p>

<h2>O que é o Planejamento Previdenciário?</h2>
<p>Trata-se de um estudo detalhado de todo o histórico de contribuições do segurado. O objetivo é simular diferentes cenários para identificar qual será o valor do benefício e qual o momento exato para dar entrada no pedido junto ao INSS.</p>

<img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80" alt="Profissional analisando documentos e gráficos de planejamento previdenciário" style="width:100%; height:auto; border-radius:8px; margin: 16px 0;">

<h2>Principais vantagens do estudo:</h2>
<ul>
    <li><strong>Identificação de erros:</strong> Correção de falhas no CNIS (Cadastro Nacional de Informações Sociais).</li>
    <li><strong>Aproveitamento de períodos:</strong> Inclusão de tempo especial, trabalho rural ou serviço militar que não constavam no sistema.</li>
    <li><strong>Eliminação do fator previdenciário indesejado:</strong> Estratégias para afastar redutores no valor da aposentadoria.</li>
</ul>

<p>Investir tempo em um planejamento antecipado garante tranquilidade e a segurança de que você receberá o teto ou o valor mais justo pelo seu histórico de trabalho.</p>
` + AVISO
    },

    {
      slug: 'revisao-da-vida-toda-o-que-muda',
      tipo: 'artigo',
      titulo: 'Revisão da Vida Toda: Quem tem direito e como funciona na prática',
      data: '2026-10-18',
      resumo: 'Tire suas dúvidas sobre a tese da revisão da vida toda e saiba se o seu histórico de contribuições anteriores a julho de 1994 pode aumentar o seu benefício.',
      imagem: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Estátua da justiça e martelo de juiz',
      tags: ['Revisão', 'INSS', 'Aposentadoria', 'Direito'],
      corpo: `
<p>A tese da <strong>Revisão da Vida Toda</strong> gerou muitas expectativas entre aposentados e pensionistas nos últimos anos. O objetivo dessa ação judicial é permitir que sejam consideradas no cálculo da aposentadoria todas as contribuições feitas ao longo da vida profissional do segurado, e não apenas aquelas posteriores a julho de 1994.</p>

<h2>Quem pode ser beneficiado?</h2>
<p>De forma geral, a revisão costuma ser vantajosa para segurados que:</p>
<ul>
    <li>Tinham salários altos antes de julho de 1994;</li>
    <li>Passaram a ganhar salários menores ou se tornaram contribuintes individuais (autônomos) após o Plano Real;</li>
    <li>Possuem benefícios concedidos com base nas regras da Lei 9.876/1999 e antes da última reforma da previdência de 2019.</li>
</ul>

<img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=80" alt="Consulta de processos jurídicos e revisão de aposentadoria" style="width:100%; height:auto; border-radius:8px; margin: 16px 0;">

<h2>Cuidados importantes antes de entrar com o pedido</h2>
<p>Apesar de parecer atraente, nem todo mundo tem direito ao aumento. Em alguns casos, aplicar a regra antiga pode diminuir o valor do benefício (fenômeno conhecido como decadência ou prejuízo no recálculo). Por isso, a análise prévia por um advogado especialista em direito previdenciário é fundamental.</p>
` + AVISO
    },

    {
      slug: 'beneficio-negado-primeiros-passos',
      tipo: 'artigo',
      titulo: 'Benefício negado pelo INSS: primeiros passos',
      data: '2026-09-02',
      resumo: 'Recebeu uma negativa? Veja o que conferir na carta de decisão, qual é o prazo para recorrer e quais caminhos podem existir.',
      imagem: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Livros de direito e martelo sobre mesa de madeira',
      tags: ['benefício negado', 'indeferimento', 'recurso', 'prazo', 'INSS'],
      corpo: `
<p>Receber a notícia de que o INSS negou o benefício é desanimador, mas uma negativa não é, necessariamente, o fim do caminho. O mais importante agora é agir com calma e dentro dos prazos.</p>

<h2>1. Leia o motivo da negativa</h2>
<p>A carta ou o aviso de decisão informa o motivo do indeferimento. Entre os mais comuns estão falta de carência (número mínimo de contribuições), perda da qualidade de segurado, incapacidade não constatada na perícia e ausência de documentos. Guarde a carta e o número do protocolo.</p>

<h2>2. Atenção ao prazo para recorrer</h2>
<p>O recurso ordinário contra a decisão do INSS, dirigido às Juntas de Recursos do Conselho de Recursos da Previdência Social (CRPS), costuma ter prazo de <strong>30 dias corridos</strong> a partir da ciência da decisão. Ele pode ser apresentado pelo Meu INSS ou em uma agência.</p>
<p>A <a href="../CentralLex/central.html#calculadoras">calculadora de prazo da Central Lex</a> ajuda a estimar a data limite. Confirme sempre a data na própria decisão.</p>

<h2>3. Caminhos possíveis</h2>
<ul>
  <li><strong>Recurso administrativo:</strong> contesta a decisão dentro do próprio INSS.</li>
  <li><strong>Novo requerimento:</strong> pode fazer sentido quando há documentos novos. Atenção: um novo pedido pode alterar a data de início do benefício.</li>
  <li><strong>Via judicial:</strong> em muitos casos também é possível discutir a negativa na Justiça. A estratégia deve ser avaliada caso a caso.</li>
</ul>

<h2>4. Reúna os documentos</h2>
<p>Peça cópia do processo administrativo, junte a carta de decisão e organize os documentos que faltaram. O <a href="../CentralLex/central.html#guia">Guia de documentos</a> e o <a href="../CentralLex/central.html#pendencias">Organizador de pendências</a> ajudam a montar essa lista.</p>
` + AVISO
    },

    {
      slug: 'o-que-e-o-cnis-e-como-conferir',
      tipo: 'artigo',
      titulo: 'O que é o CNIS e por que conferir o seu',
      data: '2026-06-18',
      resumo: 'O CNIS reúne seus vínculos e contribuições. Entenda por que erros nele podem prejudicar a aposentadoria e como conferir.',
      imagem: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Pessoa analisando relatórios e planilhas no computador',
      tags: ['CNIS', 'tempo de contribuição', 'aposentadoria', 'Meu INSS', 'vínculos'],
      corpo: `
<p>O <strong>CNIS</strong> (Cadastro Nacional de Informações Sociais) é o banco de dados do INSS que registra seus vínculos de trabalho, remunerações e contribuições. É com base nele que o INSS costuma analisar o seu tempo de contribuição.</p>

<h2>Por que conferir</h2>
<p>Informações ausentes ou incorretas podem reduzir o tempo reconhecido ou o valor do benefício. Alguns problemas frequentes:</p>
<ul>
  <li>vínculos de trabalho que não aparecem;</li>
  <li>datas de início ou de fim incorretas;</li>
  <li>remunerações faltando ou com valores diferentes dos reais;</li>
  <li>contribuições pagas como autônomo ou facultativo que não foram reconhecidas;</li>
  <li>indicadores de pendência ao lado de vínculos ou contribuições.</li>
</ul>

<h2>Como consultar</h2>
<p>O extrato pode ser consultado no <strong>Meu INSS</strong> (site ou aplicativo), no serviço de extrato de contribuição. Confira período por período, comparando com a sua carteira de trabalho, contracheques e carnês.</p>

<h2>Se encontrar erro</h2>
<p>É possível pedir a atualização de vínculos e remunerações apresentando documentos que comprovem o período, como a carteira de trabalho, contratos, contracheques, carnês e guias de pagamento. Quanto mais cedo isso for feito, menos problemas na hora do pedido.</p>
<p>Para estimar o seu tempo, use a <a href="../CentralLex/central.html#calculadoras">calculadora de tempo de contribuição</a> da Central Lex.</p>
` + AVISO
    },

    {
      slug: 'regras-de-transicao-da-previdencia',
      tipo: 'artigo',
      titulo: 'Regras de transição da previdência: o que muda?',
      data: '2026-04-07',
      resumo: 'Muitos segurados desconhecem as novas regras de transição. Entenda como elas afetam a sua aposentadoria.',
      imagem: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Executivo analisando planejamento estratégico',
      tags: ['aposentadoria', 'regras de transição', 'reforma da previdência', 'pontos', 'pedágio'],
      corpo: `
<p>A Reforma da Previdência (Emenda Constitucional nº 103/2019) mudou as regras de aposentadoria do INSS. Para quem já contribuía antes de 13 de novembro de 2019, foram criadas <strong>regras de transição</strong>, caminhos intermediários entre o sistema antigo e o novo.</p>

<h2>Quais são os caminhos de transição</h2>
<p>No Regime Geral (INSS), as principais regras de transição são:</p>
<ul>
  <li><strong>Regra de pontos:</strong> soma a idade com o tempo de contribuição, e a pontuação exigida aumenta com o passar dos anos.</li>
  <li><strong>Idade mínima progressiva:</strong> combina tempo de contribuição com uma idade mínima que sobe gradualmente.</li>
  <li><strong>Pedágio de 50%:</strong> para quem estava próximo de completar o tempo de contribuição exigido em 2019.</li>
  <li><strong>Pedágio de 100%:</strong> combina idade mínima com um acréscimo de 100% sobre o tempo que faltava em 2019.</li>
  <li><strong>Aposentadoria por idade:</strong> com regra própria de transição para a idade da mulher e carência mínima.</li>
</ul>

<h2>Por que a análise individual importa</h2>
<p>Cada regra tem requisitos próprios, e o valor do benefício também pode variar entre elas. A melhor opção depende do seu histórico de contribuições, da sua idade e de eventuais períodos especiais ou rurais.</p>

<h2>Por onde começar</h2>
<ol>
  <li>Consulte o seu extrato CNIS no Meu INSS e confira vínculos e remunerações.</li>
  <li>Reúna carteira de trabalho, carnês e documentos de atividade especial, se houver.</li>
  <li>Estime o seu tempo na <a href="../CentralLex/central.html#calculadoras">calculadora de tempo de contribuição</a>.</li>
  <li>Busque orientação profissional antes de fazer o pedido.</li>
</ol>
` + AVISO
    },

    {
      slug: 'beneficio-por-incapacidade-como-solicitar',
      tipo: 'artigo',
      titulo: 'Como solicitar benefício por incapacidade atualizado',
      data: '2025-12-15',
      resumo: 'Saiba quais documentos são essenciais e como evitar o indeferimento do seu auxílio-doença no INSS.',
      imagem: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Exame médico e prontuário de saúde sobre mesa',
      tags: ['incapacidade', 'auxílio-doença', 'perícia', 'documentos', 'afastamento'],
      corpo: `
<p>Desde a Reforma da Previdência, o antigo auxílio-doença passou a ser chamado de <strong>auxílio por incapacidade temporária</strong>, e a aposentadoria por invalidez, de <strong>aposentadoria por incapacidade permanente</strong>. Os dois dependem da comprovação de que a doença ou o acidente impede o trabalho.</p>

<h2>O que o INSS costuma analisar</h2>
<ul>
  <li><strong>Qualidade de segurado:</strong> estar contribuindo ou dentro do período de manutenção da qualidade de segurado.</li>
  <li><strong>Carência:</strong> em regra, 12 contribuições mensais, dispensada em situações como acidente de qualquer natureza e em algumas doenças previstas em lei.</li>
  <li><strong>Incapacidade:</strong> avaliada em perícia médica.</li>
</ul>

<h2>Documentos que fazem diferença</h2>
<ul>
  <li>relatórios e atestados médicos atuais, com CID e descrição das limitações para a atividade exercida;</li>
  <li>exames, laudos, receitas e comprovantes de internação ou tratamento;</li>
  <li>documentos de identificação e comprovante de residência;</li>
  <li>carteira de trabalho, extrato CNIS e carnês de contribuição;</li>
  <li>em caso de acidente, comunicação do acidente e boletim de ocorrência, quando houver.</li>
</ul>

<h2>Como reduzir o risco de indeferimento</h2>
<ul>
  <li>leve à perícia toda a documentação médica, de forma organizada;</li>
  <li>peça ao médico que descreva como a doença limita o seu trabalho, não apenas o diagnóstico;</li>
  <li>compareça à perícia na data marcada e mantenha seus dados atualizados no Meu INSS;</li>
  <li>guarde cópia de tudo o que for entregue.</li>
</ul>
<p>Monte a sua lista no <a href="../CentralLex/central.html#pendencias">Organizador de pendências</a>.</p>
` + AVISO
    }

  ];

  LEX.faq = [
    {
      pergunta: 'Quando procurar uma advogada previdenciária?',
      resposta: 'Quando houver dúvidas sobre pedidos, negativas, revisões ou planejamento de benefícios do INSS. Uma avaliação profissional ajuda a entender quais caminhos podem ser aplicáveis ao seu caso.',
      tags: ['advogada', 'orientação']
    },
    {
      pergunta: 'O que é o CNIS?',
      resposta: 'É o cadastro do INSS com seus vínculos, remunerações e contribuições. Conferir o CNIS antes de pedir um benefício ajuda a identificar erros ou períodos que faltam.',
      tags: ['CNIS', 'vínculos', 'contribuições']
    },
    {
      pergunta: 'Qual é o prazo para recorrer de uma negativa do INSS?',
      resposta: 'O recurso ordinário às Juntas de Recursos costuma ter prazo de 30 dias corridos a partir da ciência da decisão. Confira a data na própria carta de decisão.',
      tags: ['recurso', 'prazo', 'benefício negado', 'indeferimento']
    },
    {
      pergunta: 'O que é carência?',
      resposta: 'É o número mínimo de contribuições mensais exigido para ter direito a certos benefícios. Em alguns casos, como acidentes, a carência pode ser dispensada.',
      tags: ['carência', 'contribuições']
    },
    {
      pergunta: 'Quem pode receber o BPC/LOAS?',
      resposta: 'Em regra, pessoas idosas (65 anos ou mais) ou com deficiência que tenham renda familiar por pessoa muito baixa, em geral inferior a 1/4 do salário mínimo, e inscrição atualizada no CadÚnico. Cada caso é analisado individualmente.',
      tags: ['BPC', 'LOAS', 'CadÚnico', 'renda', 'idoso', 'deficiência']
    },
    {
      pergunta: 'Posso pedir revisão do meu benefício?',
      resposta: 'Em alguns casos, sim, por exemplo quando períodos de contribuição ou remunerações não foram considerados. Existem prazos, por isso a análise não deve ser adiada.',
      tags: ['revisão', 'benefício errado', 'valor']
    },
    {
      pergunta: 'Quais documentos preciso para pedir pensão por morte?',
      resposta: 'Em geral: certidão de óbito, documentos pessoais do falecido e dos dependentes, comprovação do vínculo (casamento, união estável, filiação) e comprovante de residência. Veja a lista completa no Guia de documentos.',
      tags: ['pensão por morte', 'documentos', 'dependentes']
    }
  ];

  LEX.paginas = [
    { titulo: 'Sobre a Taís Almeida', url: 'Sobre.html', resumo: 'Conheça a advogada e o trabalho em advocacia previdenciária.', tags: ['sobre', 'advogada', 'Taís Almeida'] },
    { titulo: 'Perguntas frequentes', url: 'Perguntas.html', resumo: 'Respostas para as dúvidas mais comuns sobre INSS e benefícios.', tags: ['perguntas', 'dúvidas', 'faq'] },
    { titulo: 'Planejamentos previdenciários', url: 'PlanejamentosHtml/planejamentos.html', resumo: 'Planejamento de aposentadoria e análise de regras de transição.', tags: ['planejamento', 'aposentadoria'] },
    { titulo: 'Central Lex: Guia de documentos', url: 'CentralLex/central.html#guia', resumo: 'Lista de documentos para aposentadoria, BPC/LOAS, incapacidade, revisão, pensão por morte e benefício negado.', tags: ['documentos', 'guia', 'lista'] },
    { titulo: 'Central Lex: Calculadoras', url: 'CentralLex/central.html#calculadoras', resumo: 'Estimativa de tempo de contribuição, prazo de recurso e renda por pessoa para o BPC.', tags: ['calculadora', 'simulador', 'tempo de contribuição', 'prazo', 'renda'] },
    { titulo: 'Central Lex: Assistente de orientação inicial', url: 'CentralLex/central.html#assistente', resumo: 'Perguntas simples que indicam os próximos passos para a sua situação.', tags: ['assistente', 'orientação', 'próximos passos'] },
    { titulo: 'Central Lex: Organizador de pendências', url: 'CentralLex/central.html#pendencias', resumo: 'Marque os documentos que você já tem, veja o que falta e imprima ou salve em PDF.', tags: ['organizador', 'checklist', 'pendências', 'imprimir'] }
  ];
})(typeof window !== 'undefined' ? window : globalThis);