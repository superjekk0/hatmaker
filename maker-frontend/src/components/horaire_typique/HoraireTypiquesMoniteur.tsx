import {useEffect, useState} from "react";
import {HoraireTypique} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {getHorairesTypiques} from "../../interface/gestion/GestionHoraireTypique.ts";
import HoraireTypiqueDetailsMoniteur from "./HoraireTypiqueDetailsMoniteur.tsx";

const HoraireTypiquesMoniteur = () => {
    const [horaireTypiques, setHoraireTypiques] = useState<HoraireTypique[]>([]);
    const [selectedHoraireTypique, setSelectedHoraireTypique] = useState<HoraireTypique | null>(null);

    useEffect(() => {
        getHorairesTypiques().then(
            data => setHoraireTypiques(data.filter(horaireTypique => horaireTypique.deleted !== true))
        ).catch(
            error => console.error('Error fetching horaireTypiques:', error)
        );
    }, []);

    const handleBack = () => {
        setSelectedHoraireTypique(null);
    };

    return (
        <div className="p-4">
            {selectedHoraireTypique ? (
                <HoraireTypiqueDetailsMoniteur horaireTypique={selectedHoraireTypique} onBack={handleBack}/>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Horaires Typiques</h1>
                    </div>
                    <div className="relative overflow-x-auto shadow-md border rounded">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nom</th>
                                <th scope="col" className="px-6 py-3 text-right"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {horaireTypiques.map((horaireTypique) => (
                                <tr key={horaireTypique.id} className="bg-white hover:bg-gray-50 border-b">
                                    <td className="px-6 py-4">{horaireTypique.nom}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className="w-10 h-10"
                                            onClick={() => setSelectedHoraireTypique(horaireTypique)}>
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

export default HoraireTypiquesMoniteur;