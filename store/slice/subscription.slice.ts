import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SubscriptionType = {
  details: any;
  isSubscribed: boolean;
};

const initialState: SubscriptionType = {
  details: null,
  isSubscribed: false,
};

export const subcriptionSlice = createSlice({
  name: "subcription",
  initialState,
  reducers: {
    isSubscribed: (state, action: PayloadAction<SubscriptionType>) => {
      state.details = action.payload;
      state.isSubscribed = true;
    },
    notSubscribed: (state) => {
      state.details = null;
      state.isSubscribed = false;
    },
  },
});

export const { isSubscribed, notSubscribed } = subcriptionSlice.actions;
export default subcriptionSlice.reducer;
