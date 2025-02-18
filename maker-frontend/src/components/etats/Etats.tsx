import {useEffect, useState} from "react";
import {Etat} from "../../interface/Interface.ts";
import {getEtats} from "../../interface/gestion/GestionEtats.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import AddEtatModal from "./AddEtatModal";
import ModifierEtatModal from "./ModifierEtatModal";

const Etats = () => {
    const [etats, setEtats] = useState<Etat[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
    const [selectedEtat, setSelectedEtat] = useState<Etat | null>(null);

    useEffect(() => {
        getEtats().then(
            data => setEtats(data)
        ).catch(
            error => console.error('Error fetching etats:', error)
        );
    }, []);

    const handleSave = (newEtat: Etat) => {
        setEtats([...etats, newEtat]);
    };

    const handleModifierSave = (updatedEtat: Etat) => {
        setEtats(etats.map(etat => etat.id === updatedEtat.id ? updatedEtat : etat));
    };

    const handleDelete = (deletedEtat: Etat) => {
        setEtats(etats.filter(etat => etat.id !== deletedEtat.id));
    };

    const handleOnCloseModalModifier = () => {
        setIsModifierModalOpen(false);
        setSelectedEtat(null);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">États</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md border rounded">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nom</th>
                        <th scope="col" className="px-6 py-3 text-right">
                            <button
                                className="w-10 h-10"
                                onClick={() => setIsAddModalOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} size="lg"/>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {etats.map((etat) => (
                        <tr key={etat.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{etat.nom}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedEtat(etat);
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
            <AddEtatModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSave}/>
            {selectedEtat && (
                <ModifierEtatModal
                    isOpen={isModifierModalOpen}
                    onClose={handleOnCloseModalModifier}
                    etat={selectedEtat}
                    onSave={handleModifierSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Etats;