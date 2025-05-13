import {Departement, Periode} from "../../interface/Interface.ts";

interface OptionsSectionProps {
    name: string;
    setName: (name: string) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    selectedType: string | null;
    handleTypeSelect: (type: string) => void;
    departements: Departement[];
    selectedDepartements: string[];
    handleDepartementSelect: (departement: string) => void;
    periodes: Periode[];
    selectedPeriodes: string[];
    handlePeriodeSelect: (periode: string) => void;
    handleGenerate: () => void;
}

const OptionsSection = ({
                            name,
                            setName,
                            startDate,
                            setStartDate,
                            endDate,
                            setEndDate,
                            selectedType,
                            handleTypeSelect,
                            departements,
                            selectedDepartements,
                            handleDepartementSelect,
                            periodes,
                            selectedPeriodes,
                            handlePeriodeSelect,
                            handleGenerate,
                        }: OptionsSectionProps) => {
    return (
        <div>
            <div className="mb-4">
                <label className="block mb-2">Nom:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date de début:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date de fin:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Type d'horaire:</label>
                <div>
                    {["Patrouille", "24h Off"].map((type) => (
                        <div
                            key={type}
                            onClick={() => handleTypeSelect(type)}
                            className={`p-2 border rounded mt-2 ${
                                selectedType === type ? "bg-blue-500 text-white" : "cursor-pointer bg-white hover:bg-gray-300"
                            }`}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
            {departements.length > 0 && (
                <div className="mb-4">
                    <label className="block mb-2">Départements:</label>
                    <div className="max-h-56 overflow-y-auto">
                        {departements.map((dep) => (
                            <div
                                key={dep.nom}
                                onClick={() => handleDepartementSelect(dep.nom)}
                                className={`cursor-pointer p-2 border rounded mt-2 ${
                                    selectedDepartements.includes(dep.nom)
                                        ? "bg-blue-500 text-white"
                                        : "bg-white hover:bg-gray-300"
                                }`}
                            >
                                {dep.nom}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {periodes.length > 0 && (
                <div className="mb-4">
                    <label className="block mb-2">Périodes de l'horaire:</label>
                    <div className="max-h-56 overflow-y-auto">
                        {periodes.map((periode) => (
                            <div
                                key={periode.periode}
                                onClick={() => handlePeriodeSelect(periode.periode)}
                                className={`cursor-pointer p-2 border rounded mt-2 ${
                                    selectedPeriodes.includes(periode.periode)
                                        ? "bg-blue-500 text-white"
                                        : "bg-white hover:bg-gray-300"
                                }`}
                            >
                                {periode.periode}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <button
                onClick={handleGenerate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4">
                Générer le Tableau
            </button>
        </div>
    );
};

export default OptionsSection;