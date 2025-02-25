import {Groupe} from "../Interface.ts";
import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";

export const getGroupes = async (): Promise<Groupe[]> => {
    const response = await fetch(RoutesBE.Groupes, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const addGroupe = async (nom: string): Promise<Groupe> => {
    const response = await fetch(RoutesBE.Groupes, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({nom}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Groupe invalide');
    }

    return await response.json();
}

export const modifierGroupe = async (groupe: Groupe): Promise<Groupe> => {
    const response = await fetch(RoutesBE.Groupes, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(groupe),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Groupe invalide');
    }

    return await response.json();
}

export const supprimerGroupe = async (groupe: Groupe): Promise<Groupe> => {
    const response = await fetch(RoutesBE.Groupes, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(groupe),
    });

    return await response.json();
}