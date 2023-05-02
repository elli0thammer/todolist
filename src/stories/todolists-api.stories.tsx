import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

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
        todolistsAPI.getTodolists()
            .then((res) => {
                return setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("Hello!").then((res) => {
            return setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'df9b647e-a4dd-4ef7-b8af-29e97ce9e6be'

        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            return setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'df9b647e-a4dd-4ef7-b8af-29e97ce9e6be'

        todolistsAPI.updateTodolistTitle(todolistId).then((res) => {
            return setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '5189f01f-d9a0-4f29-8949-51c9ee43f78f'

        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                return setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '7d0f5dec-5ef8-472c-b1d2-c12b376450de'
        const taskId = ''

        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                return setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
