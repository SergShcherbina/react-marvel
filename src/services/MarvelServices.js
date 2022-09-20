import { useHttp } from "../components/hooks/useHttp";


const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e085346ae8f6005895c9c698543ab5ab';
    const _baseOffset = 210

    const {loading, error, request, clearError} = useHttp();               //получаем из хука обьект с методами     
    
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

    return {loading, error, getAllCharacters, getCharacter, clearError };
};

export default useMarvelService;