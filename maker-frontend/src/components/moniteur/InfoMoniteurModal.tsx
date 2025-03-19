import {Moniteur} from "../../interface/Interface.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

interface InfoMoniteurModalProps {
    isOpen: boolean;
    onClose: () => void;
    moniteur: Moniteur;
}

const InfoMoniteurModal = ({isOpen, onClose, moniteur}: InfoMoniteurModalProps) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-4 rounded shadow-md lg:w-1/3 relative">
                <button
                    className="absolute top-2 right-2 text-black"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <h2 className="text-xl font-bold mb-4">{moniteur.nom}</h2>
                <div className="mb-2">
                    <label className="block text-gray-700">Nom</label>
                    <div className="w-full p-2 border border-gray-300 rounded">{moniteur.nom}</div>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Courriel</label>
                    <div className="w-full p-2 border border-gray-300 rounded">{moniteur.courriel}</div>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Département</label>
                    <div className="w-full p-2 border border-gray-300 rounded">{moniteur.departement?.nom}</div>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Rôle</label>
                    <div className="w-full p-2 border border-gray-300 rounded">{moniteur.role}</div>
                </div>

            </div>
        </div>
    );
}

export default InfoMoniteurModal;