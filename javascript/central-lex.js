/* ==========================================================================
   CENTRAL LEX: lógica e conteúdo
   Edite apenas os blocos 1 a 4 (CONFIG, SITUACOES, ASS e CATALOGO).
   O resto (blocos 5 e 6) é o funcionamento: cálculos, busca e interface.
   ========================================================================== */
(function () {
'use strict';

if (!document.getElementById('p-guia')) return;   // esta página não é a Central Lex


/* =====================================================================
   1) CONFIGURAÇÃO  (edite aqui)
   ===================================================================== */
var CONFIG = {
  salarioMinimo: 1621.00,     // atualize quando mudar
  salarioMinimoAno: 2026,
  whatsapp: 'https://wa.me/5511918598711',
  paginaContato: 'index.html#duvidas-form'   // para onde vai "Enviar minha dúvida"
};

/* =====================================================================
   2) GUIA DE DOCUMENTOS  (o Organizador usa esta mesma lista)
   Cada item precisa de um "id" único dentro da situação.
   ===================================================================== */
function pessoais(extra) {
  return { titulo: 'Documentos pessoais', itens: [
    { id: 'rg', texto: 'Documento de identidade com foto (RG ou CNH)' },
    { id: 'cpf', texto: 'CPF' },
    { id: 'res', texto: 'Comprovante de residência atualizado' },
    { id: 'banco', texto: 'Dados da conta bancária para recebimento', dica: 'Conta em seu nome.' }
  ].concat(extra || []) };
}
var SITUACOES = [
  { id: 'aposentadoria', nome: 'Aposentadoria',
    descricao: 'Para pedir aposentadoria por idade, por tempo de contribuição ou por uma regra de transição.',
    grupos: [
      pessoais([{ id: 'certidao', texto: 'Certidão de nascimento ou de casamento' },
                { id: 'nit', texto: 'Número do PIS/NIT', dica: 'Aparece na carteira de trabalho e no CNIS.' }]),
      { titulo: 'Vínculos e contribuições', itens: [
        { id: 'cnis', texto: 'Extrato CNIS atualizado', dica: 'Disponível no Meu INSS.' },
        { id: 'ctps', texto: 'Carteira(s) de trabalho (todas, inclusive as antigas)' },
        { id: 'carnes', texto: 'Carnês e guias de contribuição (autônomo, facultativo, MEI)' },
        { id: 'contracheques', texto: 'Contracheques ou contratos, para períodos que não constam no CNIS' },
        { id: 'cert-outro', texto: 'Certidão de tempo de contribuição de outro regime, se houver', dica: 'Por exemplo, serviço público.' },
        { id: 'reservista', texto: 'Certificado de reservista ou de serviço militar, se houver' }] },
      { titulo: 'Atividade especial ou rural (se for o caso)', itens: [
        { id: 'ppp', texto: 'PPP (Perfil Profissiográfico Previdenciário)', dica: 'Fornecido pela empresa onde houve exposição a agentes nocivos.' },
        { id: 'ltcat', texto: 'LTCAT ou laudos técnicos do ambiente de trabalho' },
        { id: 'rural', texto: 'Documentos da atividade rural: notas de produtor, documentos da terra, declaração de sindicato' }] }
    ] },
  { id: 'bpc', nome: 'BPC/LOAS',
    descricao: 'Benefício assistencial para pessoa idosa (65 anos ou mais) ou com deficiência, com renda familiar baixa.',
    grupos: [
      pessoais([{ id: 'repres', texto: 'Documentos do representante legal ou curador, se houver' }]),
      { titulo: 'CadÚnico e renda da família', itens: [
        { id: 'cadunico', texto: 'Comprovante de inscrição no CadÚnico, com dados atualizados', dica: 'A atualização costuma ser exigida a cada 2 anos.' },
        { id: 'nis', texto: 'Número do NIS' },
        { id: 'fam-docs', texto: 'Documentos de identificação de todas as pessoas que moram na casa' },
        { id: 'fam-renda', texto: 'Comprovantes de renda de quem mora na casa (ou declaração de que não há renda)' }] },
      { titulo: 'Comprovação da condição', itens: [
        { id: 'idade', texto: 'Para pessoa idosa: documento que comprove a idade (65 anos ou mais)' },
        { id: 'laudo', texto: 'Para pessoa com deficiência: relatório médico com CID e descrição das limitações' },
        { id: 'exames', texto: 'Exames, laudos, receitas e comprovantes de tratamento' }] }
    ] },
  { id: 'incapacidade', nome: 'Benefício por incapacidade (auxílio-doença)',
    descricao: 'Para quem está sem conseguir trabalhar por doença ou acidente.',
    grupos: [
      pessoais(),
      { titulo: 'Documentos médicos', itens: [
        { id: 'relatorio', texto: 'Relatório ou atestado médico atual, com CID e descrição das limitações para o trabalho', dica: 'Peça que o médico explique como a doença impede a sua atividade.' },
        { id: 'exames', texto: 'Exames e laudos' },
        { id: 'receitas', texto: 'Receitas e comprovantes de tratamento' },
        { id: 'internacao', texto: 'Comprovantes de internação, cirurgia ou fisioterapia, se houver' },
        { id: 'pericias', texto: 'Perícias ou decisões anteriores do INSS, se houver' }] },
      { titulo: 'Trabalho e contribuições', itens: [
        { id: 'cnis', texto: 'Extrato CNIS atualizado' },
        { id: 'ctps', texto: 'Carteira de trabalho' },
        { id: 'carnes', texto: 'Carnês e guias de contribuição pagos' },
        { id: 'cat', texto: 'Comunicação de acidente de trabalho (CAT), se for o caso' },
        { id: 'bo', texto: 'Boletim de ocorrência, em caso de acidente, se houver' }] }
    ] },
  { id: 'revisao', nome: 'Revisão de benefício',
    descricao: 'Para conferir se o benefício foi concedido com o valor ou o tempo corretos.',
    grupos: [
      pessoais(),
      { titulo: 'Sobre o benefício atual', itens: [
        { id: 'carta', texto: 'Carta de concessão do benefício' },
        { id: 'memoria', texto: 'Memória de cálculo, se disponível' },
        { id: 'hiscre', texto: 'Histórico de créditos do benefício (extrato de pagamento)' },
        { id: 'processo', texto: 'Cópia do processo administrativo de concessão', dica: 'Pode ser solicitada ao INSS.' }] },
      { titulo: 'Provas do que ficou de fora', itens: [
        { id: 'cnis', texto: 'Extrato CNIS atualizado' },
        { id: 'ctps', texto: 'Carteira(s) de trabalho' },
        { id: 'contracheques', texto: 'Contracheques ou comprovantes de remuneração' },
        { id: 'ppp', texto: 'PPP e laudos, se houver atividade especial' },
        { id: 'carnes', texto: 'Carnês e guias de contribuição' }] }
    ] },
  { id: 'pensao', nome: 'Pensão por morte',
    descricao: 'Para dependentes de pessoa falecida que contribuía ou recebia benefício do INSS.',
    grupos: [
      pessoais(),
      { titulo: 'Sobre a pessoa falecida', itens: [
        { id: 'obito', texto: 'Certidão de óbito' },
        { id: 'doc-fal', texto: 'Documentos pessoais da pessoa falecida (RG e CPF)' },
        { id: 'ctps-fal', texto: 'Carteira de trabalho, CNIS ou carnês de contribuição' },
        { id: 'benef-fal', texto: 'Documentos do benefício que recebia, se aposentado ou pensionista' }] },
      { titulo: 'Comprovação do vínculo dos dependentes', itens: [
        { id: 'casamento', texto: 'Certidão de casamento (com averbações, se houver)' },
        { id: 'uniao', texto: 'Provas de união estável: documentos em comum, conta conjunta, dependência em planos, fotos, declarações' },
        { id: 'filhos', texto: 'Certidão de nascimento dos filhos' },
        { id: 'dep-doc', texto: 'Documentos de identificação de todos os dependentes' }] }
    ] },
  { id: 'negado', nome: 'Benefício negado (indeferido)',
    descricao: 'Para quem recebeu uma negativa e quer organizar o recurso, um novo pedido ou a análise do caso.',
    grupos: [
      pessoais(),
      { titulo: 'Sobre a decisão', itens: [
        { id: 'carta', texto: 'Carta ou aviso de decisão, com o motivo da negativa' },
        { id: 'protocolo', texto: 'Número do protocolo ou do requerimento' },
        { id: 'ciencia', texto: 'Comprovante da data em que você tomou ciência', dica: 'Por exemplo, imagem da tela do Meu INSS ou o aviso recebido.' },
        { id: 'processo', texto: 'Cópia do processo administrativo' }] },
      { titulo: 'Documentos que podem ter faltado', itens: [
        { id: 'novos', texto: 'Documentos novos que respondam ao motivo da negativa' },
        { id: 'cnis', texto: 'Extrato CNIS atualizado' },
        { id: 'medicos', texto: 'Relatórios e exames médicos atuais, se for benefício por incapacidade' },
        { id: 'ctps', texto: 'Carteira de trabalho e carnês de contribuição' }] }
    ] }
];

/* =====================================================================
   3) ASSISTENTE  (perguntas e respostas prontas)
   "opcoes" -> cada uma aponta para outro nó em "vai".
   "fim: true" -> mostra a orientação. calc: contrib | prazo | bpc.  guia: id da situação.
   ===================================================================== */
var ASS = { inicio: 'inicio', nos: {
  inicio: { pergunta: 'Qual é a sua situação hoje?', ajuda: 'Escolha a opção mais próxima do seu caso. Você pode voltar e mudar a resposta quando quiser.',
    opcoes: [
      { texto: 'Meu benefício foi negado pelo INSS', vai: 'neg1' },
      { texto: 'Quero saber quando posso me aposentar', vai: 'apo1' },
      { texto: 'Estou sem conseguir trabalhar por doença ou acidente', vai: 'inc1' },
      { texto: 'Tenho dúvidas sobre o BPC/LOAS', vai: 'bpc1' },
      { texto: 'Acho que meu benefício está errado', vai: 'rev1' },
      { texto: 'Perdi alguém da família e quero saber da pensão', vai: 'pen1' } ] },

  neg1: { pergunta: 'Você já recebeu a carta ou o aviso de decisão do INSS?',
    opcoes: [ { texto: 'Sim, já tenho a decisão', vai: 'neg2' }, { texto: 'Ainda não recebi', vai: 'f_neg_sem' } ] },
  neg2: { pergunta: 'Quando você tomou conhecimento da decisão?', ajuda: 'O recurso administrativo costuma ter prazo de 30 dias corridos a partir da ciência da decisão.',
    opcoes: [ { texto: 'Há menos de 30 dias', vai: 'f_neg_prazo' }, { texto: 'Há mais de 30 dias', vai: 'f_neg_venc' }, { texto: 'Não me lembro da data', vai: 'f_neg_data' } ] },
  f_neg_sem: { fim: true, titulo: 'Comece descobrindo o resultado do pedido',
    resumo: 'Antes de pensar em recurso, é preciso saber o que foi decidido e por quê.',
    passos: ['Entre no Meu INSS e consulte o andamento do seu pedido.', 'Procure a decisão e o motivo, se já houver resultado.', 'Anote o número do protocolo e a data em que você viu a decisão.', 'Se houver exigência pendente, verifique o prazo para cumpri-la.'],
    alerta: 'Prazos de exigência e de recurso começam a contar a partir da ciência. Não deixe para depois.', guia: 'negado' },
  f_neg_prazo: { fim: true, titulo: 'Você pode estar dentro do prazo para recorrer',
    resumo: 'Se a ciência da decisão foi há menos de 30 dias, ainda pode haver tempo para o recurso administrativo.',
    passos: ['Descubra a data limite na calculadora de prazo.', 'Leia o motivo da negativa na carta de decisão.', 'Reúna documentos que respondam a esse motivo.', 'Busque orientação profissional para avaliar o recurso, um novo pedido ou a via judicial.'],
    alerta: 'Confirme sempre a data na própria decisão. Quanto menos tempo restar, mais urgente é a análise.', guia: 'negado', calc: 'prazo' },
  f_neg_venc: { fim: true, titulo: 'O prazo do recurso pode ter passado, mas ainda pode haver caminhos',
    resumo: 'Mesmo com o prazo vencido, é possível que existam alternativas, como um novo requerimento ou a discussão judicial.',
    passos: ['Reúna a carta de decisão e o processo administrativo.', 'Verifique se há documentos novos que possam mudar o resultado.', 'Avalie com um profissional se compensa novo pedido ou ação judicial.'],
    alerta: 'Um novo pedido pode mudar a data de início do benefício. Avalie antes de decidir.', guia: 'negado' },
  f_neg_data: { fim: true, titulo: 'Primeiro, descubra a data da ciência',
    resumo: 'A data em que você tomou conhecimento da decisão define o prazo para recorrer.',
    passos: ['Procure o aviso recebido ou a tela do Meu INSS com a decisão.', 'Use a calculadora de prazo assim que encontrar a data.', 'Se não conseguir descobrir a data, procure orientação rapidamente.'],
    alerta: 'Na dúvida, trate o caso como urgente.', guia: 'negado', calc: 'prazo' },

  apo1: { pergunta: 'Você já conferiu o seu extrato CNIS no Meu INSS?', ajuda: 'O CNIS mostra os vínculos e contribuições que o INSS reconhece.',
    opcoes: [ { texto: 'Sim, já conferi', vai: 'apo2' }, { texto: 'Ainda não', vai: 'f_apo_cnis' } ] },
  apo2: { pergunta: 'Você já contribuía para o INSS antes de 13 de novembro de 2019?', ajuda: 'Essa data separa quem pode ter regras de transição de quem segue as regras novas.',
    opcoes: [ { texto: 'Sim', vai: 'f_apo_trans' }, { texto: 'Não, comecei depois', vai: 'f_apo_novas' }, { texto: 'Não tenho certeza', vai: 'f_apo_cnis' } ] },
  f_apo_cnis: { fim: true, titulo: 'O primeiro passo é conferir o CNIS',
    resumo: 'Sem saber o que o INSS reconhece, qualquer estimativa de aposentadoria fica incerta.',
    passos: ['Baixe o extrato CNIS no Meu INSS.', 'Compare cada vínculo e remuneração com a carteira de trabalho e os contracheques.', 'Anote o que está faltando ou errado.', 'Estime o seu tempo de contribuição na calculadora.'],
    guia: 'aposentadoria', calc: 'contrib' },
  f_apo_trans: { fim: true, titulo: 'Você pode se enquadrar em regras de transição',
    resumo: 'Quem já contribuía antes da Reforma pode ter caminhos diferentes, e a melhor regra depende do histórico.',
    passos: ['Estime o seu tempo de contribuição.', 'Separe documentos de períodos especiais ou rurais, se houver.', 'Peça uma análise individual para comparar as regras de transição aplicáveis.'],
    alerta: 'Pedir cedo demais ou na regra errada pode reduzir o valor. Vale comparar antes.', guia: 'aposentadoria', calc: 'contrib' },
  f_apo_novas: { fim: true, titulo: 'Valem as regras permanentes da Reforma',
    resumo: 'Para quem começou a contribuir depois da Reforma, as exigências de idade e tempo seguem as regras novas.',
    passos: ['Confira o CNIS e acompanhe o seu tempo de contribuição.', 'Mantenha as contribuições em dia e guarde os comprovantes.', 'Peça um planejamento para identificar a melhor data para o pedido.'],
    guia: 'aposentadoria', calc: 'contrib' },

  inc1: { pergunta: 'Você contribui ou já contribuiu para o INSS?', ajuda: 'Isso inclui trabalho com carteira assinada, contribuições como autônomo e como MEI.',
    opcoes: [ { texto: 'Sim, contribuo ou contribuí', vai: 'inc2' }, { texto: 'Não, nunca contribuí', vai: 'f_inc_sem' } ] },
  inc2: { pergunta: 'Você tem relatório e exames médicos atuais que expliquem a limitação para o trabalho?',
    opcoes: [ { texto: 'Sim, tenho', vai: 'f_inc_ok' }, { texto: 'Ainda não', vai: 'f_inc_docs' } ] },
  f_inc_sem: { fim: true, titulo: 'Talvez o caminho seja outro',
    resumo: 'O benefício por incapacidade depende de contribuições. Para quem tem renda familiar baixa e deficiência de longo prazo, o BPC/LOAS pode ser avaliado.',
    passos: ['Responda às perguntas sobre o BPC/LOAS no assistente.', 'Faça a conta da renda por pessoa na calculadora.', 'Peça uma análise para confirmar qual benefício se encaixa melhor.'],
    guia: 'bpc', calc: 'bpc' },
  f_inc_docs: { fim: true, titulo: 'Reúna a documentação médica antes do pedido',
    resumo: 'A perícia analisa a incapacidade. Relatórios claros fazem diferença.',
    passos: ['Consulte o médico que acompanha você e peça relatório com CID e descrição das limitações para a sua atividade.', 'Junte exames, laudos e receitas.', 'Confira o CNIS para verificar a qualidade de segurado e a carência.'],
    alerta: 'Se o afastamento é recente, não deixe de procurar atendimento médico e guardar tudo.', guia: 'incapacidade' },
  f_inc_ok: { fim: true, titulo: 'Você já tem uma boa base para o pedido',
    resumo: 'Com a documentação médica em mãos, falta conferir as contribuições e organizar o restante.',
    passos: ['Confira o CNIS (qualidade de segurado e carência).', 'Organize os documentos em ordem e guarde cópias.', 'Compareça à perícia com toda a documentação.', 'Se houver negativa, observe o prazo para recorrer.'],
    guia: 'incapacidade' },

  bpc1: { pergunta: 'O pedido é para quem?',
    opcoes: [ { texto: 'Pessoa idosa (65 anos ou mais)', vai: 'bpc2' }, { texto: 'Pessoa com deficiência', vai: 'bpc2' } ] },
  bpc2: { pergunta: 'A pessoa está inscrita no CadÚnico, com os dados atualizados?',
    opcoes: [ { texto: 'Sim', vai: 'bpc3' }, { texto: 'Não, ou não sei', vai: 'f_bpc_cad' } ] },
  bpc3: { pergunta: 'Você já calculou a renda por pessoa da casa?',
    opcoes: [ { texto: 'Sim', vai: 'f_bpc_ok' }, { texto: 'Ainda não', vai: 'f_bpc_calc' } ] },
  f_bpc_cad: { fim: true, titulo: 'Comece pelo CadÚnico',
    resumo: 'A inscrição atualizada no CadÚnico costuma ser exigida para o BPC/LOAS.',
    passos: ['Procure o CRAS do seu município para fazer ou atualizar a inscrição.', 'Leve os documentos de todas as pessoas que moram na casa.', 'Depois, faça a conta da renda por pessoa.'],
    guia: 'bpc', calc: 'bpc' },
  f_bpc_calc: { fim: true, titulo: 'Faça a conta da renda por pessoa',
    resumo: 'Em regra, a renda familiar por pessoa precisa ser inferior a 1/4 do salário mínimo.',
    passos: ['Some a renda de quem mora na casa.', 'Divida pelo número de pessoas.', 'Compare com o limite na calculadora.'],
    alerta: 'A análise real considera regras sobre quais rendas entram na conta. Use a calculadora apenas como referência.', guia: 'bpc', calc: 'bpc' },
  f_bpc_ok: { fim: true, titulo: 'Organize a documentação do pedido',
    resumo: 'Com o CadÚnico em dia e a renda conferida, o próximo passo é reunir as provas da idade ou da deficiência.',
    passos: ['Para pessoa com deficiência, reúna relatórios médicos com CID e descrição das limitações.', 'Para pessoa idosa, tenha o documento que comprove a idade.', 'Guarde comprovantes de renda e de moradia da família.', 'Procure orientação para avaliar o pedido e a avaliação social e médica.'],
    guia: 'bpc' },

  rev1: { pergunta: 'O que você acha que está errado?',
    opcoes: [ { texto: 'O valor está menor do que o esperado', vai: 'rev2' }, { texto: 'Períodos de trabalho ou contribuições não foram contados', vai: 'rev2' } ] },
  rev2: { pergunta: 'Há quanto tempo o benefício foi concedido?', ajuda: 'Existem prazos para pedir revisão, por isso a data importa.',
    opcoes: [ { texto: 'Há menos de 10 anos', vai: 'f_rev_prazo' }, { texto: 'Há mais de 10 anos', vai: 'f_rev_antigo' } ] },
  f_rev_prazo: { fim: true, titulo: 'Vale reunir os documentos e analisar',
    resumo: 'Se o benefício é relativamente recente, pode haver espaço para revisão, dependendo do caso.',
    passos: ['Peça cópia do processo e da memória de cálculo.', 'Confira o CNIS e compare com a carteira de trabalho e os contracheques.', 'Anote períodos ou salários que não foram considerados.', 'Peça uma análise para saber se há revisão possível.'],
    guia: 'revisao', calc: 'contrib' },
  f_rev_antigo: { fim: true, titulo: 'Pode haver limite de prazo, mas cada caso é diferente',
    resumo: 'Em regra, existe um prazo de 10 anos para revisar a concessão. Algumas situações têm tratamento diferente.',
    passos: ['Reúna a carta de concessão e os documentos que possui.', 'Peça uma análise individual para verificar o prazo aplicável ao seu caso.'],
    alerta: 'Não presuma que não há nada a fazer: algumas situações fogem da regra geral.', guia: 'revisao' },

  pen1: { pergunta: 'Há quanto tempo ocorreu o falecimento?', ajuda: 'O prazo do pedido pode influenciar a data de início da pensão.',
    opcoes: [ { texto: 'Há menos de 90 dias', vai: 'f_pen_90' }, { texto: 'Há mais de 90 dias', vai: 'f_pen_dep' } ] },
  f_pen_90: { fim: true, titulo: 'Vale agir logo para não perder valores',
    resumo: 'Em regra, pedir a pensão em até 90 dias do falecimento permite que ela seja paga desde a data do óbito.',
    passos: ['Separe a certidão de óbito e os documentos da pessoa falecida.', 'Reúna a comprovação do vínculo dos dependentes.', 'Faça o pedido ou procure orientação rapidamente.'],
    alerta: 'Os prazos e a duração da pensão dependem de quem é o dependente. Peça análise individual.', guia: 'pensao' },
  f_pen_dep: { fim: true, titulo: 'Ainda é possível pedir',
    resumo: 'Depois de 90 dias, a pensão ainda pode ser requerida, mas os pagamentos podem começar a contar apenas a partir do pedido.',
    passos: ['Reúna os documentos o quanto antes.', 'Confira a qualidade de segurado da pessoa falecida e a comprovação do vínculo.', 'Peça orientação para avaliar o caso.'],
    guia: 'pensao' }
} };

/* =====================================================================
   4) CATÁLOGO DA PESQUISA  (cadastre aqui artigos, perguntas e páginas)
   "url" pode ser um endereço do seu site ou "#guia", "#calc", "#ass", "#pend"
   (abre a aba da própria Central).
   ===================================================================== */
var CATALOGO = [
  // --- artigos (troque as url pelos endereços reais dos seus artigos) ---
  { tipo: 'Artigo', titulo: 'Benefício negado pelo INSS: primeiros passos',
    resumo: 'Veja o que conferir na carta de decisão, qual é o prazo para recorrer e quais caminhos podem existir.',
    url: 'ArtigosHtml/artigos.html', tags: 'benefício negado indeferimento recurso prazo INSS carta de decisão' },
  { tipo: 'Artigo', titulo: 'O que é o CNIS e por que conferir o seu',
    resumo: 'O CNIS reúne seus vínculos e contribuições. Entenda por que erros nele podem prejudicar a aposentadoria.',
    url: 'ArtigosHtml/artigos.html', tags: 'CNIS tempo de contribuição aposentadoria Meu INSS vínculos' },
  { tipo: 'Artigo', titulo: 'Regras de transição da previdência: o que muda?',
    resumo: 'Entenda como as regras de transição afetam a sua aposentadoria.',
    url: 'ArtigosHtml/artigos.html', tags: 'aposentadoria regras de transição reforma da previdência pontos pedágio' },
  { tipo: 'Artigo', titulo: 'Como solicitar benefício por incapacidade atualizado',
    resumo: 'Quais documentos são essenciais e como evitar o indeferimento do auxílio-doença no INSS.',
    url: 'ArtigosHtml/artigos.html', tags: 'incapacidade auxílio-doença perícia documentos afastamento' },
  // --- perguntas frequentes ---
  { tipo: 'Pergunta frequente', titulo: 'Quando procurar uma advogada previdenciária?',
    resumo: 'Quando houver dúvidas sobre pedidos, negativas, revisões ou planejamento de benefícios do INSS.',
    url: 'Perguntas.html', tags: 'advogada orientação' },
  { tipo: 'Pergunta frequente', titulo: 'O que é o CNIS?',
    resumo: 'Cadastro do INSS com seus vínculos, remunerações e contribuições.',
    url: 'Perguntas.html', tags: 'CNIS vínculos contribuições' },
  { tipo: 'Pergunta frequente', titulo: 'Qual é o prazo para recorrer de uma negativa do INSS?',
    resumo: 'O recurso ordinário costuma ter prazo de 30 dias corridos a partir da ciência da decisão.',
    url: '#calc', tags: 'recurso prazo benefício negado indeferimento' },
  { tipo: 'Pergunta frequente', titulo: 'O que é carência?',
    resumo: 'Número mínimo de contribuições mensais exigido para certos benefícios.',
    url: 'Perguntas.html', tags: 'carência contribuições' },
  { tipo: 'Pergunta frequente', titulo: 'Quem pode receber o BPC/LOAS?',
    resumo: 'Em regra, pessoas idosas ou com deficiência com renda familiar por pessoa inferior a 1/4 do salário mínimo.',
    url: '#calc', tags: 'BPC LOAS CadÚnico renda idoso deficiência' },
  { tipo: 'Pergunta frequente', titulo: 'Posso pedir revisão do meu benefício?',
    resumo: 'Em alguns casos, sim. Existem prazos, por isso a análise não deve ser adiada.',
    url: '#ass', tags: 'revisão benefício errado valor' },
  // --- páginas do site ---
  { tipo: 'Página', titulo: 'Sobre a Taís Almeida', resumo: 'Conheça a advogada e o trabalho em advocacia previdenciária.', url: 'Sobre.html', tags: 'sobre advogada Taís Almeida' },
  { tipo: 'Página', titulo: 'Planejamentos previdenciários', resumo: 'Planejamento de aposentadoria e análise de regras de transição.', url: 'PlanejamentosHtml/planejamentos.html', tags: 'planejamento aposentadoria' },
  // --- ferramentas da Central Lex ---
  { tipo: 'Central Lex', titulo: 'Guia de documentos', resumo: 'Lista de documentos para aposentadoria, BPC/LOAS, incapacidade, revisão, pensão por morte e benefício negado.', url: '#guia', tags: 'documentos guia lista' },
  { tipo: 'Central Lex', titulo: 'Calculadoras', resumo: 'Tempo de contribuição, prazo de recurso e renda por pessoa para o BPC.', url: '#calc', tags: 'calculadora simulador tempo de contribuição prazo renda' },
  { tipo: 'Central Lex', titulo: 'Assistente de orientação inicial', resumo: 'Perguntas simples que indicam os próximos passos para a sua situação.', url: '#ass', tags: 'assistente orientação próximos passos' },
  { tipo: 'Central Lex', titulo: 'Organizador de pendências', resumo: 'Marque os documentos que você já tem, veja o que falta e imprima ou salve em PDF.', url: '#pend', tags: 'organizador checklist pendências imprimir' }
];
var SUGESTOES = ['CNIS', 'benefício negado', 'tempo de contribuição', 'BPC', 'prazo de recurso', 'pensão por morte'];

/* =====================================================================
   5) LÓGICA  (cálculos e busca; sem tocar na página)
   ===================================================================== */
var DIA = 86400000;
var DIAS_SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

function norm(s) {
  return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function lerData(iso) {                       // 'AAAA-MM-DD' -> ms UTC, NaN se inválida
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) return NaN;
  var ms = Date.UTC(+m[1], +m[2] - 1, +m[3]), d = new Date(ms);
  return (d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3]) ? ms : NaN;
}
function paraISO(ms) { return new Date(ms).toISOString().slice(0, 10); }
function hojeISO() {
  var d = new Date();
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}
function dataBR(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : ''; }
function moeda(n) { return Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function plural(n, a, b) { return n + ' ' + (n === 1 ? a : b); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

function somarContribuicao(periodos) {
  var faixas = [], invalidos = [], bruto = 0;
  periodos.forEach(function (p, i) {
    var a = lerData(p.inicio), b = lerData(p.fim);
    if (isNaN(a) || isNaN(b)) { invalidos.push({ i: i, motivo: 'incompleto' }); return; }
    if (b < a) { invalidos.push({ i: i, motivo: 'inverso' }); return; }
    faixas.push([a / DIA, b / DIA]); bruto += b / DIA - a / DIA + 1;
  });
  faixas.sort(function (x, y) { return x[0] - y[0]; });
  var uniao = [];
  faixas.forEach(function (f) {
    var u = uniao[uniao.length - 1];
    if (u && f[0] <= u[1]) { if (f[1] > u[1]) u[1] = f[1]; } else uniao.push([f[0], f[1]]);
  });
  var total = uniao.reduce(function (s, f) { return s + f[1] - f[0] + 1; }, 0);
  return { total: total, anos: Math.floor(total / 365), meses: Math.floor((total % 365) / 30), dias: (total % 365) % 30,
           sobrepostos: bruto - total, validos: faixas.length, invalidos: invalidos };
}
function prazoRecurso(cienciaISO, hoje) {      // 30 dias corridos; fim de semana -> segunda; sem feriados
  var c = lerData(cienciaISO);
  if (isNaN(c)) return null;
  var fim = c + 30 * DIA, original = fim, dow = new Date(fim).getUTCDay(), pror = false;
  if (dow === 6) { fim += 2 * DIA; pror = true; } else if (dow === 0) { fim += DIA; pror = true; }
  var rest = Math.round((fim - lerData(hoje)) / DIA);
  return { ultimo: paraISO(fim), semana: DIAS_SEMANA[new Date(fim).getUTCDay()], pror: pror, original: paraISO(original),
           restantes: rest, situacao: rest < 0 ? 'vencido' : rest === 0 ? 'ultimo' : 'dentro' };
}
function rendaPorPessoa(renda, pessoas, sm) {
  var r = Number(renda), p = Math.floor(Number(pessoas)), s = Number(sm);
  if (!(r >= 0) || !(p >= 1) || !(s > 0)) return null;
  var per = Math.round(r / p * 100) / 100, lim = Math.round(s / 4 * 100) / 100;
  return { per: per, lim: lim, abaixo: per < lim, dif: Math.round(Math.abs(per - lim) * 100) / 100 };
}
var INDICE = CATALOGO.map(function (c) {
  return { c: c, t: norm(c.titulo), g: norm(c.tags), r: norm(c.resumo) };
});
function buscar(q) {
  var termos = norm(q).split(' ').filter(function (t) { return t.length > 1; });
  if (!termos.length) return [];
  var lista = [];
  INDICE.forEach(function (d) {
    var casados = 0, pontos = 0;
    termos.forEach(function (t) {
      var p = 0;
      if (d.t.indexOf(t) > -1) p += 5;
      if (d.g.indexOf(t) > -1) p += 3;
      if (d.r.indexOf(t) > -1) p += 2;
      if (p) { casados++; pontos += p; }
    });
    if (casados) lista.push({ d: d.c, casados: casados, pontos: pontos });
  });
  lista.sort(function (a, b) { return b.casados - a.casados || b.pontos - a.pontos; });
  return lista.map(function (x) { return x.d; });
}

/* =====================================================================
   6) INTERFACE
   ===================================================================== */
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function situacao(id) { return SITUACOES.filter(function (s) { return s.id === id; })[0] || SITUACOES[0]; }
function preencherSel(sel) {
  sel.innerHTML = SITUACOES.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.nome) + '</option>'; }).join('');
}

