/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbookings: builder.query({
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
    createBooking: builder.mutation({
      query: (data) => {
        return {
          url: "/rentals",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["bookings", "bikes"],
    }),
  }),
});

export const { useGetAllbookingsQuery, useCreateBookingMutation } = bikeApi;
