/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query({
      query: (queryObj) => {
        const params = new URLSearchParams();
        const { searchTerm, sort, page, limit } = queryObj || {};

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (sort) {
          const sortValue = "createdAt";
          params.append("sort", sortValue);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return { url: "/coupons", method: "GET", params };
      },
      providesTags: ["coupons"],
    }),
    getSingleCoupon: builder.query({
      query: (code) => ({
        url: `/coupons/${code}`,
        method: "GET",
      }),
      providesTags: ["coupons"],
    }),
    addCoupon: builder.mutation({
      query: (data) => {
        return {
          url: "/coupons",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["coupons"],
    }),
    updateCoupon: builder.mutation({
      query: (options) => {
        return {
          url: `coupons/${options.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["coupons"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetSingleCouponQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
