const viewModal = document.getElementById('modal');
const abrirModal = document.querySelector('.btn-pedido');
const closeModal = document.querySelector('.finalizarFechar');
const modalConteudo = document.querySelector('.modal__conteudo__container');
const valorTotal = document.querySelector('.total');
const qtdItem = document.querySelector('.btn-texto');
const enderecoCampo = document.querySelector('.endereco__campo');
const finalizarPedido = document.querySelector('.finalizarPedido');
const divFuncionamento = document.getElementById('funcionamento');


abrirModal.addEventListener('click', () => {
    viewModal.style.display = 'flex';
    updateCarrinho();
});

closeModal.addEventListener('click', () => {
    viewModal.style.display = 'none';
});

//Função de adição ao carrinho
// vetor
var carrinho = [];


function addCarrinho(name, price) {
    let existeItem = carrinho.find(item => item.name == name);

    if (existeItem) {
        // Se o item já existir nas compras, vai apenas aumentar a quantidade
        existeItem.quantity += 1;
    }
    else {
        // Método push serve para adicionar elementos ao vetor
        carrinho.push({
            name,
            price,
            quantity: 1
        })
    }

    updateCarrinho();
}
// Função que dispara o botão
function pedido(event) {
    // O método event.target vai indicar qual elemento disparou o evento, e vai especificar o elemento através do método closest
    let disparouEvento = event.target.closest(".buyItem");

    if (disparouEvento) {   //getAttribute serve para pegar o atributo
        let nameProduct = disparouEvento.getAttribute("data-name");
        let priceProduct = disparouEvento.getAttribute("data-price");

        addCarrinho(nameProduct, priceProduct);
    }
}

function updateCarrinho() {
    modalConteudo.innerHTML = "";
    let total = 0;

    // forEach() é o método que serve para percorrer o meu vetor e procurar os itens
    carrinho.forEach(item => {
        let createElementCar = document.createElement('div');

        createElementCar.innerHTML =
            `
            <div class="modal__conteudo">
                <div class="modal__conteudo__container">
                    <p><strong style="color: #FE6A0F;">Produto:</strong> ${item.name}</p>
                    <p><strong style="color: #FE6A0F;">Quantidade:</strong> ${item.quantity}</p>
                    <p><strong style="color: #FE6A0F;">Preço:</strong> ${item.price}</p>
                </div>
                <div class="modalButtonRemove">
                <button class="buttonModalRemove" data-name="${item.name}">Remover</button>
                </div> 
            </div>
            `

        total += item.price * item.quantity;
        // Adicionando elemento ao modal
        modalConteudo.appendChild(createElementCar);
    });

    //TextContent: adiciona o texto ao HTML
    valorTotal.textContent = `R$ ${total.toFixed(2)}`;
    // toFixed: limitação de casas decimais

    qtdItem.innerHTML = `(${carrinho.length}) Fazer pedido`;
    // O length vai acessar a quantidade de itens que tem no vetor

};

//  Criando função de remover item no carrinho
function removerItemCarrinho(name) {
    /*
    Essa variável index, foi criada para encontrar a posição do item na lista (vetor).
    Por conta disso, utiliza-se o método findIndex().
    */
    let index = carrinho.findIndex(item => item.name === name);

    if (index !== -1) {  //-1 está relacionado ao findIndex, quando não se acha nenhum item no vetor
        let item = carrinho[index];

        if (item.quantity > 1) {
            item.quantity -= 1; //Pega a quantidade que tem, e em seguida remove 1 de cada vez.
            updateCarrinho();
            return;
            // Return - encerramento da condicional
        }

        carrinho.splice(index, 1); //splice serve para remover um item do vetor
        updateCarrinho();
    }
}

modalConteudo.addEventListener('click', (event) => {
    if (event.target.classList.contains('buttonModalRemove')) {
        let name = event.target.getAttribute('data-name');

        removerItemCarrinho(name);
    };

});

finalizarPedido.addEventListener('click', () => {
    // Validação de incluir pedido
    if (carrinho.length === 0) {
        alert("ERRO! Você tentou finalizar o pedido sem adicionar nenhum produto.");
        return;
    }

    if (enderecoCampo.value === "") {
        alert("ERRO! Você tentou finalizar o pedido sem adicionar nenhum endereço.");
        return;
    }

    // Validação que informa o fechamento do restaurante
    let funcionamento = verificaHora();
    // Negação da condição 
    if (!funcionamento) {
        alert("O restaurante está fechado.");
        return;
    }

    // Mapeando para mostrar o que vai ser enviado para mostrar o que vai ser enviado ao restaurante
    let carrinhoItens = carrinho.map((item) => {
        // Indicando o que será retornado através do método map
        return (
            `
                    Pedido: ${item.name}
                    Quantidade: ${item.quantity}
                    Preço: ${item.price}
                    `
        )
    }).join(""); //Método que serve para juntar as informações do vetor e transformar em texto (string)

    //Enviando a mensagem do produto para o whatsapp
    let message = encodeURIComponent(carrinhoItens);

    // Método (encodeURIComponent) que vai pegar a string e mandar para o servidor
    let phone = "98970238491";

    // Método que vai referenciar o link do whatsapp
    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${enderecoCampo.value}`, "_blank");

});

// Criando funcionalidade do horário de Funcionamento
function verificaHora() {
    let data = new Date(); // O método Date() faz gerar a data atual
    let hora = data.getHours();// O método getHours() faz gerar a hora atual

    return hora >= 18 && hora < 22;
    /* && (e) - operador de adição condicional*/
}

const trocaFuncionamento = verificaHora();

if (trocaFuncionamento) {
    divFuncionamento.classList.remove("funcionamentoRed");
    divFuncionamento.classList.add("funcionamentoGreen");
    // ClassList tem a função de alterar funções da classe do CSS
}

else {
    divFuncionamento.classList.remove("funcionamentoGreen");
    divFuncionamento.classList.add("funcionamentoRed");
}