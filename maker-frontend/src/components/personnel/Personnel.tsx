import {useEffect, useState} from "react";
import {Utilisateur} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {getUtilisateurs} from "../../interface/gestion/GestionUtilisateur.ts";
import ModifierUtilisateurModal from "./ModifierUtilisateurModal.tsx";

const Personnel = () => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur[]>([]);
    const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);
    const [selectedUtilisateur, setSelectedUtilisateur] = useState<Utilisateur | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getUtilisateurs().then(
            data => setUtilisateur(data.filter(utilisateur => utilisateur.deleted !== true))
        ).catch(
            error => console.error('Error fetching utilisateur:', error)
        );
    }, []);

    const handleModifierSave = (updatedUtilisateur: Utilisateur) => {
        setUtilisateur(utilisateur.map(utilisateur => utilisateur.id === updatedUtilisateur.id ? updatedUtilisateur : utilisateur));
    };

    const handleDelete = (deletedUtilisateur: Utilisateur) => {
        setUtilisateur(utilisateur.filter(utilisateur => utilisateur.id !== deletedUtilisateur.id));
    };

    const handleOnCloseModalModifier = () => {
        setIsModifierModalOpen(false);
        setSelectedUtilisateur(null);
    }

    const filteredUtilisateurs = utilisateur.filter(utilisateur =>
        utilisateur.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Personnel</h1>
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
                        <th scope="col" className="px-6 py-3">Courriel</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">
                            <div className="h-10"></div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUtilisateurs.map((utilisateur) => (
                        <tr key={utilisateur.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{utilisateur.nom}</td>
                            <td className="px-6 py-4">{utilisateur.courriel}</td>
                            <td className="px-6 py-4">{utilisateur.role}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedUtilisateur(utilisateur);
                                        setIsModifierModalOpen(true);
                                    }}>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {
                    selectedUtilisateur && (
                        <ModifierUtilisateurModal
                            isOpen={isModifierModalOpen}
                            onClose={handleOnCloseModalModifier}
                            utilisateur={selectedUtilisateur}
                            onSave={handleModifierSave}
                            onDelete={handleDelete}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Personnel;