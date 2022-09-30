import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();                                     //получаем id из адресной строки 
    const [data, setData] = useState({});  
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    console.log(Component);
    console.log(dataType);
    console.log(id);

    useEffect(() => {
        updateData()
    }, [id])
    
    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }; 

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return(
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
}

export default SinglePage;