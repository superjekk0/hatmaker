import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Activite, Etat} from "../../../interface/Interface.ts";

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredActivites: Activite[];
    handleSelectActivite: (activite: Activite) => void;
    filteredEtats: Etat[];
    handleSelectEtat: (etat: Etat) => void;
}

const ActiviteMoniteurSelectionModal = ({
                                    isModalOpen,
                                    setIsModalOpen,
                                    searchQuery,
                                    setSearchQuery,
                                    filteredActivites,
                                    handleSelectActivite,
                                    filteredEtats,
                                    handleSelectEtat,
                                }: ModalProps) => {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-4 rounded shadow-md lg:w-1/2 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Sélectionner un état ou une activité</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-black">
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher un état ou une activité..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                        className="border p-2 w-full rounded"
                    />
                </div>
                <div className="overflow-y-auto max-h-96">
                    <ul className="space-y-2">
                        {filteredActivites
                            .sort((a, b) => a.nom.localeCompare(b.nom))
                            .map((activite, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer p-2 hover:bg-gray-200 border rounded"
                                    onClick={() => handleSelectActivite(activite)}
                                >
                                    {activite.nom}
                                </li>
                            ))}
                        {filteredEtats
                            .sort((a, b) => a.nom.localeCompare(b.nom))
                            .map((etat, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer p-2 hover:bg-gray-200 border rounded"
                                    onClick={() => handleSelectEtat(etat)}
                                >
                                    {etat.nom}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ActiviteMoniteurSelectionModal;