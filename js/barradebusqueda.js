import { buscarGifs } from "./app.js";

export class BARRADEBUSQUEDA {

    constructor(){
        this.botonBuscar = document.querySelector('.search__button');
        this.inputBuscar = document.querySelector('#search');
        this.cajaAutocompletado = document.querySelector('#autocompletado');
        this.indexFocus = -1;
    }
    autoCompletar(datos){

        const autoCompletado = datos.data;
        
        this.cajaAutocompletado.style.display = 'block';
       
        
        if(autoCompletado.length == 0) {
          this.cajaAutocompletado.style.display= 'none';  
          return false;
        }
    
        for(const [index, valor] of Object.entries(autoCompletado)){
          if(index > 2) return false;
          const elementoSugerido = document.createElement('div');
          const datoSugerido = valor.name;
    
          elementoSugerido.innerHTML = `<strong>${datoSugerido}</strong>`;
          
          this.cajaAutocompletado.appendChild(elementoSugerido);
          
          elementoSugerido.addEventListener('click', () => {
            this.inputBuscar.value = elementoSugerido.innerText;
            this.cerrarLista(); //Scope cambiado 
            this.botonBuscar.classList.add('boton__seleccionado'); //Para ponerle estilos de seleccion al Boton
            return false;
        });
        }
        }
        

        operarConTeclado(e) {
        let items;
        if(this.cajaAutocompletado.children.length > 0){
          items = this.cajaAutocompletado.querySelectorAll('div');
          
          switch(e.keyCode){
            case 40:
                this.indexFocus++;
                if(this.indexFocus > items.length -1) this.indexFocus = items.length -1 ;
            break;
  
            case 38:
                this.indexFocus--;
                if(this.indexFocus < 0) this.indexFocus = 0;
            break;
  
            case 13: if(this.indexFocus < 0)  return false; 
                e.preventDefault();
                items[this.indexFocus].click();
                this.indexFocus = -1;
            break;
            case 8:
              this.botonBuscar.classList.remove('boton__seleccionado')
            break;
            case 27:
                this.cerrarLista();
            break;
  
            default:
  
            break;
            }
          this.seleccionar(items);
          return false;
        } else if (e.keyCode == 13){
            if(!this.inputBuscar.value) return false;
            this.botonBuscar.classList.remove('boton__seleccionado');
            buscarGifs.busquedaGifs(this.inputBuscar.value); //cambie mostrarResultadosDeBusqueda por busquedaGuifs
            this.inputBuscar.value = ''; //verificar
            }
        }
        
    
    
    
        //console.log(autoCompletado);
    cerrarLista(){ //TODO Al borrar muy rapido no funciona
        
        this.cajaAutocompletado.style.display = 'none';
        
        for (let i = this.cajaAutocompletado.children.length; i > 0; i-- ){
           this.cajaAutocompletado.removeChild(this.cajaAutocompletado.lastElementChild);
        }
        this.indexFocus = -1;
        }
        
  

      seleccionar(items){
        if(!items || this.indexFocus == -1) return false;
        items.forEach(x => {
            x.classList.remove('autocompletar-active');
          });
        items[this.indexFocus].classList.add('autocompletar-active');
    }
    
    
      }
      
