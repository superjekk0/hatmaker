import {getToken} from "../Connexion.ts";
import {RoutesBE} from "../Routes.ts";
import {HoraireTypique} from "../Interface.ts";

export const addHoraireTypique = async (horaireTypique: HoraireTypique): Promise<HoraireTypique> => {
    const response = await fetch(RoutesBE.HoraireTypique, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(horaireTypique)
    });

    return await response.json();
}