import {useState} from "react";
import {VueResponsable} from "../../interface/Interface.ts";
import Etats from "../etats/Etats.tsx";
import Departements from "../departements/Departements.tsx";

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
            </div>
        </div>
    );
}

export default ResponsableAccueilContenu;