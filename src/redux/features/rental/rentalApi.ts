/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserRentals: builder.query({
      query: (queryObj) => {
        const params = new URLSearchParams();
        const { sort, page, limit, status } = queryObj || {};

        if (sort) {
          const sortValue = sort === "descending" ? "-price" : "price";
          params.append("sort", sortValue);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }
        if (status) {
          params.append("status", status);
        }

        return { url: "/rentals/my-rentals", method: "GET", params };
      },
      providesTags: ["bikes"],
    }),
    getAllRentals: builder.query({
      query: (queryObj) => {
        const params = new URLSearchParams();
        const { sort, page, limit } = queryObj || {};

        if (sort) {
          const sortValue = sort === "descending" ? "-price" : "price";
          params.append("sort", sortValue);
        }
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }

        return { url: "/rentals", method: "GET", params };
      },
      providesTags: ["bikes"],
    }),
    createRental: builder.mutation({
      query: (data) => {
        return {
          url: "/rentals",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["rentals", "bikes"],
    }),
    calculateTotalCost: builder.mutation({
      query: (options) => {
        return {
          url: `/rentals/${options.id}/calculate`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["rentals", "bikes"],
    }),
    payRentalCost: builder.mutation({
      query: (options) => {
        return {
          url: `/rentals/${options.id}/pay`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["rentals", "bikes"],
    }),
  }),
});

export const {
  useGetUserRentalsQuery,
  useGetAllRentalsQuery,
  useCreateRentalMutation,
  useCalculateTotalCostMutation,
  usePayRentalCostMutation,
} = bikeApi;
