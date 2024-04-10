//  Selecionando elementos HTML
const lista = document.getElementById('list');
const botao = document.getElementById('btn-one');
const container = document.querySelector('.container');
const btnMenu = document.querySelector('.btn-menu');

    btnMenu.addEventListener('click', ()=>{
    if(container.style.display == 'flex' ){
        container.style.display ='none';
    }

    else{
        container.style.display = 'flex';
    }
    });

botao.addEventListener('click', function(){
    let listaNotOrdenada = lista.querySelector('ul');

    //Trocando novos elementos
    listaNotOrdenada.innerHTML = 
    `<li>NodeJS</li><li>Banco de Dados</li><li>Lógica de Programação</li>`;

})

    //Adicionando elementos
function addList() {
    let ol = lista.querySelector('ol');
    let newLi = document.createElement('li');  

    newLi.innerHTML = "Novo Item adicionado!";
    ol.appendChild(newLi);                      
}