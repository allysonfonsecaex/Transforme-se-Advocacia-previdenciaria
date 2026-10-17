
/* =====================================================
   CENTRAL LEX - ARTIGOS E NOTÍCIAS
   Pesquisa, filtros, ordenação, leitura e menu mobile
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =====================================================
       1. CONTEÚDO EDITORIAL
       Para adicionar publicações, inclua novos objetos
       nesta lista.
    ===================================================== */

    const publicacoes = [
        {
            id: 1,
            titulo: "Meu benefício foi negado: quais são os próximos passos?",
            categoria: "beneficios",
            tipo: "artigo",
            etiqueta: "Benefícios",
            data: "2026-10-10",
            leitura: 5,
            simbolo: "?",
            destaque: true,
            resumo: "Entenda por onde começar, quais informações conferir e como organizar os documentos antes de buscar orientação.",
            introducao: "Receber uma resposta negativa do INSS pode gerar dúvidas. Antes de tomar uma decisão, é importante compreender o motivo informado e verificar os documentos do seu caso.",
            secoes: [
                {
                    titulo: "1. Confira o motivo da decisão",
                    paragrafos: [
                        "Leia a comunicação recebida e, quando disponível, consulte os detalhes do requerimento no Meu INSS. Identifique qual justificativa foi apresentada.",
                        "Não presuma que todas as negativas têm a mesma causa. O caminho adequado depende do benefício solicitado e das circunstâncias do pedido."
                    ]
                },
                {
                    titulo: "2. Organize os documentos",
                    paragrafos: [
                        "Separe o número do requerimento, a decisão, os comprovantes apresentados e outros documentos relacionados ao pedido.",
                        "Se encontrar informações incorretas ou documentos ausentes, anote os pontos que precisam ser esclarecidos."
                    ]
                },
                {
                    titulo: "3. Busque orientação para o seu caso",
                    paragrafos: [
                        "Existem situações em que cabe recurso administrativo ou outra medida. Os prazos e requisitos variam, por isso é importante conferir a decisão e buscar orientação adequada."
                    ]
                }
            ],
            aviso: "Este conteúdo é informativo. A medida adequada depende da decisão recebida, dos documentos e das regras aplicáveis ao caso."
        },
        {
            id: 2,
            titulo: "Como consultar o extrato do CNIS",
            categoria: "inss",
            tipo: "artigo",
            etiqueta: "INSS e CNIS",
            data: "2026-10-08",
            leitura: 4,
            simbolo: "C",
            resumo: "Saiba o que é o Cadastro Nacional de Informações Sociais e quais dados vale a pena conferir.",
            introducao: "O CNIS reúne registros relacionados a vínculos de trabalho, remunerações e contribuições previdenciárias. Consultar essas informações ajuda a identificar possíveis divergências.",
            secoes: [
                {
                    titulo: "Onde consultar",
                    paragrafos: [
                        "O extrato pode ser consultado pelos canais oficiais do Meu INSS, mediante acesso à conta do usuário. Procure pelo serviço de extrato de contribuição ou CNIS.",
                        "Os nomes das opções podem mudar conforme as atualizações da plataforma."
                    ]
                },
                {
                    titulo: "O que conferir no documento",
                    paragrafos: [
                        "Observe os vínculos empregatícios, as datas, as remunerações e os registros de contribuição que aparecem no extrato.",
                        "Compare os dados com sua carteira de trabalho, contracheques e outros comprovantes disponíveis."
                    ]
                },
                {
                    titulo: "E se houver divergências?",
                    paragrafos: [
                        "Guarde uma cópia do extrato e identifique cada informação que precisa ser verificada. A documentação necessária para eventual correção varia conforme o registro."
                    ]
                }
            ],
            aviso: "Consulte os canais oficiais do INSS para confirmar os procedimentos disponíveis no momento."
        },
        {
            id: 3,
            titulo: "BPC/LOAS: informações para começar a entender o benefício",
            categoria: "beneficios",
            tipo: "artigo",
            etiqueta: "Benefícios",
            data: "2026-10-05",
            leitura: 6,
            simbolo: "B",
            resumo: "Conheça as características gerais do Benefício de Prestação Continuada e os pontos que precisam ser analisados.",
            introducao: "O Benefício de Prestação Continuada, conhecido como BPC, é um benefício assistencial que possui critérios próprios. Ele não é a mesma coisa que uma aposentadoria previdenciária.",
            secoes: [
                {
                    titulo: "Quem pode solicitar?",
                    paragrafos: [
                        "Em linhas gerais, o BPC é destinado à pessoa idosa a partir de 65 anos ou à pessoa com deficiência que atenda aos requisitos legais, inclusive os critérios socioeconômicos aplicáveis.",
                        "O atendimento aos critérios depende da avaliação das circunstâncias e da documentação de cada pessoa."
                    ]
                },
                {
                    titulo: "Quais pontos merecem atenção?",
                    paragrafos: [
                        "A inscrição e a atualização do Cadastro Único, a composição familiar, a renda e os demais requisitos aplicáveis podem ser relevantes para a análise.",
                        "No caso de pessoa com deficiência, também existem avaliações e requisitos específicos previstos nas regras do benefício."
                    ]
                },
                {
                    titulo: "Por onde começar?",
                    paragrafos: [
                        "Procure o CRAS do seu município para informações sobre o Cadastro Único e consulte os canais oficiais do INSS para conhecer as orientações atualizadas."
                    ]
                }
            ],
            aviso: "Os requisitos e procedimentos devem ser confirmados nas fontes oficiais. Esta publicação não determina se uma pessoa específica tem direito ao benefício."
        },
        {
            id: 4,
            titulo: "Quais documentos organizar antes de pedir um benefício?",
            categoria: "beneficios",
            tipo: "artigo",
            etiqueta: "Documentação",
            data: "2026-09-29",
            leitura: 4,
            simbolo: "D",
            resumo: "Uma organização prévia dos documentos ajuda a compreender o pedido e identificar o que ainda precisa ser providenciado.",
            introducao: "Preparar os documentos com antecedência facilita a consulta das informações e ajuda a evitar esquecimentos durante a organização de um requerimento.",
            secoes: [
                {
                    titulo: "Comece pelos documentos pessoais",
                    paragrafos: [
                        "Organize documentos de identificação, CPF e comprovante de endereço, conforme a situação e o serviço procurado."
                    ]
                },
                {
                    titulo: "Separe os registros relacionados ao pedido",
                    paragrafos: [
                        "Dependendo do benefício, podem ser relevantes registros de trabalho, contribuições, documentos médicos, comprovantes de atividade ou informações familiares.",
                        "Nem todos os documentos se aplicam a todos os pedidos. A lista adequada depende do benefício e da situação individual."
                    ]
                },
                {
                    titulo: "Confira os arquivos antes de enviar",
                    paragrafos: [
                        "Verifique se os documentos estão legíveis, completos e atualizados quando necessário. Guarde cópias e comprovantes de envio."
                    ]
                }
            ],
            aviso: "Use esta lista como ponto de partida, não como uma relação definitiva de documentos exigidos."
        },
        {
            id: 5,
            titulo: "Aposentadoria: por que conferir o histórico de contribuições?",
            categoria: "inss",
            tipo: "artigo",
            etiqueta: "Planejamento",
            data: "2026-09-20",
            leitura: 5,
            simbolo: "A",
            resumo: "Entenda por que revisar vínculos, períodos e contribuições pode ajudar na organização do planejamento previdenciário.",
            introducao: "Planejar a aposentadoria exige analisar o histórico previdenciário e as regras que podem ser aplicáveis à situação de cada segurado.",
            secoes: [
                {
                    titulo: "Revise seu histórico",
                    paragrafos: [
                        "Comece pelo extrato do CNIS e procure períodos que pareçam incompletos, divergentes ou que precisem de esclarecimento."
                    ]
                },
                {
                    titulo: "Não considere apenas o tempo total",
                    paragrafos: [
                        "As regras previdenciárias podem envolver diferentes requisitos, transições e condições. O tempo registrado, isoladamente, não garante uma conclusão sobre a data de aposentadoria."
                    ]
                },
                {
                    titulo: "Organize as informações",
                    paragrafos: [
                        "Reunir o histórico de trabalho, as contribuições e os documentos pertinentes pode facilitar uma análise individual mais precisa."
                    ]
                }
            ],
            aviso: "Uma estimativa ou simulação não substitui a conferência do histórico e das regras aplicáveis ao caso."
        },
        {
            id: 6,
            titulo: "Benefício por incapacidade: como organizar os documentos",
            categoria: "beneficios",
            tipo: "artigo",
            etiqueta: "Incapacidade",
            data: "2026-09-12",
            leitura: 5,
            simbolo: "S",
            resumo: "Veja quais informações podem ser úteis para organizar a documentação médica e compreender o procedimento.",
            introducao: "Quando um problema de saúde afeta a capacidade para o trabalho, surgem dúvidas sobre documentação e procedimentos previdenciários. Cada situação precisa ser analisada conforme os requisitos aplicáveis.",
            secoes: [
                {
                    titulo: "Organize a documentação médica",
                    paragrafos: [
                        "Reúna os documentos disponíveis, como relatórios, atestados, exames e informações sobre tratamentos. Verifique se estão legíveis e identificados.",
                        "Os documentos devem refletir a situação real da pessoa e ser emitidos pelos profissionais responsáveis."
                    ]
                },
                {
                    titulo: "Confira as informações do requerimento",
                    paragrafos: [
                        "Consulte as orientações oficiais sobre o serviço solicitado, a documentação e os procedimentos de avaliação."
                    ]
                },
                {
                    titulo: "Guarde os comprovantes",
                    paragrafos: [
                        "Mantenha cópias dos documentos enviados, dos protocolos e das comunicações recebidas."
                    ]
                }
            ],
            aviso: "A documentação necessária e o direito ao benefício dependem das circunstâncias individuais e dos critérios legais aplicáveis."
        },
        {
            id: 7,
            titulo: "Meu INSS: cuidados ao acompanhar uma solicitação",
            categoria: "noticia",
            tipo: "noticia",
            etiqueta: "Serviços digitais",
            data: "2026-08-28",
            leitura: 3,
            simbolo: "I",
            resumo: "Boas práticas para acompanhar requerimentos, guardar protocolos e verificar as comunicações recebidas.",
            introducao: "Os serviços digitais permitem consultar informações e acompanhar solicitações previdenciárias. É importante utilizar os canais oficiais e conferir as mensagens relacionadas ao seu pedido.",
            secoes: [
                {
                    titulo: "Acompanhe o requerimento",
                    paragrafos: [
                        "Consulte o andamento do pedido pelo canal oficial e observe se existe alguma comunicação ou solicitação de informação."
                    ]
                },
                {
                    titulo: "Guarde os registros",
                    paragrafos: [
                        "Anote o protocolo e mantenha cópias das comunicações e dos documentos apresentados."
                    ]
                },
                {
                    titulo: "Evite compartilhar dados pessoais",
                    paragrafos: [
                        "Não compartilhe senhas ou códigos de autenticação. Desconfie de contatos que prometam liberar benefícios mediante pagamentos suspeitos."
                    ]
                }
            ],
            aviso: "Este é um conteúdo educativo de exemplo, não um comunicado oficial do INSS. Confira atualizações nos canais governamentais."
        },
        {
            id: 8,
            titulo: "Como se preparar para uma orientação previdenciária",
            categoria: "artigo",
            tipo: "artigo",
            etiqueta: "Orientação",
            data: "2026-08-15",
            leitura: 3,
            simbolo: "L",
            resumo: "Organize sua dúvida, os documentos disponíveis e o histórico do atendimento para aproveitar melhor a consulta.",
            introducao: "Uma conversa sobre direitos previdenciários pode ser mais produtiva quando as informações estão organizadas e a dúvida principal está bem definida.",
            secoes: [
                {
                    titulo: "Escreva sua dúvida principal",
                    paragrafos: [
                        "Explique o que aconteceu, qual informação deseja esclarecer e se existe alguma decisão ou prazo que mereça atenção."
                    ]
                },
                {
                    titulo: "Organize os documentos",
                    paragrafos: [
                        "Separe os registros relacionados ao assunto e identifique o que ainda falta obter."
                    ]
                },
                {
                    titulo: "Anote as orientações recebidas",
                    paragrafos: [
                        "Registre os próximos passos, os documentos pendentes e as datas relevantes que forem informadas durante a orientação."
                    ]
                }
            ],
            aviso: "A orientação adequada depende da análise dos fatos e documentos do caso concreto."
        }
    ];

    /* =====================================================
       2. ELEMENTOS DA PÁGINA
    ===================================================== */

    const formulario = document.getElementById("form-pesquisa");
    const campoPesquisa = document.getElementById("campo-pesquisa");
    const filtros = document.getElementById("filtros-categorias");
    const ordenacao = document.getElementById("ordenacao");

    const destaque = document.getElementById("artigo-destaque");
    const lista = document.getElementById("lista-artigos");
    const contador = document.getElementById("contador-resultados");
    const vazio = document.getElementById("pesquisa-vazia");
    const limparPesquisa = document.getElementById("limpar-pesquisa");

    const dialog = document.getElementById("artigo-dialog");
    const dialogConteudo = document.getElementById("dialog-conteudo");
    const fecharDialog = document.getElementById("fechar-dialog");
    const fecharDialogFinal = document.getElementById("fechar-dialog-final");

    const menuToggle = document.getElementById("menu-toggle");
    const menuPrincipal = document.getElementById("menu-principal");

    if (!lista || !campoPesquisa || !filtros) {
        console.error("Central Lex: elementos principais não encontrados.");
        return;
    }

    let categoriaAtiva = "todos";
    let termoAtivo = "";

    /* =====================================================
       3. FUNÇÕES AUXILIARES
    ===================================================== */

    function normalizar(texto) {
        return String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function escaparHTML(texto) {
        return String(texto ?? "").replace(/[&<>"']/g, function (caractere) {
            const entidades = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entidades[caractere];
        });
    }

    function formatarData(dataISO) {
        const partes = dataISO.split("-");

        if (partes.length !== 3) {
            return dataISO;
        }

        return partes[2] + "/" + partes[1] + "/" + partes[0];
    }

    function correspondeCategoria(publicacao) {
        if (categoriaAtiva === "todos") {
            return true;
        }

        if (categoriaAtiva === "artigo") {
            return publicacao.tipo === "artigo";
        }

        if (categoriaAtiva === "noticia") {
            return publicacao.tipo === "noticia";
        }

        if (categoriaAtiva === "beneficios") {
            return publicacao.categoria === "beneficios";
        }

        if (categoriaAtiva === "inss") {
            return publicacao.categoria === "inss";
        }

        return true;
    }

    function correspondePesquisa(publicacao) {
        if (!termoAtivo) {
            return true;
        }

        const textoCompleto = [
            publicacao.titulo,
            publicacao.resumo,
            publicacao.etiqueta,
            publicacao.categoria,
            publicacao.tipo,
            publicacao.introducao,
            ...publicacao.secoes.map(function (secao) {
                return [
                    secao.titulo,
                    ...secao.paragrafos
                ].join(" ");
            })
        ].join(" ");

        return normalizar(textoCompleto).includes(termoAtivo);
    }

    /* =====================================================
       4. CARTÃO DE PUBLICAÇÃO
    ===================================================== */

    function criarCartao(publicacao) {
        const artigo = document.createElement("article");
        artigo.className = "artigo-card";

        artigo.innerHTML = `
            <div class="artigo-card__topo" aria-hidden="true">
                <span class="artigo-card__simbolo">
                    ${escaparHTML(publicacao.simbolo)}
                </span>
            </div>

            <div class="artigo-card__corpo">
                <span class="artigo-categoria">
                    ${escaparHTML(publicacao.etiqueta)}
                </span>

                <h3>${escaparHTML(publicacao.titulo)}</h3>

                <p class="artigo-card__resumo">
                    ${escaparHTML(publicacao.resumo)}
                </p>

                <div class="artigo-card__rodape">
                    <span class="artigo-card__data">
                        ${formatarData(publicacao.data)}
                        · ${publicacao.leitura} min de leitura
                    </span>

                    <button
                        class="artigo-card__abrir"
                        type="button"
                        data-abrir-artigo="${publicacao.id}"
                        aria-label="Ler: ${escaparHTML(publicacao.titulo)}">
                        Ler artigo <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>
        `;

        return artigo;
    }

    /* =====================================================
       5. ARTIGO EM DESTAQUE
    ===================================================== */

    function renderizarDestaque(publicacao) {
        if (!destaque) return;

        if (!publicacao) {
            destaque.innerHTML = "";
            return;
        }

        destaque.innerHTML = `
            <article class="artigo-destaque">
                <div class="artigo-destaque__texto">
                    <span class="artigo-categoria">
                        ${escaparHTML(publicacao.etiqueta)}
                    </span>

                    <h3>${escaparHTML(publicacao.titulo)}</h3>

                    <p class="artigo-destaque__resumo">
                        ${escaparHTML(publicacao.resumo)}
                    </p>

                    <div class="artigo-meta">
                        <span>${formatarData(publicacao.data)}</span>
                        <span>${publicacao.leitura} min de leitura</span>
                    </div>

                    <button
                        class="artigo-ler"
                        type="button"
                        data-abrir-artigo="${publicacao.id}">
                        Ler conteúdo completo <span aria-hidden="true">→</span>
                    </button>
                </div>

                <div class="artigo-destaque__visual" aria-hidden="true">
                    <div class="destaque-grafismo">
                        <span>${escaparHTML(publicacao.simbolo)}</span>
                    </div>
                    <p>Informação para compreender seus direitos.</p>
                </div>
            </article>
        `;
    }

    /* =====================================================
       6. PESQUISA, FILTROS E ORDENAÇÃO
    ===================================================== */

    function obterPublicacoesFiltradas() {
        const resultado = publicacoes.filter(function (publicacao) {
            return correspondeCategoria(publicacao) &&
                   correspondePesquisa(publicacao);
        });

        const modoOrdenacao = ordenacao ? ordenacao.value : "recentes";

        resultado.sort(function (a, b) {
            if (modoOrdenacao === "antigos") {
                return a.data.localeCompare(b.data);
            }

            if (modoOrdenacao === "titulo") {
                return a.titulo.localeCompare(b.titulo, "pt-BR");
            }

            return b.data.localeCompare(a.data);
        });

        return resultado;
    }

    function renderizarPublicacoes() {
        const resultado = obterPublicacoesFiltradas();

        const temPesquisaOuFiltro =
            Boolean(termoAtivo) || categoriaAtiva !== "todos";

        const destaqueOriginal = publicacoes.find(function (item) {
            return item.destaque;
        });

        let destaqueAtual = null;

        if (!temPesquisaOuFiltro && destaqueOriginal) {
            destaqueAtual = resultado.find(function (item) {
                return item.id === destaqueOriginal.id;
            }) || null;
        }

        renderizarDestaque(destaqueAtual);

        const publicacoesDaGrade = destaqueAtual
            ? resultado.filter(function (item) {
                return item.id !== destaqueAtual.id;
            })
            : resultado;

        lista.replaceChildren();

        publicacoesDaGrade.forEach(function (publicacao) {
            lista.appendChild(criarCartao(publicacao));
        });

        const quantidade = resultado.length;
        const textoResultado = quantidade === 1
            ? "1 publicação encontrada"
            : quantidade + " publicações encontradas";

        if (contador) {
            contador.textContent = textoResultado;
        }

        if (vazio) {
            vazio.hidden = quantidade !== 0;
        }

        lista.hidden = quantidade === 0;

        if (destaque) {
            destaque.hidden = !destaqueAtual;
        }
    }

    /* =====================================================
       7. EVENTOS DA PESQUISA
    ===================================================== */

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            termoAtivo = normalizar(campoPesquisa.value);
            renderizarPublicacoes();
        });
    }

    campoPesquisa.addEventListener("input", function () {
        termoAtivo = normalizar(campoPesquisa.value);
        renderizarPublicacoes();
    });

    filtros.addEventListener("click", function (evento) {
        const botaoFiltro = evento.target.closest("[data-categoria]");

        if (!botaoFiltro) return;

        categoriaAtiva = botaoFiltro.dataset.categoria;

        filtros.querySelectorAll("[data-categoria]").forEach(function (botao) {
            const ativo = botao === botaoFiltro;

            botao.classList.toggle("ativo", ativo);
            botao.setAttribute("aria-pressed", String(ativo));
        });

        renderizarPublicacoes();
    });

    if (ordenacao) {
        ordenacao.addEventListener("change", renderizarPublicacoes);
    }

    if (limparPesquisa) {
        limparPesquisa.addEventListener("click", function () {
            campoPesquisa.value = "";
            termoAtivo = "";
            categoriaAtiva = "todos";

            if (ordenacao) {
                ordenacao.value = "recentes";
            }

            filtros.querySelectorAll("[data-categoria]").forEach(function (botao) {
                const ativo = botao.dataset.categoria === "todos";

                botao.classList.toggle("ativo", ativo);
                botao.setAttribute("aria-pressed", String(ativo));
            });

            renderizarPublicacoes();
            campoPesquisa.focus();
        });
    }

    /* =====================================================
       8. LEITURA DO ARTIGO NA JANELA
    ===================================================== */

    function abrirArtigo(id) {
        const publicacao = publicacoes.find(function (item) {
            return item.id === Number(id);
        });

        if (!publicacao || !dialog || !dialogConteudo) {
            return;
        }

        const secoesHTML = publicacao.secoes.map(function (secao) {
            const paragrafosHTML = secao.paragrafos.map(function (paragrafo) {
                return `<p>${escaparHTML(paragrafo)}</p>`;
            }).join("");

            return `
                <section>
                    <h3>${escaparHTML(secao.titulo)}</h3>
                    ${paragrafosHTML}
                </section>
            `;
        }).join("");

        dialogConteudo.innerHTML = `
            <span class="artigo-categoria dialog-categoria">
                ${escaparHTML(publicacao.etiqueta)}
            </span>

            <h2 id="dialog-titulo">
                ${escaparHTML(publicacao.titulo)}
            </h2>

            <div class="artigo-meta">
                <span>${formatarData(publicacao.data)}</span>
                <span>${publicacao.leitura} min de leitura</span>
            </div>

            <p class="dialog-resumo">
                ${escaparHTML(publicacao.introducao)}
            </p>

            ${secoesHTML}

            <div class="dialog-aviso">
                <strong>Importante:</strong>
                ${escaparHTML(publicacao.aviso)}
            </div>
        `;

        if (typeof dialog.showModal === "function") {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else {
            dialog.setAttribute("open", "");
        }
    }

    document.addEventListener("click", function (evento) {
        const botaoArtigo = evento.target.closest("[data-abrir-artigo]");

        if (!botaoArtigo) return;

        abrirArtigo(botaoArtigo.dataset.abrirArtigo);
    });

    function fecharLeitura() {
        if (!dialog) return;

        if (typeof dialog.close === "function" && dialog.open) {
            dialog.close();
        } else {
            dialog.removeAttribute("open");
        }
    }

    if (fecharDialog) {
        fecharDialog.addEventListener("click", fecharLeitura);
    }

    if (fecharDialogFinal) {
        fecharDialogFinal.addEventListener("click", fecharLeitura);
    }

    if (dialog) {
        dialog.addEventListener("click", function (evento) {
            // Fecha se clicar no fundo, fora do conteúdo da janela.
            if (evento.target === dialog) {
                fecharLeitura();
            }
        });
    }

    /* =====================================================
       9. MENU PARA CELULAR
    ===================================================== */

    if (menuToggle && menuPrincipal) {
        menuToggle.addEventListener("click", function () {
            const aberto = menuPrincipal.classList.toggle("aberto");

            menuToggle.setAttribute("aria-expanded", String(aberto));
            menuToggle.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );
        });

        menuPrincipal.addEventListener("click", function (evento) {
            if (evento.target.closest("a")) {
                menuPrincipal.classList.remove("aberto");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
            }
        });

        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                menuPrincipal.classList.remove("aberto");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
            }
        });
    }

    /* =====================================================
       10. INICIALIZAÇÃO
    ===================================================== */

    renderizarPublicacoes();

    console.log(
        "Central Lex carregada: " + publicacoes.length + " publicações de exemplo."
    );
});
