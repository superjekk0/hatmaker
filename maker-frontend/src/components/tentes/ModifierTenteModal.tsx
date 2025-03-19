import { useState } from 'react';
import {Campeur, Moniteur, Tente} from '../../interface/Interface.ts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {modifierTente, supprimerTente} from "../../interface/gestion/GestionTentes.ts";
import ListeCampeurs from "./ListeCampeurs.tsx";
import ListeMoniteurs from "./ListeMoniteurs.tsx";

interface ModifierTenteModalProps {
    isOpen: boolean;
    onClose: () => void;
    tente: Tente;
    onSave: (tente: Tente) => void;
    onDelete: (tente: Tente) => void;
}

const ModifierTenteModal = ({ isOpen, onClose, tente, onSave, onDelete } : ModifierTenteModalProps) => {
    const [nom, setNom] = useState(tente.nomTente);
    const [campeurs, setCampeurs] = useState<Campeur[]>(tente.campeurs);
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>(tente.moniteurs);
    const [error, setError] = useState("");

    const handleSave = () => {
        const nomTrim = nom.trim();
        setNom(nomTrim);
        setCampeurs([...campeurs]);
        setMoniteurs([...moniteurs]);
        const updatedTente = { ...tente, nomTente: nomTrim, campeurs: campeurs, moniteurs: moniteurs };

        modifierTente(updatedTente).then(
            () => {
                onSave(updatedTente)
                setError("");
                onClose();
            }
        ).catch(
            error => setError(error.message)
        );
    };

    const handleDelete = () => {
        supprimerTente(tente).then(
            () => onDelete(tente)
        ).catch(
            error => setError(error.message)
        );
        onClose();
    };

    const handleClose = () => {
        setError("");
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-4 rounded shadow-md lg:w-1/2 relative">
                <button
                    className="absolute top-2 right-2 text-black"
                    onClick={handleClose}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <h2 className="text-xl font-bold mb-4">Modifier un État</h2>
                <input
                    type="text"
                    className={`w-full p-2 border rounded mb-2`}
                    placeholder="Nom de l'état"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <div className="flex justify-items-center items-start mb-4">
                    <ListeCampeurs addedCampeurs={campeurs} setAddedCampeurs={setCampeurs}/>
                    <ListeMoniteurs addedMoniteurs={moniteurs} setAddedMoniteurs={setMoniteurs}/>
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="flex justify-end">
                    <button className="p-2 bg-red-500 text-white rounded mr-2" onClick={handleDelete}>
                        Supprimer
                    </button>
                    <button className="p-2 bg-green-500 text-white rounded" onClick={handleSave}>
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModifierTenteModal;