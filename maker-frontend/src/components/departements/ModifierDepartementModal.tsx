import { useState } from 'react';
import {Departement} from '../../interface/Interface.ts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {modifierDepartement, supprimerDepartement} from "../../interface/gestion/GestionDepartements.ts";

interface ModifierDepartementModalProps {
    isOpen: boolean;
    onClose: () => void;
    departement: Departement;
    onSave: (departement: Departement) => void;
    onDelete: (departement: Departement) => void;
}

const ModifierDepartementModal= ({ isOpen, onClose, departement, onSave, onDelete } : ModifierDepartementModalProps) => {
    const [nom, setNom] = useState(departement.nom);
    const [error, setError] = useState("");

    const handleSave = () => {
        const nomTrim = nom.trim();
        setNom(nomTrim);
        const updatedDepartement = { ...departement, nom : nomTrim };

        modifierDepartement(updatedDepartement).then(
            () => {
                onSave(updatedDepartement);
                setError("");
                onClose();
            }
        ).catch(
            error => setError(error.message)
        );
    };

    const handleDelete = () => {
        supprimerDepartement(departement).then(
            () => onDelete(departement)
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
            <div className="bg-white p-4 rounded shadow-md lg:w-1/3 relative">
                <button
                    className="absolute top-2 right-2 text-black"
                    onClick={handleClose}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <h2 className="text-xl font-bold mb-4">Modifier un Département</h2>
                <input
                    type="text"
                    className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded mb-2`}
                    placeholder="Nom de l'état"
                    value={nom}
                    onChange={(e) => setNom(e.target.value.trim())}
                />
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

export default ModifierDepartementModal;