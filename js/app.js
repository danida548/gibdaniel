import {API} from "./api.js";
import {TENDENCIAS} from "./tendencias.js";
import {UI} from "./interfaz.js";
import {BUSQUEDA} from "./busquedas.js";
import {BARRADEBUSQUEDA} from "./barradebusqueda.js";
import {SUGERENCIAS} from "./sugerencias.js";
import {FUNCIONES} from "./funcionalidades.js";
import {MISGUIFOS} from "./misguifos.js";


//tiene todos los datos de la API
export const apiGifs = new API('9irbiK8l658g0xVfQOoCAh6M94vBGIGr');
//creacion de elemento
export const uiGifs = new UI();
//logica seccion tendencia
export const tendenciasGifs = new TENDENCIAS();
//buscar gifs
export const buscarGifs = new BUSQUEDA();
//funcion Input
const barraDeBusqueda = new BARRADEBUSQUEDA();
//seccion sugerencias
const sugerenciasGifs = new SUGERENCIAS();
//funcionalidades extras
const funcionalidades = new FUNCIONES();
//seccion mis guifos
const crearGuifs = new MISGUIFOS();


const main = document.querySelector('#main');
const header = document.body.firstElementChild;

//dectectar click en sugerencias y cierre de ventana
main.addEventListener('click', (e) =>{
    if(e.target.className === 'texto'){
       buscarGifs.buscarAlDarClick(e.target);
    }
    if(e.target.className === 'tarjeta__cerrar'){
       sugerenciasGifs.botonCerrar(e.target);  
    }
});

//detectar click en los botones abajo del input de texto
header.addEventListener('click', (e)=>{
    if(e.target.className === 'boton_sugerencia')buscarGifs.buscarAlDarClick(e.target);
});

//regresar al inicio al dar click al logo
document.querySelector('.logo').addEventListener('click', () => {
    buscarGifs.eliminarBotonesSugerencias();
    uiGifs.mostrarSeccion('sugerencias','tendencias');
    crearGuifs.buscador.style.display = 'block';
    crearGuifs.botones.style.display ='inherit';
    barraDeBusqueda.inputBuscar.value = "";
    barraDeBusqueda.botonBuscar.classList.remove('search_button_active');
});

// funcion del boton buscar
barraDeBusqueda.botonBuscar.addEventListener('click',() => {
    if (!barraDeBusqueda.inputBuscar.value) return false;
        barraDeBusqueda.cerrarLista();
        barraDeBusqueda.botonBuscar.classList.remove('boton__seleccionado');
        buscarGifs.busquedaGifs(barraDeBusqueda.inputBuscar.value);
});

//mostrar sugerencias abajo del input
barraDeBusqueda.inputBuscar.addEventListener('input', () => {
    const datoaBuscar = barraDeBusqueda.inputBuscar.value;

    barraDeBusqueda.cerrarLista();
    if (!datoaBuscar) {
        barraDeBusqueda.botonBuscar.classList.remove('search_button_active');
        barraDeBusqueda.botonBuscar.classList.remove('boton__seleccionado');
        return false;
    }

    barraDeBusqueda.botonBuscar.classList.add('search_button_active');

    apiGifs.autoCompletado(datoaBuscar.trimStart())
        .then(datos => barraDeBusqueda.autoCompletar(datos));
});

barraDeBusqueda.inputBuscar.addEventListener('keydown', (e) => {
    barraDeBusqueda.operarConTeclado(e);
});