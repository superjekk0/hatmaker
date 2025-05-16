import {useContext, useEffect, useState} from "react";
import {AuthentificatedContext} from "../../../context/AuthentificationContext.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {getMoniteurs} from "../../../interface/gestion/GestionUtilisateur.ts";
import {
    Activite, ActiviteMoniteur, CellData, Etat, Moniteur,
    Periode,
    VueResponsable
} from "../../../interface/Interface.ts";
import {useViewResponsable} from "../../../context/ResponsableViewContext.tsx";
import {getPeriodes} from "../../../interface/gestion/GestionPeriodes.tsx";
import ActiviteMoniteurSelectionModal from "./ActiviteMoniteurSelectionModal.tsx";
import {getActivites} from "../../../interface/gestion/GestionActivite.ts";
import HoraireActiviteMoniteurTable from "./HoraireActiviteMoniteurTable.tsx";
import OptionsActiviteMoniteur from "./OptionsActiviteMoniteur.tsx";
import {getEtats} from "../../../interface/gestion/GestionEtats.ts";
import {
    getActiviteMoniteurById, modifierActiviteMoniteur, supprimerActiviteMoniteur
} from "../../../interface/gestion/GestionActiviteMoniteur.ts";

const ModifierHoraireActiviteMoniteurs = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [rows, setRows] = useState<string[][]>([]);
    const [periodes, setPeriodes] = useState<Periode[]>([]);
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>([]);
    const [activites, setActivites] = useState<Activite[]>([])
    const [etats, setEtats] = useState<Etat[]>([]);
    const [selectedPeriodes, setSelectedPeriodes] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true);
    const [isTableGenerated, setIsTableGenerated] = useState(false);
    const {isAuthentificated} = useContext(AuthentificatedContext)
    const {setVue} = useViewResponsable();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthentificated) {
            navigate("/");
        }
        getMoniteurs().then(
            data => setMoniteurs(data.filter(moniteur => moniteur.deleted !== true))
        );
        getActivites().then(
            data => setActivites(data.filter(activite => activite.deleted !== true))
        );
        getEtats().then(
            data => setEtats(data.filter(etat => etat.deleted !== true))
        )
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
            getActiviteMoniteurById(Number(id)).then(
                data => {
                    setName(data.name);
                    setDate(data.date);
                    setSelectedPeriodes(data.selectedPeriodes || []);
                    const groupedRows = data.cells.reduce((acc, cell) => {
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
            ).catch(
                error => console.error('Error fetching horaires:', error)
            )
        }
    }, []);

    const handleGenerate = () => {
        if (moniteurs.length > 0 && selectedPeriodes.length > 0) {
            setIsTableGenerated(true);
            setIsCollapsibleOpen(false);
        } else {
            setIsTableGenerated(false);
        }
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        setSelectedCell({rowIndex, colIndex});
        setIsModalOpen(true);
    };

    const handleSelectActivite = (activite: Activite) => {
        if (selectedCell) {
            const {rowIndex, colIndex} = selectedCell;
            setRows((prevRows) => {
                const updatedRows = [...prevRows];
                const cellData = updatedRows[rowIndex][colIndex].split(", ");

                if (cellData[0] == '' && cellData.length == 1) {
                    cellData[0] = activite.nom;
                } else if (cellData.includes(activite.nom)) {
                    cellData.splice(cellData.indexOf(activite.nom), 1);
                } else {
                    cellData.push(activite.nom);
                }
                updatedRows[rowIndex][colIndex] = cellData.join(", ");
                return updatedRows;
            });
        }
        setIsModalOpen(false);
        setSelectedCell(null);
    };

    const handleSelectEtat = (etat: Etat) => {
        if (selectedCell) {
            const {rowIndex, colIndex} = selectedCell;
            setRows((prevRows) => {
                const updatedRows = [...prevRows];
                const cellData = updatedRows[rowIndex][colIndex].split(", ");

                if (cellData[0] == '' && cellData.length == 1) {
                    cellData[0] = etat.nom;
                } else if (cellData.includes(etat.nom)) {
                    cellData.splice(cellData.indexOf(etat.nom), 1);
                } else {
                    cellData.push(etat.nom);
                }
                updatedRows[rowIndex][colIndex] = cellData.join(", ");
                return updatedRows;
            });
        }
        setIsModalOpen(false);
        setSelectedCell(null);
    };

    const handleBack = () => {
        setVue(VueResponsable.GESTION_ACTIVITES);
        navigate("/accueil");
    }

    const handlePeriodeSelect = (periode: string) => {
        setSelectedPeriodes((prev) => {
            const isAdding = !prev.includes(periode);
            const updatedPeriodes = isAdding
                ? [...prev, periode]
                : prev.filter((per) => per !== periode);

            setRows((prevRows) => {
                if (isAdding) {
                    // Add a column for the new periode
                    return prevRows.map((row) => [...row, ""]);
                } else {
                    // Remove the column corresponding to the removed periode
                    const indexToRemove = prev.indexOf(periode);
                    return prevRows.map((row) =>
                        row.filter((_, colIndex) => colIndex !== indexToRemove)
                    );
                }
            });

            return updatedPeriodes;
        });
    };

    const handleModifierActiviteMoniteur = () => {
        const cellData: CellData[] = rows.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => ({
                indexCol: colIndex,
                indexRow: rowIndex,
                cellData: cell,
            }))
        );

        const activiteMoniteur: ActiviteMoniteur = {
            id: Number(id),
            name: name,
            date: date,
            selectedPeriodes: selectedPeriodes.length > 0 ? selectedPeriodes : undefined,
            cells: cellData,
        };

        modifierActiviteMoniteur(activiteMoniteur).then(() => {
            navigate("/accueil")
            setVue(VueResponsable.GESTION_ACTIVITES);
        }).catch((error) => {
            console.error(error);
        })
    };

    const handleSupprimerActiviteMoniteur = () => {
        getActiviteMoniteurById(Number(id)).then((act) => {
            supprimerActiviteMoniteur(act).then(() => {
                navigate("/accueil")
                setVue(VueResponsable.GESTION_ACTIVITES);
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

    const filteredActivites = activites.filter(
        (activite) =>
            (activite.nom.toLowerCase().includes(searchQuery)
    ));

    const filteredEtats = etats.filter(
        (etat) =>
            (etat.nom.toLowerCase().includes(searchQuery)
    ));

    return (
        <div className="p-4">
            <button onClick={handleBack}
                    className="absolute border top-24 right-2 rounded pl-4 pr-4 p-2 bg-gray-200 hover:bg-gray-300 text-black">
                Retour
            </button>
            <h1 className="text-2xl font-bold mb-4">Horaire d'activités</h1>
            <div className="relative bg-gray-200 p-4 rounded">
                <button
                    onClick={toggleCollapsible}
                    className="absolute top-3 right-2 h-8 w-8 bg-gray-200 hover:bg-gray-300 text-black rounded-full flex items-center justify-center"
                >
                    <FontAwesomeIcon icon={isCollapsibleOpen ? faTimes : faPlus}/>
                </button>
                {!isCollapsibleOpen && <h2 className="font-bold">Options</h2>}
                {isCollapsibleOpen && (
                    <OptionsActiviteMoniteur
                        {...{
                            name,
                            setName,
                            periodes,
                            selectedPeriodes,
                            handlePeriodeSelect,
                            activites,
                            handleGenerate,
                            date,
                            setDate
                        }}
                    />
                )}
            </div>
            {isTableGenerated && selectedPeriodes.length > 0 && (
                <HoraireActiviteMoniteurTable
                    {...{rows, handleCellClick, selectedPeriodes, moniteurs}}
                />
            )}
            <ActiviteMoniteurSelectionModal
                {...{
                    isModalOpen,
                    setIsModalOpen,
                    searchQuery,
                    setSearchQuery,
                    filteredActivites,
                    handleSelectActivite,
                    filteredEtats,
                    handleSelectEtat
                }}
            />
            {isTableGenerated && name && date && selectedPeriodes.length > 0 && (
                <button
                    onClick={handleModifierActiviteMoniteur}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4">
                    Modifier Horaire
                </button>
            )}
            <button
                onClick={handleSupprimerActiviteMoniteur}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 rounded mb-4 ml-2">
                Supprimer Horaire
            </button>
        </div>
    );
};

export default ModifierHoraireActiviteMoniteurs;