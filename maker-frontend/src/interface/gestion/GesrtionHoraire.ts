import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";
import {Horaire} from "../Interface.ts";

export const getHoraires = async (): Promise<Horaire[]> => {
    const response = await fetch(RoutesBE.HoraireJournaliere, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const getHoraireById = async (id: number): Promise<Horaire> => {
    const response = await fetch(`${RoutesBE.HoraireJournaliere}/${id}`, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Horaire introuvable');
    }

    return await response.json();
}

export const addHoraire = async (horaire: Horaire): Promise<Horaire> => {
    const response = await fetch(RoutesBE.HoraireJournaliere, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(horaire),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Horaire invalide');
    }

    return await response.json();
}

export const modifierHoraire = async (horaire: Horaire): Promise<Horaire> => {
    const response = await fetch(RoutesBE.HoraireJournaliere, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(horaire),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Horaire invalide');
    }

    return await response.json();
}

export const supprimerHoraire = async (horaire: Horaire): Promise<Horaire> => {
    const response = await fetch(RoutesBE.HoraireJournaliere, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(horaire),
    });

    return await response.json();
}