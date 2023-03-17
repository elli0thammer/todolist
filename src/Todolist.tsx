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
}

export function Todolist (props: TodolistTaskType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        setNewTaskTitle(target)
    }

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onRemoveHandler = (ID: string) => {
        props.removeTask(ID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return (
                            <li><input type="checkbox" checked={t.isDone} key={t.id}/>
                                <span>{t.title}</span>
                                <button onClick={()=>onRemoveHandler(t.id)}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}
