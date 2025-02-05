import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {RoutesFE} from "./interface/Routes.ts";
import {useContext} from "react";
import {AuthentificatedContext} from "./context/AuthentificationContext.tsx";
import Header from "./components/Header.tsx";
import PageAccueil from "./pages/PageAccueil.tsx";
import FormulaireConnexion from "./components/FormulaireConnexion.tsx";

function App() {
    const {isAuthentificated} = useContext(AuthentificatedContext)

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to={RoutesFE.Connexion}/>}/>
                <Route path={RoutesFE.Accueil} element={<PageAccueil/>}/>
                <Route path={RoutesFE.Connexion} element={isAuthentificated
                    ? <Navigate to={RoutesFE.Accueil}/> : <FormulaireConnexion/>}/>
            </Routes>
        </>
    )
}

export default App
