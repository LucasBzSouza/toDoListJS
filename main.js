
const inputTarefa = document.querySelector('.input-tarefa');   /* input para escrever nome da tarefa */ 
const btnTarefa = document.querySelector('.btn-tarefa');       /* botão para adicionar tarefa */
const tarefas = document.querySelector('.tarefas');            /* tarefas */

function criaLi(){                                     /*  cria elemento da lista */
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {     /* criar tarefa apertando Enter */
  if(e.keyCode === 13) {
    if(!inputTarefa.value) return; 
    criaTarefa(inputTarefa.value); 
  }  
});

function limpaInput(){           /* função que limpa input após adicionar tarefa */
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {     /* Função que gera botão para apagar tarefa */
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);

}

function criaTarefa(textoInput){ /* função que cria a tarefa */ 
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}


btnTarefa.addEventListener('click', function()  /* adiciona evento de clique ao botao e chama função criaTarefa */
  {if(!inputTarefa.value) return; 
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {   /* remoção de tarefa */
    const el = e.target;

    if (el.classList.contains('apagar')) {
         el.parentElement.remove();
         salvarTarefas();
    }

});


function salvarTarefas() {                                 /* função pra salvar tarefas em local storage */
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }  
    
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

}

function adicionaTarefasSalvas() {                        /* função pra recuperar tarefas salvas */
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();