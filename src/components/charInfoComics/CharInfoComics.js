import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelServices";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharInfoComics = () => {
    const [infoComics, setInfoComics] = useState([]);
    const {loading, error, getAllComics} = useMarvelService();

    const onSetComics = (infoComics) => {
        setInfoComics(infoComics)                             
    }; 

    const updateComicsList = (offset) => {
        getAllComics(offset)
            .then(res => onSetComics(res))
    };

    useEffect(() => {
        updateComicsList()
    }, []);

    const View = (arrComics) => {
        const liComicsInfo = arrComics.map((item, i) => {

            return (
                <Link className="char__comics-item" 
                    to={`/comics/${item.id}`}
                    key={i} >
                    <li>
                        {item.title}
                    </li>
                </Link>
            )  
        });        

        return(
            <ul className="char__comics-list"> 
                {liComicsInfo}
            </ul>
        )    
    }

    const res = View(infoComics);
    const errorMessage = error ? <ErrorMessage/> : null;             
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !infoComics) ? res : null;

    return (
        <>    
            {spinner}        
            {content}
            {errorMessage}
        </>
    )
};

// export default CharInfoComics;