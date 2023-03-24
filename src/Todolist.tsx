import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    removeTodolist: (todolistsID: string) => void,
    changeTaskTitle: (taskID: string, newTitle: string, todolistsID: string) => void,
    changeTodolistTitle: (newTitle: string, todolistsID: string) => void
}

export function Todolist(props: TodolistTaskType) {
    const onRemoveHandler = (ID: string) => {
        props.removeTask(ID, props.idToDo)
    }

    const onChangeCheckboxHandler = (ID: string, e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(ID, newIsDoneValue, props.idToDo)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.idToDo)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.idToDo)
    }

    const changeTodolistHandler = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.idToDo)
    }

    return (
        <div>
            <EditableSpan title={props.title} onChangeAdd={changeTodolistHandler}/>
                <button onClick={removeTodolistHandler}>x</button>

            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.idTask, newValue, props.idToDo);
                        };


                        return (
                            <li key={t.idTask} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={t.isDone}
                                       onChange={(e) => onChangeCheckboxHandler(t.idTask, e)}/>
                                <EditableSpan title={t.title} onChangeAdd={onChangeTitleHandler}/>
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
