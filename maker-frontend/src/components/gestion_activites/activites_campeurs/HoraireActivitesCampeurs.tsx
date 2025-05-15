import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getActiviteMoniteurById} from "../../../interface/gestion/GestionActiviteMoniteur.ts";
import {Activite, ActiviteMoniteur, Campeur, Moniteur, VueResponsable} from "../../../interface/Interface.ts";
import HoraireActiviteCampeurTable from "./HoraireActiviteCampeurTable.tsx";
import {getMoniteurs} from "../../../interface/gestion/GestionUtilisateur.ts";
import {getActivites} from "../../../interface/gestion/GestionActivite.ts";
import {getCampeurs} from "../../../interface/gestion/GestionCampeurs.ts";
import {useViewResponsable} from "../../../context/ResponsableViewContext.tsx";
import {AuthentificatedContext} from "../../../context/AuthentificationContext.tsx";

const HoraireActivitesCampeurs = () => {
    const {id} = useParams();
    const [activiteMoniteur, setActiviteMoniteur] = useState<ActiviteMoniteur>();
    const [moniteurs, setMoniteurs] = useState<Moniteur[]>([]);
    const [activites, setActivites] = useState<Activite[]>([]);
    const [campeurs, setCampeurs] = useState<Campeur[]>([]);
    const {isAuthentificated} = useContext(AuthentificatedContext)
    const {setVue} = useViewResponsable();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthentificated) {
            navigate("/");
        }

        if (id) {
            getActiviteMoniteurById(Number(id)).then(
                data => setActiviteMoniteur(data)
            ).catch(
                error => console.error('Error fetching horaires:', error)
            );
        }

        getMoniteurs().then(
            data => setMoniteurs(data.filter(moniteur => moniteur.deleted !== true))
        );

        getActivites().then(
            data => setActivites(data.filter(activite => activite.deleted !== true))
        )

        getCampeurs().then(
            data => setCampeurs(data.filter(campeur => campeur.deleted !== true))
        )
    }, []);

    const handleBack = () => {
        setVue(VueResponsable.GESTION_ACTIVITES);
        navigate("/accueil");
    }

    const filteredCells = activiteMoniteur?.cells?.filter(cell => {
        const cellActivities = cell.cellData?.split(", ") || [];
        return cellActivities.some(activite => activites.some(a => a.nom === activite));
    })

    return (
        <>
            <button onClick={handleBack}
                    className="absolute border top-24 right-4 rounded pl-4 pr-4 p-2 bg-gray-200 hover:bg-gray-300 text-black">
                Retour
            </button>
            <HoraireActiviteCampeurTable
                cells={filteredCells}
                selectedPeriodes={activiteMoniteur?.selectedPeriodes}
                moniteurs={moniteurs}
                campeurs={campeurs}
            />
        </>
    );
}

export default HoraireActivitesCampeurs;