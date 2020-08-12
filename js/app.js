import {API} from "./api.js";
import {TENDENCIAS} from "./tendencias.js";
import {UI} from "./interfaz.js";
import {BUSQUEDA} from "./busquedas.js"
import {BARRADEBUSQUEDA} from "./barradebusqueda.js";

//tiene todos los datos de la API
export const apiGifs = new API('9irbiK8l658g0xVfQOoCAh6M94vBGIGr');
//logica seccion tendencia
export const tendenciasGifs = new TENDENCIAS();
//creacion de elemento
export const uiGifs = new UI();
//buscar gifs
export const buscarGifs = new BUSQUEDA();
//funcion Input
export const barradebusqueda = new BARRADEBUSQUEDA();

//regresar al inicio al dar click al logo
document.querySelector('.logo').addEventListener('click', () => {
    uiGifs.mostrarSeccion('sugerencias','tendencias');
    barradebusqueda.inputBuscar.value = "";
})
// funcion del boton buscar
barradebusqueda.botonBuscar.addEventListener('click',() => {
        if (!barradebusqueda.inputBuscar.value) return false;
        barradebusqueda.cerrarLista();
        buscarGifs.busquedaGifs(barradebusqueda.inputBuscar.value);
    });

barradebusqueda.inputBuscar.addEventListener('input', () => {
    const datoaBuscar = barradebusqueda.inputBuscar.value;

    barradebusqueda.cerrarLista();
    if (!datoaBuscar) {
        barradebusqueda.botonBuscar.classList.remove('search_button_active');
        barradebusqueda.botonBuscar.classList.remove('boton__seleccionado');
        return false;

    }
    barradebusqueda.botonBuscar.classList.add('search_button_active');

    apiGifs.autoCompletado(datoaBuscar.trimStart())
        .then(datos => barradebusqueda.autoCompletar(datos))
});

barradebusqueda.inputBuscar.addEventListener('keydown', (e) => {
    barradebusqueda.operarConTeclado(e);
})