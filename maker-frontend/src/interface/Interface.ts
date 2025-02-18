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

interface Etat {
    id: number;
    nom: string;
    deleted?: boolean;
}

export enum VueResponsable {
    ETATS = 'ETATS',
}

export type {
    Utilisateur,
    InformationsConnexion,
    CreeMoniteur,
    Etat
};