import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const factureApi = createApi({
  reducerPath: "factureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/factures",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFactures: builder.query<any, void>({
      query: () => "/", // GET /api/factures
    }),
    getFactureById: builder.query<any, string>({
      query: (id) => `/${id}`, // GET /api/factures/:id
    }),
    createFacture: builder.mutation<any, any>({
      query: (facture) => ({
        url: "/",
        method: "POST",
        body: facture,
      }),
      invalidatesTags: [{ type: "Factures", id: "LIST" }],
    }),
    updateFacture: builder.mutation<any, any>({
      query: (facture) => ({
        url: `/${facture.factureNumber}`,
        method: "PUT",
        body: facture,
      }),
      invalidatesTags: [{ type: "Factures", id: "LIST" }],
    }),
    deleteFacture: builder.mutation<any, string>({
      query: (factureNumber) => ({
        url: `/${factureNumber}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Factures", id: "LIST" }],
    }),
  }),
  tagTypes: ["Factures"],
});

export const {
  useGetFacturesQuery,
  useGetFactureByIdQuery,
  useCreateFactureMutation,
  useUpdateFactureMutation,
  useDeleteFactureMutation,
} = factureApi;