/* ---------- abas ---------- */
var ABAS = ['guia', 'calc', 'ass', 'pend', 'pesq'];
function abrir(nome, foco) {
  if (ABAS.indexOf(nome) < 0) nome = 'guia';
  ABAS.forEach(function (n) {
    var on = n === nome, ab = $('#aba-' + n);
    ab.setAttribute('aria-selected', String(on));
    ab.tabIndex = on ? 0 : -1;
    $('#p-' + n).hidden = !on;
  });
  try { history.replaceState(null, '', '#' + nome); } catch (e) { }
  if (foco) {
    var h = $('#p-' + nome + ' h2');
    h.tabIndex = -1; h.focus();
    if (h.scrollIntoView) h.scrollIntoView({ block: 'start' });
  }
}
ABAS.forEach(function (n, i) {
  var ab = $('#aba-' + n);
  ab.addEventListener('click', function () { abrir(n); });
  ab.addEventListener('keydown', function (e) {
    var novo = null;
    if (e.key === 'ArrowRight') novo = (i + 1) % ABAS.length;
    else if (e.key === 'ArrowLeft') novo = (i + ABAS.length - 1) % ABAS.length;
    else if (e.key === 'Home') novo = 0;
    else if (e.key === 'End') novo = ABAS.length - 1;
    if (novo === null) return;
    e.preventDefault(); abrir(ABAS[novo]); $('#aba-' + ABAS[novo]).focus();
  });
});
window.addEventListener('hashchange', function () { abrir(location.hash.replace('#', '')); });

