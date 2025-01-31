// Lista que armazena os participantes do sorteio
let listaParticipantes = [];  
// Lista que define a ordem de sorteio dos participantes
let ordemSorteio = [];  
// Flag que indica se o sorteio está em andamento
let sorteioAtivo = false;  
// Índice do participante atual na ordem do sorteio
let indiceAtual = 0;  
// Contador para controle do processo de sorteio
let contadorSorteio = 0;  
// Índice do participante que sorteará o último
let indiceSorteadorUltimo;  
// Último participante da lista
let ultimoParticipante;  

// Alerta inicial explicando como o sistema funciona
alert(
    "📌 COMO USAR O SORTEIO DE AMIGO SECRETO:\n\n" +
    "1️⃣ ADICIONAR PARTICIPANTES:\n" +
    "   - Digite o nome no campo de entrada.\n" +
    "   - Clique em 'ADICIONAR'.\n" +
    "   - Repita esse processo para adicionar quantos participantes quiser.\n\n" +
    "2️⃣ REALIZAR O SORTEIO:\n" +
    "   - Após adicionar todos os participantes, clique em 'SORTEAR AMIGO'.\n" +
    "   - Cada participante receberá um amigo secreto aleatório.\n" +
    "   - A ordem de revelação segue a ordem de adição.\n\n" +
    "🎉 Divirta-se e tenha um ótimo sorteio!"
);

// Função para capitalizar o nome do participante (primeira letra maiúscula, restante minúscula)
function formatarNome(nome) {
    if (!nome) return '';  
    return nome.split(' ')  
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())  
        .join(' ');  
}

// Função para adicionar um participante à lista
function adicionarAmigo() {
    let participante = document.getElementById('amigo').value;  
    if (!participante.trim()) return alert('Por favor, digite um nome válido!');  

    participante = formatarNome(participante.trim());  

    // Verifica se o participante já foi adicionado
    if (listaParticipantes.includes(participante)) {
        return alert('Este participante já foi adicionado!');
    }

    listaParticipantes.push(participante);  
    document.getElementById('amigo').value = '';  
    atualizarListaVisual();  
    console.log(listaParticipantes);  
}

// Função para sortear um amigo secreto
function sortearAmigo() {
    if (listaParticipantes.length < 3 && !sorteioAtivo) {
        return alert('É necessário adicionar mais participantes para o sorteio.');
    }

    let indiceSorteado;  
    let amigoSorteado;  

    if (contadorSorteio === 0) {
        ordemSorteio = [...listaParticipantes];  
        contadorSorteio = 1;  

        ultimoParticipante = ordemSorteio[ordemSorteio.length - 1];
        console.log(`Último participante: ${ultimoParticipante}`);  

        indiceSorteadorUltimo = Math.floor(Math.random() * (ordemSorteio.length - 1));
        console.log(`Quem sorteará o último: ${ordemSorteio[indiceSorteadorUltimo]}`);
    }
    
    sorteioAtivo = true;  
    console.log(`Participante atual: ${ordemSorteio[indiceAtual]}`);

    document.getElementById('amigo').disabled = true;
    document.getElementById('botaoAdicionar').disabled = true;
    document.getElementById('botaoSortear').disabled = true;

    do {
        indiceSorteado = Math.floor(Math.random() * (listaParticipantes.length - 1)); 
        amigoSorteado = listaParticipantes[indiceSorteado];
    } while (ordemSorteio[indiceAtual] === amigoSorteado);  

    console.log(`Sorteado na etapa 2: ${amigoSorteado}`);
    console.log(ordemSorteio[indiceSorteadorUltimo] === ordemSorteio[indiceAtual])
    
    if (ordemSorteio[indiceSorteadorUltimo] === ordemSorteio[indiceAtual]) {
        amigoSorteado = ultimoParticipante;
    }
    
    console.log(`Sorteado na etapa 3: ${amigoSorteado}`);

    exibirResultado(amigoSorteado);  

    indiceAtual++;  

    if (listaParticipantes.length === 0) {
        console.log('Sorteio finalizado!');
        setTimeout(() => {
            resultado.innerHTML = '🎉 Sorteio finalizado! Adicione mais participantes para um novo sorteio.';
        }, 5000);

        sorteioAtivo = false;
        document.getElementById('amigo').disabled = false;
        document.getElementById('botaoAdicionar').disabled = false;
        document.getElementById('botaoSortear').disabled = false;
        atualizarListaVisual();
        contadorSorteio = 0;
        indiceAtual = 0;
        ordemSorteio = [];
        listaParticipantes = [];
    }
}

// Função auxiliar para exibir o resultado do sorteio e remover o sorteado da lista
function exibirResultado(amigoSorteado) {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `Seu amigo secreto é: ${amigoSorteado}`;  

    listaParticipantes = listaParticipantes.filter(participante => participante !== amigoSorteado);  

    setTimeout(() => {
        resultado.innerHTML = '';
        document.getElementById('botaoSortear').disabled = false;
    }, 4000);
}

// Função para atualizar a exibição da lista de participantes
function atualizarListaVisual() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';  
    listaParticipantes.forEach(participante => {
        let novoItem = document.createElement('li');  
        novoItem.textContent = participante;  
        lista.appendChild(novoItem);  
    });
}