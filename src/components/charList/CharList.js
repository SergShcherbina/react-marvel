import './charList.scss';
import { useEffect, useState, useRef} from 'react';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import propTypes from "prop-types";


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    
        
    const marvelService = new MarvelService();

    useEffect(()=> {
        updateCharList()
    }, []);

    
    const onRequest = (offset) => {
        onCharListLoading();
        updateCharList(offset);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){                              //Если длинна нового массива меньше 9
            ended = true;
        }   

        setCharList(() => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(ofset => ofset + 9);
        setCharEnded(ended)
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const updateCharList = (offset) => {
        marvelService.getAllCharacters(offset)
            .then(res => onCharListLoaded(res))
            .catch(onError);
    }

    const itemRefs = useRef([]);
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (characters) => {                              //формирование верстки из данных сервера
        const charLi = characters.map((items, i)=> {            
            const {name, thumbnail, id} = items;
            const styleImg = thumbnail.includes('image_not_available') ? {objectFit: 'fill'} : null;

            return (
                <li className="char__item" 
                    key={id}
                    ref={(el)=> itemRefs.current[i] = el}
                    onClick={() => (props.getCharId(id), focusOnItem(i))}
                    tabIndex={0}>
                    <img src={thumbnail} alt={name} style={styleImg}/>
                    <div className="char__name">{name}</div>
                </li> 
            );
        });

        return (                                                 //конструкция вынесена для центровки спиннера/ошибки
            <ul className="char__grid">
                {charLi}
            </ul>
        )
    }    
    
    const charLi = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? charLi : null;

    return (
        <div className="char__list">
            {content}
            {errorMessage}
            {spinner}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}>                            
                <div className="inner">
                    {newItemLoading ? 'Loading...' : 'load more'} 
                </div>
            </button>
        </div>
    )
}

CharList.propTypes = {                                           //проверка пропса с помощью PropTypes
    getCharId: propTypes.func.isRequired                         //прверяем что пропс передан и содержит функцию 
}

export default CharList;

