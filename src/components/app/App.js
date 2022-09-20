import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import decoration from '../../resources/img/vision.png';
import { useState } from "react";
import ComicsList from "../comicsList/ComicsList";


const App = () => {    

    const [selectedChar, setChar] = useState(null);
    
    const getCharId = (id) => {
        setChar(id)
    };

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">                    
                    <ErrorBoundary>
                        <CharList getCharId={getCharId}/>
                    </ErrorBoundary>

                    <ErrorBoundary>                                   
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <ErrorBoundary>                                   
                        <ComicsList/>
                </ErrorBoundary>
            </main>
        </div>
    )
}


export default App;
