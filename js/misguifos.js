import {apiGifs, uiGifs} from "./app.js";

export class MISGUIFOS{
    constructor(){
        this.botonMisGuifos = document.querySelector('.mis_guifos');
        this.botonCrearGuifos = document.querySelector('.crear_guifos');
        this.guifos = document.querySelector('.guifos');
        this.crearGuifos = document.querySelector('#crear_guifos');
        this.misGuifos = document.querySelector('#losGuifos');
        this.buscador = document.querySelector('.buscador');
        this.botones = document.querySelector('.botones');
        this.init();
    }
    init(){
        this.botonesGuifos();
    }
    botonesGuifos(){
        this.botonMisGuifos.addEventListener('click', () =>{
            this.ocultarMostrar(this.buscador, 'none');
            this.mostrarSeccion('guifos');
        })
        this.botonCrearGuifos.addEventListener('click', () =>{
            this.ocultarMostrar(this.buscador, 'none');
            this.ocultarMostrar(this.botones, 'none');
            uiGifs.mostrarSeccion('guifos');
            this.primeraParte();
        })
    }
    primeraParte(){
        const div = document.createElement('div');
        const botones = document.createElement('div');
        const botonUno = document.createElement('button');
        const botonDos = document.createElement('button');

        botonUno.className = 'boton-color';
        botonUno.innerText = 'Cancelar';
        botonDos.className = 'boton-color';
        botonDos.innerText = 'Comenzar';
        botones.className = 'botones';
        div.classList.add('light-box', 'crearGuifos');     
        div.innerHTML = `      
                <div class="titulo_cuadro">
                    <h4>Crear Guifos</h4>
                </div>
                <div class="icono">
                    <img src="./img/window img.png" alt="">
                </div>
                <div class="contenido">
                    <h4>Aquí podras crear tus propios guifos</h4>
                        <p>Crear tu <span>guifo</span> es muy facil, graba 
                        cualquier imagen con tu cámara y obtén guifos personalizados. 
                        Los pasos para crear tu guifo son:</p>
                    <ul>
                        <li><span>1) </span>Dar permiso de acceso a la cámara (sólo por el tiempo de uso)</li>
                        <li><span>1) </span>Dar permiso de acceso a la cámara (sólo por el tiempo de uso)</li>
                        <li><span>2) </span>Capturar tu momento guifo</li>
                        <li><span>3) </span>Revisar el momento</li>
                        <li><span>4) </span>Listo para subir y compartir!</li>
                        <li>¿Quieres comenzar a crear tu <span>guifo</span> ahora?</li>
                    </ul>
                </div>        
            `;
        botones.appendChild(botonUno);
        botones.appendChild(botonDos);
        div.appendChild(botones);
        this.crearGuifos.appendChild(div);

        botonUno.addEventListener('click', () => this.cerrarCrearGuifos());
        botonDos.addEventListener('click', () => this.segundaParte());
    }
    
    segundaParte(){
        this.crearGuifos.innerHTML = '';
        this.ocultarMostrar(this.misGuifos, 'none');
        const div = document.createElement('div');
        const barraInferior = document.createElement('div');
        const titulo = `<div class="titulo_cuadro"><h4>Un Chequeo Antes De Comenzar</h4></div>`;
        const video = document.createElement('video');
        const botones = document.createElement('div');
        const botonUno = document.createElement('button');
        const botonDos = document.createElement('button');

        barraInferior.className = 'barra-inferior';
        div.classList.add('light-box', 'crearGuifos', 'capturar');
        video.id = 'video';
        video.src = 'stream';
        botones.className = 'botones_captura';
        botonUno.innerHTML = `<img src="./img/camera.svg" alt="camera"/>`;
        botonUno.className = 'boton-color';
        botonDos.className = 'boton-color';
        botonDos.innerText = 'Capturar';

        div.innerHTML = titulo;
        div.appendChild(video);
        botones.appendChild(botonUno);
        botones.appendChild(botonDos);
        barraInferior.appendChild(botones);
        div.appendChild(barraInferior);
        this.crearGuifos.appendChild(div);

        botonUno.addEventListener('click', () => this.terceraParte(barraInferior, botonUno, botonDos, botones));

    }
    
    terceraParte(barraInferior, botonUno, botonDos, botones){
        const contador = document.createElement('div');
        contador.className = 'boton-color';
        contador.innerText = 'blabla';
        barraInferior.insertBefore(contador, botones);
        botonDos.innerText = 'grabando....';
    }
    cuartaParte(){

    }
    quintaParte(){

    }
    sextaParte(){

    }
    cerrarCrearGuifos(){
       this.crearGuifos.innerHTML = '';
       this.ocultarMostrar(this.botones, 'inherit');
       this.ocultarMostrar(this.misGuifos, 'block');
    }
    ocultarMostrar(seccion, mostrar){
        seccion.style.display = mostrar;
    }
}