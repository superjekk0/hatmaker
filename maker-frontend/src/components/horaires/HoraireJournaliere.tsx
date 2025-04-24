import {useContext, useEffect, useState} from "react";
import {AuthentificatedContext} from "../../context/AuthentificationContext.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {getUtilisateurs} from "../../interface/gestion/GestionUtilisateur.ts";
import {Departement, Periode, Utilisateur, VueResponsable} from "../../interface/Interface.ts";
import {useViewResponsable} from "../../context/ResponsableViewContext.tsx";
import {getDepartements} from "../../interface/gestion/GestionDepartements.ts";
import {getPeriodes} from "../../interface/gestion/GestionPeriodes.tsx";
import UserSelectionModal from "./UserSelectionModal.tsx";
import HoraireTable from "./HoraireTable.tsx";
import OptionsSection from "./OptionsSection.tsx";

const HoraireJournaliere = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dates, setDates] = useState<string[]>([]);
    const [rows, setRows] = useState<string[][]>([]);
    const [departements, setDepartements] = useState<Departement[]>([]);
    const [periodes, setPeriodes] = useState<Periode[]>([]);
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
    const [selectedDepartements, setSelectedDepartements] = useState<string[]>([]);
    const [selectedPeriodes, setSelectedPeriodes] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true);
    const {isAuthentificated} = useContext(AuthentificatedContext)
    const {setVue} = useViewResponsable();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthentificated) {
            navigate("/");
        }
        getUtilisateurs().then(
            data => setUtilisateurs(data.filter(utilisateur => utilisateur.deleted !== true))
        );
        getDepartements().then(
            data => setDepartements(data.filter(departement => departement.deleted !== true))
        );
        getPeriodes().then(
            data => setPeriodes(data.filter(periode => periode.deleted !== true))
        )
    }, []);

    const handleGenerate = () => {
        const generatedDates = generateDates(startDate, endDate);
        const dateToRowMap = mapExistingDataToDates(dates, rows);
        const newRows = generateNewRows(generatedDates, dateToRowMap);

        setDates(generatedDates);
        setRows(newRows.length > 0 ? newRows : [Array(generatedDates.length).fill("")]);
        setIsCollapsibleOpen(false);
    };

    const generateDates = (startDate: string, endDate: string): string[] => {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() + 1);

        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() + 1);

        const generatedDates: string[] = [];
        while (start <= end) {
            generatedDates.push(start.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }));
            start.setDate(start.getDate() + 1);
        }
        return generatedDates;
    };

    const mapExistingDataToDates = (dates: string[], rows: string[][]): Record<string, string[]> => {
        const dateToRowMap: Record<string, string[]> = {};
        dates.forEach((date, colIndex) => {
            rows.forEach((_, rowIndex) => {
                if (!dateToRowMap[date]) dateToRowMap[date] = [];
                dateToRowMap[date][rowIndex] = rows[rowIndex][colIndex] || "";
            });
        });
        return dateToRowMap;
    };

    const generateNewRows = (generatedDates: string[], dateToRowMap: Record<string, string[]>): string[][] => {
        return rows.map((_, rowIndex) =>
            generatedDates.map((date) => dateToRowMap[date]?.[rowIndex] || "")
        );
    };

    const handleAddRow = () => {
        setRows([...rows, Array(dates.length).fill("")]);
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        setSelectedCell({rowIndex, colIndex});
        setIsModalOpen(true);
    };

    const handleSelectUtilisateur = (utilisateur: Utilisateur) => {
        if (selectedCell) {
            const {rowIndex, colIndex} = selectedCell;
            setRows((prevRows) => {
                const updatedRows = [...prevRows];
                const cellData = updatedRows[rowIndex][colIndex].split(", ");

                if (cellData[0] == '' && cellData.length == 1) {
                    cellData[0] = utilisateur.nom;
                } else if (cellData.includes(utilisateur.nom)) {
                    cellData.splice(cellData.indexOf(utilisateur.nom), 1);
                } else {
                    cellData.push(utilisateur.nom);
                }
                updatedRows[rowIndex][colIndex] = cellData.join(", ");
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

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
    };

    const handleDepartementSelect = (departement: string) => {
        setSelectedDepartements((prev) =>
            prev.includes(departement)
                ? prev.filter((dep) => dep !== departement)
                : [...prev, departement]
        );
    };

    const handlePeriodeSelect = (periode: string) => {
        setSelectedPeriodes((prev) =>
            prev.includes(periode)
                ? prev.filter((per) => per !== periode)
                : [...prev, periode]
        );
    };

    const toggleCollapsible = () => {
        setIsCollapsibleOpen((prev) => !prev);
    };

    const filteredUtilisateurs = utilisateurs.filter(
        (utilisateur) =>
            (!selectedDepartements.length || selectedDepartements.includes(utilisateur.departement?.nom || "")) &&
            utilisateur.nom.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="p-4">
            <button onClick={handleBack} className="absolute border top-24 right-2 rounded pl-4 pr-4 p-2 bg-gray-200 hover:bg-gray-300 text-black">
                Retour
            </button>
            <h1 className="text-2xl font-bold mb-4">Horaire Journalière</h1>
            <div className="relative bg-gray-200 p-4 rounded">
                <button
                    onClick={toggleCollapsible}
                    className="absolute top-3 right-2 h-8 w-8 bg-gray-200 hover:bg-gray-300 text-black rounded-full flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={isCollapsibleOpen ? faTimes : faPlus} />
                </button>
                {!isCollapsibleOpen && <h2 className="font-bold">Options</h2>}
                {isCollapsibleOpen && (
                    <OptionsSection
                        {...{
                            name,
                            setName,
                            startDate,
                            setStartDate,
                            endDate,
                            setEndDate,
                            selectedType,
                            handleTypeSelect,
                            departements,
                            selectedDepartements,
                            handleDepartementSelect,
                            periodes,
                            selectedPeriodes,
                            handlePeriodeSelect,
                            handleGenerate,
                        }}
                    />
                )}
            </div>
            {dates.length > 0 && (
                <HoraireTable
                    {...{ dates, rows, handleCellClick, handleRemoveRow, handleAddRow }}
                />
            )}
            <UserSelectionModal
                {...{
                    isModalOpen,
                    setIsModalOpen,
                    searchQuery,
                    setSearchQuery,
                    filteredUtilisateurs,
                    handleSelectUtilisateur,
                }}
            />
        </div>
    );
};

export default HoraireJournaliere;