import {useState, useEffect} from "react";
import {HoraireTypique, Periode} from "../../interface/Interface.ts";
import {getHorairesTypiques} from "../../interface/gestion/GestionHoraireTypique.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {addPeriode} from "../../interface/gestion/GestionPeriodes.tsx";

interface AddPeriodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (periode: Periode) => void;
}

const AddPeriodeModal = ({isOpen, onClose, onSave}: AddPeriodeModalProps) => {
    const [error, setError] = useState("");
    const [mode, setMode] = useState<"custom" | "horaireTypique" | null>(null);
    const [nom, setNom] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [horaireTypiques, setHoraireTypiques] = useState<HoraireTypique[]>([]);
    const [selectedHoraireTypique, setSelectedHoraireTypique] = useState<HoraireTypique | null>(null);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

    useEffect(() => {
        getHorairesTypiques().then(
            data => {
                setHoraireTypiques(data.filter(horaireTypique => horaireTypique.deleted !== true))
            }
        ).catch(
            error => console.error('Error fetching horaireTypiques:', error)
        );
    });

    const handleSave = () => {
        if (mode === "custom") {
            if (!nom || !startTime || startTime && endTime && startTime > endTime) {
                setError("Une période doit avoir un nom, une heure de début et une heure de fin valides");
                return;
            }
            let periode: Periode = {
                startTime,
                endTime: endTime || "",
                periode: nom,
            }
            addPeriode(periode).then(
                newPeriode => {
                    onSave(newPeriode);
                    setError("");
                    handleClose()
                }
            ).catch(
                error => console.error('Error saving periode:', error)
            )
        } else if (mode === "horaireTypique" && selectedHoraireTypique) {
            selectedTimeSlots.forEach(slot => {
                const timeSlot = selectedHoraireTypique.timeSlots.find(ts => ts.periode === slot);
                if (timeSlot) {
                    let periode: Periode = {
                        startTime: timeSlot.startTime,
                        endTime: timeSlot.endTime,
                        periode: timeSlot.periode,
                    }
                    addPeriode(periode).then(
                        () => handleClose()
                    ).catch(
                        error => console.error('Error saving periode:', error)
                    )
                }
            });
        }
    };

    const handleClose = () => {
        setMode(null);
        setNom("");
        setStartTime("");
        setEndTime("");
        setSelectedHoraireTypique(null);
        setSelectedTimeSlots([]);
        onClose();
    }

    const handleBack = () => {
        if (selectedHoraireTypique) {
            setSelectedHoraireTypique(null);
            setSelectedTimeSlots([]);
        } else {
            setMode(null);
        }
    }

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Ajouter une Période</h2>
                    <button onClick={handleClose} className="text-black">
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                {!mode && (
                    <div className="flex flex-col items-center">
                        <button className="p-2 rounded mb-2 bg-gray-200 w-full h-full" onClick={() => setMode("custom")}>Personnalisé</button>
                        <div className="flex items-center my-2 w-full">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-2 text-gray-500">OU</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <button className="p-2 rounded bg-gray-200 w-full h-full" onClick={() => setMode("horaireTypique")}>Basé sur une Horaire Typique</button>
                    </div>
                )}
                {mode === "custom" && (
                    <div>
                        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)}
                               className="border p-2 mb-2 w-full"/>
                        <input type="time" placeholder="Start Time" value={startTime}
                               onChange={(e) => setStartTime(e.target.value)} className="border p-2 mb-2 w-full"/>
                        <input type="time" placeholder="End Time" value={endTime}
                               onChange={(e) => setEndTime(e.target.value)} className="border p-2 mb-2 w-full"/>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    </div>
                )}
                {mode === "horaireTypique" && (
                    <div>
                        {!selectedHoraireTypique ? (
                            <div>
                                {horaireTypiques.map(horaireTypique => (
                                    <div key={horaireTypique.id} className="border p-2 mb-2 cursor-pointer"
                                         onClick={() => setSelectedHoraireTypique(horaireTypique)}>
                                        {horaireTypique.nom}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-bold mb-2">{selectedHoraireTypique.nom}</h3>
                                {selectedHoraireTypique.timeSlots.map((slot, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input type="checkbox" value={slot.periode} onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedTimeSlots([...selectedTimeSlots, slot.periode]);
                                            } else {
                                                setSelectedTimeSlots(selectedTimeSlots.filter(ts => ts !== slot.periode));
                                            }
                                        }} className="mr-2"/>
                                        <span>{slot.periode}: {slot.startTime} {slot.endTime ? "- " + slot.endTime : ""}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className="flex justify-end mt-4">
                    {(mode || selectedHoraireTypique) && (
                        <button className="bg-gray-500 text-white p-2 rounded mr-2" onClick={handleBack}>Retour</button>
                    )}
                    {(mode == "custom" || selectedHoraireTypique) && (
                        <button className="bg-green-500 text-white p-2 rounded" onClick={handleSave}>Sauvegarder</button>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default AddPeriodeModal;