import {useEffect, useState} from "react";
import {Campeur} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import AddCampeurModal from "./AddCampeurModal.tsx";
import ModifierCampeurModal from "./ModifierCampeurModal.tsx";
import {getCampeurs} from "../../interface/gestion/GestionCampeurs.ts";

const Campeurs = () => {
    const [campeur, setCampeur] = useState<Campeur[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
    const [selectedCampeur, setSelectedCampeur] = useState<Campeur | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getCampeurs().then(
            data => setCampeur(data.filter(campeur => campeur.deleted !== true))
        ).catch(
            error => console.error('Error fetching campeur:', error)
        );
    }, []);

    const handleSave = (newCampeur: Campeur) => {
        setCampeur([...campeur, newCampeur]);
    };

    const handleModifierSave = (updatedCampeur: Campeur) => {
        setCampeur(campeur.map(campeur => campeur.id === updatedCampeur.id ? updatedCampeur : campeur));
    };

    const handleDelete = (deletedCampeur: Campeur) => {
        setCampeur(campeur.filter(campeur => campeur.id !== deletedCampeur.id));
    };

    const handleOnCloseModalModifier = () => {
        setIsModifierModalOpen(false);
        setSelectedCampeur(null);
    }

    const filteredCampeurs = campeur.filter(campeur =>
        campeur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campeur.prenom.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Campeurs</h1>
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded w-1/3"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md border rounded">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nom</th>
                        <th scope="col" className="px-6 py-3 text-right">
                            <button className="w-10 h-10 bg-gray-100 rounded shadow-md"
                                    onClick={() => setIsAddModalOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} size="lg"/>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCampeurs.map((campeur) => (
                        <tr key={campeur.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{campeur.prenom} {campeur.nom}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedCampeur(campeur);
                                        setIsModifierModalOpen(true);
                                    }}>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <AddCampeurModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSave}/>
                {
                    selectedCampeur && (
                        <ModifierCampeurModal
                            isOpen={isModifierModalOpen}
                            onClose={handleOnCloseModalModifier}
                            campeur={selectedCampeur}
                            onSave={handleModifierSave}
                            onDelete={handleDelete}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Campeurs;