/* ---------- 1. guia ---------- */
var guiaSel = $('#guia-sel'), guiaSaida = $('#guia-saida');
preencherSel(guiaSel);
function renderGuia() {
  var s = situacao(guiaSel.value);
  var h = '<h3>' + esc(s.nome) + '</h3><p>' + esc(s.descricao) + '</p>';
  s.grupos.forEach(function (g) {
    h += '<h4>' + esc(g.titulo) + '</h4><ul class="cl-lista-docs">';
    g.itens.forEach(function (i) { h += '<li>' + esc(i.texto) + (i.dica ? '<small>' + esc(i.dica) + '</small>' : '') + '</li>'; });
    h += '</ul>';
  });
  h += '<div class="cl-acoes"><button type="button" class="cl-btn" data-ir="pend">Montar minha lista de pendências</button>' +
       '<button type="button" class="cl-btn cl-sec" data-ir="ass">Não sei por onde começar</button></div>' +
       '<p class="cl-nota">A lista é geral e pode variar conforme o caso. Nem todos os itens se aplicam a todas as pessoas.</p>';
  guiaSaida.innerHTML = h;
}
guiaSel.addEventListener('change', renderGuia);
guiaSaida.addEventListener('click', function (e) {
  var b = e.target.closest('[data-ir]');
  if (!b) return;
  var dest = b.getAttribute('data-ir');
  if (dest === 'pend') { pendSel.value = guiaSel.value; renderPend(); }
  abrir(dest, true);
});

