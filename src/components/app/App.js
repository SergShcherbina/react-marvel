import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { lazy, Suspense } from "react";

const Page404 = lazy(() => import('../pages/404'))                     //! динамический импорт обяз после статических
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicPage'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const SingleComicLayout = lazy(()=> import('../pages/singleComicLayout/SingleComicLayout'))
const SingleCharacterLayout = lazy(()=> import('../pages/singleCharacterLayout/SingleCharacterLayout'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}> 
                        <Routes>
                            <Route path ="/" element={<MainPage/>} />         
                            <Route path="/comics" element={<ComicsPage/>}/> 
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>} /> 
                            <Route path="/character/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                            <Route path="*" element={<Page404/>}/>   
                        </Routes>   
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
