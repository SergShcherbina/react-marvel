import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";

const setContent = (process, Component, data) => {                        //в зависимости от состояния process рендерим верстку
    switch (process) {
        case 'waiting': return  <Skeleton/>;
            // break;
        case 'loading': return <Spinner/>;
            // break;
        case 'confirmed': return <Component data={data} />;
            // break;
        case 'error': return <ErrorMessage/>;
            // break;
        default :  throw new Error('Unexpected process state');
    }
}

export default setContent;