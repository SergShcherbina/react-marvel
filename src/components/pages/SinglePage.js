import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelServices';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();                                     //получаем id из адресной строки 
    const [data, setData] = useState({});  
    const {process, setProcess, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])
    
    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(()=> setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(()=> setProcess('confirmed'));
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }; 

    return(
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    );
}

export default SinglePage;