import {Etat} from "../Interface.ts";
import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";

export const getEtats = async (): Promise<Etat[]> => {
    const response = await fetch(RoutesBE.Etats, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const addEtat = async (nom: string): Promise<Etat> => {
    const response = await fetch(RoutesBE.Etats, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({nom}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'État invalide');
    }

    return await response.json();
}

export const modifierEtat = async (etat: Etat): Promise<Etat> => {
    const response = await fetch(RoutesBE.Etats, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(etat),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'État invalide');
    }

    return await response.json();
}

export const supprimerEtat = async (etat: Etat): Promise<Etat> => {
    const response = await fetch(RoutesBE.Etats, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(etat),
    });

    return await response.json();
}