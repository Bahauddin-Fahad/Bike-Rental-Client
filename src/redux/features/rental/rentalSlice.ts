import { createSlice } from "@reduxjs/toolkit";

type TCouponState = {
  code: null | string;
  discount: null | number;
};

const initialState: TCouponState = {
  code: null,
  discount: null,
};

const rentalSlice = createSlice({
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

export const { setCoupon } = rentalSlice.actions;

export default rentalSlice.reducer;
