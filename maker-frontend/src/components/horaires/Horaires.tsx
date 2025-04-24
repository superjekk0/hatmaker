import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const Horaires = () => {
    const navigate = useNavigate();
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Horaires</h1>
            </div>
            <div className="relative overflow-x-auto shadow-md border rounded">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nom</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3 text-right">
                            <button
                                className="w-10 h-10 bg-gray-100 rounded shadow-md"
                                onClick={() => navigate("/horaire-journaliere")}>
                                <FontAwesomeIcon icon={faPlus} size="lg"/>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Horaires;