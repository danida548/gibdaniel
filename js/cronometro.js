export class CRONOMETRO{
    constructor(){
        this.timer;
        this.ms = 0;
        this.s = 0;
        this.m = 0;
        this.tagCronometro;
    }
    iniciar(tiempo){//Los setInterval van al final de la cola de reproduccion, al momento de grabar gifs las funciones del recorder tienen prioridad y hace que el timer sea incorrecto. No encontre si existe alguna forma de poner el setInterval al principio de la cola. En la parte de reproducir lo grabado funciona perfectamente con los ms, en la otra parte solo esta con segundos.
        this.tagCronometro = document.querySelector('.cronometro');
        if(this.ms === 0 && tiempo === 10) this.tagCronometro.innerHTML= '00:00:00:00';
        if(this.ms === 0 && tiempo === 1000) this.tagCronometro.innerHTML= '00:00:00';
        let msAux, sAux, mAux;
        this.timer = setInterval (() => {
            this.ms++;
                    if (this.ms>99){this.s++;this.ms=0;}
                    if (this.s>59){this.m++;this.s=0;}

                    if (this.ms<10){msAux="0"+this.ms;}else{msAux=this.ms;}
                    if (this.s<10){sAux="0"+this.s;}else{sAux=this.s;}
                    if (this.m<10){mAux="0"+this.m;}else{mAux=this.m;}
                    
                    if(tiempo === 10){
                        this.tagCronometro.innerHTML = `00:${mAux}:${sAux}:${msAux}`;
                    }else{
                        this.tagCronometro.innerHTML = `${mAux}:${sAux}:${msAux}`;
                    }                    
                   
        },tiempo)
    }
    pausa(){
        clearInterval(this.timer);
    }
    reset(){
        clearInterval(this.timer);
        this.ms = 0;
        this.s = 0;
        this.m = 0;
    }
}