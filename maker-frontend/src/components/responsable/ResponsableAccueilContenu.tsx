import {useState} from "react";
import {VueResponsable} from "../../interface/Interface.ts";
import Etats from "../etats/Etats.tsx";
import Departements from "../departements/Departements.tsx";
import Activites from "../activites/Activites.tsx";
import Groupes from "../groupes/Groupes.tsx";
import Campeurs from "../campeurs/Campeurs.tsx";
import Personnel from "../personnel/Personnel.tsx";

const ResponsableAccueilContenu = () => {
    const [vue, setVue] = useState(VueResponsable.ETATS);

    return (
        <div className="linkModalEvalMS container mx-auto p-4 border-2 border-gray-300 rounded-lg">
            <div className="flex flex-col md:flex-row">
                {/* Colonne Gauche */}
                <div className="w-full md:w-1/3 pr-4 md:border-r border-gray-300">
                    <div className="space-y-4">
                        <button
                            className="btn-accueil"
                            onClick={() => setVue(VueResponsable.ETATS)}>
                            États
                        </button>
                        <button
                            className="btn-accueil"
                            onClick={() => setVue(VueResponsable.DEPARTEMENTS)}>
                            Départements
                        </button>
                        <button
                            className="btn-accueil"
                            onClick={() => setVue(VueResponsable.ACTIVITES)}>
                            Activités
                        </button>
                        <button
                            className="btn-accueil"
                            onClick={() => setVue(VueResponsable.GROUPES)}>
                            Groupe d'âges
                        </button>
                        <button
                            className="btn-accueil"
                            onClick={() => setVue(VueResponsable.CAMPEURS)}>
                            Campeurs
                        </button>
                        <button
                            className="btn-accueil"
                            onClick={() => setVue(VueResponsable.PERSONNEL)}>
                            Personnel
                        </button>
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
            </div>
        </div>
    );
}

export default ResponsableAccueilContenu;