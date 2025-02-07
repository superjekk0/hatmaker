interface Utilisateur {
    id?: number;
    nom: string;
    courriel: string;
}


interface InformationsConnexion {
    courriel: string;
    motDePasse: string;
}


export type {
    Utilisateur,
    InformationsConnexion,
};