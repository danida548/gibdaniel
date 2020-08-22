export class API {

    constructor(apikey) {
        this.apikey = apikey;
    }

    async tendenciaGifs(offset = 0) {

        const url = `https://api.giphy.com/v1/gifs/trending?api_key=${this.apikey}&limit=24&rating=G&offset=${offset}`;

        const pedirTendencias = await fetch(url);

        const tendencias = await pedirTendencias.json();

        return tendencias;
    }
    async sugerenciasDeBusqueda(termino){

        const url = `https://api.giphy.com/v1/tags/related/${termino}?api_key=${this.apikey}`;

        const pedirSugerencias = await fetch(url);
        
        const sugerencias = await pedirSugerencias.json();

        return sugerencias;
    }
    
    async buscarGifs(search){
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.apikey}&q=${search}&limit=27&offset=0&rating=G&lang=en`;

        const obtenerDatos = await fetch(url);

        const resultados = await obtenerDatos.json();
        
        return resultados;

    }
    async autoCompletado(termino){

        const url= `https://api.giphy.com/v1/gifs/search/tags?api_key=${this.apikey}&q=${termino}`;

        const informacionAutocompletar = await fetch(url);

        const autoCompletado = await informacionAutocompletar.json();

        return autoCompletado;
    }
    async gifsRandom(){

        const url= `https://api.giphy.com/v1/gifs/random?api_key=${this.apikey}`;

        const pedirGifsRandom = await fetch(url);

        const gifsRandom = await pedirGifsRandom.json();

        return gifsRandom;

    }
    async uploadGuifs(blob){

        const option = {
            method: 'POST',
            body: blob,
            json: true
        }
        const url = `https://upload.giphy.com/v1/gifs?api_key=${this.apikey}`;

        const mandarBlob = await fetch(url, option);

        const data = await mandarBlob.json();

        return data
    }
    async gifPorId(id){
        const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${this.apikey}`;

        const recibirGuif = await fetch(url);

        const guifo = await recibirGuif.json();

        return guifo
    }

}





