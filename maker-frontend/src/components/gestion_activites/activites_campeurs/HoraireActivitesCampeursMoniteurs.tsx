import {useContext, useEffect, useState} from "react";
import {Campeur, CellData, Moniteur} from "../../../interface/Interface.ts";
import {AuthentificatedContext} from "../../../context/AuthentificationContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getActiviteMoniteurById} from "../../../interface/gestion/GestionActiviteMoniteur.ts";
import {getMoniteurs} from "../../../interface/gestion/GestionUtilisateur.ts";
import {getCampeurs} from "../../../interface/gestion/GestionCampeurs.ts";
import {getActivites} from "../../../interface/gestion/GestionActivite.ts";

const HoraireActivitesCampeursMoniteurs = () => {
    const {id} = useParams();
    const [activiteMoniteur, setActiviteMoniteur] = useState<any>();
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>([]);
    const [campeurs, setCampeurs] = useState<Campeur[]>([]);
    const [activites, setActivites] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<Record<string, string[]>>({});
    const [limits, setLimits] = useState<Record<string, number>>({});
    const {isAuthentificated} = useContext(AuthentificatedContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthentificated) {
            navigate("/");
        }

        getMoniteurs().then(
            data => setMoniteurs(data.filter(moniteur => moniteur.deleted !== true))
        );

        getCampeurs().then(
            data => setCampeurs(data.filter(campeur => campeur.deleted !== true))
        )

        getActivites().then(
            data => setActivites(data.filter(activite => activite.deleted !== true))
        )

        if (id) {
            getActiviteMoniteurById(Number(id)).then(
                data => {
                    setActiviteMoniteur(data)
                    if (data.assignements) {
                        const newAssignments: Record<string, string[]> = {};
                        const newSelectedActivites: Record<string, string> = {};

                        data.assignements.forEach((assignement) => {
                            const key = `${assignement.periode}-${assignement.activite}`;
                            newAssignments[key] = assignement.campeurs;
                            setLimits((prev) => ({...prev, [key]: assignement.limite || 0}));

                            assignement.campeurs.forEach(campeur => {
                                newSelectedActivites[`${campeur}-${assignement.periode}`] = assignement.activite;
                            });
                        });

                        setAssignments(newAssignments);
                    }
                }
            ).catch(
                error => console.error('Error fetching horaires:', error)
            );
        }

    }, []);

    const handleBack = () => {
        navigate("/accueil");
    }

    const filteredCells: CellData[] = activiteMoniteur?.cells?.filter((cell: CellData) => {
        const cellActivities = cell.cellData?.split(", ") || [];
        return cellActivities.some(activite => activites.some(a => a.nom === activite));
    })

    return (
        <div className="p-4 mt-16">
            <button onClick={handleBack}
                    className="absolute border top-24 right-4 rounded pl-4 pr-4 p-2 bg-gray-200 hover:bg-gray-300 text-black">
                Retour
            </button>
            {activiteMoniteur?.selectedPeriodes
                ?.map((periode: string, colIndex: number) => {
                    const periodCells = filteredCells?.filter((cell: CellData) => cell.indexCol === colIndex) || [];
                    const activities: string[] = Array.from(
                        new Set(periodCells.flatMap((cell: CellData) => cell.cellData?.split(", ") || []))
                    );

                    if (activities.length === 0) {
                        return null;
                    }

                    return (
                        <div key={colIndex} className="mb-6">
                            <div className="w-full bg-blue-100 rounded-lg p-4 mb-4 shadow">
                                <h2 className="font-bold text-xl text-center text-blue-800">{periode}</h2>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-full">
                                    <div
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sticky top-24 bg-gray-100 p-4 rounded-lg shadow">
                                        {activities.map((activite) => {
                                            const key = `${periode}-${activite}`;
                                            const assignedCampeurs = assignments[key]?.length || 0; // Use the correct key with periode
                                            const limit = limits[key] || 0;
                                            const titleBgColor =
                                                limit === 0
                                                    ? "bg-gray-100"
                                                    : assignedCampeurs > limit
                                                        ? "bg-red-500"
                                                        : assignedCampeurs === limit
                                                            ? "bg-green-500"
                                                            : "bg-gray-100";

                                            return (
                                                <div key={activite}
                                                     className="bg-white rounded-lg shadow p-4 border border-gray-200">
                                                    <div
                                                        className={`flex justify-between items-center p-2 rounded ${titleBgColor}`}>
                                                        <h3 className="font-semibold text-lg">{activite}</h3>
                                                        {limits[key] && (
                                                            <div className="flex items-center justify-end gap-1">
                                                <span
                                                    className="text-sm text-gray-600">{assignedCampeurs}/{limits[key]}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <ul className="list-disc ml-4 text-gray-600">
                                                        {periodCells
                                                            .filter((cell: CellData) => cell.cellData?.split(", ").includes(activite))
                                                            .map((cell: CellData) => {
                                                                const moniteur = moniteurs[cell.indexRow];
                                                                return moniteur ?
                                                                    <li key={moniteur.nom}>{moniteur.nom}</li> : null;
                                                            })}
                                                    </ul>
                                                    {assignments[key]?.length > 0 &&
                                                        <hr className="my-2 border-gray-300"/>}
                                                    <ul className="list-disc ml-4 text-gray-600">
                                                        {assignments[key]?.map((campeur, index) => {
                                                            const campeurData = campeurs.find(c => c.prenom + " " + c.nom === campeur);
                                                            return (
                                                                <li key={index} className="flex justify-between">
                                                                    <span>{campeur}</span>
                                                                    <span
                                                                        className="text-gray-500 text-sm">{campeurData?.groupe.nom}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    )
        ;
};
export default HoraireActivitesCampeursMoniteurs;