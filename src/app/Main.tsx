// import { useAppDispatch } from "@/common/hooks"
// import { createTodolistTC } from "@/features/todolists/model/todolists-slice"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { useCreateTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

export const Main = () => {
  // const dispatch = useAppDispatch()

  // тут опять-таки, можно назвать тригер, можно createTodolist или createTodolistMutation чтобы не было конфликта в пересечении имён,
  // и вторым параметром опционально если нужны данные там data, isLoading, isError и тд
  const [createTodolistMutation] = useCreateTodolistMutation() // опционально можно передать какой-нибудь кофиг,
  // как делали в том запросе в на фетч тудулист когда передавали skip, но конкретно у mutation вроде skip нет
  const createTodolist = (title: string) => {
    // dispatch(createTodolistTC(title))
    createTodolistMutation(title)
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
