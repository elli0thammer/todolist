import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "c3a89d42-24e4-45a3-9a62-84b636c18679"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)

        promise.then((res) => {
            return setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: "Hello, buddy"}, settings)

        promise.then((res) => {
            return setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let promise = axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/df9b647e-a4dd-4ef7-b8af-29e97ce9e6be", settings)

        promise.then((res) => {
            return setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let promise = axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/1fddbed3-7d30-4646-b171-4e52b1c12f52",
            {title: "Hello, friend"}, settings)

        promise.then((res) => {
            return setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
