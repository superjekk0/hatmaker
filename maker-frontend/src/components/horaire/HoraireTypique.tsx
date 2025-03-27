import {ChangeEvent, useState} from 'react';
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addHoraireTypique} from "../../interface/gestion/GestionHoraireTypique.ts";
import {HoraireTypique} from "../../interface/Interface.ts";

interface Periode {
    periode: string;
    startTime: string;
    endTime: string;
}

const HoraireTypiqueComponent = () => {
    const [nom, setNom] = useState("");
    const [periods, setPeriods] = useState<Periode[]>([{periode: '', startTime: '', endTime: ''}]);
    const [tableData, setTableData] = useState<Periode[]>([{periode: '', startTime: '', endTime: ''}]);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const values = [...periods];
        values[index][event.target.name as keyof Periode] = event.target.value;
        setPeriods(values);
        setTableData(values);
        setError("");
    };

    const handleAddForm = () => {
        setPeriods([...periods, {periode: '', startTime: '', endTime: ''}]);
        setTableData([...tableData, {periode: '', startTime: '', endTime: ''}]);
        setError("");
    };

    const handleRemoveForm = (index: number) => {
        const values = [...periods];
        values.splice(index, 1);
        setPeriods(values);
        setTableData(values);
    };

    const handleSubmit = () => {
        if (!nom) {
            setError("Le nom de l'horaire typique ne peut pas être vide");
            return;
        }

        const values = [...periods];

        for (let index = 0; index < values.length; index++) {
            if (values[index].startTime && values[index].endTime && values[index].startTime >= values[index].endTime) {
                setError('Le temps de début doit être plus tôt que le temps de fin');
                return;
            }
            if (values[index].periode === '') {
                setError('Les périodes ne peuvent pas être vides');
                return;
            }
            if (values[index].startTime === '' || (values[index].startTime === '' && values[index].endTime !== '')) {
                setError('Veuillez entrer un temps de début');
                return;
            }
        }

        if (checkForOverlap(tableData)) {
            setError('Certains temps se chevauchent, veuillez les corriger');
            return;
        }

        let horaireTypique: HoraireTypique = {
            nom: nom.trim(),
            timeSlots: values
        };

        addHoraireTypique(horaireTypique).then(
            () => {
                setError("");
                setPeriods([{periode: '', startTime: '', endTime: ''}]);
                setTableData([{periode: '', startTime: '', endTime: ''}]);
            }
        ).catch(
            error => setError(error.message)
        );
    };

    const checkForOverlap = (data: Periode[]) => {
        for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
                if (data[i].startTime && data[j].startTime) {
                    if (data[i].startTime === data[j].startTime) {
                        return true;
                    }
                    if (data[i].endTime && data[j].startTime >= data[i].startTime && data[j].startTime <= data[i].endTime) {
                        return true;
                    }
                    if (data[i].endTime && data[j].endTime) {
                        if (
                            (data[i].startTime < data[j].endTime && data[i].endTime > data[j].startTime) ||
                            (data[j].startTime < data[i].endTime && data[j].endTime > data[i].startTime)
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    return (
        <div>
            <div className="flex">
                <div className="w-1/2 p-4">
                    <form className="flex flex-col h-full border-2 border-white">
                        <div>
                            {periods.map((period, index) => (
                                <div key={index}
                                     className="mb-1 border p-2 rounded bg-gray-100 flex justify-between items-center">
                                    <input
                                        type="text"
                                        name="periode"
                                        value={period.periode}
                                        onChange={(event) => handleInputChange(index, event)}
                                        className="border p-1 w-1/2 mr-2 rounded"
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={period.startTime}
                                        onChange={(event) => handleInputChange(index, event)}
                                        className="border p-1 w-1/4 mr-2 rounded"
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={period.endTime}
                                        onChange={(event) => handleInputChange(index, event)}
                                        className="border p-1 w-1/4 rounded mr-2"
                                    />
                                    <button onClick={() => handleRemoveForm(index)}>
                                        <FontAwesomeIcon icon={faTimes} className="ml-2 mr-2"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-2 mb-2">
                            <button type="button" onClick={handleAddForm}
                                    className="bg-gray-200 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                                <FontAwesomeIcon icon={faPlus} size="sm"/>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 p-4">
                    <table className="w-full border-collapse border-2 border-gray-300">
                        <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index}>
                                <td className={data.startTime || (data.endTime && data.startTime) ?
                                    "border-2 p-4 w-1/5" : "border-2 p-4 w-1/5 text-gray-400"}>
                                    {data.startTime || (data.endTime && data.startTime) ?
                                        data.startTime : "00:00 - 00:00"}
                                    <span>
                                    {data.endTime && data.startTime ? " - " + data.endTime : ""}
                                </span>
                                </td>
                                <td className={data.periode ? "border-2 p-4 text-center" : "border-2 p-4 text-center text-gray-400"}>
                                    {data.periode ? data.periode : "Période"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {error && <div className="flex bg-red-500 text-white p-2 font-bold rounded m-4 w-1/3 ml-auto mr-auto justify-between">
                {error}
                <button onClick={() => setError("")}>
                    <FontAwesomeIcon icon={faTimes} className="mr-2 ml-2"/>
                </button>
            </div>}
            <div className="flex justify-center">
                <input
                    type="text"
                    className={`w-1/4 p-2 border border-gray-300 rounded mr-2`}
                    placeholder="Nom de l'horaire typique"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <button type="submit" className="bg-green-500 text-white pr-4 pl-4 rounded" onClick={handleSubmit}>
                    Enregistrer
                </button>
            </div>
        </div>
    );
};

export default HoraireTypiqueComponent;