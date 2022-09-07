import './charList.scss';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
            characters: [],
            loading: true,
            error: false,
        }
        
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacters();
    }

    onCharListLoaded = (arr) => {
        this.setState(({
            characters: arr,
            loading: false,
        }))
    }

    onError = () => {
        this.setState({
            loading : false,
            error: true,
        })
    }

    updateCharacters = () => {
        this.marvelService.getAllCharacters()
            .then(res => this.onCharListLoaded(res))
            .catch(this.onError);
    }

    renderIrems = (characters) => {                              //формирование верстки из данных сервера
        const charLi = characters.map(items => {            
            const {name, thumbnail, id} = items;
            const styleImg = thumbnail.includes('image_not_available') ? {objectFit: 'fill'} : null;

            return (
                <li className="char__item" key={id} 
                    onClick={() => this.props.getId(id)}>
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
    
    render() {
        const {characters, loading, error} = this.state;
        const charLi = this.renderIrems(characters);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? charLi : null;

        return (
            <div className="char__list">
                {content}
                {errorMessage}
                {spinner}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;