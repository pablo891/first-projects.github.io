    const viewModal = document.getElementById('modal');
    const abrirModal = document.querySelector('#rodape p');
    const closeModal = document.querySelector('.finalizar');
    const modalConteudo = document.querySelector('.modal__conteudo__container');
    const valorTotal = document.querySelector('.total');
    const rodapeQtd = document.querySelector('.rodape__quantidade');

    abrirModal.addEventListener ('click', ()=>{
        viewModal.style.display = 'flex';
        updateCarrinho();
    });

    closeModal.addEventListener ('click', ()=>{
        viewModal.style.display = 'none';
    });

    // Adicionando ao carrinho
    var carrinho = [];

    function addCarrinho(name,price){
        let existeItem = carrinho.find(item => item.name == name);
    
        if (existeItem){
        // Se o item já existir nas compras, vai apenas aumentar a quantidade
        existeItem.quantity += 1;
        }
        else{
        // Método push serve para adicionar elementos ao vetor
        carrinho.push({
            name,
            price,
            quantity: 1
        })        
    }

    updateCarrinho();
    }

    function pedido(event){
        // O método event.target vai indicar qual elemento disparou o evento, e vai especificar o elemento através do método closest
        let disparouEvento = event.target.closest(".pedidoBurger");

        if(disparouEvento){   //getAttribute serve para pegar o atributo
            let nameProduct = disparouEvento.getAttribute("data-name");
            let priceProduct = disparouEvento.getAttribute("data-price");

            addCarrinho(nameProduct, priceProduct);
        }   
    }

    function updateCarrinho(){
        modalConteudo.innerHTML = "";
        let total = 0;

        // forEach() é o método que serve para percorrer o meu vetor e procurar os itens
        carrinho.forEach(item =>{
            let createElementCar = document.createElement('div');

            createElementCar.innerHTML = 
            `
            <div class="modal__conteudo">
                <div class="modal__conteudo__container">
                    <p>Produto: ${item.name}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>Preço: ${item.price}</p>
                </div>
                <div class="modalButtonRemove">
                <button class="buttonModalRemove" data-name="${item.name}">Remover</button>
                </div> 
            </div>
            `

            total += item.price*item.quantity;
        // Adicionando elemento ao modal
        modalConteudo.appendChild(createElementCar);
        });

        //TextContent: adiciona o texto ao HTML
        valorTotal.textContent = `R$ ${total.toFixed(2)}`;
        // toFixed: limitação de casas decimais
        
        rodapeQtd.innerHTML = `(${carrinho.length})` ;
                        // O length vai acessar a quantidade de itens que tem no vetor
                  
    };