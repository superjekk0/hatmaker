const baseBE = "http://localhost:8080";

export enum RoutesFE {
    Accueil = "/accueil",
    Connexion = "/connexion",
}

export enum RoutesBE {
    Connexion = `${baseBE}/connexion`,
}