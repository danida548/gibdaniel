import {apiGifs, uiGifs} from "./app.js";

export class BUSQUEDA {
    constructor() {
        this.busqueda = document.querySelector('.busqueda');
        this.titulo = document.querySelector('#titulo-de-busqueda');
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
    }
    borrarResultadoAnterior(elementoPadre) {

        let {
            length
        } = elementoPadre.children;
        if (length) {
            for (length; length > 0; length--)
                elementoPadre.removeChild(elementoPadre.lastElementChild)
        }
    }
}
