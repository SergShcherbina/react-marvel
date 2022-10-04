import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const setContent = (process, Component, newItemLoading) => {           //не импортируем а делаем кастомный из-за newItemLoading
    switch (process) {
        case 'waiting': return  <Spinner/>;
            // break;
        case 'loading': return newItemLoading ? <Component/> : <Spinner/>;
            // break;
        case 'confirmed': return <Component/>;
            // break;
        case 'error': return <ErrorMessage/>;
            // break;
        default :  throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);                             //нач зн обязательно массив
    const [offset, setOffset] = useState(0);                              //для отсчета количества комиксов передается в getAllComics
    const [newItemLoading, setNewItemLoading] = useState(false);          //для контроля disabled кнопки загрузки новых комиксов
    const [comicsEnded, setComicsEnded] = useState(false);                //для контроля display кнопки загрузки новых комиксов
    const {process, setProcess, getAllComics} = useMarvelService();    

    const onRequest = (offset) => {
        setNewItemLoading(true);
        updateComicsList(offset);
    };

    const onSetComics = (newComics) => {
        if (newComics.length < 8 ){                                      //если длинна подгруженного массива < 8 
            setComicsEnded(true)
        }      
        
        setComics([...comics, ...newComics])                             //добавляем в массив комиксов новый массив 
        setOffset(offset => offset + 8);                                 //следующие 8 комиксов 
        setNewItemLoading(false);
    }; 

    const updateComicsList = (offset) => {
        getAllComics(offset)
            .then(res => onSetComics(res))
            .then(()=>setProcess('confirmed'))
    };

    useEffect(() => {
        updateComicsList()
    }, []);

    const renderComics = (comicses) => {

        const comicsList = comicses.map((item, i)=> {                    //получаем массив comics и перебираем 
            const {title, images, prices, id} = item;                    //деструктурируем данные из каждого item

            return (
                <CSSTransition
                    classNames={'comics__item'}
                    timeout={500}
                    key={i}
                    >
                    <li className="comics__item"
                        key={i}                                          //в key порядковый номер, так как id повторяются
                        >
                        <Link to={`/comics/${id}`}>                          
                            <img src={images} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{prices ? prices + ' $' : null}</div>
                        </Link>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {comicsList}
                </TransitionGroup>
            </ul>
        )
    };   

    return (
        <div className="comics__list">
            {setContent(process, ()=> renderComics(comics), newItemLoading)}
            <button 
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}                                //отключаем копку во время подгрузки новых комиксов  
                style={{'display': comicsEnded ? 'none': 'block'}}       //если массив комиксов меньше 8, скрываем кнопку
                className="button button__main button__long">
                <div className="inner">
                    {newItemLoading ? 'Loading...' : 'load more'}        
                </div>
            </button>
        </div>
    )
}

export default ComicsList;