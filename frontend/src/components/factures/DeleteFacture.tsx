import Modal from "../Modal";
import {
  useDeleteFactureMutation,
  useGetFacturesQuery,
} from "../../redux/services/factureApi";
import { toast } from "react-toastify";

export default function DeleteFacture({
  onClose,
  factureNumber,
}: {
  onClose: () => void;
  factureNumber?: any;
}) {
  const [deleteFacture, state] = useDeleteFactureMutation();
  const { refetch } = useGetFacturesQuery();

  const handleDeleteFacture = async () => {
    try {
      await deleteFacture(factureNumber);
      await refetch();
      toast.success("Suppression de la facture avec succès");
      onClose();
    } catch (error) {
      toast.error("Serveur innaccessible !");
    }
  };
  return (
    <Modal>
      <div className="bg-white w-1/3 p-5 mx-auto rounded-lg">
        <h1 className="text-center text-red-500 font-semibold text-2xl">
          Suppression
        </h1>
        <p className="font-semibold text-gray-700 my-4 text-center">
          Etes-vous sûr de vouloir le supprimer ?
        </p>
        <div className="flex justify-end items-center space-x-4">
          <button
            className="font-semibold text-xl text-blue-500"
            onClick={handleDeleteFacture}
            disabled={state.isLoading}
          >
            {state.isLoading ? "..." : "Continuer"}
          </button>
          <button
            className="font-semibold text-xl text-red-500"
            onClick={onClose}
            disabled={state.isLoading}
          >
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
}
