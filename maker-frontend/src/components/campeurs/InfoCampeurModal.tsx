import {Campeur} from '../../interface/Interface.ts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

interface InfoCampeurModalProps {
    isOpen: boolean;
    onClose: () => void;
    campeur: Campeur;
}

const InfoCampeurModal = ({isOpen, onClose, campeur}: InfoCampeurModalProps) => {

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
                <h2 className="text-xl font-bold mb-4">{campeur.prenom} {campeur.nom}</h2>
                <div className="flex mb-2">
                    <div className="w-1/2 pr-2">
                        <label className="block text-gray-700">Prenom</label>
                        <div className="w-full p-2 border border-gray-300 rounded">{campeur.prenom}</div>
                    </div>
                    <div className="w-1/2 pl-2">
                        <label className="block text-gray-700">Nom</label>
                        <div className="w-full p-2 border border-gray-300 rounded">{campeur.nom}</div>
                    </div>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Genre</label>
                    <div className="w-full p-2 border border-gray-300 rounded">{campeur.genre}</div>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Groupe</label>
                    <div className="w-full p-2 border border-gray-300 rounded">{campeur.groupe.nom}</div>
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700">Information</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Information"
                        value={campeur.information}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoCampeurModal;