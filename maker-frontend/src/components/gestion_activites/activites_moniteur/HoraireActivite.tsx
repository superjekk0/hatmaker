import {ActiviteMoniteur, Moniteur} from "../../../interface/Interface.ts";
import {useEffect, useState} from "react";
import {getMoniteurs} from "../../../interface/gestion/GestionUtilisateur.ts";

interface HoraireTableProps {
    horaire: ActiviteMoniteur;
    onBack: () => void;
}

const HoraireActivite = ({horaire, onBack}: HoraireTableProps) => {
    const [rows, setRows] = useState<string[][]>([]);
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>([]);
    const [selectedPeriodes, setSelectedPeriodes] = useState<string[]>([]);

    useEffect(() => {
        getMoniteurs().then(
            data => setMoniteurs(data.filter(moniteur => moniteur.deleted !== true))
        );
        setSelectedPeriodes(horaire.selectedPeriodes || []);
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

    }, []);
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
                    <th className="px-6 py-3"></th>
                    {selectedPeriodes.map((periode, index) => (
                        <th key={index} className="px-6 py-3">
                            {periode}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="bg-white">
                        <td className="border p-2 font-bold">
                            {moniteurs[rowIndex]?.nom || "Aucun Moniteur"}
                        </td>
                        {row.map((activite, colIndex) => (
                            <td
                                key={colIndex}
                                className="border p-2"
                            >
                                {activite || "Aucune activité"}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default HoraireActivite;