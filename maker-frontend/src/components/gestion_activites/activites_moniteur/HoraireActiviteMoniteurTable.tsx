interface HoraireTableProps {
    rows: string[][];
    selectedPeriodes: string[];
    handleCellClick: (rowIndex: number, colIndex: number) => void;
    moniteurs: { nom: string }[];
}

const HoraireActiviteMoniteurTable = ({
                                          rows,
                                          handleCellClick,
                                          selectedPeriodes,
                                          moniteurs
                                      }: HoraireTableProps) => {
    return (
        <div>
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
                                onClick={() => handleCellClick(rowIndex, colIndex)}
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
export default HoraireActiviteMoniteurTable;