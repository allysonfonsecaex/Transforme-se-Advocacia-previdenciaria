/* Dados editáveis da Central Lex: guia de documentos e árvore do assistente.
   Os textos são informativos e genéricos; revise com a sua prática antes de publicar. */
(function (g) {
  'use strict';
  var LEX = g.LEX = g.LEX || {};

  /* ---------- GUIA DE DOCUMENTOS ----------
     Cada situação tem grupos, e cada grupo tem itens (id único dentro da situação).
     O Organizador de pendências usa esta mesma lista. */
  var pessoais = function (extra) {
    return {
      titulo: 'Documentos pessoais',
      itens: [
        { id: 'rg', texto: 'Documento de identidade com foto (RG ou CNH)' },
        { id: 'cpf', texto: 'CPF' },
        { id: 'res', texto: 'Comprovante de residência atualizado' },
        { id: 'banco', texto: 'Dados da conta bancária para recebimento', dica: 'Conta em seu nome.' }
      ].concat(extra || [])
    };
  };

  LEX.guia = {
    situacoes: [

      {
        id: 'aposentadoria',
        nome: 'Aposentadoria',
        descricao: 'Para pedir aposentadoria por idade, por tempo de contribuição ou por uma regra de transição.',
        grupos: [
          pessoais([
            { id: 'certidao', texto: 'Certidão de nascimento ou de casamento' },
            { id: 'nit', texto: 'Número do PIS/NIT', dica: 'Aparece na carteira de trabalho e no CNIS.' }
          ]),
          {
            titulo: 'Vínculos e contribuições',
            itens: [
              { id: 'cnis', texto: 'Extrato CNIS atualizado', dica: 'Disponível no Meu INSS.' },
              { id: 'ctps', texto: 'Carteira(s) de trabalho (todas, inclusive as antigas)' },
              { id: 'carnes', texto: 'Carnês e guias de contribuição (autônomo, facultativo, MEI)' },
              { id: 'contracheques', texto: 'Contracheques ou contratos, para períodos que não constam no CNIS' },
              { id: 'cert-outro', texto: 'Certidão de tempo de contribuição de outro regime, se houver', dica: 'Por exemplo, serviço público.' },
              { id: 'reservista', texto: 'Certificado de reservista ou de serviço militar, se houver' }
            ]
          },
          {
            titulo: 'Atividade especial ou rural (se for o caso)',
            itens: [
              { id: 'ppp', texto: 'PPP (Perfil Profissiográfico Previdenciário)', dica: 'Fornecido pela empresa onde houve exposição a agentes nocivos.' },
              { id: 'ltcat', texto: 'LTCAT ou laudos técnicos do ambiente de trabalho' },
              { id: 'rural', texto: 'Documentos da atividade rural: notas de produtor, documentos da terra, declaração de sindicato' }
            ]
          }
        ]
      },

      {
        id: 'bpc',
        nome: 'BPC/LOAS',
        descricao: 'Benefício assistencial para pessoa idosa (65 anos ou mais) ou com deficiência, com renda familiar baixa.',
        grupos: [
          pessoais([{ id: 'repres', texto: 'Documentos do representante legal ou curador, se houver' }]),
          {
            titulo: 'CadÚnico e renda da família',
            itens: [
              { id: 'cadunico', texto: 'Comprovante de inscrição no CadÚnico, com dados atualizados', dica: 'A atualização costuma ser exigida a cada 2 anos.' },
              { id: 'nis', texto: 'Número do NIS' },
              { id: 'fam-docs', texto: 'Documentos de identificação de todas as pessoas que moram na casa' },
              { id: 'fam-renda', texto: 'Comprovantes de renda de quem mora na casa (ou declaração de que não há renda)' }
            ]
          },
          {
            titulo: 'Comprovação da condição',
            itens: [
              { id: 'idade', texto: 'Para pessoa idosa: documento que comprove a idade (65 anos ou mais)' },
              { id: 'laudo', texto: 'Para pessoa com deficiência: relatório médico com CID e descrição das limitações' },
              { id: 'exames', texto: 'Exames, laudos, receitas e comprovantes de tratamento' }
            ]
          }
        ]
      },

      {
        id: 'incapacidade',
        nome: 'Benefício por incapacidade (auxílio-doença)',
        descricao: 'Para quem está sem conseguir trabalhar por doença ou acidente.',
        grupos: [
          pessoais(),
          {
            titulo: 'Documentos médicos',
            itens: [
              { id: 'relatorio', texto: 'Relatório ou atestado médico atual, com CID e descrição das limitações para o trabalho', dica: 'Peça que o médico explique como a doença impede a sua atividade.' },
              { id: 'exames', texto: 'Exames e laudos' },
              { id: 'receitas', texto: 'Receitas e comprovantes de tratamento' },
              { id: 'internacao', texto: 'Comprovantes de internação, cirurgia ou fisioterapia, se houver' },
              { id: 'pericias', texto: 'Perícias ou decisões anteriores do INSS, se houver' }
            ]
          },
          {
            titulo: 'Trabalho e contribuições',
            itens: [
              { id: 'cnis', texto: 'Extrato CNIS atualizado' },
              { id: 'ctps', texto: 'Carteira de trabalho' },
              { id: 'carnes', texto: 'Carnês e guias de contribuição pagos' },
              { id: 'cat', texto: 'Comunicação de acidente de trabalho (CAT), se for o caso' },
              { id: 'bo', texto: 'Boletim de ocorrência, em caso de acidente, se houver' }
            ]
          }
        ]
      },

      {
        id: 'revisao',
        nome: 'Revisão de benefício',
        descricao: 'Para conferir se o benefício foi concedido com o valor ou o tempo corretos.',
        grupos: [
          pessoais(),
          {
            titulo: 'Sobre o benefício atual',
            itens: [
              { id: 'carta', texto: 'Carta de concessão do benefício' },
              { id: 'memoria', texto: 'Memória de cálculo, se disponível' },
              { id: 'hiscre', texto: 'Histórico de créditos do benefício (extrato de pagamento)' },
              { id: 'processo', texto: 'Cópia do processo administrativo de concessão', dica: 'Pode ser solicitada ao INSS.' }
            ]
          },
          {
            titulo: 'Provas do que ficou de fora',
            itens: [
              { id: 'cnis', texto: 'Extrato CNIS atualizado' },
              { id: 'ctps', texto: 'Carteira(s) de trabalho' },
              { id: 'contracheques', texto: 'Contracheques ou comprovantes de remuneração' },
              { id: 'ppp', texto: 'PPP e laudos, se houver atividade especial' },
              { id: 'carnes', texto: 'Carnês e guias de contribuição' }
            ]
          }
        ]
      },

      {
        id: 'pensao',
        nome: 'Pensão por morte',
        descricao: 'Para dependentes de pessoa falecida que contribuía ou recebia benefício do INSS.',
        grupos: [
          pessoais(),
          {
            titulo: 'Sobre a pessoa falecida',
            itens: [
              { id: 'obito', texto: 'Certidão de óbito' },
              { id: 'doc-fal', texto: 'Documentos pessoais da pessoa falecida (RG e CPF)' },
              { id: 'ctps-fal', texto: 'Carteira de trabalho, CNIS ou carnês de contribuição' },
              { id: 'benef-fal', texto: 'Documentos do benefício que recebia, se aposentado ou pensionista' }
            ]
          },
          {
            titulo: 'Comprovação do vínculo dos dependentes',
            itens: [
              { id: 'casamento', texto: 'Certidão de casamento (com averbações, se houver)' },
              { id: 'uniao', texto: 'Provas de união estável: documentos em comum, conta conjunta, dependência em planos, fotos, declarações' },
              { id: 'filhos', texto: 'Certidão de nascimento dos filhos' },
              { id: 'dependente-doc', texto: 'Documentos de identificação de todos os dependentes' }
            ]
          }
        ]
      },

      {
        id: 'negado',
        nome: 'Benefício negado (indeferido)',
        descricao: 'Para quem recebeu uma negativa e quer organizar o recurso, um novo pedido ou a análise do caso.',
        grupos: [
          pessoais(),
          {
            titulo: 'Sobre a decisão',
            itens: [
              { id: 'carta', texto: 'Carta ou aviso de decisão, com o motivo da negativa' },
              { id: 'protocolo', texto: 'Número do protocolo ou do requerimento' },
              { id: 'ciencia', texto: 'Comprovante da data em que você tomou ciência', dica: 'Por exemplo, imagem da tela do Meu INSS ou o aviso recebido.' },
              { id: 'processo', texto: 'Cópia do processo administrativo' }
            ]
          },
          {
            titulo: 'Documentos que podem ter faltado',
            itens: [
              { id: 'novos', texto: 'Documentos novos que respondam ao motivo da negativa' },
              { id: 'cnis', texto: 'Extrato CNIS atualizado' },
              { id: 'medicos', texto: 'Relatórios e exames médicos atuais, se for benefício por incapacidade' },
              { id: 'ctps', texto: 'Carteira de trabalho e carnês de contribuição' }
            ]
          }
        ]
      }
    ]
  };

  /* ---------- ASSISTENTE DE ORIENTAÇÃO INICIAL ----------
     "pergunta" + "opcoes" (cada opção aponta para outro nó com "vai").
     Nós com "fim: true" mostram a orientação final.
     Campos de um final: titulo, resumo, passos[], alerta, guia (id da situação),
     calc ('contribuicao' | 'prazo' | 'bpc'). */
  LEX.assistente = {
    inicio: 'inicio',
    nos: {

      inicio: {
        pergunta: 'Qual é a sua situação hoje?',
        ajuda: 'Escolha a opção que mais se aproxima do seu caso. Você pode voltar e mudar a resposta a qualquer momento.',
        opcoes: [
          { texto: 'Meu benefício foi negado pelo INSS', vai: 'neg1' },
          { texto: 'Quero saber quando posso me aposentar', vai: 'apo1' },
          { texto: 'Estou sem conseguir trabalhar por doença ou acidente', vai: 'inc1' },
          { texto: 'Tenho dúvidas sobre o BPC/LOAS', vai: 'bpc1' },
          { texto: 'Acho que meu benefício está errado', vai: 'rev1' },
          { texto: 'Perdi alguém da família e quero saber da pensão', vai: 'pen1' }
        ]
      },

      /* --- benefício negado --- */
      neg1: {
        pergunta: 'Você já recebeu a carta ou o aviso de decisão do INSS?',
        opcoes: [
          { texto: 'Sim, já tenho a decisão', vai: 'neg2' },
          { texto: 'Ainda não recebi', vai: 'fim_neg_semcarta' }
        ]
      },
      neg2: {
        pergunta: 'Quando você tomou conhecimento da decisão?',
        ajuda: 'O recurso administrativo costuma ter prazo de 30 dias corridos a partir da ciência da decisão.',
        opcoes: [
          { texto: 'Há menos de 30 dias', vai: 'fim_neg_prazo' },
          { texto: 'Há mais de 30 dias', vai: 'fim_neg_vencido' },
          { texto: 'Não me lembro da data', vai: 'fim_neg_semdata' }
        ]
      },
      fim_neg_semcarta: {
        fim: true,
        titulo: 'Comece descobrindo o resultado do pedido',
        resumo: 'Antes de pensar em recurso, é preciso saber o que foi decidido e por quê.',
        passos: [
          'Entre no Meu INSS e consulte o andamento do seu pedido.',
          'Procure a decisão e o motivo, se já houver resultado.',
          'Anote o número do protocolo e a data em que você viu a decisão.',
          'Se houver exigência pendente, verifique o prazo para cumpri-la.'
        ],
        alerta: 'Prazos de exigência e de recurso começam a contar a partir da ciência. Não deixe para depois.',
        guia: 'negado'
      },
      fim_neg_prazo: {
        fim: true,
        titulo: 'Você pode estar dentro do prazo para recorrer',
        resumo: 'Se a ciência da decisão foi há menos de 30 dias, ainda pode haver tempo para o recurso administrativo.',
        passos: [
          'Descubra a data limite na calculadora de prazo.',
          'Leia o motivo da negativa na carta de decisão.',
          'Reúna documentos que respondam a esse motivo.',
          'Busque orientação profissional para avaliar o recurso, um novo pedido ou a via judicial.'
        ],
        alerta: 'Confirme sempre a data na própria decisão. Quanto menos tempo restar, mais urgente é a análise.',
        guia: 'negado',
        calc: 'prazo'
      },
      fim_neg_vencido: {
        fim: true,
        titulo: 'O prazo do recurso pode ter passado, mas ainda pode haver caminhos',
        resumo: 'Mesmo com o prazo vencido, é possível que existam alternativas, como um novo requerimento ou a discussão judicial.',
        passos: [
          'Reúna a carta de decisão e o processo administrativo.',
          'Verifique se há documentos novos que possam mudar o resultado.',
          'Avalie com um profissional se compensa novo pedido ou ação judicial.'
        ],
        alerta: 'Um novo pedido pode mudar a data de início do benefício. Avalie antes de decidir.',
        guia: 'negado'
      },
      fim_neg_semdata: {
        fim: true,
        titulo: 'Primeiro, descubra a data da ciência',
        resumo: 'A data em que você tomou conhecimento da decisão define o prazo para recorrer.',
        passos: [
          'Procure o aviso recebido ou a tela do Meu INSS com a decisão.',
          'Use a calculadora de prazo assim que encontrar a data.',
          'Se não conseguir descobrir a data, procure orientação rapidamente.'
        ],
        alerta: 'Na dúvida, trate o caso como urgente.',
        guia: 'negado',
        calc: 'prazo'
      },

      /* --- aposentadoria --- */
      apo1: {
        pergunta: 'Você já conferiu o seu extrato CNIS no Meu INSS?',
        ajuda: 'O CNIS mostra os vínculos e contribuições que o INSS reconhece.',
        opcoes: [
          { texto: 'Sim, já conferi', vai: 'apo2' },
          { texto: 'Ainda não', vai: 'fim_apo_cnis' }
        ]
      },
      apo2: {
        pergunta: 'Você já contribuía para o INSS antes de 13 de novembro de 2019?',
        ajuda: 'Essa data separa quem pode ter regras de transição de quem segue as regras novas.',
        opcoes: [
          { texto: 'Sim', vai: 'fim_apo_transicao' },
          { texto: 'Não, comecei depois', vai: 'fim_apo_novas' },
          { texto: 'Não tenho certeza', vai: 'fim_apo_cnis' }
        ]
      },
      fim_apo_cnis: {
        fim: true,
        titulo: 'O primeiro passo é conferir o CNIS',
        resumo: 'Sem saber o que o INSS reconhece, qualquer estimativa de aposentadoria fica incerta.',
        passos: [
          'Baixe o extrato CNIS no Meu INSS.',
          'Compare cada vínculo e remuneração com a carteira de trabalho e os contracheques.',
          'Anote o que está faltando ou errado.',
          'Estime o seu tempo de contribuição na calculadora.'
        ],
        guia: 'aposentadoria',
        calc: 'contribuicao'
      },
      fim_apo_transicao: {
        fim: true,
        titulo: 'Você pode se enquadrar em regras de transição',
        resumo: 'Quem já contribuía antes da Reforma pode ter caminhos diferentes, e a melhor regra depende do histórico.',
        passos: [
          'Estime o seu tempo de contribuição.',
          'Separe documentos de períodos especiais ou rurais, se houver.',
          'Peça uma análise individual para comparar as regras de transição aplicáveis.'
        ],
        alerta: 'Pedir cedo demais ou na regra errada pode reduzir o valor. Vale comparar antes.',
        guia: 'aposentadoria',
        calc: 'contribuicao'
      },
      fim_apo_novas: {
        fim: true,
        titulo: 'Valem as regras permanentes da Reforma',
        resumo: 'Para quem começou a contribuir depois da Reforma, as exigências de idade e tempo seguem as regras novas.',
        passos: [
          'Confira o CNIS e acompanhe o seu tempo de contribuição.',
          'Mantenha as contribuições em dia e guarde os comprovantes.',
          'Peça um planejamento para identificar a melhor data para o pedido.'
        ],
        guia: 'aposentadoria',
        calc: 'contribuicao'
      },

      /* --- incapacidade --- */
      inc1: {
        pergunta: 'Você contribui ou já contribuiu para o INSS?',
        ajuda: 'Isso inclui trabalho com carteira assinada, contribuições como autônomo e como MEI.',
        opcoes: [
          { texto: 'Sim, contribuo ou contribuí', vai: 'inc2' },
          { texto: 'Não, nunca contribuí', vai: 'fim_inc_semcontrib' }
        ]
      },
      inc2: {
        pergunta: 'Você tem relatório e exames médicos atuais que expliquem a limitação para o trabalho?',
        opcoes: [
          { texto: 'Sim, tenho', vai: 'fim_inc_ok' },
          { texto: 'Ainda não', vai: 'fim_inc_docs' }
        ]
      },
      fim_inc_semcontrib: {
        fim: true,
        titulo: 'Talvez o caminho seja outro',
        resumo: 'O benefício por incapacidade depende de contribuições. Para quem tem renda familiar baixa e deficiência de longo prazo, o BPC/LOAS pode ser avaliado.',
        passos: [
          'Veja as perguntas sobre o BPC/LOAS no assistente.',
          'Faça a conta da renda por pessoa na calculadora.',
          'Peça uma análise para confirmar qual benefício se encaixa melhor.'
        ],
        guia: 'bpc',
        calc: 'bpc'
      },
      fim_inc_docs: {
        fim: true,
        titulo: 'Reúna a documentação médica antes do pedido',
        resumo: 'A perícia analisa a incapacidade. Relatórios claros fazem diferença.',
        passos: [
          'Consulte o médico que acompanha você e peça relatório com CID e descrição das limitações para a sua atividade.',
          'Junte exames, laudos e receitas.',
          'Confira o CNIS para verificar a qualidade de segurado e a carência.'
        ],
        alerta: 'Se o afastamento é recente, não deixe de procurar atendimento médico e guardar tudo.',
        guia: 'incapacidade'
      },
      fim_inc_ok: {
        fim: true,
        titulo: 'Você já tem uma boa base para o pedido',
        resumo: 'Com a documentação médica em mãos, falta conferir as contribuições e organizar o restante.',
        passos: [
          'Confira o CNIS (qualidade de segurado e carência).',
          'Organize os documentos em ordem e guarde cópias.',
          'Compareça à perícia com toda a documentação.',
          'Se houver negativa, observe o prazo para recorrer.'
        ],
        guia: 'incapacidade'
      },

      /* --- BPC/LOAS --- */
      bpc1: {
        pergunta: 'O pedido é para quem?',
        opcoes: [
          { texto: 'Pessoa idosa (65 anos ou mais)', vai: 'bpc2' },
          { texto: 'Pessoa com deficiência', vai: 'bpc2' }
        ]
      },
      bpc2: {
        pergunta: 'A pessoa está inscrita no CadÚnico, com os dados atualizados?',
        opcoes: [
          { texto: 'Sim', vai: 'bpc3' },
          { texto: 'Não, ou não sei', vai: 'fim_bpc_cad' }
        ]
      },
      bpc3: {
        pergunta: 'Você já calculou a renda por pessoa da casa?',
        opcoes: [
          { texto: 'Sim', vai: 'fim_bpc_ok' },
          { texto: 'Ainda não', vai: 'fim_bpc_calc' }
        ]
      },
      fim_bpc_cad: {
        fim: true,
        titulo: 'Comece pelo CadÚnico',
        resumo: 'A inscrição atualizada no CadÚnico costuma ser exigida para o BPC/LOAS.',
        passos: [
          'Procure o CRAS do seu município para fazer ou atualizar a inscrição.',
          'Leve os documentos de todas as pessoas que moram na casa.',
          'Depois, faça a conta da renda por pessoa.'
        ],
        guia: 'bpc',
        calc: 'bpc'
      },
      fim_bpc_calc: {
        fim: true,
        titulo: 'Faça a conta da renda por pessoa',
        resumo: 'Em regra, a renda familiar por pessoa precisa ser inferior a 1/4 do salário mínimo.',
        passos: [
          'Some a renda de quem mora na casa.',
          'Divida pelo número de pessoas.',
          'Compare com o limite na calculadora.'
        ],
        alerta: 'A análise real considera regras sobre quais rendas entram na conta. Use a calculadora apenas como referência.',
        guia: 'bpc',
        calc: 'bpc'
      },
      fim_bpc_ok: {
        fim: true,
        titulo: 'Organize a documentação do pedido',
        resumo: 'Com o CadÚnico em dia e a renda conferida, o próximo passo é reunir as provas da idade ou da deficiência.',
        passos: [
          'Para pessoa com deficiência, reúna relatórios médicos com CID e descrição das limitações.',
          'Para pessoa idosa, tenha o documento que comprove a idade.',
          'Guarde comprovantes de renda e de moradia da família.',
          'Procure orientação para avaliar o pedido e a avaliação social e médica.'
        ],
        guia: 'bpc'
      },

      /* --- revisão --- */
      rev1: {
        pergunta: 'O que você acha que está errado?',
        opcoes: [
          { texto: 'O valor está menor do que o esperado', vai: 'rev2' },
          { texto: 'Períodos de trabalho ou contribuições não foram contados', vai: 'rev2' }
        ]
      },
      rev2: {
        pergunta: 'Há quanto tempo o benefício foi concedido?',
        ajuda: 'Existem prazos para pedir revisão, por isso a data importa.',
        opcoes: [
          { texto: 'Há menos de 10 anos', vai: 'fim_rev_prazo' },
          { texto: 'Há mais de 10 anos', vai: 'fim_rev_antigo' }
        ]
      },
      fim_rev_prazo: {
        fim: true,
        titulo: 'Vale reunir os documentos e analisar',
        resumo: 'Se o benefício é relativamente recente, pode haver espaço para revisão, dependendo do caso.',
        passos: [
          'Peça cópia do processo e da memória de cálculo.',
          'Confira o CNIS e compare com a carteira de trabalho e os contracheques.',
          'Anote períodos ou salários que não foram considerados.',
          'Peça uma análise para saber se há revisão possível.'
        ],
        guia: 'revisao',
        calc: 'contribuicao'
      },
      fim_rev_antigo: {
        fim: true,
        titulo: 'Pode haver limite de prazo, mas cada caso é diferente',
        resumo: 'Em regra, existe um prazo de 10 anos para revisar a concessão. Algumas situações têm tratamento diferente.',
        passos: [
          'Reúna a carta de concessão e os documentos que possui.',
          'Peça uma análise individual para verificar o prazo aplicável ao seu caso.'
        ],
        alerta: 'Não presuma que não há nada a fazer: algumas situações fogem da regra geral.',
        guia: 'revisao'
      },

      /* --- pensão por morte --- */
      pen1: {
        pergunta: 'Há quanto tempo ocorreu o falecimento?',
        ajuda: 'O prazo do pedido pode influenciar a data de início da pensão.',
        opcoes: [
          { texto: 'Há menos de 90 dias', vai: 'fim_pen_90' },
          { texto: 'Há mais de 90 dias', vai: 'fim_pen_depois' }
        ]
      },
      fim_pen_90: {
        fim: true,
        titulo: 'Vale agir logo para não perder valores',
        resumo: 'Em regra, pedir a pensão em até 90 dias do falecimento permite que ela seja paga desde a data do óbito.',
        passos: [
          'Separe a certidão de óbito e os documentos da pessoa falecida.',
          'Reúna a comprovação do vínculo dos dependentes.',
          'Faça o pedido ou procure orientação rapidamente.'
        ],
        alerta: 'Os prazos e a duração da pensão dependem de quem é o dependente. Peça análise individual.',
        guia: 'pensao'
      },
      fim_pen_depois: {
        fim: true,
        titulo: 'Ainda é possível pedir',
        resumo: 'Depois de 90 dias, a pensão ainda pode ser requerida, mas os pagamentos podem começar a contar apenas a partir do pedido.',
        passos: [
          'Reúna os documentos o quanto antes.',
          'Confira a qualidade de segurado da pessoa falecida e a comprovação do vínculo.',
          'Peça orientação para avaliar o caso.'
        ],
        guia: 'pensao'
      }
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
