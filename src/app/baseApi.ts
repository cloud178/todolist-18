import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"

export const baseApi = createApi({
  //fetchBaseQuery - аналог axios, и, как и axios, это обёртка над нативным fetch-ом
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    // prepareHeaders - аналог интерсепторов
    prepareHeaders: (headers) => {
      headers.set("API-KEY", import.meta.env.VITE_API_KEY)
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  reducerPath: "todolistsApi",
  // теги нужны для автоматического рефетчинга после изменения данных
  tagTypes: ["Todolist", "Task"], // в массивах идут чтобы легко можно было расширять
  endpoints: () => ({}), // эта заглушка обязательна
})
