import {useEffect, useState} from "react";
import {Campeur, Groupe} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {addCampeur} from "../../interface/gestion/GestionCampeurs.ts";
import {getGroupes} from "../../interface/gestion/GestionGroupes.ts";

interface AddCampeurModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (campeur: Campeur) => void;
}

const AddCampeurModal = ({isOpen, onClose, onSave}: AddCampeurModalProps) => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [information, setInformation] = useState("");
    const [genre, setGenre] = useState("");
    const [groupe, setGroupe] = useState<Groupe | null>(null);
    const [groupes, setGroupes] = useState<Groupe[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getGroupes().then(
            data => setGroupes(data.filter(groupe => !groupe.deleted))
        ).catch(
            error => console.error('Error fetching groupes:', error)
        );
    }, []);

    const handleSave = async () => {
        if (!groupe) {
            setError("Le groupe ne peut pas être vide");
            return;
        }

        let newCampeur: Campeur = {
            id: 0,
            nom: nom.trim(),
            prenom: prenom.trim(),
            information: information,
            genre: genre,
            groupe: groupe
        }

        addCampeur(newCampeur).then(
            campeurCree => {
                onSave(campeurCree);
                setError("");
                setNom("");
                setPrenom("");
                setInformation("");
                setGenre("");
                setGroupe(null);
                onClose();
            }
        ).catch(
            error => setError(error.message)
        );
    };

    const handleClose = () => {
        setError("");
        setNom("");
        setPrenom("");
        setInformation("");
        setGenre("");
        setGroupe(null);
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
                <h2 className="text-xl font-bold mb-4">Ajouter un nouveau Campeur</h2>
                <input
                    type="text"
                    className={`w-[49%] p-2 border border-gray-300 rounded mb-2 mr-2`}
                    placeholder="Prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
                <input
                    type="text"
                    className={`w-[49%] p-2 border border-gray-300 rounded mb-2`}
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <input
                    type="text"
                    className={`w-full p-2 border border-gray-300 rounded mb-2`}
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <select
                    className={`w-full p-2 border border-gray-300 rounded mb-2`}
                    value={groupe ? groupe.id : ""}
                    onChange={(e) => setGroupe(groupes.find(g => g.id === parseInt(e.target.value)) || null)}>
                    <option value="" disabled>Sélectionner un groupe</option>
                    {groupes.map(groupe => (
                        <option key={groupe.id} value={groupe.id}>{groupe.nom}</option>
                    ))}
                </select>
                <textarea
                    className={`w-full p-2 border border-gray-300 rounded mb-2`}
                    placeholder="Information"
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
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

export default AddCampeurModal;