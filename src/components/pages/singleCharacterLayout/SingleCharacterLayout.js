import './singleCharacterLayout.scss';
import Helmet from 'react-helmet';

const SingleCharacterLayout = ({data}) => {
    console.log(data);
    const {name, description, thumbnail } = data;

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
                <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
            </div>
        </>
    )
}

export default SingleCharacterLayout;