import {useEffect, useState} from "react";
import {Tente} from "../../interface/Interface.ts";
import {getTentes} from "../../interface/gestion/GestionTentes.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import AddTenteModal from "./AddTenteModal.tsx";
import ModifierTenteModal from "./ModifierTenteModal.tsx";

const Tentes = () => {
    const [tentes, setTentes] = useState<Tente[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
    const [selectedTente, setSelectedTente] = useState<Tente | null>(null);

    useEffect(() => {
        getTentes().then(
            data => setTentes(data.filter(tente => tente.deleted !== true))
        ).catch(
            error => console.error('Error fetching tentes:', error)
        );
    }, []);

    const handleSave = (newTente: Tente) => {
        setTentes([...tentes, newTente]);
    };

    const handleModifierSave = (updatedTente: Tente) => {
        setTentes(tentes.map(tente => tente.id === updatedTente.id ? updatedTente : tente));
    };

    const handleDelete = (deletedTente: Tente) => {
        setTentes(tentes.filter(tente => tente.id !== deletedTente.id));
    };

    const handleOnCloseModalModifier = () => {
        setIsModifierModalOpen(false);
        setSelectedTente(null);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Tentes</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md border rounded">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nom</th>
                        <th scope="col" className="px-6 py-3">Moniteurs</th>
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
                    {tentes.map((tente) => (
                        <tr key={tente.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{tente.nomTente}</td>
                            <td className="px-6 py-4">{tente.moniteurs.map((moniteur) => moniteur.nom).join(', ')}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedTente(tente);
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
            <AddTenteModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSave}/>
            {selectedTente && (
                <ModifierTenteModal
                    isOpen={isModifierModalOpen}
                    onClose={handleOnCloseModalModifier}
                    tente={selectedTente}
                    onSave={handleModifierSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Tentes;