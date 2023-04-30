import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "c3a89d42-24e4-45a3-9a62-84b636c18679"
    }
}

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type TodolistResponseType<D> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: D
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}

export type TasksResponseType = {
    totalCount: number,
    error: string | null,
    items: TaskType[]
}

export const todolistsAPI = {
    getTodolists() {
        let promise = axios.get<TodolistType[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },

    createTodolist(title: string) {
        let promise = axios.post<TodolistResponseType<{item: TodolistType}>>("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title}, settings)
        return promise
    },

    deleteTodolist(todolistId: string) {
        let promise = axios.delete<TodolistResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },

    updateTodolistTitle(todolistId: string) {
        let promise = axios.put<TodolistResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title: "Hello, friend"}, settings)
        return promise
    },

    getTasks(todolistId: string) {
        let promise = axios.get<TasksResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
        return promise
    },
}
