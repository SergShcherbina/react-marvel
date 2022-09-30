import { Formik, Form, Field, ErrorMessage as ErrorMessageForm } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelServices'
import ErrorMessage from '../errorMessage/ErrorMessage';

import './formSearch.scss'

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
    const {error, clearError, searchCharacter} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (searchName) => {
        clearError();

        searchCharacter(searchName)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <div className='form__error' > <ErrorMessage/> </div> : null  //ошибка с сервера
    const result = !char ? null : char.length > 0 ? 
            <>
                <div className='form__success' >There is! Visit</div>
                <Link to={`/character/${char[0].id}`} 
                    className="button button__main form__button">
                    <div className="inner">to pasge </div>                 
                </Link> 
            </> : <div className='form__error' >The character was not found. Check the name and try again</div>

    return (
        <Formik 
            initialValues = {{                                                  //передаем как пропсы
                search: '',           
            }}
            validate = {validate}
            onSubmit = {values => updateChar(values.search)}                    //получаем результат из формы
            >
            <Form className="form">
                <label className='form__label'>Or find a character by name:</label>
                <Field name='search' type='text' className="form__input" placeholder='Enter name'/>
                <ErrorMessageForm name='search' component="div" className='form__error' />
                <button type="submit" className="button button__main">
                    <div className="inner">FIND</div>
                </button>
                {errorMessage}
                {result}
            </Form>
        </Formik>
    )
};

export default FormSearch;