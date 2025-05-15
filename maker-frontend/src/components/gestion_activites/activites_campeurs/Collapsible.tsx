import { useState } from "react";
import {Campeur} from "../../../interface/Interface.ts";

interface CollapsibleProps {
    campeurs: Campeur[];
    activities: string[];
    onAssignActivity: (campeur: string, activity: string) => void;
}

const Collapsible = ({ campeurs = [], activities, onAssignActivity }: CollapsibleProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const groupedCampeurs = campeurs.reduce((acc, campeur) => {
        if (!acc[campeur.groupe.nom]) {
            acc[campeur.groupe.nom] = [];
        }
        acc[campeur.groupe.nom].push(campeur);
        return acc;
    }, {} as Record<string, Campeur[]>);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-200 rounded-lg p-2 flex justify-between items-center"
            >
                <span className="font-bold text-gray-700">Campeurs</span>
                <span className="font-bold text-gray-700 text-xl flex items-center">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen && (
                <div className="mt-2 bg-gray-100 rounded-lg p-4 shadow">
                    {Object.entries(groupedCampeurs).map(([ageGroup, campeurs]) => (
                        <div key={ageGroup} className="mb-4">
                            <h4 className="font-semibold text-gray-600 mb-2 border-b border-gray-300">{ageGroup}</h4>
                            <ul>
                                {campeurs.map((campeur) => (
                                    <li key={campeur.nom} className="flex items-center justify-between mb-2">
                                        <span>{campeur.prenom} {campeur.nom}</span>
                                        <select
                                            className="border border-gray-300 rounded p-1 w-3/4"
                                            onChange={(e) =>
                                                onAssignActivity(campeur.prenom + " " + campeur.nom, e.target.value)
                                            }
                                        >
                                            <option value="">Sélectionner Activité</option>
                                            {activities.map((activity) => (
                                                <option key={activity} value={activity}>
                                                    {activity}
                                                </option>
                                            ))}
                                        </select>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Collapsible;