/* ---------- 2. calculadoras ---------- */
var linhas = $('#contrib-linhas'), contador = 0;
function novaLinha() {
  var n = ++contador, d = document.createElement('div');
  d.className = 'cl-linha-periodo';
  d.innerHTML =
    '<div class="cl-campo"><label for="pd' + n + '">Descrição (opcional)</label><input type="text" id="pd' + n + '" placeholder="Ex.: empresa ou carnê"></div>' +
    '<div class="cl-campo"><label for="pi' + n + '">Início</label><input type="date" id="pi' + n + '"></div>' +
    '<div class="cl-campo"><label for="pf' + n + '">Fim</label><input type="date" id="pf' + n + '"></div>' +
    '<button type="button" class="cl-btn cl-sec" data-rem>Remover período</button>';
  linhas.appendChild(d);
  return d;
}
novaLinha();
$('#contrib-add').addEventListener('click', function () { $('input', novaLinha()).focus(); });
linhas.addEventListener('click', function (e) {
  var b = e.target.closest('[data-rem]');
  if (!b) return;
  var l = b.closest('.cl-linha-periodo');
  if (linhas.children.length === 1) $$('input', l).forEach(function (i) { i.value = ''; });
  else l.parentNode.removeChild(l);
  $('#contrib-saida').innerHTML = '';
});
$('#contrib-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var periodos = [], pos = [];
  $$('.cl-linha-periodo', linhas).forEach(function (l, idx) {
    var ins = $$('input', l);
    if (!ins[1].value && !ins[2].value) return;
    periodos.push({ inicio: ins[1].value, fim: ins[2].value }); pos.push(idx + 1);
  });
  var saida = $('#contrib-saida');
  if (!periodos.length) { saida.innerHTML = '<div class="cl-caixa cl-erro"><p>Informe pelo menos um período, com data de início e de fim.</p></div>'; return; }
  var r = somarContribuicao(periodos);
  var avisos = r.invalidos.map(function (x) {
    return '<li>Período ' + pos[x.i] + ': ' + (x.motivo === 'inverso' ? 'a data final é anterior à inicial, e o período foi ignorado.' : 'preencha as duas datas. O período foi ignorado.') + '</li>';
  }).join('');
  if (!r.validos) { saida.innerHTML = '<div class="cl-caixa cl-erro"><p>Não foi possível calcular.</p><ul>' + avisos + '</ul></div>'; return; }
  saida.innerHTML =
    '<div class="cl-caixa cl-ok"><p><strong>Tempo estimado: ' + plural(r.anos, 'ano', 'anos') + ', ' + plural(r.meses, 'mês', 'meses') + ' e ' + plural(r.dias, 'dia', 'dias') +
    '</strong> (' + r.total.toLocaleString('pt-BR') + ' dias).</p>' +
    (r.sobrepostos > 0 ? '<p>Períodos que se sobrepõem foram contados uma única vez (' + plural(r.sobrepostos, 'dia descontado', 'dias descontados') + ').</p>' : '') + '</div>' +
    (avisos ? '<div class="cl-caixa cl-erro"><ul>' + avisos + '</ul></div>' : '') +
    '<div class="cl-caixa"><p><strong>Leia antes de usar o resultado:</strong> é uma estimativa simples. Considera 1 ano = 365 dias e 1 mês = 30 dias e não inclui conversão de tempo especial, carência, qualidade de segurado, regras de transição nem o valor do benefício. O INSS pode reconhecer um tempo diferente. O resultado não garante direito a nenhum benefício.</p></div>';
});

