import {apiGifs} from "./app.js"
export class RECORDER{
    constructor(){
        this.blob;
        this.vidRecorder;
        this.gifRecorder;
    }
    permisoCamara(video){
        navigator.mediaDevices.getUserMedia({

            audio: false,
            
            video: {
            
            height: { max: 480 }
            
            }
            
            }).then(stream => {
                
                video.srcObject = stream;
                
                video.play()
                this.inicializar(stream);
                })
        
    
    }
    inicializar(stream){

        this.vidRecorder = RecordRTC(stream, {
            type: 'video',
            frameRate: 3,
            quality: 10,
            width: 360,
            hidden: 290,
          }); 
        this.gifRecorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 3,
            quality: 10,
            width: 360,
            hidden: 290,
        });

    }
    empezarGrabar(){
        this.vidRecorder.startRecording();
        this.gifRecorder.startRecording();
    }
    detenerGrabacion(video){
        this.vidRecorder.stopRecording(() => {
            let vidBlob = this.vidRecorder.getBlob();
            let bloby = URL.createObjectURL(vidBlob);
            video.src = bloby;
        });
        this.gifRecorder.stopRecording(() =>{
            this.blob = this.gifRecorder.getBlob();
        })
    }
    urlImagen(){
        let url = URL.createObjectURL(this.blob);
       return url;
    }
    subirGrabacion(){
        let form = new FormData();
        form.append('file', this.blob, 'nombre.gif');
        return form;
    }
    descargarGuifo(){
        this.gifRecorder.save('miGuifo');
    }
}