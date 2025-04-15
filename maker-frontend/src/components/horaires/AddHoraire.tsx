import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const AddHoraire = ({onClose}: {onClose: () => void}) => {
    const navigate = useNavigate();

    const handleSelect = (option: string) => {
        if (option === "Patrouille") {
            onClose();
            navigate("/patrouille");
        } else {
            console.log(`Selected: ${option}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Sélectionner une option</h2>
                    <button onClick={onClose} className="text-black">
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
                <ul>
                    {["Patrouille", "24h Off", "Rassemblement"].map((option) => (
                        <li key={option} className="mb-2">
                            <button
                                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleSelect(option)}>
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddHoraire;