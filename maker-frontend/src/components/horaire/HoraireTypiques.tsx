import {useEffect, useState} from "react";
import {HoraireTypique} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {getHorairesTypiques} from "../../interface/gestion/GestionHoraireTypique.ts";
import {useNavigate} from "react-router-dom";
import HoraireTypiqueDetails from "./HoraireTypiqueDetails.tsx";

const HoraireTypiques = () => {
    const [horaireTypiques, setHoraireTypiques] = useState<HoraireTypique[]>([]);
    const [selectedHoraireTypique, setSelectedHoraireTypique] = useState<HoraireTypique | null>(null);
    const navigate = useNavigate();

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

    const handleDelete = (deletedHoraire: HoraireTypique) => {
        setHoraireTypiques(horaireTypiques.filter(horaire => horaire.id !== deletedHoraire.id));
        setSelectedHoraireTypique(null);
    };

    return (
        <div className="p-4">
            {selectedHoraireTypique ? (
                <HoraireTypiqueDetails horaireTypique={selectedHoraireTypique} onBack={handleBack}
                                       onDelete={handleDelete}/>
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
                                <th scope="col" className="px-6 py-3 text-right">
                                    <button
                                        className="w-10 h-10 bg-gray-100 rounded shadow-md"
                                        onClick={() => navigate('/horaire-typique')}>
                                        <FontAwesomeIcon icon={faPlus} size="lg"/>
                                    </button>
                                </th>
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

export default HoraireTypiques;