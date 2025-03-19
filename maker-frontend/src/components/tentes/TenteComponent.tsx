import {useEffect, useState} from "react";
import {Campeur, Moniteur, Tente} from "../../interface/Interface.ts";
import {getTenteByMoniteurId} from "../../interface/gestion/GestionTentes.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {getId} from "../../interface/Connexion.ts";
import InfoCampeurModal from "../campeurs/InfoCampeurModal.tsx";
import InfoMoniteurModal from "../moniteur/InfoMoniteurModal.tsx";

const TenteComponent = () => {
    const [tente, setTente] = useState<Tente>();
    const [isInfoModalCampeurOpen, setIsInfoModalCampeurOpen] = useState(false);
    const [selectedCampeur, setSelectedCampeur] = useState<Campeur | null>(null);
    const [isInfoModalMoniteurOpen, setIsInfoModalMoniteurOpen] = useState(false);
    const [selectedMoniteur, setSelectedMoniteur] = useState<Moniteur | null>(null);

    useEffect(() => {
        getTenteByMoniteurId(getId()).then(
            data => setTente(data)
        ).catch(
            error => console.error('Error fetching tentes:', error)
        );
    }, []);

    const handleOnCloseModalInfoCampeur = () => {
        setIsInfoModalCampeurOpen(false);
        setSelectedCampeur(null);
    }


    const handleOnCloseModalInfoMoniteur = () => {
        setIsInfoModalMoniteurOpen(false);
        setSelectedMoniteur(null);
    }

    if (!tente) {
        return (
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Pour le moment, vous n'êtes pas associer à une tente</h1>
                </div>
            </div>

        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Tente {tente?.nomTente}</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md border rounded">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Moniteurs</th>
                        <th scope="col" className="px-6 py-3 text-right w-10 h-10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tente?.moniteurs.map((moniteur) => (
                        <tr key={moniteur.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{moniteur.nom}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedMoniteur(moniteur);
                                        setIsInfoModalMoniteurOpen(true);
                                    }}>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="relative overflow-x-auto shadow-md border rounded mt-5">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Campeurs</th>
                        <th scope="col" className="px-6 py-3 text-right w-10 h-10"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tente?.campeurs.map((campeur) => (
                        <tr key={campeur.id} className="bg-white hover:bg-gray-50 border-b">
                            <td className="px-6 py-4">{campeur.prenom} {campeur.nom}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="w-10 h-10"
                                    onClick={() => {
                                        setSelectedCampeur(campeur);
                                        setIsInfoModalCampeurOpen(true);
                                    }}>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {
                selectedCampeur && (
                    <InfoCampeurModal
                        isOpen={isInfoModalCampeurOpen}
                        onClose={handleOnCloseModalInfoCampeur}
                        campeur={selectedCampeur}
                    />
                )
            }
            {
                selectedMoniteur && (
                    <InfoMoniteurModal
                        isOpen={isInfoModalMoniteurOpen}
                        onClose={handleOnCloseModalInfoMoniteur}
                        moniteur={selectedMoniteur}
                    />
                )
            }
        </div>
    );
};

export default TenteComponent;