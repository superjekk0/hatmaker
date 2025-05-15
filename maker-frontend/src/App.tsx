import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {RoutesFE} from "./interface/Routes.ts";
import {useContext} from "react";
import {AuthentificatedContext} from "./context/AuthentificationContext.tsx";
import Header from "./components/Header.tsx";
import PageAccueil from "./pages/PageAccueil.tsx";
import FormulaireConnexion from "./components/FormulaireConnexion.tsx";
import PageInscription from "./pages/PageInscription.tsx";
import FormulaireInscriptionMoniteur from "./components/moniteur/FormulaireInscriptionMoniteur.tsx";
import AddHoraireTypique from "./components/horaire_typique/AddHoraireTypique.tsx";
import {ViewResponsableProvider} from "./context/ResponsableViewContext.tsx";
import HoraireJournaliere from "./components/horaires/HoraireJournaliere.tsx";
import ModifierHoraireJournaliere from "./components/horaires/ModifierHoraireJournaliere.tsx";
import HoraireActivitesMoniteurs from "./components/gestion_activites/activites_moniteur/HoraireActiviteMoniteurs.tsx";

function App() {
    const {isAuthentificated} = useContext(AuthentificatedContext)

    return (
        <>
            <ViewResponsableProvider>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to={RoutesFE.Accueil}/>}/>
                    <Route path={RoutesFE.Accueil} element={<PageAccueil/>}/>
                    <Route path={RoutesFE.Connexion} element={isAuthentificated
                        ? <Navigate to={RoutesFE.Accueil}/> : <FormulaireConnexion/>}/>
                    <Route path={RoutesFE.Inscription} element={<PageInscription/>}/>
                    <Route path={RoutesFE.InscriptionMoniteur}
                           element={<FormulaireInscriptionMoniteur/>}/>
                    <Route path={RoutesFE.HoraireTypique} element={<AddHoraireTypique/>}/>
                    <Route path={RoutesFE.Horaire} element={<HoraireJournaliere/>}/>
                    <Route path={RoutesFE.HoraireId} element={<ModifierHoraireJournaliere />} />
                    <Route path={RoutesFE.HoraireActivitesMoniteurs} element={<HoraireActivitesMoniteurs/>}/>
                </Routes>
            </ViewResponsableProvider>
        </>
    )
}

export default App
