import {apiGifs} from "./app.js";
export class RECORDER{
    constructor(){
        this.blob;
        this.videoRecorder;
        this.gifRecorder;
    }
    permisoCamara(video) {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: {
                    max: 480
                }
            }
        })
        .then(stream => {
            video.srcObject = stream;
            video.play()
            this.inicializar(stream);
        })
    }
    inicializar(stream){
        this.videoRecorder = RecordRTC(stream, {
            type: 'video',
            frameRate: 3,
            quality: 10,
            whidth: 360,
            hidden: 290,
        });
        this.gifRecorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 3,
            quality: 10,
            whidth: 360,
            hidden: 290,
        })
    }
    empezarGrabar(){
        this.videoRecorder.startRecording();
        this.gifRecorder.startRecording();
    }
    detenerGrabacion(video){
        this.videoRecorder.stopRecording(() =>{
            let videoBlob = this.videoRecorder.getBlob();
            let bloby = URL.createObjectURL(videoBlob);
            video.src = bloby;
        });
        this.gifRecorder.stopRecording(() => {
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
    desvargarGuifo(){
        this.gifRecorder.save('miGuifo');
    }
}