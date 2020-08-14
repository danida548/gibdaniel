import {apiGifs, uiGifs} from "./app.js";

export class BUSQUEDA {
    constructor() {
        this.busqueda = document.querySelector('.busqueda');
        this.titulo = document.querySelector('#titulo-de-busqueda');
        this.botonesSugerencias = document.querySelector('.botonesSugerencias');
    }
    busquedaGifs(search) {
        uiGifs.mostrarSeccion('busqueda');
        const elementoPadre = this.busqueda.lastElementChild;
        this.titulo.textContent = search + '(resultado)';

        this.borrarResultadoAnterior(elementoPadre);
        apiGifs.buscarGifs(search)
            .then(resultados => {

                const data = resultados.data;
                uiGifs.crearElementos(data, elementoPadre);
            })
        this.agregarBotonesSugerencias(search);

    }
    borrarResultadoAnterior(elementoPadre) {

        let {length} = elementoPadre.children;
        if (length) {
            for (length; length > 0; length--)
                elementoPadre.removeChild(elementoPadre.lastElementChild)
        }
    }
    buscarAlDarClick(elemento){
        const texto = elemento.textContent;
        const palabraEnLimpio = texto.substring(1);
        this.busquedaGifs(palabraEnLimpio);
    }
    agregarBotonesSugerencias(search){
        const a = document.createElement('a');
    
        a.className = 'boton_sugerencia';

        this.eliminarBotonSugerencias();


        uiGifs.sugerenciasTitulos(search, this.botonesSugerencias, a);
    }
    eliminarBotonSugerencias(){
        const{children} = this.botonesSugerencias
        if(children){
            while(children.length > 0){
                this.botonesSugerencias.removeChild(this.botonesSugerencias.lastElementChild)
            }
               
    }
}
}