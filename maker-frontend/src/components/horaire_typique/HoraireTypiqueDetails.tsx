import {HoraireTypique} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {supprimerHoraireTypique} from "../../interface/gestion/GestionHoraireTypique.ts";

interface HoraireTypiqueDetailsProps {
    horaireTypique: HoraireTypique;
    onBack: () => void;
    onDelete: (horaireTypique: HoraireTypique) => void;
}

const HoraireTypiqueDetails = ({horaireTypique, onBack, onDelete}: HoraireTypiqueDetailsProps) => {
    const handleSupprimer = (horaireTypique: HoraireTypique) => {
        supprimerHoraireTypique(horaireTypique).then(() => {
            onDelete(horaireTypique);
        }).catch(
            erreur => console.error('Erreur lors de la suppression de l\'horaire typique:', erreur)
        );
    };

    return (
        <div className="w-full p-4 mt-4 relative text-left">
            <h2 className="text-2xl font-bold text-center">{horaireTypique.nom}</h2>
            <div className="text-right">
                <button onClick={onBack}
                        className="border-t rounded-t w-10 h-10 bg-gray-200 text-black">
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            </div>
            <table className="w-full border-collapse border-2 bg-white border-gray-300 shadow-xl">
                <tbody>
                {horaireTypique.timeSlots.map((slot, index) => (
                    <tr key={index}>
                        <td className="border-2 p-4 w-1/5">
                            {slot.endTime && slot.startTime ? slot.startTime + " - " + slot.endTime : slot.startTime}
                        </td>
                        <td className="border-2 p-4 text-center">
                            {slot.periode}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => handleSupprimer(horaireTypique)}
                    className="border-b rounded-b pr-4 pl-4 p-2 text-white bg-red-500">
                Supprimer
            </button>
        </div>
    );
};

export default HoraireTypiqueDetails;