import {useEffect, useState} from "react";
import {Groupe} from "../../interface/Interface.ts";
import {getGroupes} from "../../interface/gestion/GestionGroupes.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import AddGroupeModal from "./AddGroupeModal.tsx";
import ModifierGroupeModal from "./ModifierGroupeModal.tsx";

const Groupes = () => {
    const [groupes, setGroupes] = useState<Groupe[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
    const [selectedGroupe, setSelectedGroupe] = useState<Groupe | null>(null);

    useEffect(() => {
        getGroupes().then(
            data => setGroupes(data.filter(groupe => groupe.deleted !== true))
        ).catch(
            error => console.error('Error fetching groupes:', error)
        );
    }, []);

    const handleSave = (newGroupe: Groupe) => {
        setGroupes([...groupes, newGroupe]);
    };

    const handleModifierSave = (updatedGroupe: Groupe) => {
        setGroupes(groupes.map(groupe => groupe.id === updatedGroupe.id ? updatedGroupe : groupe));
    };

    const handleDelete = (deletedGroupe: Groupe) => {
        setGroupes(groupes.filter(groupe => groupe.id !== deletedGroupe.id));
    };

    const handleOnCloseModalModifier = () => {
        setIsModifierModalOpen(false);
        setSelectedGroupe(null);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Groupe d'âges</h1>
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
                    {groupes.map((groupe) => (
                        <tr key={groupe.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{groupe.nom}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedGroupe(groupe);
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
            <AddGroupeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSave}/>
            {selectedGroupe && (
                <ModifierGroupeModal
                    isOpen={isModifierModalOpen}
                    onClose={handleOnCloseModalModifier}
                    groupe={selectedGroupe}
                    onSave={handleModifierSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Groupes;