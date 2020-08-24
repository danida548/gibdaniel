import { apiGifs, uiGifs, recorder, cronometro, misGuifos, buscarGifs} from "./app.js";
export class  CREARGUIFOS{
    constructor(){
        this.botonMisGuifos = document.querySelector('.mis_guifos');
        this.botonCrearGuifos = document.querySelector('.crear_guifos');
        this.crearGuifos = document.querySelector('#crear_guifos');
        this.misGuifos = document.querySelector('#losGuifos');
        this.buscador = document.querySelector('.buscador');
        this.botones = document.querySelector('.botones');
        this.contenedor = document.querySelector('.crearGuifos');
        this.headerCrear = document.querySelector('.header_crear');
        this.contenidoCrear = document.querySelector('.contenido');
        this.footerCrear = document.querySelector('.footer_crear');
        this.flecha = document.querySelector('.fa-arrow-left');
        this.play;
        this.video;
        this.id;
        this.url;
        this.init();
    }
    init(){
        this.botonesGuifos();
    }
    botonesGuifos(){
        this.botonMisGuifos.addEventListener('click', () => { //Oculta y muestra lo que deba al presionar el boton de MisGuifos
            this.mostrarPartesMisGuifos();
        });
        this.botonCrearGuifos.addEventListener('click', () => {//Oculta y muestra lo que deba al presionar boton CrearGuifos
            this.ocultarMostrar(this.crearGuifos, 'block');
            this.ocultarMostrar(this.flecha, 'block');
            this.ocultarMostrar(this.buscador, 'none');
            this.ocultarMostrar(this.botones, 'none');
            uiGifs.mostrarSeccion('guifos');
            this.primeraParte();
            buscarGifs.eliminarBotonesSugerencias();
        })
        this.crearGuifos.addEventListener('click', (e) => { //FUNCIONALIDADES PARA LOS DIFERENTES BOTONES DENTRO DE LAS SECCIONES DE CREAR GUIFOS
            const target = e.target.id;
            switch (target) {
                case 'comenzar':
                    this.parte2();
                break;
                case 'cancelar':
                    this.mostrarPartesMisGuifos();
                break;
                case 'capturar':
                    this.parte3();
                break;
                case 'listo':
                    cronometro.reset();
                    this.parte4();
                break;
                case 'repetir':
                    this.parte2();
                break;
                case 'subir':
                    this.parte5();
                break;
                case 'cancelarSubida':
                    this.contenedor.classList.remove('parte2'); 
                    this.primeraParte()
                break;
                case 'cerrarCreador':
                    this.cerrarCrearGuifos();
                break;
                case 'descargar':
                    recorder.descargarGuifo();
                break;
                case 'play':
                    cronometro.iniciar(10); 
                    this.mostrarRepeticion();
                break;
                case 'pause':
                    cronometro.pausa(); 
                    this.video.pause(); 
                    this.play.id = 'play';
                break;
                case 'copiar':
                    this.copiar();
                break;
                case 'terminado':
                    this.contenedor.classList.remove('parte_final'); 
                    this.cerrarCrearGuifos(); 
                    misGuifos.mostrarNuevosGuifos();
                break;
                default:
                break;
            }
        })
    }
    primeraParte(){
        this.headerCrear.innerHTML = `<div class="titulo_cuadro">
                                        <h4>Crear Guifos</h4>
                                      </div>
                                      <div class="icono">
                                            <img src="./img/window_img.png" alt="">
                                      </div>`;
        this.contenidoCrear.innerHTML = `<h4>Aquí podras crear tus propios guifos</h4><p>Crear tu <span>guifo</span> es muy facil, graba cualquier imagen con tu cámara y obtén guifos personalizados. Los pasos para crear tu guifo son:</p>
                                        <ul>
                                            <li><span>1) </span>Dar permiso de acceso a la cámara (sólo por el tiempo de uso)</li>
                                            <li><span>2) </span>Capturar tu momento guifo</li>
                                            <li><span>3) </span>Revisar el momento</li>
                                            <li><span>4) </span>Listo para subir y compartir!</li>
                                            <li>¿Quieres comenzar a crear tu <span>guifo</span> ahora?</li>
                                        </ul>`;
        this.footerCrear.innerHTML = `<div class="botones">
                                        <button class="boton_color" id="cancelar">Cancelar</button>
                                        <button class="boton_color" id="comenzar">Comenzar</button>
                                      </div>`;
    }
    parte2(){
        this.ocultarMostrar(this.misGuifos, 'none');
        this.contenedor.classList.add('parte2');
        this.headerCrear.innerHTML= `<div class="titulo_cuadro">
                                        <h4>Un  Chequeo Antes de Empezar</h4>
                                    </div>
                                    <div class="icono">
                                        <img src="./img/button3.svg" alt="cerrar" id="cerrarCreador">
                                    </div>`;
        this.contenidoCrear.innerHTML = `<video src="stream" id="video"></video>`;
        this.footerCrear.innerHTML = `<div class="botones_captura">
                                        <button class="boton_color" id="capturar">
                                            <img class="captura" src="./img/camera.svg" alt="">
                                        </button>
                                        <button class="boton_color" id="capturar">Comenzar</button>
                                      </div>`;
        const video = document.querySelector('#video');
        recorder.permisoCamara(video);
    }
    parte3(){
        recorder.empezarGrabar();
        this.headerCrear.innerHTML= `<div class="titulo_cuadro">
                                        <h4>Capturando Tu Guifo</h4>
                                    </div>
                                    <div class="icono">
                                        <img src="./img/button3.svg" alt="cerrar" id="cerrarCreador">
                                    </div>`;
        this.footerCrear.innerHTML = `<div class="contador">
                                         <p class="cronometro">00:00:00</p>
                                      </div>
                                      <div class="botones_captura">
                                        <button class="boton_color rojo" id="listo">
                                            <img src="./img/recording.svg" alt="">
                                        </button>
                                        <button class="boton_color rojo" id="listo">Listo</button>
                                      </div>`;
        cronometro.iniciar(1000);
    }
    parte4(){
        const video = document.createElement('video');
        recorder.detenerGrabacion(video);
        video.id = 'video';
        this.video = video;
        this.headerCrear.innerHTML= `<div class="titulo_cuadro">
                                        <h4>Vista Previa</h4>
                                    </div>`;
        this.contenidoCrear.innerHTML = '';
        this.contenidoCrear.appendChild(video)
        this.footerCrear.innerHTML = `<div class="contador">
                                        <p class='cronometro'>00:00:00:00</p>
                                      </div>
                                      <div class="reproducir">
                                        <button id="play" class="boton_color"><img src="./img/forward-2.svg" alt=""></button>
                                        <div class='barra'><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                                      </div>
                                      <div class="botones">
                                        <button class="boton_color" id="repetir">
                                            Repetir Guifo
                                        </button>
                                        <button class="boton_color" id="subir">Subir Guifo</button>
                                     </div>`;
        this.play = document.querySelector('#play');
        
    }
    parte5(){
        
        this.headerCrear.innerHTML= `<div class="titulo_cuadro">
                                        <h4>Subiendo Guifo</h4>
                                    </div>
                                    <div class="icono">
                                        <img src="./img/button3.svg" alt="cerrar" id="cerrarCreador">
                                    </div>`;
        this.contenidoCrear.innerHTML= `<div class='subiendo'>
                                            <img class="mundo" src="./img/globe_img.png" alt="mundo">
                                            <h5>Estamos subiendo tu guifo...</h5>
                                            <div class='barraCarga'><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                                            <p> Tiempo restante <span>30 años</span> algunos minutos</p>
                                        </div>`;
        this.footerCrear.innerHTML= `<div class="botones">
                                        <button class="boton_color" id="cancelarSubida">
                                            Cancelar
                                        </button>
                                    </div>`;
        const barraCarga = document.querySelector('.barraCarga');
        this.animacionSubida(barraCarga);
    }
    parte6(){
        const url = recorder.urlImagen();
        this.contenedor.classList.remove('parte2');
        this.contenedor.classList.add('parte_final');
        this.headerCrear.innerHTML= `<div class="titulo_cuadro">
                                        <h4>Guifo Subido Con Éxito</h4>
                                    </div>
                                    <div class="icono">
                                        <img src="./img/button3.svg" alt="cerrar" id="cerrarCreador">
                                    </div>`;
        this.contenidoCrear.innerHTML= `<div class="izquierda">
                                            <img src="${url}" alt="">
                                        </div>
                                        <div class="derecha">
                                                <h4>Guifo creado con éxito</h4>
                                                <button id="copiar">Copiar Enlace Guifo</button>
                                                <span id="copiado"></span>
                                                <button id="descargar">Descargar Guifo</button>
                                        </div>`;
        this.footerCrear.innerHTML= `<div class="botones">
                                        <button class="boton_color" id="terminado">
                                            Listo
                                        </button>
                                    </div>`;
                                
    }
    cerrarCrearGuifos(){ //Reset a 0
        this.headerCrear.innerHTML = '';
        this.contenidoCrear.innerHTML = '';
        this.footerCrear.innerHTML = '';
        this.contenedor.classList.remove('parte2', 'parte_final');
        this.mostrarPartesMisGuifos();
    }
    ocultarMostrar(seccion, mostrar){ 
        seccion.style.display = mostrar;    
    }
    animacionSubida(barraCarga){
        let i = 0;
        let crono = setInterval(() => {
            barraCarga.children[i].classList.add('span-active');
            i++;
        }, 1000);//Inicia un intervalo de un segundo por barra
        apiGifs.uploadGifs(recorder.subirGrabacion())
                     .then(data => { //Al recibir la respuesta acelera para dar algo de realismo
                         clearInterval(crono);
                         crono = setInterval(() => {
                             barraCarga.children[i].classList.add('span-active')
                             if(i < 16) {
                                 i++;
                                }else{
                                    this.id = data.data.id;
                                    clearInterval(crono);
                                    misGuifos.guardarEnLocalStorage(this.id);
                                    this.parte6();
                                }
                             
                         }, 100);    
                        })
                    .catch(() => {//Por si falla la subida un mensaje de error
                        clearInterval(crono); 
                        this.contenidoCrear.innerHTML = '<div class="subiendo"><h1>Ups.. Ocurrio un error</h1></div>'
                    });
    }
    mostrarRepeticion(){

        const video = document.querySelector('#video'); 
        const max = video.duration;
        const barra = document.querySelector('.barra');
        video.play();  
        this.play.id = 'pause'
        video.addEventListener('timeupdate',() => {

            if(this.play.id === 'pause'){ //Cambia entre boton de pausa y boton de play
                this.play.innerHTML = '<i class="fas fa-pause"></i>'
            } else{
                this.play.innerHTML = '<img src="./img/forward-2.svg" alt="">'
            }

            const posicion = video.currentTime;
            
            let porcentaje = posicion/max*100;
                porcentaje = Math.round(porcentaje)
            
            for(let i = 1; i <= 17; i++){ //Son 17 barras 5.88 es el equivalente en % a 1 barra, se compara si el porcentaje es mayor a x*i entonces el cuadro i debe cambiar de color.
                if(porcentaje > 5.88 * i) barra.children[i-1].className = 'span-active'
            }
            if(porcentaje >= 99) {this.play.id = 'play'; cronometro.reset();};
        })

        for(let i = 0; i <17; i++){
            barra.children[i].classList.remove('span-active')
        }
        
    }
    async copiar(){
        await apiGifs.gifsPorId(this.id)
            .then(data => this.url=data.data.images.original.url)
        let inputCopiar = document.createElement('input');
        let mensaje = document.querySelector('#copiado');
        inputCopiar.value = this.url;

        document.body.appendChild(inputCopiar);
        inputCopiar.select();
        document.execCommand('copy');

        document.body.removeChild(inputCopiar);
        mensaje.style.display =  'block'
        mensaje.innerHTML= 'Copiado!!!';
        setTimeout(() => {
            mensaje.innerHTML= '';
            mensaje.style.display = 'none';
        }, 1500);
    }
    mostrarPartesMisGuifos(){
        this.ocultarMostrar(this.buscador, 'none');
        this.ocultarMostrar(this.crearGuifos, 'none');
        this.ocultarMostrar(this.misGuifos, 'block');
        this.ocultarMostrar(this.flecha, 'none');
        this.ocultarMostrar(this.botones, 'inherit');
        this.botonMisGuifos.classList.add('mis_guifos-active')
        uiGifs.mostrarSeccion('guifos');
        buscarGifs.eliminarBotonesSugerencias();
    }
    
}