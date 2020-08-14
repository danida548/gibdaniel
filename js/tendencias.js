import {apiGifs, uiGifs} from "./app.js";

export class TENDENCIAS {
    constructor() {
        this.tendencias = document.querySelector('.tendencias');
        this.init();
    }
    init() {
        this.mostrarTendencias();
    }
    mostrarTendencias() {
        
        const elementoPadre = this.tendencias.lastElementChild;
        apiGifs.tendenciaGifs()
            .then(tendencia => {

                const data = tendencia.data;

                uiGifs.crearElementos(data, elementoPadre);
                
            });
    }

}