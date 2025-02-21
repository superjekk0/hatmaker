import {useEffect, useState} from "react";
import {Departement} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import AddDepartementModal from "./AddDepartementModal.tsx";
import ModifierDepartementModal from "./ModifierDepartementModal.tsx";
import {getDepartements} from "../../interface/gestion/GestionDepartements.ts";

const Departements = () => {
    const [departement, setDepartement] = useState<Departement[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
    const [selectedDepartement, setSelectedDepartement] = useState<Departement | null>(null);

    useEffect(() => {
        getDepartements().then(
            data => setDepartement(data.filter(etat => etat.deleted !== true))
        ).catch(
            error => console.error('Error fetching departement:', error)
        );
    }, []);

    const handleSave = (newDepartement: Departement) => {
        setDepartement([...departement, newDepartement]);
    };

    const handleModifierSave = (updatedDepartement: Departement) => {
        setDepartement(departement.map(departement => departement.id === updatedDepartement.id ? updatedDepartement : departement));
    };

    const handleDelete = (deletedDepartement: Departement) => {
        setDepartement(departement.filter(departement => departement.id !== deletedDepartement.id));
    };

    const handleOnCloseModalModifier = () => {
        setIsModifierModalOpen(false);
        setSelectedDepartement(null);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Départements</h1>
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
                    {departement.map((departement) => (
                        <tr key={departement.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{departement.nom}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedDepartement(departement);
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
            <AddDepartementModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSave}/>
            {selectedDepartement && (
                <ModifierDepartementModal
                    isOpen={isModifierModalOpen}
                    onClose={handleOnCloseModalModifier}
                    departement={selectedDepartement}
                    onSave={handleModifierSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Departements;