$('#prazo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var saida = $('#prazo-saida'), r = prazoRecurso($('#prazo-data').value, hojeISO());
  if (!r) { saida.innerHTML = '<div class="cl-caixa cl-erro"><p>Informe a data em que você tomou conhecimento da decisão.</p></div>'; return; }
  var cls, frase;
  if (r.situacao === 'vencido') { cls = 'cl-erro'; frase = 'Pela contagem estimada, o prazo terminou há ' + plural(Math.abs(r.restantes), 'dia', 'dias') + '. Mesmo assim, podem existir outros caminhos. Procure orientação.'; }
  else if (r.situacao === 'ultimo') { cls = 'cl-erro'; frase = 'Pela contagem estimada, <strong>hoje é o último dia</strong>. Procure orientação imediatamente.'; }
  else { cls = r.restantes <= 7 ? '' : 'cl-ok'; frase = 'Faltam ' + plural(r.restantes, 'dia', 'dias') + (r.restantes <= 7 ? '. O prazo está próximo: não deixe para a última hora.' : '.'); }
  saida.innerHTML =
    '<div class="cl-caixa ' + cls + '"><p><strong>Data limite estimada: ' + r.semana + ', ' + dataBR(r.ultimo) + '.</strong></p><p>' + frase + '</p>' +
    (r.pror ? '<p>O 30º dia (' + dataBR(r.original) + ') cai em fim de semana, por isso a data foi levada para a segunda-feira seguinte.</p>' : '') + '</div>' +
    '<div class="cl-caixa"><p><strong>Atenção:</strong> a conta usa 30 dias corridos a partir do dia seguinte à ciência e <strong>não considera feriados</strong>. O prazo pode variar conforme o tipo de recurso e o que consta na decisão. Confira a data na própria carta do INSS e, na dúvida, não espere.</p></div>';
});

