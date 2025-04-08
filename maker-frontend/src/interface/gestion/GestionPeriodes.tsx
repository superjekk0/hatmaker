import {Periode} from "../Interface.ts";
import {RoutesBE} from "../Routes.ts";
import {getToken} from "../Connexion.ts";

export const getPeriodes = async (): Promise<Periode[]> => {
    const response = await fetch(RoutesBE.Periodes, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const addPeriode = async (periode: Periode): Promise<Periode> => {
    const response = await fetch(RoutesBE.Periodes, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(periode)
    });

    return await response.json();
}

export const modifierPeriode = async (periode: Periode): Promise<Periode> => {
    const response = await fetch(RoutesBE.Periodes, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(periode),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Période invalide');
    }

    return await response.json();
}

export const supprimerPeriode = async (periode: Periode): Promise<Periode> => {
    const response = await fetch(RoutesBE.Periodes, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(periode),
    });

    return await response.json();
}