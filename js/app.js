import {API} from "./api.js";
import {TENDENCIAS} from "./tendencias.js";
import {UI} from "./interfaz.js";
import {BUSQUEDA} from "./busquedas.js";
import {BARRADEBUSQUEDA} from "./barradebusqueda.js";
import {SUGERENCIAS} from "./sugerencias.js";
import {FUNCIONES} from "./funcionalidades.js";
import {CREARGUIFOS} from "./crearguifos.js";
import {RECORDER} from "./recorder.js";
import {CRONOMETRO} from "./cronometro.js";
import {MISGUIFOS} from "./misguifos.js";


//tiene todos los datos de la API
export const apiGifs = new API('9irbiK8l658g0xVfQOoCAh6M94vBGIGr');
//creacion de elemento
export const uiGifs = new UI();
//buscar gifs
export const buscarGifs = new BUSQUEDA();
//lo necesario para grabar
export const recorder = new RECORDER();
//cronometro
export const cronometro = new CRONOMETRO();
//logica seccion tendencia
const tendenciasGifs = new TENDENCIAS();
//funcion Input
const barraDeBusqueda = new BARRADEBUSQUEDA();
//seccion sugerencias
const sugerenciasGifs = new SUGERENCIAS();
//funcionalidades extras
const funcionalidades = new FUNCIONES();
//seccion mis guifos
const crearGuifs = new CREARGUIFOS();
//seccion mis guifos
export const misGuifos = new MISGUIFOS();

const main = document.querySelector('#main');
const header = document.body.firstElementChild;

if(localStorage.getItem('night')){//si el tema era el oscuro se guarda en locaStorage y se ponen los estilos
    funcionalidades.nightMode();
}
//dectectar click en sugerencias y cierre de ventana
main.addEventListener('click', (e) =>{
    if(e.target.className === 'texto')buscarGifs.buscarAlDarClick(e.target);
    if(e.target.className === 'tarjeta__cerrar')sugerenciasGifs.botonCerrar(e.target);  
});

//detectar click en los botones abajo del input de texto
header.addEventListener('click', (e)=>{
    if(e.target.className === 'boton_sugerencia')buscarGifs.buscarAlDarClick(e.target);
});

//regresar al inicio al dar click al logo
document.querySelector('.logo').addEventListener('click', () => {
  location.reload();
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

barraDeBusqueda.inputBuscar.addEventListener('keydown', (e) => barraDeBusqueda.operarConTeclado(e));