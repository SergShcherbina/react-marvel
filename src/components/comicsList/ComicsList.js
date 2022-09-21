import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {
    const [comics, setComics] = useState([]);                             //нач зн обязательно массив
    const [offset, setOffset] = useState(0);                              //для отсчета количества комиксов передается в getAllComics
    const [newItemLoading, setNewItemLoading] = useState(false);          //для контроля disabled кнопки загрузки новых комиксов
    const [comicsEnded, setComicsEnded] = useState(false);                //для контроля display кнопки загрузки новых комиксов
    const {loading, error, getAllComics} = useMarvelService();    

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
    };

    useEffect(() => {
        updateComicsList()
    }, []);

    const renderComics = (comicses) => {

        const comicsList = comicses.map((item, i)=> {                    //получаем массив comics и перебираем 
            const {title, images, prices} = item;                        //деструктурируем данные из каждого item

            return (
                <li className="comics__item"
                    key={i}                                              //в key порядковый номер, так как id повторяются
                    >
                    <a href="#">
                        <img src={images} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{prices ? prices + ' $' : null}</div>
                    </a>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {comicsList}
            </ul>
        )
    };   

    console.log('render');

    const renderComicsList = renderComics(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && comics.length === 0 ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {renderComicsList}
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