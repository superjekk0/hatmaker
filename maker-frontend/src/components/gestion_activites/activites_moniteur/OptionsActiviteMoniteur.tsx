import {Periode} from "../../../interface/Interface.ts";

interface OptionsSectionProps {
    name: string;
    setName: (name: string) => void;
    periodes: Periode[];
    selectedPeriodes: string[];
    handlePeriodeSelect: (periode: string) => void;
    handleGenerate: () => void;
    date: string;
    setDate: (date: string) => void;
}

const OptionsActiviteMoniteur = ({
                             name,
                             setName,
                             periodes,
                             selectedPeriodes,
                             handlePeriodeSelect,
                             handleGenerate,
                             date,
                             setDate
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
                <label className="block mb-2">Date de l'horaire:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
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

export default OptionsActiviteMoniteur;