export interface TodoListItemProps {
    item: TodoListItem
    onClick: () => void
 }

 export interface TodoListItem {
    id: number
    isChecked: boolean
    text: string
 }