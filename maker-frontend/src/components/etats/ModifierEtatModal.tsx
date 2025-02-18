import React, { useState } from 'react';
import { Etat } from '../../interface/Interface.ts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {modifierEtat, supprimerEtat} from "../../interface/gestion/GestionEtats.ts";

interface ModifierEtatModalProps {
    isOpen: boolean;
    onClose: () => void;
    etat: Etat;
    onSave: (etat: Etat) => void;
    onDelete: (etat: Etat) => void;
}

const ModifierEtatModal: React.FC<ModifierEtatModalProps> = ({ isOpen, onClose, etat, onSave, onDelete }) => {
    const [nom, setNom] = useState(etat.nom);
    const [error, setError] = useState("");

    const handleSave = () => {
        const updatedEtat = { ...etat, nom };
        modifierEtat(updatedEtat).then(
            () => onSave(updatedEtat)
        ).catch(
            error => setError(error.message)
        );
        onClose();
    };

    const handleDelete = () => {
        supprimerEtat(etat).then(
            () => onDelete(etat)
        ).catch(
            error => setError(error.message)
        );
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md lg:w-1/3 relative">
                <button
                    className="absolute top-2 right-2 text-black"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <h2 className="text-xl font-bold mb-4">Modifier un État</h2>
                <input
                    type="text"
                    className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded mb-2`}
                    placeholder="Nom de l'état"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
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

export default ModifierEtatModal;