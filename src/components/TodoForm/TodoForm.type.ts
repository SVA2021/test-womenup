import {TodoItem} from '../TodoListItem/TodoListItem.type'

export interface TodoFormProps {
    todo: TodoItem | null
    closeHandler: () => void
}