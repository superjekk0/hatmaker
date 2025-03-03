import {Campeur} from "../Interface.ts";
import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";

export const getCampeurs = async (): Promise<Campeur[]> => {
    const response = await fetch(RoutesBE.Campeurs, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const addCampeur = async (campeur: Campeur): Promise<Campeur> => {
    const response = await fetch(RoutesBE.Campeurs, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(campeur),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Campeur invalide');
    }

    return await response.json();
}

export const modifierCampeur = async (campeur: Campeur): Promise<Campeur> => {
    const response = await fetch(RoutesBE.Campeurs, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(campeur),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Campeur invalide');
    }

    return await response.json();
}

export const supprimerCampeur = async (campeur: Campeur): Promise<Campeur> => {
    const response = await fetch(RoutesBE.Etats, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(campeur),
    });

    return await response.json();
}