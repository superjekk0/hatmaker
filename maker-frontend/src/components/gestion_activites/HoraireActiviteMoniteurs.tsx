import {useContext, useEffect, useState} from "react";
import {AuthentificatedContext} from "../../context/AuthentificationContext.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {getMoniteurs} from "../../interface/gestion/GestionUtilisateur.ts";
import {
    Activite, Etat,
    Moniteur,
    Periode,
    VueResponsable
} from "../../interface/Interface.ts";
import {useViewResponsable} from "../../context/ResponsableViewContext.tsx";
import {getPeriodes} from "../../interface/gestion/GestionPeriodes.tsx";
import ActiviteSelectionModal from "./ActiviteSelectionModal.tsx";
import {getActivites} from "../../interface/gestion/GestionActivite.ts";
import HoraireActiviteTable from "./HoraireActiviteTable.tsx";
import OptionsActivite from "./OptionsActivite.tsx";
import {getEtats} from "../../interface/gestion/GestionEtats.ts";

const HoraireActiviteMoniteurs = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [rows, setRows] = useState<string[][]>([]);
    const [periodes, setPeriodes] = useState<Periode[]>([]);
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>([]);
    const [activites, setActivites] = useState<Activite[]>([])
    const [etats, setEtats] = useState<Etat[]>([]);
    const [selectedActivites, setSelectedActivites] = useState<string[]>([]);
    const [selectedPeriodes, setSelectedPeriodes] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true);
    const [isTableGenerated, setIsTableGenerated] = useState(false);
    const {isAuthentificated} = useContext(AuthentificatedContext)
    const {setVue} = useViewResponsable();
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
    }, []);

    const handleGenerate = () => {
        if (moniteurs.length > 0 && selectedPeriodes.length > 0) {
            const generatedRows = moniteurs.map(() =>
                selectedPeriodes.map(() => "")
            );
            setRows(generatedRows);
            setIsTableGenerated(true);
            setIsCollapsibleOpen(false);
        } else {
            setRows([]);
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

    const handleActiviteSelect = (activite: string) => {
        setSelectedActivites((prev) =>
            prev.includes(activite)
                ? prev.filter((dep) => dep !== activite)
                : [...prev, activite]
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

    const filteredActivites = activites.filter(
        (activite) =>
            (!selectedActivites.length || selectedActivites.includes(activite.nom)) &&
            activite.nom.toLowerCase().includes(searchQuery)
    );

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
                    <OptionsActivite
                        {...{
                            name,
                            setName,
                            periodes,
                            selectedPeriodes,
                            handlePeriodeSelect,
                            activites,
                            selectedActivites,
                            handleActiviteSelect,
                            handleGenerate,
                            date,
                            setDate
                        }}
                    />
                )}
            </div>
            {isTableGenerated && selectedPeriodes.length > 0 && (
                <HoraireActiviteTable
                    {...{rows, handleCellClick, selectedPeriodes, moniteurs}}
                />
            )}
            <ActiviteSelectionModal
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
                    onClick={() => console.log(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4">
                    Créer Horaire
                </button>
            )}
        </div>
    );
};

export default HoraireActiviteMoniteurs;