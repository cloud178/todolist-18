import type { BaseResponse } from "@/common/types"
import type { LoginArgs } from "./authApi.types"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
        query: (body) => ({ method: "post", url: "auth/login", body }),
      }),
      logout: builder.mutation<BaseResponse, void>({
        query: () => ({ method: "delete", url: "auth/login" }),
      }),
      me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
        query: () => "auth/me",
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi

// старый синтаксис
// export const _authApi = {
//   login(payload: LoginArgs) {
//     return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
//   },
//   logout() {
//     return instance.delete<BaseResponse>("auth/login")
//   },
//   me() {
//     return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
//   },
// }
