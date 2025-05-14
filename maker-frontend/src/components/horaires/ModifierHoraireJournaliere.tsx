import {useContext, useEffect, useState} from "react";
import {CellData, Departement, Horaire, Periode, Utilisateur, VueResponsable} from "../../interface/Interface.ts";
import {AuthentificatedContext} from "../../context/AuthentificationContext.tsx";
import {useViewResponsable} from "../../context/ResponsableViewContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getUtilisateurs} from "../../interface/gestion/GestionUtilisateur.ts";
import {getDepartements} from "../../interface/gestion/GestionDepartements.ts";
import {getPeriodes} from "../../interface/gestion/GestionPeriodes.tsx";
import {getHoraireById, modifierHoraire, supprimerHoraire} from "../../interface/gestion/GesrtionHoraire.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import OptionsSection from "./OptionsSection.tsx";
import HoraireTable from "./HoraireTable.tsx";
import UserSelectionModal from "./UserSelectionModal.tsx";

const ModifierHoraireJournaliere = () => {
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
    const [infos, setInfos] = useState<string[]>([]);
    const {isAuthentificated} = useContext(AuthentificatedContext)
    const {setVue} = useViewResponsable();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthentificated) {
            navigate("/");
        }
        getUtilisateurs().then(
            data => setUtilisateurs(data.filter(utilisateur => utilisateur.deleted !== true))
        );
        getDepartements().then(
            data => setDepartements(
                data
                    .filter(departement => departement.deleted !== true)
                    .sort((a, b) => a.nom.localeCompare(b.nom))
            )
        );
        getPeriodes().then(
            data => setPeriodes(
                data
                    .filter(periode => !periode.deleted)
                    .sort((a, b) => {
                        const timeA = a.startTime.split(':').map(Number);
                        const timeB = b.startTime.split(':').map(Number);
                        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
                    })
            )
        );

        if (id) {
            getHoraireById(Number(id)).then(
                horaire => {
                    setName(horaire.name);
                    setStartDate(horaire.startDate);
                    setEndDate(horaire.endDate);
                    setSelectedType(horaire.selectedType);
                    setSelectedDepartements(horaire.selectedDepartements || []);
                    setSelectedPeriodes(horaire.selectedPeriodes || []);
                    setInfos(horaire.infos || []);
                    // Map cellData to rows
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
                }
            ).catch(error => {
                console.log(error)
                navigate("/accueil")
            });
        }
    }, []);

    const handleGenerate = () => {
        const generatedDates = generateDates(startDate, endDate);
        setDates(generatedDates);
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
            generatedDates.push(start.toLocaleDateString("fr-FR", {day: "numeric", month: "long"}));
            start.setDate(start.getDate() + 1);
        }
        return generatedDates;
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

    const handleModifierHoraire = () => {
        const cellData: CellData[] = rows.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => ({
                indexCol: colIndex,
                indexRow: rowIndex,
                cellData: cell,
            }))
        );

        const horaireJournaliere: Horaire = {
            id: Number(id),
            name: name,
            startDate: startDate,
            endDate: endDate,
            selectedType: selectedType || "",
            selectedDepartements: selectedDepartements.length > 0 ? selectedDepartements : undefined,
            selectedPeriodes: selectedPeriodes.length > 0 ? selectedPeriodes : undefined,
            infos: infos && infos.length > 0 ? infos : undefined,
            cells: cellData,
        };

        modifierHoraire(horaireJournaliere).then(() => {
            navigate("/accueil")
            setVue(VueResponsable.HORAIRE);
        }).catch((error) => {
            console.error(error);
        })
    };

    const handleSupprimerHoraire = () => {
        getHoraireById(Number(id)).then((horaire) => {
            supprimerHoraire(horaire).then(() => {
                navigate("/accueil")
                setVue(VueResponsable.HORAIRE);
            }).catch(
                error => console.error(error)
            );
        }).catch(
            error => console.log(error)
        );
    }

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
            <button onClick={handleBack}
                    className="absolute border top-24 right-2 rounded pl-4 pr-4 p-2 bg-gray-200 hover:bg-gray-300 text-black">
                Retour
            </button>
            <h1 className="text-2xl font-bold mb-4">Horaire Journalière</h1>
            <div className="relative bg-gray-200 p-4 rounded">
                <button
                    onClick={toggleCollapsible}
                    className="absolute top-3 right-2 h-8 w-8 bg-gray-200 hover:bg-gray-300 text-black rounded-full flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={isCollapsibleOpen ? faTimes : faPlus}/>
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
                    {...{infos, setInfos, dates, rows, handleCellClick, handleRemoveRow, handleAddRow}}
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
            {selectedPeriodes.length > 0 && startDate && endDate && name && selectedType != null && rows.length > 0 && infos.length > 0 && (
                <button
                    onClick={handleModifierHoraire}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4">
                    Modifier Horaire
                </button>
            )}
            <button
                onClick={handleSupprimerHoraire}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4 ml-2">
                Supprimer Horaire
            </button>
        </div>
    );

}

export default ModifierHoraireJournaliere;