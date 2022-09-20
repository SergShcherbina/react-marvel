import { useState, useCallback } from "react/cjs/react.development";


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback ( async (url, method = 'GET', body = null, headers = {'Content-type': 'application/json'} ) => {
        
        setLoading(true);

        try{
            const response = await fetch(url, {method, body, headers});

            if(!response.ok){
                throw new Error(`Cold not fetch ${url}, status ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;            
        } catch(e){
            setLoading(false);
            setError('OOOPS');
            throw e;
        }                        
    }, []);

    const clearError = useCallback(() => setError(null), []);  

    return {loading, error, request, clearError}
};