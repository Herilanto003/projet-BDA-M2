import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const auditFactureApi = createApi({
  reducerPath: "auditFactureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/audit-factures",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAuditFactures: builder.query<any, void>({
      query: () => "/", // GET /api/audit-factures
    }),
    postAuditFacturesBetweenTwoDates: builder.mutation<any, any>({
      query: (dates) => ({
        url: "/between-two-dates",
        method: "POST",
        body: dates,
      }), // POST /api/audit-factures/between-two-dates
    }),
    getAuditFacturesTotalActions: builder.query<any, void>({
      query: () => "/total-actions",
    }),
  }),
});

export const {
  useGetAuditFacturesQuery,
  useGetAuditFacturesTotalActionsQuery,
  usePostAuditFacturesBetweenTwoDatesMutation,
} = auditFactureApi;
