interface Utilisateur {
    id?: number;
    nom: string;
    courriel: string;
}

interface CreeMoniteur extends Moniteur {
    motDePasse: string;
}

interface Moniteur extends Utilisateur {
}

interface InformationsConnexion {
    courriel: string;
    motDePasse: string;
}


export type {
    Utilisateur,
    InformationsConnexion,
    CreeMoniteur,
};