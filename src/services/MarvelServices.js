

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=e085346ae8f6005895c9c698543ab5ab';


    getResource = async (url) => {                                //запрос на сервер
        let res = await fetch(url);

    if(!res.ok){
        throw new Error(`Cold not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
    };

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
};

export default MarvelService;