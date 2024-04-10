const list = document.querySelector('ol');
const input = document.querySelector('input');
const botaoRemover = document.querySelector('.btn-two');
const botaoAll = document.querySelector('.btn-three');

function inserir(){
    let li = document.createElement('li');
    li.innerHTML = input.value;

    list.appendChild(li);

    input.value ="";
}

botaoRemover.addEventListener('click', ()=>{

    let li = document.querySelector('li');
    list.removeChild(li);
})


botaoAll.addEventListener('click', ()=>{

    let li =document.querySelector('li');

    

})

// Remover todos
botaoAll.addEventListener('click', ()=> {

    let removeList = (list.children.length);
    let li = document.querySelectorAll('li');

    for(let i = 0; i < removeList; i++)  {
        list.removeChild(li[i]);
    }

})

//Inserindo elemento pelo evento de teclado
function addList(event){
    if(event.key === 'Enter'){
        let li =document.createElement('li');
        li.innerHTML= input.value;
        li.appendChild(li);
        
        input.value = "";
    }
}