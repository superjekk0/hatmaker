import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Etat} from "../../interface/Interface.ts";
import {getEtats} from "../../interface/gestion/GestionEtats.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AddEtatModal from "./AddEtatModal";

const Etats = () => {
    const [etats, setEtats] = useState<Etat[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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
                                className="w-12 h-12 bg-green-500 text-white shadow-md rounded hover:bg-green-600"
                                onClick={() => setIsModalOpen(true)}
                            >
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
                                    className="w-12 h-12 bg-blue-500 text-white shadow-md rounded hover:bg-blue-600"
                                    onClick={() => navigate(`/etat/${etat.id}`)}
                                >
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <AddEtatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
        </div>
    );
};

export default Etats;