import './singleComicPage.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useParams, Link } from 'react-router-dom';

const SingleComicPage = () => {
    const {comicId} = useParams();                                  //получаем id из адресной строки 
    const [comic, setComic] = useState({});  
    const {loading, error, getComic, clearError} = useMarvelService();

    const onComicLoded = (comic) => {
        setComic(comic);
    };    
    const updateComic = () => {
        if(!comicId) return;                                        //если приходит null, то запрос не делаем

        clearError();
        getComic(comicId)
            .then(res => {onComicLoded(res)})
    };
    useEffect(() => {
        updateComic(); 
    }, [comicId]);

    const spinner = loading ? <Spinner/> : null;
    const errorMassage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comic )? <View comic={comic}/> : null;

    return (
        <>
            {spinner}
            {errorMassage}
            {content}
        </>
        
    )
};

const View = ({comic}) => {
    const  {title, images, prices, description, pageCount, language}  = comic;

    return (
        <div className="single-comic">
            <img src={images} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">language: {language}</p>
                <div className="single-comic__price">Price: {prices} $</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
};

export default SingleComicPage;