import { Formik, Form, Field, ErrorMessage as ErrorMessageForm } from 'formik';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelServices'
import ErrorMessage from '../errorMessage/ErrorMessage';
import SmallSpinner from '../spinner/SmallSpinner';

import './formSearch.scss'

const setContent = (process, Component, result) => {           //не импортируем а делаем кастомный из-за newItemLoading
    switch (process) {
        case 'waiting': return  null;
            // break;
        case 'loading': return <SmallSpinner/>;
            // break;
        case 'confirmed': return result;
            // break;
        case 'error': return <div className='form__error' > {Component} </div>;
            // break;
        default :  return "oh";
    }
}

const validate = values => {                                                    //созд ф-ю по валидации
        const errors = {};                                                      //обьект в который собираем ошибки 
        
        if(!values.search){
            errors.search = 'Required field';        
        } else if (values.search.length < 2) {
            errors.search = 'At least 2 symbol'
        } else if (!/[a-zA-Z]/.test(values.search)) {
            errors.search = 'Enter letters!'
        }    
        return errors                                                           //результат попадает в формик
    }

const FormSearch = () => {
    const [char, setChar] = useState(null);
    const {process, clearError, setProcess, searchCharacter} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (searchName, error) => {
        clearError();

        searchCharacter(searchName)
            .then(onCharLoaded)
            .then(()=> setProcess('confirmed'))
    }

    const result = !char ? null : char.length > 0 ? 
        <>
            <div className='form__success' >There is! Visit</div>
            <Link to={`/character/${char[0].id}`} 
                className="button button__secondary form__button">
                <div className="inner">to pasge </div>                 
            </Link> 
        </> : <div className='form__error' >The character was not found. Check the name and try again</div>

    console.log();
    
    return (
        <Formik 
            initialValues = {{                                                  //передаем как пропсы
                search: '',           
            }}
            validate = {validate}         
            onSubmit = {values => {
                console.log(values);
                return updateChar(values.search)}}                              //получаем результат из формы
            >
            <Form className="form">
                <label className='form__label'>Or find a character by name:</label>
                <Field 
                    name='search' 
                    type='text' 
                    className="form__input" 
                    placeholder='Enter name' 
                />
                <ErrorMessageForm name='search' component="div" className='form__error' />
                <button type="submit" className="button button__main">
                    <div className="inner">FIND</div>
                </button>
                {setContent(process, ErrorMessage, result)}
            </Form>
        </Formik>
    )
};

export default FormSearch;