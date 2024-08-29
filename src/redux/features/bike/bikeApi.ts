/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: (queryObj) => {
        const params = new URLSearchParams();
        const { searchTerm, sort, page, limit, brand, isAvailable } =
          queryObj || {};

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
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
        if (brand) {
          params.append("brand", brand);
        }
        if (isAvailable) {
          params.append("isAvailable", isAvailable);
        }
        return { url: "/bikes", method: "GET", params };
      },
      providesTags: ["bikes"],
    }),
    getSingleBike: builder.query({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
      providesTags: ["bikes"],
    }),
    addBike: builder.mutation({
      query: (data) => {
        return {
          url: "/bikes",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["bookings", "bikes"],
    }),
    updateBike: builder.mutation({
      query: (options) => ({
        url: `/bikes/${options.id}`,
        method: "PUT",
        body: options.data,
      }),
      invalidatesTags: ["bikes"],
    }),
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bikes"],
    }),
  }),
});

export const {
  useGetBikesQuery,
  useGetSingleBikeQuery,
  useAddBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
} = bikeApi;
