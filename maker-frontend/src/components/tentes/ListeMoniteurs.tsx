import {useState, useEffect} from "react";
import {Moniteur} from "../../interface/Interface.ts";
import {getMoniteurs} from "../../interface/gestion/GestionUtilisateur.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

interface ListeMoniteursProps {
    addedMoniteurs: Moniteur[];
    setAddedMoniteurs: (moniteurs: Moniteur[]) => void;
}

const ListeMoniteurs = ({addedMoniteurs, setAddedMoniteurs}: ListeMoniteursProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [allMoniteurs, setAllMoniteurs] = useState<Moniteur[]>([]);
    const [filteredMoniteurs, setFilteredMoniteurs] = useState<Moniteur[]>([]);

    useEffect(() => {
        getMoniteurs().then(
            data => setAllMoniteurs(data.filter(moniteur => !moniteur.deleted))
        ).catch(
            error => console.error('Error fetching moniteurs:', error)
        );
    }, []);

    useEffect(() => {
        setFilteredMoniteurs(
            allMoniteurs.filter(moniteur =>
                moniteur.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !addedMoniteurs.some(added => added.id === moniteur.id)
            )
        );
    }, [searchTerm, allMoniteurs, addedMoniteurs]);

    const handleAddMoniteur = (moniteur: Moniteur) => {
        setAddedMoniteurs([...addedMoniteurs, moniteur]);
        setSearchTerm("");
    };

    const handleRemoveMoniteur = (id: number | undefined) => {
        setAddedMoniteurs(addedMoniteurs.filter(moniteur => moniteur.id !== id));
    };

    return (
        <div className="w-full ml-1">
            <h2 className="text-xl font-bold mb-4 mt-6">Moniteurs</h2>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Rechercher un moniteur"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className={searchTerm && filteredMoniteursClass(filteredMoniteurs)}>
                {searchTerm && filteredMoniteurs.map(moniteur => (
                    <li key={moniteur.id} className="flex justify-between items-center p-2 border-b">
                        <span>{moniteur.nom}</span>
                        <button
                            className="p-2 rounded"
                            onClick={() => handleAddMoniteur(moniteur)}
                        >
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </li>
                ))}
            </ul>
            <ul className={addedMoniteursClass(addedMoniteurs)}>
                {addedMoniteurs.map(moniteur => (
                    <li key={moniteur.id} className="flex justify-between items-center p-2 border-b">
                        <span>{moniteur.nom}</span>
                        <button
                            className="p-2 rounded"
                            onClick={() => handleRemoveMoniteur(moniteur.id)}
                        >
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    function addedMoniteursClass(addedMoniteurs: Moniteur[]) {
        if (addedMoniteurs.length <= 0) {
            return "";
        } else {
            return "mb-4 border rounded bg-gray-100 max-h-60 overflow-y-auto";
        }
    }

    function filteredMoniteursClass(filteredMoniteurs: Moniteur[]) {
        if (filteredMoniteurs.length == 0) {
            return "";
        } else {
            return "mb-4 border rounded bg-gray-100 max-h-28 overflow-y-auto";
        }
    }
};

export default ListeMoniteurs;