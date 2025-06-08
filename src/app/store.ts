import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "@/app/baseApi.ts"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    // [authSlice.name]: authReducer, // больше не нужно т.к. переписали на rtk query
    // rtk query подключаем редьюсер
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // при работе с rtk query обязательно должны ещё добавить middleware. В доке параметр getDefaultMiddleware ещё можно встретить как просто gDM
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  // если надо добавить ещё middleware, ставим запятую и пишем например taskApi.middleware:
  //...concat(todolistsApi.middleware, taskApi.middleware)
})

// что это такое разберём на последнем занятии 5-го спринта
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
