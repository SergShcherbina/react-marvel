import { useHttp } from "../components/hooks/useHttp";


const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e085346ae8f6005895c9c698543ab5ab';
    const _baseOffset = 210

    const {loading, error, request, clearError} = useHttp();             //получаем из хука обьект с методами     
    
    const getAllCharacters = async (offset = _baseOffset) => {           //если аргумент не передается, то используем _baseOffset
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_trensformCharacter);                //или .map(item => this._trensformCharacter(item))   
    };

    const getCharacter = async(id) => {
        const res  = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _trensformCharacter(res.data.results[0])
    };

    const _trensformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.url,
            wiki: char.url,
            id: char.id,
            comics: char.comics.items,
        }
    };
    
    const getAllComics = async (offset = 2) => {           
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_trensformComics);      
    };

    const _trensformComics = (comics) => {
        return {
            title: comics.title,
            images: comics.thumbnail.path+ '.' + comics.thumbnail.extension,
            id: comics.id,
            prices: comics.prices[0].price,
            usl: comics.resourceURI,
        }
    };

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics};
};

export default useMarvelService;