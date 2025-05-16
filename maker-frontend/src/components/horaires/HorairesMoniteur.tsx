import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getHoraires} from "../../interface/gestion/GesrtionHoraire.ts";
import {Horaire} from "../../interface/Interface.ts";
import HoraireDetailsMoniteur from "./HoraireDetailsMoniteur.tsx";

const HorairesMoniteur = () => {
    const [horaires, setHoraires] = useState<Horaire[]>([]);
    const [selectedHoraire, setSelectedHoraire] = useState<Horaire | null>(null);

    useEffect(() => {
        getHoraires().then(
            data => setHoraires(data.filter(horaire => horaire.deleted !== true))
        ).catch(
            error => console.error('Error fetching horaires:', error)
        );
    }, []);

    const handleBack = () => {
        setSelectedHoraire(null);
    };

    return (
        <div className="p-4">
            {selectedHoraire ? (
                <HoraireDetailsMoniteur horaire={selectedHoraire} onBack={handleBack}/>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Horaires Journalières</h1>
                    </div>
                    <div className="relative overflow-x-auto shadow-md border rounded">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nom</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3 text-right"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {horaires.map((horaire) => (
                                <tr key={horaire.id} className="bg-white hover:bg-gray-50 border-b">
                                    <td className="px-6 py-4">{horaire.name}</td>
                                    <td className="px-6 py-4">{horaire.selectedType}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className="w-10 h-10"
                                            onClick={() => setSelectedHoraire(horaire)}>
                                            <FontAwesomeIcon icon={faChevronRight}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default HorairesMoniteur;