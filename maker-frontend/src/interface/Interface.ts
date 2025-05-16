interface Utilisateur {
    id?: number;
    nom: string;
    courriel: string;
    departement?: Departement;
    deleted?: boolean;
    role?: Role;
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

interface Tente {
    id?: number;
    nomTente: string;
    deleted?: boolean;
    campeurs: Campeur[];
    moniteurs: Moniteur[];
}

interface HoraireTypique {
    id?: number;
    nom: string;
    timeSlots: TimeSlot[];
    deleted?: boolean;
}

interface TimeSlot {
    periode: string;
    startTime: string;
    endTime?: string;
}

interface Periode extends TimeSlot {
    id?: number;
    deleted?: boolean;
}

interface CellData {
    indexCol: number;
    indexRow: number;
    cellData?: string;
}

interface Horaire {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    selectedType: string;
    infos?: string[];
    selectedDepartements?: string[];
    selectedPeriodes?: string[];
    cells: CellData[];
    deleted?: boolean;
}

interface Assignement {
    id?: number;
    campeurs: string[];
    periode: string;
    activite: string;
    limite: number;
}

interface ActiviteMoniteur {
    id?: number;
    name: string;
    date: string;
    selectedPeriodes?: string[];
    assignements?: Assignement[];
    cells: CellData[];
    deleted?: boolean;
}

export enum VueResponsable {
    ETATS = 'ETATS',
    DEPARTEMENTS = 'DEPARTEMENTS',
    ACTIVITES = 'ACTIVITES',
    GROUPES = 'GROUPES',
    CAMPEURS = 'CAMPEURS',
    PERSONNEL = 'PERSONNEL',
    TENTES = 'TENTES',
    HORAIRE_TYPIQUE = 'HORAIRE_TYPIQUE',
    HORAIRE = 'HORAIRE',
    PERIODES = 'PERIODES',
    GESTION_ACTIVITES = 'GESTION_ACTIVITES',
}

export enum VueMoniteur {
    TENTE = 'TENTE'
}

export enum Role {
    MONITEUR = 'MONITEUR',
    RESPONSABLE = 'RESPONSABLE',
    SPECIALISTE = 'SPECIALISTE'
}

export type {
    Utilisateur,
    InformationsConnexion,
    CreeMoniteur,
    Etat,
    Departement,
    Activite,
    Groupe,
    Campeur,
    Tente,
    Moniteur,
    HoraireTypique,
    Periode,
    Horaire,
    CellData,
    ActiviteMoniteur,
    Assignement
};