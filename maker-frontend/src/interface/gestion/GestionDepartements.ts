import {Departement} from "../Interface.ts";
import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";

export const getDepartements = async (): Promise<Departement[]> => {
    const response = await fetch(RoutesBE.Departements, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const addDepartement = async (nom: string): Promise<Departement> => {
    const response = await fetch(RoutesBE.Departements, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({nom}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Departement invalide');
    }

    return await response.json();
}

export const modifierDepartement = async (departement: Departement): Promise<Departement> => {
    const response = await fetch(RoutesBE.Departements, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(departement),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Departement invalide');
    }

    return await response.json();
}

export const supprimerDepartement = async (departement: Departement): Promise<Departement> => {
    const response = await fetch(RoutesBE.Departements, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(departement),
    });

    return await response.json();
}