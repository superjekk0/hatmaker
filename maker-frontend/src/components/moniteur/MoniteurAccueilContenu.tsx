import {useState} from "react";
import {VueMoniteur} from "../../interface/Interface.ts";
import TenteComponent from "../tentes/TenteComponent.tsx";
import HoraireTypiquesMoniteur from "../horaire_typique/HoraireTypiquesMoniteur.tsx";
import HorairesMoniteur from "../horaires/HorairesMoniteur.tsx";
import GestionActivitesMoniteur from "../gestion_activites/GestionActivitesMoniteur.tsx";

const MoniteurAccueilContenu = () => {
    const [vue, setVue] = useState(VueMoniteur.TENTE);

    return (
        <div className="linkModalEvalMS container mx-auto p-4 border-2 border-gray-300 rounded-lg">
            <div className="flex flex-col md:flex-row">
                {/* Colonne Gauche */}
                <div className="w-full md:w-1/3 pr-4 md:border-r border-gray-300">
                    <div className="space-y-4">
                        <div className="p-2">
                            <h1 className="text-center text-xl font-bold mb-3">Information</h1>
                            <button
                                className="border rounded w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueMoniteur.TENTE)}>
                                Tente
                            </button>
                        </div>
                        <div className="p-2">
                            <h1 className="text-center text-xl font-bold mb-3">Horaires</h1>
                            <button
                                className="border rounded-t w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueMoniteur.HORAIRE_TYPIQUE)}>
                                Horaire typique
                            </button>
                            <button
                                className="border w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueMoniteur.HORAIRE_JOURNALIERE)}>
                                Horaire journalière
                            </button>
                            <button
                                className="border rounded-b w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueMoniteur.HORAIRE_ACTIVITES)}>
                                Horaire des activités
                            </button>
                        </div>

                    </div>
                </div>

                {/* Colonne droite */}
                {vue === VueMoniteur.TENTE && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <TenteComponent/>
                    </div>
                )}
                {vue === VueMoniteur.HORAIRE_TYPIQUE && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <HoraireTypiquesMoniteur/>
                    </div>
                )}
                {vue === VueMoniteur.HORAIRE_JOURNALIERE && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <HorairesMoniteur/>
                    </div>
                )}
                {vue === VueMoniteur.HORAIRE_ACTIVITES && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <GestionActivitesMoniteur/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MoniteurAccueilContenu;