import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup' 

import './formSearch.scss'

const validate = values => {                                                 //созд ф-ю по валидации
        const errors = {};                                                   //обьект в который собираем ошибки 
        
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
    return (
        <Formik 
            initialValues = {{                                                  //передаем как пропсы
                search: '',           
            }}
            validate = {validate}
            // validationSchema = {Yup.object({                                 //валидация с помощью библиотеки Yup
            //     search: Yup.string().min(2, 'At least 2 symbol').required('Required field')
            // })}                      
            onSubmit = {values => console.log(values)}                          //результат из формы
            >
            <Form className="form">
                <label className='form__label'>Or find a character by name:</label>
                <Field name='search' type='text' className="form__input" placeholder='Enter name'/>
                <ErrorMessage name='search' component="div" className='form__error' />
                <button type="submit" className="button button__main">
                    <div className="inner">FIND</div>
                </button>
            </Form>
        </Formik>
    )
};

export default FormSearch;