import {Tente} from "../Interface.ts";
import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";

export const getTenteByMoniteurId = async (moniteurId: number | null): Promise<Tente> => {
    const response = await fetch(RoutesBE.Tentes + `/moniteur/${moniteurId}`, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const getTentes = async (): Promise<Tente[]> => {
    const response = await fetch(RoutesBE.Tentes, {
        headers: {
            method: 'GET',
            'Authorization': `Bearer ${getToken()}`
        }
    });

    return await response.json();
}

export const addTente = async (tente: Tente): Promise<Tente> => {
    const response = await fetch(RoutesBE.Tentes, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(tente),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Tente invalide');
    }

    return await response.json();
}

export const modifierTente = async (tente: Tente): Promise<Tente> => {
    const response = await fetch(RoutesBE.Tentes, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(tente),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Tente invalide');
    }

    return await response.json();
}

export const supprimerTente = async (tente: Tente): Promise<Tente> => {
    const response = await fetch(RoutesBE.Tentes, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(tente),
    });

    return await response.json();
}