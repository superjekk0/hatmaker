import {CreeMoniteur, Utilisateur} from "../Interface.ts";
import {RoutesBE} from "../Routes.ts";
import {getToken} from "../Connexion.ts";

export const addMoniteur = async (moniteur: CreeMoniteur) => {
    const res = await fetch(RoutesBE.InscriptionMoniteur, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(moniteur),
    });
    if (!res.ok) {
        const reponse = await res.json();
        throw reponse.message;
    }
}

export const modifierUtilisateur = async (utilisateur: Utilisateur) => {
    const res = await fetch(RoutesBE.ModifierUtilisateur, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(utilisateur),
    });
    if (!res.ok) {
        const reponse = await res.json();
        throw reponse.message;
    }
}

export const getUtilisateurs = async (): Promise<Utilisateur[]> => {
    const res = await fetch(RoutesBE.Utilisateurs, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    });

    return await res.json();
}

export const supprimerUtilisateur = async (utilisateur: Utilisateur) => {
    const res = await fetch(RoutesBE.SupprimerUtilisateur, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(utilisateur)
    });

    if (!res.ok) {
        const reponse = await res.json();
        throw reponse.message;
    }
}