import { useState } from "react";
import ListAuditFacturesBetweenTwoDates from "../../components/auditFactures/ListAuditFacturesBetweenTwoDates";
import InfoAuditFacture from "../../components/auditFactures/InfoAuditFacture";
import {
  schemaBetweenTwoDates,
  betweenTwoDates,
} from "../../validation/betweenTwoDate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostAuditFacturesBetweenTwoDatesMutation } from "../../redux/services/auditFactureApi";

export default function BetweenTwoDates() {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [auditFactSelected, setAuditFactSelected] = useState<any>();
  const [auditFacts, setAudiFacts] = useState<any>();

  const handleShowAuditFact = (auditFact: any) => {
    setAuditFactSelected(auditFact);
    setIsInfoOpen(true);
  };

  const [fetchDataBetweenTwoDates, state] =
    usePostAuditFacturesBetweenTwoDatesMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<betweenTwoDates>({
    resolver: yupResolver(schemaBetweenTwoDates),
  });

  const onSubmit = async (data: betweenTwoDates) => {
    console.log(data);
    try {
      const res = await fetchDataBetweenTwoDates(data);
      console.log(res);
      setAudiFacts(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {isInfoOpen && (
        <InfoAuditFacture
          auditFact={auditFactSelected}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
      <div className="w-3/5 mx-auto mt-10">
        <h1 className="text-center text-4xl text-indigo-500 font-semibold mb-10">
          Audit entre deux dates
        </h1>

        <div className="mb-8">
          <h2 className="text-justify mb-2 font-semibold text-gray-700">
            Veuillez entrer ici les deux dates
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-start space-x-8 items-center"
          >
            <div className="flex flex-col items-start">
              <label
                htmlFor="startDate"
                className="text-gray-600 font-bold text-xs"
              >
                Date de début
              </label>
              <input
                type="date"
                className="outline-none px-2 py-1 bg-gray-200 border-b border-gray-600 rounded-sm"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-justify text-red-500 -mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start">
              <label
                htmlFor="endDate"
                className="text-gray-600 font-bold text-xs"
              >
                Date de fin
              </label>
              <input
                type="date"
                className="outline-none px-2 py-1 bg-gray-200 border-b border-gray-600 rounded-sm"
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="text-justify text-red-500 -mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold p-2 px-5 rounded-sm"
            >
              Valider
            </button>
          </form>
        </div>

        {state.isLoading && (
          <p className="text-3xl text-center font-semibold w-full">
            Chargement...
          </p>
        )}

        {state.isError && (
          <p className="text-3xl text-center font-semibold w-full text-red-500">
            Serveur non accedé
          </p>
        )}

        {state.isSuccess && (
          <ListAuditFacturesBetweenTwoDates
            setIsInfoOpen={handleShowAuditFact}
            auditFacts={auditFacts}
          />
        )}
      </div>
    </>
  );
}