$('#bpc-sm').value = CONFIG.salarioMinimo.toFixed(2);
$('#bpc-sm-ano').textContent = CONFIG.salarioMinimoAno;
$('#bpc-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var saida = $('#bpc-saida');
  var r = rendaPorPessoa($('#bpc-renda').value, $('#bpc-pessoas').value, $('#bpc-sm').value);
  if (!r) { saida.innerHTML = '<div class="cl-caixa cl-erro"><p>Preencha a renda total, o número de pessoas (pelo menos 1) e o salário mínimo.</p></div>'; return; }
  var txt = r.abaixo
    ? 'Pela conta simples, a renda por pessoa está <strong>abaixo</strong> do limite de 1/4 do salário mínimo (' + moeda(r.dif) + ' a menos). Isso é apenas um indicativo e não garante o benefício.'
    : 'Pela conta simples, a renda por pessoa está <strong>igual ou acima</strong> do limite de 1/4 do salário mínimo (' + moeda(r.dif) + ' a mais). Em alguns casos outros fatores são considerados, por isso vale uma análise individual.';
  saida.innerHTML =
    '<div class="cl-caixa ' + (r.abaixo ? 'cl-ok' : '') + '"><p><strong>Renda por pessoa: ' + moeda(r.per) + '</strong> &middot; limite de 1/4: ' + moeda(r.lim) + '.</p><p>' + txt + '</p></div>' +
    '<div class="cl-caixa"><p><strong>Atenção:</strong> o INSS analisa quais rendas entram na conta e também avalia a condição da pessoa (idade ou deficiência) e a situação social. Confirme o salário mínimo vigente e use este resultado só como referência.</p></div>';
});

