import { apiGifs, uiGifs } from "./app.js"

export class BUSCADOR {
    constructor(){
        this.busquedas = document.querySelector('.busqueda');
        this.titulo = document.querySelector('#titulo_de_busqueda');
        this.botonesSugerencias = document.querySelector('.botonesSugerencias');
    }
    buscarGifs(search){
        uiGifs.mostrarSeccion('busqueda');
        const elementoPadre = this.busquedas.lastElementChild;
        this.titulo.textContent = search + ' (resultados)';

        this.borrarResultadoAnterior(elementoPadre);
        apiGifs.buscarGifs( search )
            .then( resultados => {
                
                const data = resultados.data;
                uiGifs.crearElementos(data, elementoPadre);

            });
        this.agregarBotonesSugerencias(search);

    }
    borrarResultadoAnterior( elementoPadre ){

        let { length } = elementoPadre.children;

        if(length){
            for( length ; length > 0; length--){
             elementoPadre.removeChild(elementoPadre.lastElementChild);   
            }
        }
    }
    buscarAlDarClick(elemento){
        const texto = elemento.textContent;
        const palabraEnLimpio = texto.substring(1);
        this.buscarGifs( palabraEnLimpio );
    }
    agregarBotonesSugerencias(search){
        const a = document.createElement('a');
    
        a.className = 'boton_sugerencia';

        this.eliminarBotonesSugerencias();
        

        uiGifs.sugerenciasTitulos(search, this.botonesSugerencias, a);

    }
    eliminarBotonesSugerencias(){
        const { children } = this.botonesSugerencias;
        if(children){
            while(children.length > 0){
                this.botonesSugerencias.removeChild(this.botonesSugerencias.lastElementChild)
            }
        }
    }
}
