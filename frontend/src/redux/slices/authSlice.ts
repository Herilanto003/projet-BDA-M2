import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { encrypt, decrypt } from "../../utils/cryptoUtilis";

interface AuthState {
  user: any | null;
  token: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(
    localStorage.getItem("user")
      ? decrypt(localStorage.getItem("user")!, "jigsaw")
      : "null"
  ),
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(
        "user",
        encrypt(JSON.stringify(action.payload.user), "jigsaw")
      );
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
