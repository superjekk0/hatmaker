import {useState} from "react";
import {Etat} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {addDepartement} from "../../interface/gestion/GestionDepartements.ts";

interface AddDepartementModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (etat: Etat) => void;
}

const AddDepartementModal = ({isOpen, onClose, onSave}: AddDepartementModalProps) => {
    const [nom, setNom] = useState("");
    const [error, setError] = useState("");

    const handleSave = async () => {
        if (!nom) {
            setError("Le nom du département ne peut pas être vide");
            return;
        }

        addDepartement(nom).then(
            newDepartement => {
                onSave(newDepartement);
                setError("");
                setNom("");
                onClose();
            }
        ).catch(
            error => setError(error.message)
        );
    };

    const handleClose = () => {
        setError("");
        setNom("");
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
                <h2 className="text-xl font-bold mb-4">Ajouter un nouveau département</h2>
                <input
                    type="text"
                    className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded mb-2`}
                    placeholder="Nom de l'état"
                    value={nom}
                    onChange={(e) => setNom(e.target.value.trim())}
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="flex justify-end">
                    <button className="p-2 bg-green-500 text-white rounded" onClick={handleSave}>
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDepartementModal;