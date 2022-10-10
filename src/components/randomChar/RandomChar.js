import './randomChar.scss';
import { useState, useEffect } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelServices';
import {CSSTransition} from 'react-transition-group'
import setContent from '../../utils/setContent';


const RandomChar = () => {

    const [char, setChar] = useState(null);
    const [blockShow, setBlockShow] = useState(false);
    const {process, setProcess, getCharacter, clearError} = useMarvelService(); 

    useEffect(()=> {
        updateChar();
        setBlockShow(true);
        // const timerId = setInterval(updateChar, 60000);               //переключение персонажейраз в минуту

        // return(()=> {                                                 //удаляем ссылку на таймер (обязательно!)
        //     clearInterval(timerId);
        // });
    }, [])

    const onCharLoded = (char) => {
        setChar(char);
    };

    function updateChar () {
        const id = Math.floor(Math.random() * (1011300 - 1011150) + 1011136);
        clearError();                                                //если была ошибка при предыдущ загрузке, сбрасываем ее

        getCharacter(id)
            .then(onCharLoded)
            .then(() => setProcess('confirmed'))
    };

    return (
        <CSSTransition classNames={'randomchar'} timeout={500} in={blockShow} unmountOnExit >
            <div className="randomchar">
                {setContent(process, View, char)}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                            onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        </CSSTransition>
    )
}

const View = ({data}) => {
    const [blockShow, setBlockShow] = useState(false);

    useEffect(()=> {
        setBlockShow(true)
    }, [data])

    const {name, description, thumbnail, homepage, wiki} = data;
    const descrFix = !description ? 'Описание отсутствует' : description.slice(0,230) + '...';

    //если в названии картинки есть строка "image_not_available" то меняем свойство objectFit
    const styleImgChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;  

    return (
        <CSSTransition classNames={'randomchar__block'} timeout={500} in={blockShow} unmountOnExit >
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={styleImgChar} />
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {descrFix}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div> 
        </CSSTransition>
    )
}

export default RandomChar;