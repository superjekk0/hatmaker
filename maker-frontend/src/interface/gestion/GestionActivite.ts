import {Activite} from "../Interface.ts";
import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";

export const getActivites = async (): Promise<Activite[]> => {
    const response = await fetch(RoutesBE.Activites, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const addActivite = async (nom: string): Promise<Activite> => {
    const response = await fetch(RoutesBE.Activites, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({nom}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Activité invalide');
    }

    return await response.json();
}

export const modifierActivite = async (activite: Activite): Promise<Activite> => {
    const response = await fetch(RoutesBE.Activites, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(activite),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Activité invalide');
    }

    return await response.json();
}

export const supprimerActivite = async (activite: Activite): Promise<Activite> => {
    const response = await fetch(RoutesBE.Activites, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(activite),
    });

    return await response.json();
}