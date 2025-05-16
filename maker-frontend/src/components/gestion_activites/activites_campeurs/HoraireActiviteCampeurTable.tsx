import {Campeur, CellData, Moniteur} from "../../../interface/Interface.ts";
import Collapsible from "./Collapsible.tsx";

interface HoraireActiviteCampeurTableProps {
    cells: CellData[] | undefined;
    selectedPeriodes: string[] | undefined;
    moniteurs: Moniteur[];
    campeurs: Campeur[];
    assignments: Record<string, string[]>;
    limits: Record<string, number>;
    onAssignActivity: (campeur: string, periode: string, activity: string) => void;
    onLimitChange: (periode: string, activite: string, limit: number) => void;
    selectedActivites: Record<string, string>;
}

const HoraireActiviteCampeurTable = ({
                                         cells,
                                         selectedPeriodes,
                                         moniteurs,
                                         campeurs,
                                         assignments,
                                         limits,
                                         onAssignActivity,
                                         onLimitChange,
                                         selectedActivites
                                     }: HoraireActiviteCampeurTableProps) => {
    return (
        <div className="p-4 mt-16">
            {selectedPeriodes
                ?.map((periode, colIndex) => {
                    const periodCells = cells?.filter((cell) => cell.indexCol === colIndex) || [];
                    const activities = Array.from(
                        new Set(periodCells.flatMap((cell) => cell.cellData?.split(", ") || []))
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
                                <div className="w-[57%]">
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
                                                        <div className="flex items-center justify-end gap-1">
                                                            <span
                                                                className="text-sm text-gray-600">{assignedCampeurs}/</span>
                                                            <input
                                                                type="text"
                                                                value={limits[key] || ""}
                                                                onChange={(e) =>
                                                                    onLimitChange(periode, activite, parseInt(e.target.value) || 0)
                                                                }
                                                                className="w-7 h-7 p-1 text-center border border-gray-300 rounded"
                                                            />
                                                        </div>
                                                    </div>
                                                    <ul className="list-disc ml-4 text-gray-600">
                                                        {periodCells
                                                            .filter((cell) => cell.cellData?.split(", ").includes(activite))
                                                            .map((cell) => {
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
                                <div className="w-[43%]">
                                    <Collapsible
                                        campeurs={campeurs || []}
                                        activities={activities}
                                        selectedActivites={selectedActivites}
                                        onAssignActivity={onAssignActivity}
                                        periode={periode}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
export default HoraireActiviteCampeurTable;