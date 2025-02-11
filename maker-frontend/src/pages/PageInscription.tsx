import {Link} from "react-router-dom";
import {RoutesFE} from "../interface/Routes.ts";

const PageInscription = () => {

    const cards = [
        { link: RoutesFE.InscriptionMoniteur, text: "Inscription Moniteur" },
    ];

    return (
        <div>
            <h2 className="h2">Inscription</h2>
            {cards.map((card, index) => (
                <div key={index} className="bg-blue-100 shadow-xl rounded p-4 m-4 w-10/12 md:w-8/12 mx-auto">
                    <Link to={card.link} className="link text-center block">{card.text}</Link>
                </div>
            ))}
        </div>
    );
}

export default PageInscription;