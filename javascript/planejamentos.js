const formulario = document.getElementById("form-rescisao");

const salario = document.getElementById("salario");
const dataAdmissao = document.getElementById("data-admissao");
const dataDesligamento = document.getElementById("data-desligamento");
const aviso = document.getElementById("aviso");
const feriasVencidas = document.getElementById("ferias-vencidas");

const resultado = document.getElementById("resultado");

const resultadoSaldo = document.getElementById("resultado-saldo");
const resultadoAviso = document.getElementById("resultado-aviso");
const resultadoDecimo = document.getElementById("resultado-decimo");
const resultadoFerias = document.getElementById("resultado-ferias");
const resultadoFeriasVencidas = document.getElementById("resultado-ferias-vencidas");
const resultadoTotal = document.getElementById("resultado-total");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const valorSalario = Number(salario.value);

    if (valorSalario <= 0) {
        alert("Informe um salário válido.");
        return;
    }

    const admissao = criarData(dataAdmissao.value);
    const desligamento = criarData(dataDesligamento.value);

    if (!admissao || !desligamento) {
        alert("Preencha as datas de admissão e desligamento.");
        return;
    }

    if (desligamento <= admissao) {
        alert("A data de desligamento deve ser posterior à data de admissão.");
        return;
    }

    const diaDesligamento = desligamento.getDate();

    const valorDia = valorSalario / 30;

    const saldoSalario = valorDia * diaDesligamento;

    let valorAviso = 0;

    if (aviso.value === "indenizado") {
        valorAviso = valorSalario;
    }

    const anoDesligamento = desligamento.getFullYear();

    const inicioDoAno = new Date(
        anoDesligamento,
        0,
        1
    );

    const mesesDecimo = calcularMesesProporcionais(
        inicioDoAno,
        desligamento
    );

    const decimoTerceiro =
        (valorSalario / 12) * mesesDecimo;

    const mesesFerias = calcularMesesFerias(
        admissao,
        desligamento
    );

    const feriasProporcionais =
        (valorSalario / 12) * mesesFerias;

    const adicionalFerias =
        feriasProporcionais / 3;

    const totalFeriasProporcionais =
        feriasProporcionais + adicionalFerias;

    let totalFeriasVencidas = 0;

    if (feriasVencidas.value === "sim") {

        const adicional = valorSalario / 3;

        totalFeriasVencidas =
            valorSalario + adicional;
    }

    const total =
        saldoSalario +
        valorAviso +
        decimoTerceiro +
        totalFeriasProporcionais +
        totalFeriasVencidas;

    resultadoSaldo.textContent =
        formatarMoeda(saldoSalario);

    resultadoAviso.textContent =
        formatarMoeda(valorAviso);

    resultadoDecimo.textContent =
        formatarMoeda(decimoTerceiro);

    resultadoFerias.textContent =
        formatarMoeda(totalFeriasProporcionais);

    resultadoFeriasVencidas.textContent =
        formatarMoeda(totalFeriasVencidas);

    resultadoTotal.textContent =
        formatarMoeda(total);

    resultado.classList.add("mostrar");

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

function criarData(data) {

    if (!data) {
        return null;
    }

    const partes = data.split("-");

    return new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );
}

function calcularMesesProporcionais(inicio, fim) {

    let meses = 0;

    let dataAtual = new Date(
        inicio.getFullYear(),
        inicio.getMonth(),
        1
    );

    while (dataAtual <= fim) {

        const ultimoDiaMes =
            new Date(
                dataAtual.getFullYear(),
                dataAtual.getMonth() + 1,
                0
            ).getDate();

        const diaConsiderado =
            dataAtual.getMonth() === fim.getMonth() &&
            dataAtual.getFullYear() === fim.getFullYear()
                ? fim.getDate()
                : ultimoDiaMes;

        if (diaConsiderado >= 15) {
            meses++;
        }

        dataAtual.setMonth(
            dataAtual.getMonth() + 1
        );
    }

    return Math.min(meses, 12);
}

function calcularMesesFerias(admissao, desligamento) {

    let meses =
        (desligamento.getFullYear() - admissao.getFullYear()) * 12;

    meses +=
        desligamento.getMonth() - admissao.getMonth();

    if (
        desligamento.getDate() <
        admissao.getDate()
    ) {
        meses--;
    }

    meses = meses % 12;

    if (meses < 0) {
        meses = 0;
    }

    if (desligamento.getDate() >= 15) {
        meses++;
    }

    return Math.min(meses, 12);
}

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

