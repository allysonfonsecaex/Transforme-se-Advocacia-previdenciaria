/* ==========================================================================
   CATÁLOGO DE CONTEÚDO DO SITE
   É aqui que você publica artigos. Não precisa criar uma página HTML para
   cada um: o site monta tudo sozinho a partir desta lista.

   COMO PUBLICAR UM ARTIGO NOVO
   1. Copie um bloco inteiro de LEX.artigos (de "{" até "}," ).
   2. Cole no topo da lista e troque os campos:
        slug    -> nome curto para o endereço, só letras minúsculas e hífens
                   (ex.: "pensao-por-morte-quem-tem-direito")
        tipo    -> "artigo" ou "noticia"
        titulo  -> título que aparece na página e nos cartões
        data    -> AAAA-MM-DD. Se a data for futura, o artigo só aparece
                   quando o dia chegar (agendamento automático).
        resumo  -> 1 ou 2 frases para os cartões e para a pesquisa
        imagem  -> endereço de uma imagem (opcional)
        tags    -> palavras-chave (ajudam na pesquisa e nos filtros)
        corpo   -> o texto, escrito em HTML simples entre crases ` `
                   (<p>, <h2>, <ul><li>, <ol><li>, <strong>, <a href="">)
   3. Salve. O artigo aparece na lista, na página inicial, no rodapé e na
      pesquisa. O endereço dele será: ArtigosHtml/artigo.html?slug=SEU-SLUG

   Cuidado: não use o caractere ` (crase) dentro do texto do corpo.
   ========================================================================== */
(function (g) {
  var LEX = g.LEX = g.LEX || {};

  LEX.config = {
    whatsapp: 'https://wa.me/5511918598711',
    // Salário mínimo usado nas calculadoras. Atualize quando mudar.
    salarioMinimo: 1621.00,
    salarioMinimoAno: 2026,
    imagemPadrao: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  };

  var AVISO =
    '<p class="aviso-artigo"><strong>Importante:</strong> este texto tem caráter informativo e geral. ' +
    'Cada caso depende de documentos e de circunstâncias individuais e não substitui uma ' +
    'consulta com profissional habilitado. Não há promessa de resultado.</p>';

  LEX.artigos = [

    {
      slug: 'beneficio-negado-primeiros-passos',
      tipo: 'artigo',
      titulo: 'Benefício negado pelo INSS: primeiros passos',
      data: '2026-09-02',
      resumo: 'Recebeu uma negativa? Veja o que conferir na carta de decisão, qual é o prazo para recorrer e quais caminhos podem existir.',
      imagem: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Documentos e material de trabalho sobre uma mesa',
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
      imagem: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Livros jurídicos sobre uma mesa',
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
      imagem: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      imagemAlt: 'Documentos e material de trabalho sobre uma mesa',
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

    /* MODELO PARA NOTÍCIA (apague as marcas de comentário e preencha):
    ,{
      slug: 'titulo-curto-da-noticia',
      tipo: 'noticia',
      titulo: 'Título da notícia',
      data: '2026-10-20',
      resumo: 'Uma ou duas frases.',
      tags: ['INSS'],
      corpo: `<p>Texto da notícia.</p>`
    }
    */
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

  // Páginas fixas do site, para aparecerem na pesquisa. Ajuste os textos se quiser.
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
