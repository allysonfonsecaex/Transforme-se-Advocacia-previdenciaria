let btnProximo = document.getElementById("proximo");
let btnAnterior = document.getElementById("anterior");
let Quadroimagem = document.getElementById("imagem");

let album = [
    "imagens/Banner de Advocacia Previdenciária.png"
    //adicionar imagem pro carrosel",
    //"adicionar imagem pro carrosel"//
];

btnProximo.addEventListener("click", mostrarProximo);
btnAnterior.addEventListener("click", mostrarAnterior);

let foto = 0;

function mostrarProximo() {
    foto = foto + 1;
    if (foto >= album.length) {
        foto = 0;
    }
    Quadroimagem.src = album[foto];
}

function mostrarAnterior() {
    foto = foto - 1;
    if (foto < 0) {
        foto = album.length - 1;
    }
    Quadroimagem.src = album[foto];
}