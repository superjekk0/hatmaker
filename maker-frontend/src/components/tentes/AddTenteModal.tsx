import {useState} from "react";
import {Tente, Campeur, Moniteur} from "../../interface/Interface.ts";
import {addTente} from "../../interface/gestion/GestionTentes.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import ListeCampeurs from "./ListeCampeurs.tsx";
import ListeMoniteurs from "./ListeMoniteurs.tsx";

interface AddTenteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tente: Tente) => void;
}

const AddTenteModal = ({isOpen, onClose, onSave}: AddTenteModalProps) => {
    const [nom, setNom] = useState("");
    const [campeurs, setCampeurs] = useState<Campeur[]>([]);
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>([]);
    const [error, setError] = useState("");

    const handleSave = async () => {
        if (!nom) {
            setError("Le nom de la tente ne peut pas être vide");
            return;
        }

        if (campeurs.length === 0) {
            setError("La tente doit avoir des campeurs");
            return;
        }

        if (moniteurs.length === 0) {
            setError("La tente doit avoir au moins un moniteur");
            return;
        }

        let tente: Tente = {
            nomTente: nom,
            campeurs: campeurs,
            moniteurs: moniteurs
        };

        addTente(tente).then(
            newTente => {
                onSave(newTente);
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
            <div className="bg-white p-4 rounded shadow-md lg:w-1/2 relative">
                <button className="absolute top-2 right-2 text-black"
                        onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle Tente</h2>
                <input
                    type="text"
                    className={`w-full p-2 border rounded mb-2`}
                    placeholder="Nom de la tente"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <ListeCampeurs addedCampeurs={campeurs} setAddedCampeurs={setCampeurs}/>
                <ListeMoniteurs addedMoniteurs={moniteurs} setAddedMoniteurs={setMoniteurs}/>
                
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

export default AddTenteModal;