import {useLocation, useNavigate} from "react-router-dom";
import {RoutesFE} from "../interface/Routes.ts";
import {isTokenPresent, removeToken} from "../interface/Connexion.ts";
import {useContext, useState} from "react";
import {AuthentificatedContext} from "../context/AuthentificationContext.tsx";

const Header = () => {
    const {setIsAuthentificated} = useContext(AuthentificatedContext)
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavAccueil = () => {
        setIsOpen(false)
        navigate(RoutesFE.Accueil);
    }

    const handleNavConnexion = () => {
        setIsOpen(false)
        navigate(RoutesFE.Connexion);
    }

    const handleDeconnexion = () => {
        removeToken()
        setIsOpen(false)
        setIsAuthentificated(false)
        navigate(RoutesFE.Accueil)
    }

    const isConnexionPage = location.pathname === RoutesFE.Connexion;

    return (
        <>
            <header className="header z-10">
                <h1 className="m-0 text-4xl text-blue-500 hover:cursor-pointer inline-block"
                    onClick={handleNavAccueil}>
                    Hat Maker
                </h1>

                <button type="button"
                        id="navbar-retract-toggle"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                        onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Ouvrir menu principal</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <nav id="navbar-retract"
                     className={(isOpen? "max-h-96 visible" : "max-h-0 invisible" ) + " transition-all overflow-hidden duration-700 ease-in-out h-full w-full md:block md:w-auto md:visible md:max-h-96"}>
                    <ul
                        className={"flex flex-col p-4 gap-3 md:p-0 mx-auto mt-4 border border-white bg-white rounded-2xl md:flex-row rtl:space-x-reverse md:mt-0 md:border-none md:bg-transparent items-center"}>
                        {!isConnexionPage && !isTokenPresent() &&
                            (<li>
                                <button className="btn-blue" onClick={handleNavConnexion}>Connexion</button>
                            </li>)}
                        {isTokenPresent() && (
                            <li>
                                <button className="btn-red" onClick={handleDeconnexion}>Déconnexion</button>
                            </li>)}
                    </ul>
                </nav>
            </header>
            {/* Font d'écran foncé lors de l'ouverture*/}
            <div id="bluredBg"
                 className={(isOpen ? " opacity-100 visible" : "opacity-0 invisible") + " fixed transition-all duration-500 bg-black bg-opacity-50 z-30 h-screen w-screen md:opacity-0 md:invisible"}
                 onClick={() => setIsOpen(false)}
            ></div>
        </>
    );
}

export default Header;