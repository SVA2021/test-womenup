import {TodoListItem} from "../TodoListItem/TodoListItem.type"

export interface TodoListProps { 
    count: number
    data: TodoListItem[]
    onClick: (id: number) => void
}