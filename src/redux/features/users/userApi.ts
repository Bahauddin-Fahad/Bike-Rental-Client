/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      providesTags: ["users"],
      query: (queryData) => {
        const params = queryData ? { ...queryData } : {};
        return {
          url: "/users",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
    updateUser: builder.mutation({
      query: (options) => {
        return {
          url: `/users/me`,
          method: "PUT",
          body: options,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserMutation } = userApi;
