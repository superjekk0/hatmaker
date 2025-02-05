import {Link} from "react-router-dom";
import {RoutesFE} from "../interface/Routes.ts";
import {isResponsable} from "../interface/Connexion.ts";
import {useContext} from "react";
import {AuthentificatedContext} from "../context/AuthentificationContext.tsx";
import ResponsableAccueilContenu from "../components/responsable/ResponsableAccueilContenu.tsx";

const PageAccueil = () => {
    const {isAuthentificated} = useContext(AuthentificatedContext)

    const cards = [
        {link: RoutesFE.Connexion, text: "connexion"},
    ];

    return (
        <div>
            {!isAuthentificated && (
                <div>
                    {cards.map((card, index) => (
                        <div key={index} className="bg-blue-100 shadow-xl rounded p-4 m-4 w-10/12 md:w-8/12 mx-auto">
                            <Link to={card.link} className="link text-center block">{card.text}</Link>
                        </div>
                    ))}
                </div>
            )}
            {isAuthentificated && (
                <div>
                    <h2 className="h2">Dashboard</h2>
                    {isResponsable() && (<ResponsableAccueilContenu></ResponsableAccueilContenu>)}
                </div>
            )}
        </div>
    );
}

export default PageAccueil;