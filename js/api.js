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
}