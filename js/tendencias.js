import {apiGifs} from "./app.js";

export class TENDENCIAS {
    constructor() {

        this.tendencias = document.querySelector('.tendencias');
        this.init();
    }
    init() {

        this.mostrarTendencias()
    }
    mostrarTendencias() {

        apiGifs.tendenciaGifs()
            .then(tendencia => {
                const tendencias = tendencia.data;
                this.crearTendencia(tendencias);
            });
    }

    crearTendencia(tendencias) {

        for (let value of tendencias) {

            const tituloImagen = value.title.split(" ")[0],
                tarjeta = document.createElement("div"),
                div2 = document.createElement("div"),
                gif = document.createElement("img");

            gif.src = value.images.original.url;
            tarjeta.className = "tarjeta";
            gif.className = "gif";

            if (value.images.original.url.width > 480) {
                tarjeta.classList.add("grande")
            }

            this.tendencias.lastElementChild.appendChild(tarjeta)
            tarjeta.appendChild(div2, gif);
            tarjeta.appendChild(gif);
        }
    }
}