import decoration from "../../resources/img/vision.png";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useState } from "react";
import FormSearch from "../form/FormSearch";
import Helmet from 'react-helmet';


const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const getCharId = (id) => {
        setChar(id);
    };

    return (
        <>  
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information porta"
                />
                <title>Marvel information porta</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList getCharId={getCharId} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FormSearch/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;