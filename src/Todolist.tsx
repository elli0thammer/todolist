import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

export type TaskType = {
    idTask: string,
    title: string,
    isDone: boolean,
}

type TodolistTaskType = {
    tasks: TaskType[],
    title: string,
    removeTask: (id: string, todolistsID: string) => void,
    addTask: (title: string, todolistsID: string) => void,
    changeFilter: (value: FilterType, todolistID: string) => void,
    changeStatus: (taskID: string, isDone: boolean, todolistsID: string) => void,
    filter: FilterType,
    idToDo: string,
    removeTodolist: (todolistsID: string) => void
}

export function Todolist(props: TodolistTaskType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        setNewTaskTitle(target)
    }

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            return setError(true)
        }

        props.addTask(newTaskTitle.trim(), props.idToDo)
        setNewTaskTitle("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onRemoveHandler = (ID: string) => {
        props.removeTask(ID, props.idToDo)
    }

    const onChangeCheckboxHandler = (ID: string, e: ChangeEvent<HTMLInputElement>) => {
        let current = e.currentTarget.checked
        props.changeStatus(ID, current, props.idToDo)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.idToDo)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolistHandler}>x</button></h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>Field is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return (
                            <li key={t.idTask} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={t.isDone}
                                       onChange={(e) => onChangeCheckboxHandler(t.idTask, e)}/>
                                <span>{t.title}</span>
                                <button onClick={() => onRemoveHandler(t.idTask)}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("all", props.idToDo)}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("active", props.idToDo)}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("completed", props.idToDo)}>Completed
                </button>
            </div>
        </div>
    )
}
