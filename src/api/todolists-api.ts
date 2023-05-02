import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "c3a89d42-24e4-45a3-9a62-84b636c18679"
    }
}

const instance = axios.create({
        baseURL: "https://social-network.samuraijs.com/api/1.1/",
        ...settings,
    }
)

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: D
}

export type TaskType = {
    description: string,
    title: string,
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
        return instance.get<TodolistType[]>("todo-lists")
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: "Hello, friend"})
    },

    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
