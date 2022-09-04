

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

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(item => this._trensformCharacter(item));             
    };

    getCharacter = async(id) => {
        const res  = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._trensformCharacter(res.data.results[0])
    };

    _trensformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.url,
            wiki: char.url,
        }
    };
};

export default MarvelService;