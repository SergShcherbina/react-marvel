import './charInfo.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'



class CharInfo extends Component {
    state = {
        char: null,
        error: false,
        loading: false
    }

    marvelService = new MarvelService();

    onCharLoded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading : false,
            error: true,
        })
    }

    onCharLoading = () => {                                         //подставляем спинер пока загружается новая картинка 
        this.setState({
            loading : true,
        })
    }

    updateChar = () => {
        const {charId} = this.props
        if(!charId){                                               //если приходит null, то запрос не делаем
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(res => {this.onCharLoded(res)})
            .catch(this.onError)
    };

    componentDidUpdate(prevProps) {
        if( this.props.charId !== prevProps.charId) {                  //если новый зкщзы и старый не совпадают, выполняем
            this.updateChar();
        }
        console.log('componentDidUpdate');
    }

    componentDidMount() {
        this.updateChar();
        console.log('componentDidMount');
    }

    

    render() {
        const {char, loading, error} = this.state
        console.log(char);

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;             
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {errorMessage}
                {spinner}
                {content}
                {skeleton}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const styleImgChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null; 

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
        <ul className="char__comics-list"> 

            {comics.length > 0 ? null : 'There is no comics with this character'}  

            {comics.map((item, i) => {

                    if(i > 9) return;
                    
                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                        )  
                }) }         
        </ul>
    </>
}

export default CharInfo;