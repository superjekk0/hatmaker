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

interface Departement {
    id: number;
    nom: string;
    deleted?: boolean;
}

interface Activite {
    id: number;
    nom: string;
    deleted?: boolean;
}

interface Groupe {
    id: number;
    nom: string;
    deleted?: boolean;
}

interface Campeur {
    id: number;
    nom: string;
    prenom: string;
    information: string;
    genre: string;
    groupe: Groupe;
    deleted?: boolean;
}

export enum VueResponsable {
    ETATS = 'ETATS',
    DEPARTEMENTS = 'DEPARTEMENTS',
    ACTIVITES = 'ACTIVITES',
    GROUPES = 'GROUPES',
    CAMPEURS = 'CAMPEURS',
}

export type {
    Utilisateur,
    InformationsConnexion,
    CreeMoniteur,
    Etat,
    Departement,
    Activite,
    Groupe,
    Campeur
};