import { EditableSpan } from "@/common/components"
// import { useAppDispatch } from "@/common/hooks"
import {
  // changeTodolistTitleTC,
  // deleteTodolistTC,
  type DomainTodolist,
} from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  // changeTodolistTitleMutation, т.е. то что деструктуризацией достаём, это промис, и можно будет подписаться через then
  const [changeTodolistTitleMutation] = useChangeTodolistTitleMutation()

  // const dispatch = useAppDispatch()

  const [deleteTodolistMutation] = useDeleteTodolistMutation()

  const deleteTodolist = () => {
    // dispatch(deleteTodolistTC(id))
    deleteTodolistMutation(id)
  }

  const changeTodolistTitle = (title: string) => {
    // dispatch(changeTodolistTitleTC({ id, title }))
    changeTodolistTitleMutation({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
