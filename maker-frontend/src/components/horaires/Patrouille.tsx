import {useContext, useEffect, useState} from "react";
import {AuthentificatedContext} from "../../context/AuthentificationContext.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {getMoniteurs} from "../../interface/gestion/GestionUtilisateur.ts";
import {Moniteur, VueResponsable} from "../../interface/Interface.ts";
import {useViewResponsable} from "../../context/ResponsableViewContext.tsx";

const Patrouille = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dates, setDates] = useState<string[]>([]);
    const [rows, setRows] = useState<string[][]>([]);
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const {isAuthentificated} = useContext(AuthentificatedContext)
    const {setVue} = useViewResponsable();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthentificated) {
            navigate("/");
        }
        getMoniteurs().then(setMoniteurs)
    }, []);

    const handleGenerate = () => {
        const start = new Date(startDate);
        start.setHours(0,0,0,0)
        start.setDate(start.getDate() + 1);
        const end = new Date(endDate);
        end.setHours(0,0,0,0)
        end.setDate(end.getDate() + 1);
        const generatedDates: string[] = [];

        while (start <= end) {
            generatedDates.push(start.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }));
            start.setDate(start.getDate() + 1);
        }

        const dateToRowMap: Record<string, string[]> = {};
        dates.forEach((date, colIndex) => {
            rows.forEach((_, rowIndex) => {
                if (!dateToRowMap[date]) dateToRowMap[date] = [];
                dateToRowMap[date][rowIndex] = rows[rowIndex][colIndex] || "";
            });
        });

        const newRows = rows.map((_, rowIndex) =>
            generatedDates.map((date) => dateToRowMap[date]?.[rowIndex] || "")
        );

        setDates(generatedDates);
        setRows(newRows.length > 0 ? newRows : [Array(generatedDates.length).fill("")]);
    };

    const handleAddRow = () => {
        setRows([...rows, Array(dates.length).fill("")]);
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        setSelectedCell({ rowIndex, colIndex });
        setIsModalOpen(true);
    };

    const handleSelectMoniteur = (moniteur: Moniteur) => {
        if (selectedCell) {
            const { rowIndex, colIndex } = selectedCell;
            setRows((prevRows) => {
                const updatedRows = [...prevRows];
                updatedRows[rowIndex][colIndex] = moniteur.nom;
                return updatedRows;
            });
        }
        setIsModalOpen(false);
        setSelectedCell(null);
    };

    const handleRemoveRow = (rowIndex: number) => {
        setRows((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
    };

    const handleBack = () => {
        setVue(VueResponsable.HORAIRE);
        navigate("/accueil");
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredMoniteurs = moniteurs.filter((moniteur) =>
        moniteur.nom.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="p-4">
            <button onClick={handleBack}
                    className="absolute border top-24 right-2 rounded pl-4 pr-4 p-2 bg-gray-200 text-black">
                Retour
            </button>
            <h1 className="text-2xl font-bold mb-4">Patrouille</h1>
            <div className="mb-4">
                <label className="block mb-2">Nom:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date de début:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date de fin:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <button
                onClick={handleGenerate}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Générer Tableau
            </button>
            {dates.length > 0 && (
                <div>
                    <table className="text-sm text-left text-gray-500 ml-auto mr-auto">
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
                                    <input className="text-center"/>
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
                                    <button onClick={() => handleRemoveRow(rowIndex)} className="bg-gray-200 hover:bg-gray-300 rounded-r-full w-7 h-8 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTimes} className="text-black"/>
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
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full w-10 h-10 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faPlus} size="sm" />
                        </button>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                            <div className="bg-white p-4 rounded shadow-md lg:w-1/2 relative">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Sélectionner un Moniteur</h2>
                                    <button onClick={() => setIsModalOpen(false)} className="text-black">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Rechercher un moniteur..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>
                                <div className="overflow-y-auto max-h-96">
                                    <ul className="space-y-2">
                                        {filteredMoniteurs
                                            .sort((a, b) => a.nom.localeCompare(b.nom))
                                            .map((moniteur, index) => (
                                                <li
                                                    key={index}
                                                    className="cursor-pointer p-2 hover:bg-gray-200 border rounded"
                                                    onClick={() => handleSelectMoniteur(moniteur)}
                                                >
                                                    {moniteur.nom}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Patrouille;