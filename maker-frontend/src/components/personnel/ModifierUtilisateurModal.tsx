import {Departement, Utilisateur} from "../../interface/Interface.ts";
import {useEffect, useState} from "react";
import {getDepartements} from "../../interface/gestion/GestionDepartements.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {modifierUtilisateur, supprimerUtilisateur} from "../../interface/gestion/GestionUtilisateur.ts";

interface ModifierUtilisateurModalProps {
    isOpen: boolean;
    onClose: () => void;
    utilisateur: Utilisateur;
    onSave: (utilisateur: Utilisateur) => void;
    onDelete: (utilisateur: Utilisateur) => void;
}

const ModifierUtilisateurModal = ({isOpen, onClose, utilisateur, onSave, onDelete}: ModifierUtilisateurModalProps) => {
    const [nom, setNom] = useState(utilisateur.nom);
    const [departement, setDepartement] = useState<Departement | undefined>(utilisateur.departement);
    const [departements, setDepartements] = useState<Departement[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getDepartements().then(
            data => setDepartements(data.filter(departement => !departement.deleted))
        ).catch(
            error => console.error('Error fetching departements:', error)
        );
    }, []);

    const handleSave = () => {
        if (!departement) {
            setError("Le departement ne peut pas être vide");
            return;
        }

        const updatedUtilisateur = {
            ...utilisateur,
            nom: nom.trim(),
            departement
        };

        modifierUtilisateur(updatedUtilisateur).then(
            () => {
                onSave(updatedUtilisateur);
                setError("");
                onClose();
            }
        ).catch(
            error => setError(error.message)
        );
    };

    const handleDelete = () => {
        supprimerUtilisateur(utilisateur).then(
            () => onDelete(utilisateur)
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md lg:w-1/3 relative">
                <button
                    className="absolute top-2 right-2 text-black"
                    onClick={handleClose}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <h2 className="text-xl font-bold mb-4">Modifier un membre du Personnel</h2>
                <input
                    type="text"
                    className={`w-[49%] p-2 border border-gray-300 rounded mb-2`}
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <select
                    className={`w-full p-2 border border-gray-300 rounded mb-2`}
                    value={departement ? departement.id : ""}
                    onChange={(e) => setDepartement(departements.find(d => d.id === parseInt(e.target.value)) || undefined)}>
                    <option value="" disabled>Sélectionner un departement</option>
                    {departements.map(departement => (
                        <option key={departement.id} value={departement.id}>{departement.nom}</option>
                    ))}
                </select>
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
}

export default ModifierUtilisateurModal;