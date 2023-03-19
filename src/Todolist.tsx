import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

export type TodolistType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodolistTaskType = {
    tasks: TodolistType[],
    title: string,
    removeTask: (id: string) => void,
    addTask: (title: string) => void,
    changeFilter: (value: FilterType) => void,
    changeStatus: (taskID: string, isDone: boolean) => void,
    filter: FilterType,
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

        props.addTask(newTaskTitle.trim())
        setNewTaskTitle("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onRemoveHandler = (ID: string) => {
        props.removeTask(ID)
    }

    const onChangeCheckboxHandler = (ID: string, e: ChangeEvent<HTMLInputElement>) => {
        let current = e.currentTarget.checked
        props.changeStatus(ID, current)
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={t.isDone}
                                       onChange={(e) => onChangeCheckboxHandler(t.id, e)}/>
                                <span>{t.title}</span>
                                <button onClick={() => onRemoveHandler(t.id)}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("all")}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("active")}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={() => props.changeFilter("completed")}>Completed
                </button>
            </div>
        </div>
    )
}
