import { apiGifs } from "./app.js"

export class MISGUIFOS{
    constructor(){
        this.misGuifos = document.querySelector('#losGuifos');
        this.misGuifos;
        this.init();
    }
    init(){
        this.mostrarMisGuifos();
    }
    guardarEnLocalStorage(id){
        this.guifos = this.obtenerGuifosdeLocalStorage();
        this.guifos.unshift(id);
        localStorage.setItem('guifos', JSON.stringify(this.guifos) );
    }
    obtenerGuifosdeLocalStorage() {
        if(localStorage.getItem('guifos') === null) {
             this.guifos = []; 
        } else {
             this.guifos = JSON.parse(localStorage.getItem('guifos') );
        }
        return this.guifos;
   }
   eliminarDelLocalStorage(guifo){
       this.guifos = this.obtenerGuifosdeLocalStorage();

       let posicion = this.guifos.indexOf(guifo);

       this.guifos.splice(posicion, 1);

       localStorage.setItem('guifos', JSON.stringify(this.guifos))
   }
   mostrarMisGuifos(){
       this.guifos = this.obtenerGuifosdeLocalStorage();

       this.guifos.forEach(guifo => {
           apiGifs.gifsPorId(guifo)
                .then(gif => {
                    const data = gif.data;
                    const div = document.createElement('div');
                    const button = document.createElement('button');
                    button.innerText = 'Eliminar';
                    button.className = 'eliminar';
                    div.className = 'tarjeta';

                    div.innerHTML = `<img class="gif" src="${data.images.original.url}">`
                    div.appendChild(button);
                    this.misGuifos.lastElementChild.appendChild(div)
                    
                    button.addEventListener('click', (e) => {
                        this.misGuifos.lastElementChild.removeChild(e.target.parentElement);
                        this.eliminarDelLocalStorage(guifo);
                    })

                })
       });
   }
   mostrarNuevosGuifos(){ //Para que cuando se agreguen los nuevos guifos no se dupliquen los divs.
       const {children} = this.misGuifos.lastElementChild;
       for(let i = children.length; i > 0; i--){
           this.misGuifos.lastElementChild.removeChild(children[i-1]);
       }
       this.mostrarMisGuifos()

    }
}