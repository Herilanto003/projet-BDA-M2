import Modal from "../Modal";
import { FaTimes } from "react-icons/fa";
import {
  schemaFactureForm,
  FactureFormValues,
} from "../../validation/factureFormSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateFactureMutation,
  useGetFacturesQuery,
} from "../../redux/services/factureApi";
import { toast } from "react-toastify";

export default function FormAddFacture({ onClose }: { onClose: () => void }) {
  const [createFacture, state] = useCreateFactureMutation();
  const { refetch } = useGetFacturesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FactureFormValues>({
    resolver: yupResolver(schemaFactureForm),
  });

  const onSubmit = async (data: FactureFormValues) => {
    console.log(data);

    try {
      await createFacture(data);
      await refetch();
      onClose();
      toast.success("Ajout de nouvelle facture avec succès");
    } catch (error: any) {
      toast.error("Erreur venant du serveur !");
    }
  };

  return (
    <Modal>
      <div className="bg-white p-4 rounded-lg w-1/3 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Nouvelle Facture
          </h1>
          <button onClick={onClose} className="text-red-500 text-3xl">
            <FaTimes />
          </button>
        </div>

        <div className="mt-10 px-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center items-start space-y-4 w-full">
              <div className="flex flex-col justify-center items-start space-y-0 w-full">
                <label
                  htmlFor="factureNumber"
                  className="text-sm font-semibold text-gray-800"
                >
                  Numéro Facture
                </label>
                <input
                  type="text"
                  className="w-full outline-none border border-gray-400 px-3 py-1 rounded-md mt-2"
                  placeholder="Numéro Facture"
                  {...register("factureNumber")}
                />
                {errors.factureNumber && (
                  <p className="text-red-500 text-sm -mt-1">
                    {errors.factureNumber.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-center items-start space-y-0 w-full">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-800"
                >
                  Nom Facture
                </label>
                <input
                  type="text"
                  className="w-full outline-none border border-gray-400 px-3 py-1 rounded-md mt-2"
                  placeholder="Nom de la Facture"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm -mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-center items-start space-y-0 w-full">
                <label
                  htmlFor="date"
                  className="text-sm font-semibold text-gray-800"
                >
                  Date Facture
                </label>
                <input
                  type="date"
                  className="w-full outline-none border border-gray-400 px-3 py-1 rounded-md mt-2"
                  placeholder="Date de la Facture"
                  {...register("date")}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm -mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-center items-start space-y-0 w-full">
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold text-gray-800"
                >
                  Montant
                </label>
                <input
                  type="number"
                  className="w-full outline-none border border-gray-400 px-3 py-1 rounded-md mt-2"
                  placeholder="Montant de la Facture"
                  {...register("amount")}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm -mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <button
                className="w-full py-2 bg-slate-800 text-sm text-white font-semibold rounded-md"
                disabled={state.isLoading}
              >
                {state.isLoading ? "Chargement ..." : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
