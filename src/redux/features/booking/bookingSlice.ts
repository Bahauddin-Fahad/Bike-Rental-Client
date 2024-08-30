import { createSlice } from "@reduxjs/toolkit";

type TCouponState = {
  code: null | string;
  discount: null | number;
};

const initialState: TCouponState = {
  code: null,
  discount: null,
};

const bookingSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon: (state, action) => {
      const { code, discount } = action.payload;
      state.code = code;
      state.discount = discount;
    },
  },
});

export const { setCoupon } = bookingSlice.actions;

export default bookingSlice.reducer;
