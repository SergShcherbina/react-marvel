import { useState, useCallback } from "react/cjs/react.development";


export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback ( async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'} ) => {
        
        setProcess('loading')                                            //процесс загрузки/ожидания

        try{
            const response = await fetch(url, {method, body, headers});

            if(!response.ok){
                throw new Error(`Cold not fetch ${url}, status ${response.status}`);
            }

            const data = await response.json();

            // setProcess('confirmed') подтвержденный, но здесь удаляем это состояние так как асинхронная операция будут ошибки
            return data;            
        } catch(e){
            setProcess('error')                                           //ошибка в процессе
            throw e;
        }                        
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading')
    }, []);  

    return {request, clearError, process, setProcess}
};