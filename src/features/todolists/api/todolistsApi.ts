import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { baseApi } from "@/app/baseApi.ts"
import { instance } from "@/common/instance"

export const todolistsApi = baseApi.injectEndpoints({
  // тут раньше была часть логики общей, вынесли её в baseApi. Называется code spliting, и теперь будут чанки создаваться при бандле вроде как
  endpoints: (builder) => ({
    // query - просто получаем данные, не изменяем и не редактируем. и mutation (в более поздней версии библиотеки есть ещё и infinity).
    // про типизацию query<any, void>, здесь первый параметр, это то что возвращает нам сервак и запишется в локальный стейт (закэшируется)
    // !! Если у нас есть transformResponse и мы меняем данные, то надо ставить уже тип финальных данных.
    // В данном случае приходит с сервака данные типа Todolist[], но мы их мутируем и поэтому нужно писать тип DomainTodolist[].
    // Второй параметр, стоит void, это то что мы передаём, в данном случае у нас при get мы ничего не передаём
    getTodolists: builder.query<DomainTodolist[], void>({
      // может запутать что здесь два квери, но это разные квери.
      // Тот что ниже - надо уже воспринимать именно как запрос,
      // а сверху скорее действие какое, на получение или на изменение данных.
      // Опционально принимает аргументы, но т.к. у нас гет запрос, тут ничего не ждёт
      query: () => {
        return {
          method: "GET", // маленькими метод тоже можно писать. Также, метод гет в принципе можно не писать, т.к. он идёт по умолчанию
          url: "/todo-lists",
        }
      },
      // а можно в целом даже ещё проще сделать, при get (т.е. query) запросе согласно доке так написать
      // query: () => "/todo-lists",

      // transformResponse - для кастомизации ответа от сервака. Например, мы фетчим тудулисты,
      // и в слайсах в фулфилд добавляли тудулистам доп поля, там фильтр и энтитистатус,
      // так вот тут это делается этим синтаксисом
      transformResponse: (
        // todolists (первый аргумент, можем назвать как угодно) - то что вернул запрос (в данном случае массив тудулистов)
        todolists: Todolist[],
        // meta - какая-то мета инфа, пока не нужна нам
        // meta,
        // arg - это если бы приходили аргументы в сам запрос квери. В данном случае у нас гет запрос, так что ничего не приходит
        // arg,
        // в данном случае эти meta и arg могли бы удалить так как они нам не нужны, не используем их
      ): DomainTodolist[] => {
        // здесь обязательно дб return
        return todolists.map((tl) => {
          return { ...tl, filter: "all", entityStatus: "idle" }
        })
      },
      providesTags: ["Todolist"], // Теги providesTags и ниже можно в программе увидеть invalidatesTags, это для автоматического рефетчинга после изменения данных,
      // т.е. например у нас удалился тудулист через deleteTodolist, на нём есть invalidatesTags,
      // и поэтому автоматически запустится и getTodolists, так как на нём стоит providesTags
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          method: "post",
          url: "/todo-lists",
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          method: "delete",
          url: `/todo-lists/${id}`,
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return {
          method: "put",
          url: `/todo-lists/${id}`,
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  // useLazyGetTodolistsQuery
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

// старый синтаксис
export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
