import React, {useState} from "react";
import {CreeMoniteur} from "../../interface/Interface.ts";
import ChargementCirculaire from "../ChargementCirculaire.tsx";
import {trimField} from "../../interface/utils.ts";
import {useNavigate} from "react-router-dom";
import {RoutesFE} from "../../interface/Routes.ts";
import {addEmployeur} from "../../interface/GestionUtilisateur.ts";

const FormulaireInscriptionEmployeur = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [nom, setNom] = useState<string>("")
    const [courriel, setCourriel] = useState<string>("")
    const [motDePasse, setMotDePasse] = useState<string>("")
    const [confirmMotDePasse, setConfirmMotDePasse] = useState<string>("")

    const [erreurs, setErreurs] = useState({
        nom: '',
        courriel: '',
        motDePasse: '',
        confirmMotDePasse: '',
    })

    const [erreurBackend, setErreurBackend] = useState<string>("")

    const resetErreurs = () => {
        setErreurs({
            nom: '',
            courriel: '',
            motDePasse: '',
            confirmMotDePasse: '',
        })

        setErreurBackend("");
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validation = {
            nom: '',
            courriel: '',
            motDePasse: '',
            confirmMotDePasse: '',
        }
        let hasError: boolean = false

        // Validations
        if (!nom) {
            validation.nom = "Le nom est requis"
            hasError = true
        }

        if (!courriel) {
            validation.courriel = "Le courriel est requis"
            hasError = true
        } else if (!/\S+@\S+\.\S+/.test(courriel)) {
            validation.courriel = "Le courriel est invalide"
            hasError = true
        }

        if (!motDePasse) {
            validation.motDePasse = "Le mot de passe est requis"
            hasError = true
        }

        if (!confirmMotDePasse) {
            validation.confirmMotDePasse = "La confirmation du mot de passe requise"
            hasError = true
        } else if (motDePasse !== confirmMotDePasse) {
            validation.confirmMotDePasse = "Les mots de passes sont différents"
            hasError = true
        }

        setErreurBackend("")
        setErreurs({...validation})
        if (hasError) {
            return
        }

        const employeur: CreeMoniteur = {
            nom: nom,
            courriel: courriel,
            motDePasse: motDePasse,
        }
        setIsLoading(true)
        addEmployeur(employeur).then(() => {
            setNom('')
            setCourriel('')
            setMotDePasse('')
            setConfirmMotDePasse('')
            resetErreurs()
            navigate(RoutesFE.Accueil)
        }).catch((error: string) => {
            setErreurBackend(error)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div>
            <h2 className="h2">Inscription Moniteur</h2>
            <form className="formulaire" onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom"
                           value={nom}
                           onBlur={() => trimField(setNom)}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                               setNom(e.target.value)}
                           className={erreurs.nom ? 'error-input' : ''}/>
                    {erreurs.nom && <span className='error-text'>{erreurs.nom}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="courriel">Courriel</label>
                    <input type="text" id="courriel" name="courriel"
                           value={courriel}
                           onBlur={() => trimField(setCourriel)}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                               setCourriel(e.target.value)}
                           className={erreurs.courriel ? 'error-input' : ''}/>
                    {erreurs.courriel && <span className='error-text'>{erreurs.courriel}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input type="password" id="motDePasse" name="motDePasse"
                           value={motDePasse}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                               setMotDePasse(e.target.value)}
                           className={erreurs.motDePasse ? 'error-input' : ''}/>
                    {erreurs.motDePasse && <span className='error-text'>{erreurs.motDePasse}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="confirmMotDePasse">Confirmer mot de passe</label>
                    <input type="password" id="confirmMotDePasse" name="confirmMotDePasse"
                           value={confirmMotDePasse}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                               setConfirmMotDePasse(e.target.value)}
                           className={erreurs.confirmMotDePasse ? 'error-input' : ''}/>
                    {erreurs.confirmMotDePasse && <span className='error-text'>{erreurs.confirmMotDePasse}</span>}
                </div>
                {erreurBackend && <span className='error-text'>{erreurBackend}</span>}
                {isLoading && <span><ChargementCirculaire/></span>}
                <button type="submit" className="btn-green ml-auto mr-0">Soumettre</button>
            </form>
            <button className="link" onClick={() => navigate(-1)}>Retour</button>
        </div>
    )
}

export default FormulaireInscriptionEmployeur