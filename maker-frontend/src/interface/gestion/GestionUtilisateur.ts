import {CreeMoniteur} from "../Interface.ts";
import {RoutesBE} from "../Routes.ts";

export const addMoniteur = async (moniteur: CreeMoniteur) => {
    const res = await fetch(RoutesBE.InscriptionMoniteur, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(moniteur),
    });
    if (!res.ok) {
        const reponse = await res.json();
        throw reponse.message;
    }
}