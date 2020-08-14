export class FUNCIONES{
    constructor(){
        this.botonEstilo = document.querySelector('.selector');
        this.day = document.querySelector('#day');
        this.night = document.querySelector('#night');
        this.logo = document.querySelector('.logo img');
        this.init();
    }
    init(){
        this.botonSelector();
        this.selectorTemas();
    }

    botonSelector(){
    
        this.botonEstilo.firstElementChild.addEventListener('click', () => {

            this.estiloBotonSelector();
        });
        this.botonEstilo.firstElementChild.nextElementSibling.addEventListener('click', () =>{
            this.estiloBotonSelector();
        });
    }
    estiloBotonSelector(){

        this.botonEstilo.classList.toggle('selector-active');
        this.botonEstilo.lastElementChild.classList.toggle('mostrar_menu');
        this.botonEstilo.querySelector('img').classList.toggle('abajo'); //voltea la flecha
    }
    selectorTemas(){
        this.day.addEventListener('click', () => {
            console.log('claro');
            document.body.classList.remove('night');
            this.night.classList.remove('tema-seleccionado');
            this.day.classList.add('tema-seleccionado');
            this.logo.src= './img/gifOF_logo.png';
            this.estiloBotonSelector();
        })
        this.night.addEventListener('click', () => {
            console.log('oscuro');
            document.body.classList.add('night');
            this.night.classList.add('tema-seleccionado');
            this.day.classList.remove('tema-seleccionado');
            this.logo.src= './img/gifOF_logo_dark.png';
            this.estiloBotonSelector();
        })

    }
}