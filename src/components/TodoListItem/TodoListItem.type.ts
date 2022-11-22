export interface TodoListItemProps {
   item: TodoItem
   checkHandler: () => void
   editHandler: () => void
   deleteHandler: () => void
}

export type TimeStamp = {
   seconds: number
   nanoseconds: number
}
export interface TodoItem {
   id: string
   title: string
   description: string
   expired: string
   filePath: string | null
   isChecked: boolean
}