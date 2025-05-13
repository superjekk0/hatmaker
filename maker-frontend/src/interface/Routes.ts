const baseBE = "http://localhost:8080";

export enum RoutesFE {
    Accueil = "/accueil",
    Connexion = "/connexion",
    Inscription = "/inscription",
    InscriptionMoniteur = "/inscription/moniteur",
    HoraireTypique = "/horaire-typique",
    Horaire = "/horaire-journaliere",
    HoraireId = "/horaire-journaliere/:id",
}

export enum RoutesBE {
    Connexion = `${baseBE}/connexion`,
    InscriptionMoniteur = `${baseBE}/moniteur/inscription`,
    Etats = `${baseBE}/etat`,
    Departements = `${baseBE}/departement`,
    Activites = `${baseBE}/activite`,
    Groupes = `${baseBE}/groupe`,
    Campeurs = `${baseBE}/campeur`,
    ModifierUtilisateur = `${baseBE}/modifier-utilisateur`,
    Utilisateurs = `${baseBE}/utilisateurs`,
    SupprimerUtilisateur = `${baseBE}/supprimer-utilisateur`,
    Tentes = `${baseBE}/tente`,
    Moniteurs = `${baseBE}/moniteurs`,
    HoraireTypique = `${baseBE}/horaire-typique`,
    HoraireJournaliere = `${baseBE}/horaire-journaliere`,
    Periodes = `${baseBE}/periode`,
}