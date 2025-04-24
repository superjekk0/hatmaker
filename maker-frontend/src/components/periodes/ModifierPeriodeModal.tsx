import {useEffect, useState} from "react";
import {Periode} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {modifierPeriode, supprimerPeriode} from "../../interface/gestion/GestionPeriodes.tsx";

interface ModifierPeriodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
    existingPeriode: Periode;
}

const ModifierPeriodeModal = ({isOpen, onClose, onSave, onDelete, existingPeriode}: ModifierPeriodeModalProps) => {
    const [error, setError] = useState("");
    const [nom, setNom] = useState(existingPeriode.periode);
    const [startTime, setStartTime] = useState(existingPeriode.startTime);
    const [endTime, setEndTime] = useState(existingPeriode.endTime || "");

    useEffect(() => {
        const formatTime = (time: string) => {
            if (!time) return "";
            const [hours, minutes] = time.split(":");
            const formattedHours = hours.length === 1 ? `0${hours}` : hours;
            const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes;
            return `${formattedHours}:${formattedMinutes}`;
        };

        setNom(existingPeriode.periode);
        setStartTime(formatTime(existingPeriode.startTime));
        setEndTime(formatTime(existingPeriode.endTime || ""));
    }, [existingPeriode]);

    const handleSave = () => {
        if (!nom || !startTime || (startTime && endTime && startTime > endTime)) {
            setError("Une période doit avoir un nom, une heure de début et une heure de fin valides");
            return;
        }
        let periode: Periode = {
            ...existingPeriode,
            startTime,
            endTime: endTime || "",
            periode: nom,
        }
        modifierPeriode(periode).then(
            periodeModifie => {
                onSave(periodeModifie);
                setError("");
                handleClose();
            }
        ).catch(
            error => console.error('Error updating periode:', error)
        );
    };

    const handleDelete = () => {
        supprimerPeriode(existingPeriode).then(
            () => {
                onDelete(existingPeriode);
                setError("");
                handleClose();
            }
        ).catch(
            error => console.error('Error deleting periode:', error)
        )
    }

    const handleClose = () => {
        setNom(existingPeriode.periode);
        setStartTime(existingPeriode.startTime);
        setEndTime(existingPeriode.endTime || "");
        onClose();
    }

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Modifier une Période</h2>
                    <button onClick={handleClose} className="text-black">
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <div>
                    <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)}
                           className="border p-2 mb-2 w-full"/>
                    <input type="time" placeholder="Start Time" value={startTime}
                           onChange={(e) => setStartTime(e.target.value)} className="border p-2 mb-2 w-full"/>
                    <input type="time" placeholder="End Time" value={endTime}
                           onChange={(e) => setEndTime(e.target.value)} className="border p-2 mb-2 w-full"/>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                </div>
                <div className="flex justify-end mt-4">
                    <button className="bg-red-500 text-white p-2 rounded mr-2" onClick={handleDelete}>Supprimer</button>
                    <button className="bg-green-500 text-white p-2 rounded" onClick={handleSave}>Sauvegarder</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ModifierPeriodeModal;