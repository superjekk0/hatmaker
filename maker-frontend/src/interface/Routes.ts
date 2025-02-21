const baseBE = "http://localhost:8080";

export enum RoutesFE {
    Accueil = "/accueil",
    Connexion = "/connexion",
    Inscription = "/inscription",
    InscriptionMoniteur = "/inscription/moniteur",
}

export enum RoutesBE {
    Connexion = `${baseBE}/connexion`,
    InscriptionMoniteur = `${baseBE}/moniteur/inscription`,
    Etats = `${baseBE}/etat`,
    Departements = `${baseBE}/departement`,
}