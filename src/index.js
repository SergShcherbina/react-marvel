import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from './services/MarvelServices';

import './style/style.scss';

const marvelService = new MarvelService();                  //создаем экземпляр класса для дальнейшей работы с ним

marvelService.getAllCharacters().then(res =>res.data.results.forEach(element => console.log( element.name )));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

