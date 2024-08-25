/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from "../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: (queryObj) => {
        const params = new URLSearchParams();
        const { searchTerm, sort, page, limit } = queryObj || {};

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

        return { url: "/bikes", method: "GET", params };
      },
      providesTags: ["bikes"],
    }),
  }),
});

export const { useGetBikesQuery } = bikeApi;
