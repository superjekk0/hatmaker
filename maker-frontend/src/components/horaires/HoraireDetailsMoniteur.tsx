import {Horaire} from "../../interface/Interface.ts";
import {useEffect, useState} from "react";

interface HoraireDetailsMoniteurProps {
    horaire: Horaire;
    onBack: () => void;
}

const HoraireDetailsMoniteur = ({horaire, onBack}: HoraireDetailsMoniteurProps) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rows, setRows] = useState<string[][]>([]);
    const [dates, setDates] = useState<string[]>([]);
    const [infos, setInfos] = useState<string[]>([]);

    useEffect(() => {
        setStartDate(horaire.startDate);
        setEndDate(horaire.endDate);
        setInfos(horaire.infos || []);
        const groupedRows = horaire.cells.reduce((acc, cell) => {
            if (!acc[cell.indexRow]) {
                acc[cell.indexRow] = [];
            }
            if (cell.cellData != null) {
                acc[cell.indexRow][cell.indexCol] = cell.cellData;
            }
            return acc;
        }, [] as string[][]);
        setRows(groupedRows);
        setDates(generateDates(startDate, endDate));
    }, []);

    const generateDates = (startDate: string, endDate: string): string[] => {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() + 1);

        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() + 1);

        const generatedDates: string[] = [];
        while (start <= end) {
            generatedDates.push(start.toLocaleDateString("fr-FR", {day: "numeric", month: "long"}));
            start.setDate(start.getDate() + 1);
        }
        return generatedDates;
    };


    return (
        <div>
            <div className="text-right">
                <button onClick={onBack}
                        className="border p-2 rounded hover:bg-gray-300 bg-gray-200 text-black">
                    Retour
                </button>
            </div>
            <table className="text-sm text-left text-gray-500 ml-auto mr-auto m-4">
                <thead className="text-xs text-gray-700 bg-gray-300">
                <tr>
                    <th className="px-6 py-3 text-center">Info</th>
                    {dates.map((date, index) => (
                        <th key={index} className="px-6 py-3">
                            {date}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="bg-white">
                        <td className="border p-2 text-right">
                            <span className="text-center">{infos[rowIndex]}</span>
                        </td>
                        {row.map((moniteur, colIndex) => (
                            <td
                                key={colIndex}
                                className="border p-2"
                            >
                                {moniteur || "Aucun staff"}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HoraireDetailsMoniteur;