import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    // getAllUsers: builder.query({
    //   query: (queryData) => {
    //     const params = queryData ? { ...queryData } : {};

    //     return {
    //       url: "/auth/users",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   transformResponse: (response: TResponseRedux<any>) => response.data,
    // }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
