import './charList.scss';
import { Component, createRef } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import propTypes from "prop-types";


class CharList extends Component {
    myRef = createRef;                                           //React.createRef

    state = {
            charList: [],
            loading: true,
            error: false,
            offset: 210,
            newItemLoading: false,    
            charEnded: false
        }
        
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();        
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.updateCharList(offset);
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){                              //Если длинна нового массива меньше 9
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
            })
        )
    };

    onError = () => {
        this.setState({
            loading : false,
            error: true,
        })
    }


    updateCharList = (offset) => {
        this.marvelService.getAllCharacters(offset)
            .then(res => this.onCharListLoaded(res))
            .catch(this.onError);
    }

    itemRefs = [];
    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItems = (characters) => {                              //формирование верстки из данных сервера
        const charLi = characters.map((items, i)=> {            
            const {name, thumbnail, id} = items;
            const styleImg = thumbnail.includes('image_not_available') ? {objectFit: 'fill'} : null;

            return (
                <li className="char__item" 
                    key={id}
                    ref={this.setRef}
                    onClick={() => (this.props.getCharId(id), this.focusOnItem(i))}
                    tabIndex={0}>
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
        const {charList: characters, loading, error, offset, newItemLoading, charEnded} = this.state;
        const charLi = this.renderItems(characters);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? charLi : null;

        return (
            <div className="char__list">
                {content}
                {errorMessage}
                {spinner}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => this.onRequest(offset)}
                        style={{'display': charEnded ? 'none' : 'block'}}>                            
                    <div className="inner">
                        {newItemLoading ? 'Loading...' : 'load more'} 
                    </div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {                                           //проверка пропса с помощью PropTypes
    getCharId: propTypes.func.isRequired                         //прверяем что пропс передан и содержит функцию 
}

export default CharList;

