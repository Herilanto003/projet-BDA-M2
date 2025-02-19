import { FaEye } from "react-icons/fa";
import { formatter } from "../../utils/formatDate";

export default function ListAuditFacturesBetweenTwoDates({
  setIsInfoOpen,
  auditFacts,
}: {
  setIsInfoOpen: (fact: any) => void;
  auditFacts: any;
}) {
  return (
    <div className="w-full h-full mb-10 ">
      <table className="w-full text-center overflow-hidden">
        <thead className="bg-slate-900 text-gray-200 h-12">
          <tr>
            <th>Numero Facture</th>
            <th>Nom Facture</th>
            <th>Type d'action</th>
            <th>Date de mise à jour</th>
            <th>Utilisateur Responsable</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {auditFacts?.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="p-4 text-xl font-semibold text-gray-700"
              >
                Pas de données
              </td>
            </tr>
          ) : (
            auditFacts?.map((fact: any) => (
              <tr key={fact?.id} className="border border-b-black">
                <td className="p-2">{fact?.factureNumber}</td>
                <td className="p-2">{fact?.factureName}</td>
                <td className="p-2">
                  {fact?.actionType === "CREATE" ? (
                    <span className="text-sm px-3 bg-blue-500 font-semibold text-white rounded-full py-0.5">
                      Ajout
                    </span>
                  ) : fact?.actionType === "UPDATE" ? (
                    <span className="text-sm px-3 bg-green-500 font-semibold text-white rounded-full py-0.5">
                      Mise à jour
                    </span>
                  ) : (
                    <span className="text-sm px-3 bg-red-500 font-semibold text-white rounded-full py-0.5">
                      Suppression
                    </span>
                  )}
                </td>
                <td>
                  {fact?.dateUpdate
                    ? formatter.format(new Date(fact?.dateUpdate))
                    : ""}
                </td>
                <td className="p-2">{fact?.userEmail}</td>
                <td className="p-2">
                  <button
                    className="flex justify-center items-center space-x-2 text-white font-semibold bg-indigo-500 px-4 rounded-sm text-lg"
                    onClick={() => setIsInfoOpen(fact)}
                  >
                    <FaEye />
                    <span>Voir</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
