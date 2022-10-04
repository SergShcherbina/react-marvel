import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelServices';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import setContent from '../../utils/setContent';


const CharInfo = (props) => {
    const {charId} = props;
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    const onCharLoded = (char) => {
        setChar(char);
    };    

    const updateChar = () => {
        if(!charId) return;                                        //если приходит null, то запрос не делаем
        clearError();

        getCharacter(charId)
            .then(res => {onCharLoded(res)})
            .then(() => setProcess('confirmed'))                   //устанавливаем состояние после того как приходит результат
    };

    useEffect(() => {
        updateChar();
    }, [charId]);

    return (
        <>
            <div className="char__info">
                {setContent(process, View, char)}
            </div> 
        </>
    )    
}

const View = ({data}) => {                                      //переименовали так как из setContent возвр уже data вместо char
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const styleImgChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null; 

    const renderList = () => {
        return (
            <ul className="char__comics-list"> 

                {comics.length > 0 ? null : 'There is no comics with this character'} 

                {comics.map((item, i) => {
                    if(i > 9) return;
                    
                    const idComicInfo = item.resourceURI.match(/\d{3,}/)[0]    //получаем id комикса из url адреса с сервера     
                    
                    return (
                        <Link to={`/comics/${idComicInfo}`} 
                        className="char__comics-item" key={i} >
                            <li>
                                {item.name}
                            </li>
                        </Link>
                    )  
                })}       
            </ul>
        )
    }    

    return <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImgChar} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>    
        {renderList()}            
    </>
}

CharInfo.propTypes = {                                           //валидация пропсов элемента с помощью PropTypes
    charId: propTypes.number,                                    //указываем какой пропс: какой тип данный должен прийти
}

export default CharInfo;
