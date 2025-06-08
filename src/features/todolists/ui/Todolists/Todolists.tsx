import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import {
  useGetTodolistsQuery,
  // useLazyGetTodolistsQuery
} from "@/features/todolists/api/todolistsApi.ts"

export const Todolists = () => {
  // в рамках rtk query это всё больше не нужно
  // const todolists = useAppSelector(selectTodolists)
  //
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  // query этот как видно возвращает объект, mutation вернул бы массив
  const {
    // если навести на data, будет тип DomainTodolist[], т.е. то что вернули в авпишке там в transformResponce
    data,
    isLoading,
    // refetch, // пример как в ручную запросисть данные после скажем того же обновления, а так тегами
  } = useGetTodolistsQuery()
  // если бы нам надо было передавать какую-нибудь id, просто передавали бы её: useGetTodolistsQuery('123').
  // config options есть ещё, например так: useGetTodolistsQuery('123', {skip: true}).

  // на примере ниже понятно что за isLoading
  // if (isLoading) {
  //   return <h1>Loading</h1>
  // }

  //кейс как получить тудулисты не сразу а по нажатию на кнопку:
  // 1 вариант, через опицональный аргумент skip
  // const [skip, setSkip] = useState(true)
  // ...
  // skip это параметр кофига, конфиг идёт вторым. если мы ничего не передаём,
  // то чтобы обозначть этот конфиг, первый параметр обозначаем через undefinded
  // } = useGetTodolistsQuery(undefined, { skip })
  // ...
  //<button onClick={() => setSkip(false)}>fetch todolists</button>
  // 2 вариант, через useLazyGetTodolistsQuery, экспортируется оттуда же откуда и useGetTodolistsQuery,
  // он возвращает массив, где первым параметром идёт тригер, а вторым параметром опять же те же data, isLoading и тд
  // const [trigger, { data }] = useLazyGetTodolistsQuery() // написать в принципе можно как угодно, Валера обычно называет trigger
  //...
  //<button onClick={() => trigger()}>fetch todolists</button>

  return (
    <>
      {/*<div>*/}
      {/*<button onClick={refetch}>Refetch todolists</button>*/}
      {/*</div>*/}
      {/*работая с rtk query, всегда будем ставить знак вопроса, т.к. там летит несколько запросов и первый всегда будет undefined.
      Услово в консоли выведи data и увидишь что их примерно четыре летит, так он работает под капотом ртк квери*/}
      {data?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
