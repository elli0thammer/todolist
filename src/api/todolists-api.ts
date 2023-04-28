import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "c3a89d42-24e4-45a3-9a62-84b636c18679"
    }
}

export const todolistsAPI = {
    getTodolists() {
        let promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },

    createTodolist(title: string) {
        let promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title}, settings)
        return promise
    },

    deleteTodolist(todolistId: string) {
        let promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },

    updateTodolistTitle(todolistId: string) {
        let promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title: "Hello, friend"}, settings)
        return promise
    },
}
