import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
        console.log("redux dispach")
      state.value = !state.value;
    },
    // decrement: state => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
  },
});

// Action creators are generated for each case reducer function
export const { open } = modalSlice.actions;

export default modalSlice.reducer;
