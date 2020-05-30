const listaTexto = document.getElementById('lista_texto');

function obtener(){
    let texto_input = document.getElementById("texto").value;
    return texto_input;
}

let button = document.getElementById("button");

//agregar eventlistener

function cargarEventListener(){

    

    button.addEventListener('click', random);

    document.addEventListener('DOMContentLoaded', localStorageListo);
    
    // Borrar Texto
    listaTexto.addEventListener('click', borrarTexto);

    document.querySelector('#formulario').addEventListener('submit', agregarTexto);
    
}
cargarEventListener();

function random(){
    let texto_input = obtener();
    agregarLocalStorage(texto_input);
}
//comprobar que exista algo en el storage, retorna un arreglo
function obtenerLocalStorage() {
    let lista_todo;
    // Revisamos los valoes de local storage
    if(localStorage.getItem('lista_todo') === null) {
         lista_todo = []; 
    } else {
         lista_todo = JSON.parse(localStorage.getItem('lista_todo') );
    }
   
    return lista_todo;}

    

//agregar al local storage
    function agregarLocalStorage(texto_input){
        let textoLS;
        textoLS = obtenerLocalStorage();
        //añadir el nuevo tweet
        textoLS.push(texto_input);
        //convertir string a arreglo
        localStorage.setItem('lista_todo', JSON.stringify(textoLS));
    }
    function localStorageListo() {
        let textoLS;
        textoLS = obtenerLocalStorage();
        textoLS.forEach(function(texto_input){
    
    // crear boton borrar
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-texto';
            botonBorrar.innerText = ' X';

    // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = texto_input;
        //agregar boton borrar al texto
        li.appendChild(botonBorrar);
        //agrega el texto a la lista
        listaTexto.appendChild(li);

        })
    };
    
    
    function borrarTextoLocalStorage(item) {

        let textoLS, textoBorrar;
        console.log(`Antes de borrar: ${item}`)
        // Elimina la X del texto
        textoBorrar = item.substring(0, item.length - 2);
        console.log(`Despues de borrar: ${textoBorrar}`)

        textoLS = obtenerLocalStorage();

        textoLS.forEach(function(texto, index) {
             if(textoBorrar === texto) {
                  textoLS.splice(index, 1);
             }
        });
        localStorage.setItem('lista_todo', JSON.stringify(textoLS) );
    }
    function borrarTexto(e) {
        if(e.target.className === 'borrar-texto') {
             e.target.parentElement.remove();
             borrarTextoLocalStorage(e.target.parentElement.innerText);
        }
    }
    function agregarTexto(e) {
        e.preventDefault();
        // leer el valor del textarea
        const texto = document.getElementById('texto').value;
        // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-texto';
        botonBorrar.innerText = ' X';
   
        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = texto;
        // añade el botón de borrar al tweet
        li.appendChild(botonBorrar);
        // añade el tweet a la lista
        listaTexto.appendChild(li);
   
    }
    