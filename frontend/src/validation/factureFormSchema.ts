import * as yup from "yup";

export const schemaFactureForm = yup.object().shape({
  factureNumber: yup.string().required("Le numéro de facture est obligatoire"),
  name: yup.string().required("Le nom de la facture est obligatoire"),
  date: yup.string().required("La date de facture est obligatoire"),
  amount: yup.number().required("Le montant est obligatoire"),
});

export type FactureFormValues = yup.InferType<typeof schemaFactureForm>;
