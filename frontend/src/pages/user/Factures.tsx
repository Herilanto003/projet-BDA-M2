import { useState } from "react";
import ListFactures from "../../components/factures/ListFactures";
import { FaPlusCircle } from "react-icons/fa";
import FormAddFacture from "../../components/factures/FormAddFacture";
import FormEditFacture from "../../components/factures/FormEditFacture";
import DeleteFacture from "../../components/factures/DeleteFacture";

export default function Factures() {
  const [openAddFacture, setOpenAddFacture] = useState(false);
  const [openEditFacture, setOpenEditFacture] = useState(false);
  const [openDeleteFacture, setOpenDeleteFacture] = useState(false);
  const [factureToEdit, setFactureToEdit] = useState<any | null>(null);
  const [factureToDelete, setFactureToDelete] = useState<any | null>(null);

  return (
    <>
      {openAddFacture && (
        <FormAddFacture onClose={() => setOpenAddFacture(false)} />
      )}

      {openEditFacture && (
        <FormEditFacture
          onClose={() => setOpenEditFacture(false)}
          factureToEdit={factureToEdit}
        />
      )}

      {openDeleteFacture && (
        <DeleteFacture
          onClose={() => setOpenDeleteFacture(false)}
          factureNumber={factureToDelete}
        />
      )}
      <div>
        <h1 className="text-4xl text-gray-800 font-semibold text-center my-4">
          Les Factures
        </h1>
        <div className="flex justify-end items-center my-4 w-3/4 mx-auto px-8">
          <button
            className="flex justify-center items-center space-x-2 bg-gray-800 text-white p-2 rounded-md text-sm font-semibold"
            onClick={() => setOpenAddFacture(true)}
          >
            <FaPlusCircle />
            <span>Nouveau Facture</span>
          </button>
        </div>
        <ListFactures
          openDelete={() => setOpenDeleteFacture(true)}
          openEdit={() => setOpenEditFacture(true)}
          getFactureToEdit={setFactureToEdit}
          getFactureToDelete={setFactureToDelete}
        />
      </div>
    </>
  );
}
