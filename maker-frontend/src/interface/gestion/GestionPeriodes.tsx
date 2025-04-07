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