/* ---------- 3. assistente ---------- */
var assCaixa = $('#ass-caixa'), hist = [ASS.inicio];
function irCalc(nome) {
  abrir('calc');
  var h = $('#t-' + nome);
  if (h) { h.focus(); if (h.scrollIntoView) h.scrollIntoView({ block: 'start' }); }
}
function renderAss(foco) {
  var no = ASS.nos[hist[hist.length - 1]], h = '';
  if (!no) { hist = [ASS.inicio]; return renderAss(foco); }
  if (!no.fim) {
    h += '<p class="cl-ass-prog">Pergunta ' + hist.length + '</p><h3 id="ass-tit" tabindex="-1">' + esc(no.pergunta) + '</h3>' +
         (no.ajuda ? '<p class="cl-ass-ajuda">' + esc(no.ajuda) + '</p>' : '') +
         '<div class="cl-ass-opcoes">' + no.opcoes.map(function (o, i) { return '<button type="button" class="cl-ass-opcao" data-op="' + i + '">' + esc(o.texto) + '</button>'; }).join('') + '</div>';
  } else {
    h += '<p class="cl-ass-prog">Orientação inicial</p><h3 id="ass-tit" tabindex="-1">' + esc(no.titulo) + '</h3><p>' + esc(no.resumo) + '</p>' +
         '<h4>Próximos passos</h4><ol class="cl-ass-passos">' + no.passos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
         (no.alerta ? '<div class="cl-caixa"><p>' + esc(no.alerta) + '</p></div>' : '') +
         '<div class="cl-acoes">' +
         (no.calc ? '<button type="button" class="cl-btn" data-calc="' + no.calc + '">Abrir a calculadora</button>' : '') +
         (no.guia ? '<button type="button" class="cl-btn cl-sec" data-guia="' + no.guia + '">Ver documentos necessários</button><button type="button" class="cl-btn cl-sec" data-pend="' + no.guia + '">Montar lista de pendências</button>' : '') +
         '</div><div class="cl-acoes"><a class="cl-btn" href="' + esc(CONFIG.paginaContato) + '">Enviar minha dúvida</a>' +
         '<a class="cl-btn cl-sec" href="' + esc(CONFIG.whatsapp) + '" target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a></div>' +
         '<p class="cl-nota">Esta orientação é geral e não substitui a análise do seu caso por um profissional.</p>';
  }
  if (hist.length > 1) h += '<div class="cl-acoes"><button type="button" class="cl-btn cl-sec" data-voltar>&larr; Voltar</button><button type="button" class="cl-btn cl-sec" data-recomecar>Recomeçar</button></div>';
  assCaixa.innerHTML = h;
  if (foco) $('#ass-tit').focus();
}
assCaixa.addEventListener('click', function (e) {
  var t = e.target, b;
  if ((b = t.closest('[data-op]'))) { hist.push(ASS.nos[hist[hist.length - 1]].opcoes[+b.getAttribute('data-op')].vai); renderAss(true); }
  else if (t.closest('[data-voltar]')) { hist.pop(); renderAss(true); }
  else if (t.closest('[data-recomecar]')) { hist = [ASS.inicio]; renderAss(true); }
  else if ((b = t.closest('[data-calc]'))) irCalc(b.getAttribute('data-calc'));
  else if ((b = t.closest('[data-guia]'))) { guiaSel.value = b.getAttribute('data-guia'); renderGuia(); abrir('guia', true); }
  else if ((b = t.closest('[data-pend]'))) { pendSel.value = b.getAttribute('data-pend'); renderPend(); abrir('pend', true); }
});

