import { apiGifs, buscarGifs } from "./app.js"

export class SUGERENCIAS{
    constructor(){
        this.sugerencias = document.querySelector('#caja_sugerencia');
        this.inputBuscar = document.querySelector('#search');
        this.init();
    }
    init(){
        this.seleccionarSugerencias();
    }
    async seleccionarSugerencias(){
        const { children } = this.sugerencias;

        for(let i = children.length; i <=3; i++){ //crea las cuatro sugerencias necesarias con la Api Random
            await apiGifs.gifsRandom()
                .then((data) => {
                   if(data.data.username.length !== 0){ 
                            const datos = data.data;
                            this.mostrarSeccionSugerencias(datos)
                    }
                    else{
                        i--
                    }
                });
        }
    }
    mostrarSeccionSugerencias(data){
        const div = document.createElement('div');
        const enlace = document.createElement('a');
        const user = data.user.username;
        
        enlace.className = 'ver_mas';
        enlace.innerText = 'Ver más...';

        div.classList.add('tarjeta');
        div.classList.add('light-box');

        const template = `<div class="tarjeta__encabezado">
                          <h5>#${ user }</h5>
                          <img src="./img/button3.svg" alt="" class="tarjeta__cerrar">
                          </div>
                          <img src="${ data.images.original.url }" alt="" class="gif">`;

        div.innerHTML = template;
        div.appendChild(enlace);
        this.sugerencias.appendChild(div);
        enlace.addEventListener('click', () => this.botonVerMas(user, data));
    }
    botonVerMas(user, data){ //Si es usuario verficado al buscar entras a los gifs subidos por ese usuario, si no buscas directamente el nombre de usuario
        if(!data.user.is_verified){
            this.inputBuscar.value = data.user.display_name || 'risas';
            buscarGifs.buscarGifs(this.inputBuscar.value);
        } else{
            this.inputBuscar.value = `@${ user }`;
            buscarGifs.buscarGifs( this.inputBuscar.value )
        }
    }
    botonCerrar(elemento){ //cierra la tarjeta al apretar el boton y crea una nueva
        const tarjetaPorCerrar = elemento.parentNode.parentNode;
        this.sugerencias.removeChild(tarjetaPorCerrar);
        this.seleccionarSugerencias();
    }



}