import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

interface HoraireTableProps {
    infos: string[];
    setInfos: (infos: string[]) => void;
    dates: string[];
    rows: string[][];
    handleCellClick: (rowIndex: number, colIndex: number) => void;
    handleRemoveRow: (rowIndex: number) => void;
    handleAddRow: () => void;
}

const HoraireTable = ({
    infos,
    setInfos,
    dates,
    rows,
    handleCellClick,
    handleRemoveRow,
    handleAddRow,
}: HoraireTableProps) => {

    const handleRemove = (rowIndex: number) => {
        const newInfos = [...infos];
        newInfos.splice(rowIndex, 1);
        setInfos(newInfos);
        handleRemoveRow(rowIndex);
    }

    const handleChange = (rowIndex: number, value: string) => {
        const newInfos = [...infos];
        newInfos[rowIndex] = value;
        setInfos(newInfos);
    }

    return (
        <div>
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
                            <input className="text-center" value={infos[rowIndex]} onChange={(e => handleChange(rowIndex, e.target.value))}/>
                        </td>
                        {row.map((moniteur, colIndex) => (
                            <td
                                key={colIndex}
                                className="border p-2"
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            >
                                {moniteur || "Aucun staff"}
                            </td>
                        ))}
                        <td className="p-0">
                            <button
                                onClick={() => handleRemove(rowIndex)}
                                className="bg-gray-200 hover:bg-gray-300 rounded-r-full w-7 h-8 flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-black" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    onClick={handleAddRow}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4"
                >
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                </button>
            </div>
        </div>
    );
};

export default HoraireTable;