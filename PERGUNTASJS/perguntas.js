function mostrarResposta(id) {
    let resposta = document.getElementById(id)

    
    console.log(resposta);

    resposta.classList.toggle('aberta');
}

function pesquisar() {

    let pesquisa = document.getElementById("pesquisa").value
    .toLowerCase();

    let perguntas = document.querySelectorAll(".topicos");

    perguntas.forEach(function(item) {

        let texto = item.innerText.toLowerCase();

        if (texto.includes(pesquisa)) {
            item.style.display = "block";

        } else {
            item.style.display = "none";
        }
        
    });
}