/* ---------- 4. organizador (salva no navegador) ---------- */
var pendSel = $('#pend-sel'), pendLista = $('#pend-lista'), pendNome = $('#pend-nome');
var pend = { feitos: {}, extras: [], nome: '' };
preencherSel(pendSel);
function chave() { return 'lexCentral:' + pendSel.value; }
function carregar() {
  var g = null;
  try { g = JSON.parse(localStorage.getItem(chave())); } catch (e) { }
  pend = g || {}; pend.feitos = pend.feitos || {}; pend.extras = pend.extras || []; pend.nome = pend.nome || '';
}
function salvar() { try { localStorage.setItem(chave(), JSON.stringify(pend)); } catch (e) { } }
function itensPend() {
  var it = [];
  situacao(pendSel.value).grupos.forEach(function (g) {
    g.itens.forEach(function (i) { it.push({ id: 'g:' + i.id, texto: i.texto, dica: i.dica, grupo: g.titulo }); });
  });
  pend.extras.forEach(function (x) { it.push({ id: 'e:' + x.id, texto: x.texto, grupo: 'Itens adicionados por você', extra: x.id }); });
  return it;
}
function progresso() {
  var it = itensPend(), f = it.filter(function (i) { return pend.feitos[i.id]; }).length;
  $('#pend-barra').max = it.length; $('#pend-barra').value = f;
  $('#pend-texto').textContent = f + ' de ' + it.length + ' itens já reunidos. Faltam ' + (it.length - f) + '.';
}
function renderPend() {
  carregar();
  var ordem = [], por = {};
  itensPend().forEach(function (i) { if (!por[i.grupo]) { por[i.grupo] = []; ordem.push(i.grupo); } por[i.grupo].push(i); });
  pendLista.innerHTML = ordem.map(function (nome) {
    return '<fieldset class="cl-pend-grupo"><legend>' + esc(nome) + '</legend><ul class="cl-pend-itens">' + por[nome].map(function (i) {
      var cid = 'chk-' + i.id.replace(/[^a-z0-9]/gi, '-');
      return '<li class="cl-pend-item"><input type="checkbox" id="' + cid + '" data-id="' + esc(i.id) + '"' + (pend.feitos[i.id] ? ' checked' : '') + '>' +
        '<label for="' + cid + '">' + esc(i.texto) + (i.dica ? '<small>' + esc(i.dica) + '</small>' : '') + '</label>' +
        (i.extra ? '<button type="button" class="cl-chip cl-nao-print" data-rem-extra="' + esc(i.extra) + '" aria-label="Remover item: ' + esc(i.texto) + '">Remover</button>' : '') + '</li>';
    }).join('') + '</ul></fieldset>';
  }).join('');
  pendNome.value = pend.nome;
  progresso();
}
pendLista.addEventListener('change', function (e) {
  var c = e.target.closest('input[type=checkbox]');
  if (!c) return;
  pend.feitos[c.getAttribute('data-id')] = c.checked; salvar(); progresso();
});
pendLista.addEventListener('click', function (e) {
  var b = e.target.closest('[data-rem-extra]');
  if (!b) return;
  var id = b.getAttribute('data-rem-extra');
  pend.extras = pend.extras.filter(function (x) { return String(x.id) !== id; });
  delete pend.feitos['e:' + id]; salvar(); renderPend(); $('#pend-extra-txt').focus();
});
pendSel.addEventListener('change', renderPend);
pendNome.addEventListener('input', function () { pend.nome = pendNome.value; salvar(); });
$('#pend-extra-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var c = $('#pend-extra-txt'), t = c.value.trim();
  if (!t) { c.focus(); return; }
  pend.extras.push({ id: Date.now(), texto: t }); salvar(); c.value = ''; renderPend(); c.focus();
});
$('#pend-print').addEventListener('click', function () {
  $('#print-tit').textContent = 'Lista de documentos: ' + situacao(pendSel.value).nome;
  $('#print-nome').textContent = pend.nome ? 'Nome: ' + pend.nome : '';
  $('#print-data').textContent = 'Emitida em ' + dataBR(hojeISO());
  window.print();
});
$('#pend-limpar').addEventListener('click', function () {
  if (!window.confirm('Desmarcar todos os itens e apagar os itens adicionados por você nesta lista?')) return;
  pend.feitos = {}; pend.extras = []; salvar(); renderPend();
});

/* ---------- 5. pesquisa ---------- */
var pesqQ = $('#pesq-q'), pesqRes = $('#pesq-res'), pesqStatus = $('#pesq-status'), timer = null;
$('#pesq-sug').innerHTML = SUGESTOES.map(function (s) { return '<button type="button" class="cl-chip" data-termo="' + esc(s) + '">' + esc(s) + '</button>'; }).join('');
function pesquisar() {
  var q = pesqQ.value.trim();
  if (norm(q).length < 2) { pesqRes.innerHTML = ''; pesqStatus.textContent = q ? 'Digite pelo menos 2 letras.' : ''; return; }
  var a = buscar(q);
  if (!a.length) {
    pesqRes.innerHTML = '<li class="cl-vazio">Nenhum resultado para <strong>' + esc(q) + '</strong>. Tente outra palavra ou <a href="' + esc(CONFIG.whatsapp) + '" target="_blank" rel="noopener noreferrer">fale pelo WhatsApp</a>.</li>';
    pesqStatus.textContent = 'Nenhum resultado.'; return;
  }
  pesqRes.innerHTML = a.slice(0, 20).map(function (d) {
    var interno = d.url.charAt(0) === '#';
    return '<li class="cl-res"><span class="cl-selo">' + esc(d.tipo) + '</span><h3><a href="' + esc(d.url) + '"' + (interno ? ' data-aba="' + esc(d.url.slice(1)) + '"' : '') + '>' + esc(d.titulo) + '</a></h3><p>' + esc(d.resumo) + '</p></li>';
  }).join('');
  pesqStatus.textContent = a.length === 1 ? '1 resultado.' : a.length + ' resultados.';
}
$('#pesq-form').addEventListener('submit', function (e) { e.preventDefault(); pesquisar(); });
pesqQ.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(pesquisar, 250); });
$('#pesq-sug').addEventListener('click', function (e) {
  var b = e.target.closest('[data-termo]');
  if (!b) return;
  pesqQ.value = b.getAttribute('data-termo'); pesquisar(); pesqQ.focus();
});
pesqRes.addEventListener('click', function (e) {
  var a = e.target.closest('[data-aba]');
  if (!a) return;
  e.preventDefault(); abrir(a.getAttribute('data-aba'), true);
});

/* ---------- início ---------- */
renderGuia(); renderPend(); renderAss(false);
var params = new URLSearchParams(location.search), q0 = params.get('q');
if (q0) { pesqQ.value = q0; pesquisar(); }
abrir(location.hash.replace('#', '') || (q0 ? 'pesq' : 'guia'));
window.CentralLex = { somarContribuicao: somarContribuicao, prazoRecurso: prazoRecurso, rendaPorPessoa: rendaPorPessoa, buscar: buscar, ASS: ASS, SITUACOES: SITUACOES, CATALOGO: CATALOGO };
})();
