interface CreeResponsable extends Responsable {
    motDePasse: string;
}

interface Responsable extends Utilisateur {
    nomCompagnie: string;
}

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
    CreeResponsable,
    Responsable,
    Utilisateur,
    InformationsConnexion,
};