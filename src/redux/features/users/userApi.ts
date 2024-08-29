/* eslint-disable @typescript-eslint/no-explicit-any */
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
    updateUserRole: builder.mutation({
      query: (options) => {
        return {
          url: `/users/${options.id}`,
          method: "PATCH",
          body: options.data,
        };
      },
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (options) => {
        console.log(options.data);

        return {
          url: `/users/${options.id}`,
          method: "DELETE",
          body: options.data,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
