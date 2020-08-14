import {API} from "./api.js";
import {TENDENCIAS} from "./tendencias.js";
import {UI} from "./interfaz.js";
import {BUSQUEDA} from "./busquedas.js"
import {BARRADEBUSQUEDA} from "./barradebusqueda.js";
import {SUGERENCIAS} from "./sugerencias.js";
import {FUNCIONES} from "./funcionalidades.js";


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
//seccion sugerencias
export const sugerenciasGifs = new SUGERENCIAS();
//funcionalidades extras
const funcionalidades = new FUNCIONES ();




const main = document.querySelector('#main');
const header = document.body.firstElementChild;

//dectectar click en sugerencias y cierre de ventana
main.addEventListener('click', (e) =>{
    if(e.target.className === 'texto'){
       buscarGifs.buscarAlDarClick(e.target)
    }
    if(e.target.className === 'tarjeta__cerrar'){
       sugerenciasGifs.botonCerrar(e.target)   
    }
})

//detectar click en los botones abajo del input de texto
header.addEventListener('click', (e)=>{
    if(e.target.className === 'boton_sugerencia')buscarGifs.buscarAlDarClick(e.target);
})

//regresar al inicio al dar click al logo
document.querySelector('.logo').addEventListener('click', () => {
    buscarGifs.eliminarBotonesSugerencias();
    uiGifs.mostrarSeccion('sugerencias','tendencias');
    barraDeBusqueda.inputBuscar.value = "";
    barraDeBusqueda.botonBuscar.classList.remove('search_button_active');
});


// funcion del boton buscar
barradebusqueda.botonBuscar.addEventListener('click',() => {
        if (!barradebusqueda.inputBuscar.value) return false;
        barradebusqueda.cerrarLista();
        barraDeBusqueda.botonBuscar.classList.remove('boton__seleccionado');
        buscarGifs.busquedaGifs(barradebusqueda.inputBuscar.value);
    });

//mostrar sugerencias abajo del input
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