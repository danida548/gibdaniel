import { API } from "./api.js";
import { TENDENCIAS } from "./tendencias.js"
import { UI } from "./interfaz.js"
import { BUSCADOR } from "./busquedas.js"
import { BARRADEBUSQUEDA } from "./barradebusqueda.js"
import { SUGERENCIAS } from "./sugerencias.js"
import { FUNCIONES } from "./funcionalidades.js";
import { CREARGUIFOS } from "./crearguifos.js";
import { RECORDER } from "./recorder.js";
import { CRONOMETRO } from "./cronometro.js";
import { MISGUIFOS } from "./misguifos.js";

//Tiene todos los datos de la API
export const apiGifs = new API('fcWFPFFk27X7eYpihoAfbcqXbQSWkSTj');
//Creacion de elementos
export const uiGifs = new UI();
//Buscar gifs
export const buscarGifs = new BUSCADOR();
//Lo necesario para grabar
export const recorder = new RECORDER();
//Cronometro
export const cronometro = new CRONOMETRO();
//Logica seccion tendencias
const tendenciasGifs = new TENDENCIAS();
//Funcion del input
const barraDeBusqueda = new BARRADEBUSQUEDA();
//Seccion Sugeridos
const sugerenciasGifs = new SUGERENCIAS();
//Funcionalidades extras
const funcionalidades = new FUNCIONES();
//Seccion CrearGuifos
const crearGuifos = new CREARGUIFOS();
//Seccion misGuifos
export const misGuifos = new MISGUIFOS(); 

const main = document.querySelector('#main');
const header = document.body.firstElementChild;

if(localStorage.getItem('night')) { //Si el tema era el oscuro se guarda en el local Storage y se ponen los estilos
    funcionalidades.nightMode();
}
//Detectar clicks en sugerencias y cierre de ventana
main.addEventListener('click', (e) => {
    if(e.target.className === 'texto') buscarGifs.buscarAlDarClick(e.target); //Al dar a los titulos empieza la busqueda
    if(e.target.className === 'tarjeta__cerrar') sugerenciasGifs.botonCerrar(e.target);//Cierra el recuadro de sugerencia y solicita otro
});
//Detectar clicks en los botones abajo del input de texto
header.addEventListener('click', (e) => {
    if(e.target.className === 'boton_sugerencia') buscarGifs.buscarAlDarClick(e.target);
})

//Regresar al inicio al dar click al logo
document.querySelector('.logo').addEventListener('click', () => {
    location.reload();
});
//Funciones del boton buscar
barraDeBusqueda.botonBuscar.addEventListener('click', () => {
    if(!barraDeBusqueda.inputBuscar.value) return false;
    barraDeBusqueda.cerrarLista();
    barraDeBusqueda.botonBuscar.classList.remove('boton__seleccionado');
    buscarGifs.buscarGifs(barraDeBusqueda.inputBuscar.value);
});
//Mostrar sugerencias abajo del input
barraDeBusqueda.inputBuscar.addEventListener('input', () => {
    const datoaBuscar = barraDeBusqueda.inputBuscar.value;

    barraDeBusqueda.cerrarLista();
    if(!datoaBuscar){
        barraDeBusqueda.botonBuscar.classList.remove('search_button_active');
        barraDeBusqueda.botonBuscar.classList.remove('boton__seleccionado');
        return false;
    }
    barraDeBusqueda.botonBuscar.classList.add('search_button_active');

    apiGifs.autoCompletado(datoaBuscar.trimStart())
        .then(datos => barraDeBusqueda.autoCompletar(datos))
})

barraDeBusqueda.inputBuscar.addEventListener('keydown', (e) => barraDeBusqueda.operarConTeclado(e));