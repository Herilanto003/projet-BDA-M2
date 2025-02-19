import * as yup from "yup";

export const schemaBetweenTwoDates = yup.object().shape({
  startDate: yup.date().required("La date de début est requis"),
  endDate: yup.date().required("La date de fin est requis"),
});

export type betweenTwoDates = yup.InferType<typeof schemaBetweenTwoDates>;
