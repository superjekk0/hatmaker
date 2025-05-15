import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";
import {ActiviteMoniteur} from "../Interface.ts";

export const getActiviteMoniteur = async (): Promise<ActiviteMoniteur[]> => {
    const response = await fetch(RoutesBE.ActiviteMoniteur, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const getActiviteMoniteurById = async (id: number): Promise<ActiviteMoniteur> => {
    const response = await fetch(`${RoutesBE.ActiviteMoniteur}/${id}`, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Horaire d\'activité introuvable');
    }

    return await response.json();
}

export const addActiviteMoniteur = async (horaire: ActiviteMoniteur): Promise<ActiviteMoniteur> => {
    const response = await fetch(RoutesBE.ActiviteMoniteur, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(horaire),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Horaire d\'activité introuvable');
    }

    return await response.json();
}

export const modifierActiviteMoniteur = async (horaire: ActiviteMoniteur): Promise<ActiviteMoniteur> => {
    const response = await fetch(RoutesBE.ActiviteMoniteur, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(horaire),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Horaire d\'activité introuvable');
    }

    return await response.json();
}

export const supprimerActiviteMoniteur = async (horaire: ActiviteMoniteur): Promise<ActiviteMoniteur> => {
    const response = await fetch(RoutesBE.ActiviteMoniteur, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(horaire),
    });

    return await response.json();
}