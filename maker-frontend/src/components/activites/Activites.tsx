import {useEffect, useState} from "react";
import {Activite} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import AddActiviteModal from "./AddActiviteModal.tsx";
import ModifierActiviteModal from "./ModifierActiviteModal.tsx";
import {getActivites} from "../../interface/gestion/GestionActivite.ts";

const Activites = () => {
    const [activite, setActivite] = useState<Activite[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
    const [selectedActivite, setSelectedActivite] = useState<Activite | null>(null);

    useEffect(() => {
        getActivites().then(
            data => setActivite(data.filter(activite => activite.deleted !== true))
        ).catch(
            error => console.error('Error fetching activite:', error)
        );
    }, []);

    const handleSave = (newActivite: Activite) => {
        setActivite([...activite, newActivite]);
    };

    const handleModifierSave = (updatedActivite: Activite) => {
        setActivite(activite.map(activite => activite.id === updatedActivite.id ? updatedActivite : activite));
    };

    const handleDelete = (deletedActivite: Activite) => {
        setActivite(activite.filter(activite => activite.id !== deletedActivite.id));
    };

    const handleOnCloseModalModifier = () => {
        setIsModifierModalOpen(false);
        setSelectedActivite(null);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Activités</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md border rounded">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nom</th>
                        <th scope="col" className="px-6 py-3 text-right">
                            <button
                                className="w-10 h-10 bg-gray-100 rounded shadow-md"
                                onClick={() => setIsAddModalOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} size="lg"/>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {activite.map((activite) => (
                        <tr key={activite.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{activite.nom}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedActivite(activite);
                                        setIsModifierModalOpen(true);
                                    }}>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <AddActiviteModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSave}/>
            {selectedActivite && (
                    <ModifierActiviteModal
                        isOpen={isModifierModalOpen}
                        onClose={handleOnCloseModalModifier}
                        activite={selectedActivite}
                        onSave={handleModifierSave}
                        onDelete={handleDelete}
                    />
            )}
        </div>
    )
        ;
};

export default Activites;