import React, {useContext, useState} from "react";
import {InformationsConnexion} from "../interface/Interface.ts";
import ChargementCirculaire from "./ChargementCirculaire.tsx";
import {RoutesFE} from "../interface/Routes.ts";
import {useNavigate} from "react-router-dom";
import {connexion} from "../interface/Connexion.ts";
import {AuthentificatedContext} from "../context/AuthentificationContext.tsx";

const FormulaireConnexion = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)

    const [infosConnexion, setInfosConnexion] = useState({
        courriel: '',
        motDePasse: ''
    })
    const {setIsAuthentificated} = useContext(AuthentificatedContext)


    const [erreurBackend, setErreurBackend] = useState('')
    const [erreurCourriel, setErreurCourriel] = useState('')
    const [erreurMotDePasse, setErreurMotDePasse] = useState('')

    const resetErreurs = () => {
        setErreurBackend("");
        setErreurCourriel("");
        setErreurMotDePasse("");
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        resetErreurs();

        let hasError = false;

        if (infosConnexion.courriel.trim() === '') {
            setErreurCourriel("Courriel requis");
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(infosConnexion.courriel)) {
            setErreurCourriel("Courriel invalide");
            hasError = true;
        }

        if (infosConnexion.motDePasse.trim() === '') {
            setErreurMotDePasse("Mot de passe requis");
            hasError = true;
        }

        if (hasError) return;

        const informationsConnexion : InformationsConnexion = {
            courriel: infosConnexion.courriel,
            motDePasse: infosConnexion.motDePasse
        }
        setIsLoading(true);
        await connexion(informationsConnexion).then(() => {
            setInfosConnexion({
                courriel: '',
                motDePasse: ''
            })
            resetErreurs()
            setIsAuthentificated(true)
            navigate(RoutesFE.Accueil)
        }).catch((message:string) => {
            setErreurBackend(message)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div>
            <form className="formulaire mt-20" onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Courriel</label>
                    <input
                        type="text"
                        id="email"
                        value={infosConnexion.courriel}
                        onBlur={() => setInfosConnexion(() => ({...infosConnexion, courriel: infosConnexion.courriel.trim()}))}
                        onChange={e => setInfosConnexion({...infosConnexion, courriel: e.target.value})}
                        className={erreurCourriel ? "error-input" : ""}
                    />
                    {erreurCourriel && <p className="error-text">{erreurCourriel}</p>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={infosConnexion.motDePasse}
                        onChange={e => setInfosConnexion({...infosConnexion, motDePasse: e.target.value})}
                        className={erreurMotDePasse ? "error-input" : ""}
                    />
                    {erreurMotDePasse && <p className="error-text">{erreurMotDePasse}</p>}
                </div>
                {erreurBackend && <p className="error-text">{erreurBackend}</p>}
                {isLoading && <span><ChargementCirculaire/></span>}
                <button type="submit" className="btn-green ml-auto mr-0">Connecter</button>
            </form>
        </div>
    )
}

export default FormulaireConnexion;
