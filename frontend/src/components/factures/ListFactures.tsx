import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useGetFacturesQuery } from "../../redux/services/factureApi";

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("fr-FR");
};

export default function ListFactures({
  openEdit,
  openDelete,
  getFactureToEdit,
  getFactureToDelete,
}: {
  openEdit: () => void;
  openDelete: () => void;
  getFactureToEdit?: (fact: any) => void;
  getFactureToDelete?: (fact: any) => void;
}) {
  const {
    data: factures,
    isError,
    isFetching,
    isSuccess,
  } = useGetFacturesQuery();

  const handleGetFactureToEdit = (fact: any) => {
    getFactureToEdit && getFactureToEdit(fact);
    openEdit();
  };

  const handleGetFactureToDelete = (fact: any) => {
    getFactureToDelete && getFactureToDelete(fact);
    openDelete();
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-10">
      {isFetching && (
        <p className="text-3xl text-center font-semibold w-full">
          Chargement...
        </p>
      )}

      {isError && (
        <p className="text-3xl text-center font-semibold w-full text-red-500">
          Serveur non accedé
        </p>
      )}

      {isSuccess && (
        <table className="w-3/4 table-auto text-center overflow-hidden rounded-t-md">
          <thead className="bg-gray-800 text-white h-12 rounded-t-md overflow-hidden">
            <tr className="rounded-t-md overflow-hidden">
              <th>Numéro</th>
              <th>Nom</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {factures?.map((facture: any) => (
              <tr
                key={facture?.factureNumber}
                className="bg-gray-50 border border-b border-gray-400"
              >
                <td className="p-2"> {facture?.factureNumber} </td>
                <td className="p-2"> {facture?.name} </td>
                <td className="p-2"> {formatDate(facture?.date)} </td>
                <td className="p-2"> {facture?.amount} </td>
                <td className="p-2 flex items-center justify-center space-x-2">
                  <button
                    className="bg-red-500 text-white p-2 rounded-md"
                    onClick={() =>
                      handleGetFactureToDelete(facture?.factureNumber)
                    }
                  >
                    <FaTrashCan />
                  </button>
                  <button
                    className="bg-green-500 text-white p-2 rounded-md"
                    onClick={() =>
                      handleGetFactureToEdit({
                        factureNumber: facture?.factureNumber,
                        name: facture?.name,
                        date: facture?.date,
                        amount: facture?.amount,
                      })
                    }
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
