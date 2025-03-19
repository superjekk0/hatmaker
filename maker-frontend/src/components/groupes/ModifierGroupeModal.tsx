import {useState} from 'react';
import {Groupe} from '../../interface/Interface.ts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {modifierGroupe, supprimerGroupe} from "../../interface/gestion/GestionGroupes.ts";

interface ModifierGroupeModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupe: Groupe;
    onSave: (groupe: Groupe) => void;
    onDelete: (groupe: Groupe) => void;
}

const ModifierGroupeModal = ({isOpen, onClose, groupe, onSave, onDelete}: ModifierGroupeModalProps) => {
    const [nom, setNom] = useState(groupe.nom);
    const [error, setError] = useState("");

    const handleSave = () => {
        const nomTrim = nom.trim();
        setNom(nomTrim);
        const updatedGroupe = {...groupe, nom: nomTrim};

        modifierGroupe(updatedGroupe).then(
            () => {
                onSave(updatedGroupe)
                setError("");
                onClose();
            }
        ).catch(
            error => setError(error.message)
        );
    };

    const handleDelete = () => {
        supprimerGroupe(groupe).then(
            () => onDelete(groupe)
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
                <h2 className="text-xl font-bold mb-4">Modifier un Groupe d'âge</h2>
                <input
                    type="text"
                    className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded mb-2`}
                    placeholder="Nom du groupe"
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

export default ModifierGroupeModal;