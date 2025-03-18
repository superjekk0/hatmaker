import {useState, useEffect} from "react";
import {Campeur} from "../../interface/Interface.ts";
import {getCampeurs} from "../../interface/gestion/GestionCampeurs.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

interface ListeCampeursProps {
    addedCampeurs: Campeur[];
    setAddedCampeurs: (campeurs: Campeur[]) => void;
}

const ListeCampeurs = ({addedCampeurs, setAddedCampeurs}: ListeCampeursProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [allCampeurs, setAllCampeurs] = useState<Campeur[]>([]);
    const [filteredCampeurs, setFilteredCampeurs] = useState<Campeur[]>([]);

    useEffect(() => {
        getCampeurs().then(
            data => setAllCampeurs(data.filter(campeur => !campeur.deleted))
        ).catch(
            error => console.error('Error fetching campeurs:', error)
        );
    }, []);

    useEffect(() => {
        setFilteredCampeurs(
            allCampeurs.filter(campeur =>
                (campeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                campeur.prenom.toLowerCase().includes(searchTerm.toLowerCase())) &&
                !addedCampeurs.some(added => added.id === campeur.id)
            )
        );
    }, [searchTerm, allCampeurs, addedCampeurs]);

    const handleAddCampeur = (campeur: Campeur) => {
        setAddedCampeurs([...addedCampeurs, campeur]);
    };

    const handleRemoveCampeur = (id: number) => {
        setAddedCampeurs(addedCampeurs.filter(campeur => campeur.id !== id));
    };

    return (
        <div className="w-full mr-1">
            <h2 className="text-xl font-bold mb-4 mt-6">Campeurs</h2>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Rechercher un campeur"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className={searchTerm && filteredCampeursClass(filteredCampeurs)}>
                {searchTerm && filteredCampeurs.map(campeur => (
                    <li key={campeur.id} className="flex justify-between items-center p-2 border-b">
                        <span>{campeur.prenom} {campeur.nom}</span>
                        <button
                            className="p-2 rounded"
                            onClick={() => handleAddCampeur(campeur)}
                        >
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </li>
                ))}
            </ul>
            <ul className={addedCampeursClass(addedCampeurs)}>
                {addedCampeurs.map(campeur => (
                    <li key={campeur.id} className="flex justify-between items-center p-2 border-b">
                        <span>{campeur.prenom} {campeur.nom}</span>
                        <button
                            className="p-2 rounded"
                            onClick={() => handleRemoveCampeur(campeur.id)}
                        >
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    function addedCampeursClass(addedCampeurs: Campeur[]) {
        if (addedCampeurs.length <= 0) {
            return "";
        } else {
            return "mb-4 border rounded bg-gray-100 max-h-60 overflow-y-auto";
        }
    }

    function filteredCampeursClass(filteredCampeurs: Campeur[]) {
        if (filteredCampeurs.length == 0) {
            return "";
        } else {
            return "mb-4 border rounded bg-gray-100 max-h-28 overflow-y-auto";
        }
    }
};

export default ListeCampeurs;