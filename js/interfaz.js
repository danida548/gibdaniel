import {apiGifs} from "./app.js";

export class UI {

    crearElementos(data, elementoPadre) {

        for (let value of data) {
            const tituloImagen = value.title.split(" ")[0],
                tarjeta = document.createElement("div"),
                contenedor = document.createElement("div"),
                gif = document.createElement("img");

            gif.src = value.images.original.url;
            tarjeta.className = "tarjeta";
            gif.className = "gif";

            if (value.images.original.width > 480) {
                tarjeta.classList.add("grande")
            }

            const etiqueta = document.createElement("h5");
            etiqueta.className = "texto";
            contenedor.className = "temas_relacionados";
            this.sugerenciasTitulos(tituloImagen, contenedor, etiqueta)

            elementoPadre.appendChild(tarjeta)
            tarjeta.appendChild(contenedor);
            tarjeta.appendChild(gif);
        }
    }
    sugerenciasTitulos(tituloImagen, contenedor, etiqueta){

        apiGifs.sugerenciassDEbusqueda(tituloImagen)
            .then((tags) => {

                let tag = tags.data;

                for(const [index, value] of Object.entries(tag) ){

                    if(index >= 3) return;

                    etiqueta.textContent = `#${value.name}`;

                    contenedor.appendChild(etiqueta.cloneNode(true));

                }
            })

    }
}
