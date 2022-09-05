import errorGif from './error.gif'

const ErrorMessage = () => {
    return (
        <img src={errorGif} alt="error" style={{display: 'block', margin: '0 auto'}} />

        //<img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" />   //если используем файл из папки public
    )
}

export default ErrorMessage;