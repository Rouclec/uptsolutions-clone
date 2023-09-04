import { Command } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Interface } from "readline";

interface PrintState {
  commands: Command[] | null;
}
const initialState: PrintState = {
  commands: [],
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    addfile: (state, action: PayloadAction<Command>) => {
      state.commands?.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addfile } = fileSlice.actions;

export default fileSlice.reducer;
