import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userData: User | null;
  paymentPhoneNumber: string;
}

const initialState: UserState = {
  userData: null,
  paymentPhoneNumber: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },

    logOutUser: (state) => {
      state.userData = null;
    },
    changePaymentPhoneNumber: (state, action: PayloadAction<String>) => {
      //   state.paymentPhoneNumber = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;

export default userSlice.reducer;
