import './charList.scss';
import { useEffect, useState, useRef, useMemo} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import propTypes from "prop-types";

const setContent = (process, Component, newItemLoading) => {           //не импортируем а делаем кастомный из-за newItemLoading
    switch (process) {
        case 'waiting': 
            return  <Spinner/>;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed': 
            return <Component/>;
        case 'error': 
            return <ErrorMessage/>;
        default :  
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const {process, setProcess, getAllCharacters} = useMarvelService();
    
    useEffect(()=> {
        updateCharList()
    }, []);
    
    const onRequest = (offset) => {
        setNewItemLoading(true)
        updateCharList(offset);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){                                     //Если длинна нового массива меньше 9
            ended = true;
        }   

        setCharList(() => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(ofset => ofset + 9);
        setCharEnded(ended)
    };

    const updateCharList = (offset) => {
        getAllCharacters(offset)
            .then(res => onCharListLoaded(res))
            .then(() => setProcess('confirmed'))
    }

    const itemRefs = useRef([]);
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (characters) => {                               //формирование верстки из данных сервера
        const charLi = characters.map((items, i)=> {            
            const {name, thumbnail, id} = items;
            const styleImg = thumbnail.includes('image_not_available') ? {objectFit: 'fill'} : null;

            return (
                <CSSTransition key={id} timeout={500} classNames="char__item">
                    <li className="char__item" 
                        key={id}
                        ref={(el)=> itemRefs.current[i] = el}              
                        onClick={() => (props.getCharId(id), focusOnItem(i))}
                        tabIndex={0}>
                        <img src={thumbnail} alt={name} style={styleImg}/>
                        <div className="char__name">{name}</div>
                    </li> 
                </CSSTransition> 
            );
        });

        return (                                                        //конструкция вынесена для центровки спиннера/ошибки
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {charLi}
                </TransitionGroup>
            </ul>
        )
    }    

    const elements = useMemo(() => {                                    //убираем лишний рендеринг 
        //вместо второго аргумента Component можем передать ф-ю, тогда будет работать                                
        return setContent(process, ()=>renderItems(charList), newItemLoading) 
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="char__list">
            {elements}
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

CharList.propTypes = {                                                  //проверка пропса с помощью PropTypes
    getCharId: propTypes.func.isRequired                                //прверяем что пропс передан и содержит функцию 
}

export default CharList;

