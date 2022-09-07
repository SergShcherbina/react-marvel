import './randomChar.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelServices';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();                             //создаем экземпляр класса для дальнейшей работы с ним

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdatr() {
        console.log('componentDidUpdatr');
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    onCharLoted = (char) => {
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
        const id = Math.floor(Math.random() * (1011334 - 1011136) + 1011136);
        this.marvelService
            .getCharacter(id)
            .then(res => {this.onCharLoted(res)})
            .catch(this.onError)
            this.onCharLoading()
    };

    render() {
        const {char, loading, error} = this.state;                  

        //если значение null, то переменная не отрендерится
        const errorMessage = error ? <ErrorMessage/> : null;             
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                            onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const descrFix = !description ? 'Описание отсутствует' : description.slice(0,230) + '...';

    //если в названии картинки есть строка "image_not_available" то меняем свойство objectFit
    const styleImgChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;  

    return (
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
    )
}

export default RandomChar;