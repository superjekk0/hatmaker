import {VueResponsable} from "../../interface/Interface.ts";
import Etats from "../etats/Etats.tsx";
import Departements from "../departements/Departements.tsx";
import Activites from "../activites/Activites.tsx";
import Groupes from "../groupes/Groupes.tsx";
import Campeurs from "../campeurs/Campeurs.tsx";
import Personnel from "../personnel/Personnel.tsx";
import Tentes from "../tentes/Tentes.tsx";
import HoraireTypiques from "../horaire_typique/HoraireTypiques.tsx";
import {useViewResponsable} from "../../context/ResponsableViewContext.tsx";
import Periodes from "../periodes/Periodes.tsx";
import Horaires from "../horaires/Horaires.tsx";

const ResponsableAccueilContenu = () => {
    const {vue, setVue} = useViewResponsable();

    return (
        <div className="linkModalEvalMS container mx-auto p-4 border-2 border-gray-300 rounded-lg">
            <div className="flex flex-col md:flex-row">
                {/* Colonne Gauche */}
                <div className="w-full md:w-1/3 pr-4 md:border-r border-gray-300">
                    <div className="space-y-4">
                        <div className="p-2">
                            <h1 className="text-center text-xl font-bold mb-3">Gestion du personnel</h1>
                            <button
                                className="border rounded-t w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.DEPARTEMENTS)}>
                                Départements
                            </button>
                            <button
                                className="border rounded-b w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.PERSONNEL)}>
                                Personnel
                            </button>
                        </div>
                        <div className="p-2">
                            <h1 className="text-center text-xl font-bold mb-3">Gestion des campeurs</h1>
                            <button
                                className="border rounded-t w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.GROUPES)}>
                                Groupe d'âges
                            </button>
                            <button
                                className="border rounded-b w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.CAMPEURS)}>
                                Campeurs
                            </button>
                        </div>

                        <div className="p-2">
                            <h1 className="text-center text-xl font-bold mb-3">Organistation</h1>
                            <button
                                className="border rounded-t w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.TENTES)}>
                                Tentes
                            </button>
                            <button
                                className="border w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.ACTIVITES)}>
                                Activités
                            </button>
                        </div>
                        <div className="p-2">
                            <h1 className="text-center text-xl font-bold mb-3">Horaire</h1>
                            <button
                                className="border rounded-t w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.HORAIRE_TYPIQUE)}>
                                Horaire Typique
                            </button>
                            <button
                                className="border w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.HORAIRE)}>
                                Horaires
                            </button>
                            <button
                                className="border w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.PERIODES)}>
                                Périodes
                            </button>
                            <button
                                className="border rounded-b w-full text-center p-2 bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setVue(VueResponsable.ETATS)}>
                                États
                            </button>
                        </div>
                    </div>
                </div>

                {/* Colonne droite */}
                {vue === VueResponsable.ETATS && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Etats/>
                    </div>
                )}
                {vue === VueResponsable.DEPARTEMENTS && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Departements/>
                    </div>
                )}
                {vue === VueResponsable.ACTIVITES && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Activites/>
                    </div>
                )}
                {vue === VueResponsable.GROUPES && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Groupes/>
                    </div>
                )}
                {vue === VueResponsable.CAMPEURS && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Campeurs/>
                    </div>
                )}
                {vue === VueResponsable.PERSONNEL && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Personnel/>
                    </div>
                )}
                {vue === VueResponsable.TENTES && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Tentes/>
                    </div>
                )}
                {vue === VueResponsable.HORAIRE_TYPIQUE && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <HoraireTypiques/>
                    </div>
                )}
                {vue === VueResponsable.HORAIRE && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Horaires/>
                    </div>
                )}
                {vue === VueResponsable.PERIODES && (
                    <div className="w-full md:w-2/3 pl-4 mt-4 md:mt-0">
                        <Periodes/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResponsableAccueilContenu;