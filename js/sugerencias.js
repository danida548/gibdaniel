import {apiGifs, buscarGifs} from "./app.js"

export class SUGERENCIAS{
    constructor(){
        this.sugerencias = document.querySelector('#caja_sugerencia');
        this.inputBuscar = document.querySelector('#search');
        this.init();
    }
    init(){
        this.selecionarSugerencias();

    }
    async selecionarSugerencias(){
        const {children} = this.sugerencias;
        for(let i = children.length; i <=3; i++){

            await apiGifs.gifsRandom()
                .then((data) =>{  

                    if(data.data.username.length !== 0){                      
                        if(!data.data.user.is_verified){
                            i--;                    
                        }
                        else{
                            const datos = data.data;
                              this.mostrarSeccionSugerencias(datos);                     
                        }
                    }
                })
        }
    }
    mostrarSeccionSugerencias(data){
        const div = document.createElement('div');
        const enlace = document.createElement('a');
        const user = data.user.username;

        enlace.className = 'ver_mas';
        enlace.innerText = 'ver mas...';

        div.classList.add('tarjeta');
        div.classList.add('light-box');

        const template =  ` <div class="tarjeta__encabezado">
                                <h5>#${user}</h5>
                                <img src="./img/button3.svg" alt="" class="tarjeta__cerrar">
                            </div>
                                <img src="${data.images.original.url}" alt="" class="gif">
                            `
        div.innerHTML = template;
        div.appendChild(enlace);
        this.sugerencias.appendChild(div);
        enlace.addEventListener('click', () =>{
            this.botonVerMas(user);
        })

    }
    botonVerMas(user){
        this.inputBuscar.value =`@${user}`;
        buscarGifs.busquedaGifs(this.inputBuscar.value);
    }
    botonCerrar(element){
        const tarjetaPorCerrar = element.parentNode.parentNode;
        this.sugerencias.removeChild(tarjetaPorCerrar);
        this.selecionarSugerencias();
    }
}