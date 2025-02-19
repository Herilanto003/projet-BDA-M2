import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { factureApi } from "./services/factureApi";
import { auditFactureApi } from "./services/auditFactureApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [factureApi.reducerPath]: factureApi.reducer,
    [auditFactureApi.reducerPath]: auditFactureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      factureApi.middleware,
      auditFactureApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
