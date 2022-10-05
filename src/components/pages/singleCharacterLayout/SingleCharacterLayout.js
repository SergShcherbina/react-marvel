import './singleCharacterLayout.scss';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail, comics} = data;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`Character ${name}`}
                />
                <title>{name}</title>
            </Helmet>
            <div className="single-comic">               
                <div>
                    <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{name}</h2>
                        <p className="single-comic__descr">{description}</p>                    
                    </div>
                </div>
                <div>
                    <div className="single-comic__comics"> Comics:</div>
                    <ul className="single-comic__comics-list"> 
                        {comics.length > 0 ? null : 'There is no comics with this character'} 

                        {comics.map((item, i) => {                            
                            const idComicInfo = item.resourceURI.match(/\d{3,}/)[0]    //получаем id комикса из url адреса с сервера     
                            return (
                                <Link to={`/comics/${idComicInfo}`} 
                                    className="single-comic__comics-item" key={i} >
                                    <li>
                                        {item.name}
                                    </li>
                                </Link>
                            )  
                        })}       
                    </ul> 
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleCharacterLayout;