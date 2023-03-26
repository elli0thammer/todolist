import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Grid} from "@mui/material";

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
    const onAllClickHandler = () => props.changeFilter('all', props.idToDo);
    const onActiveClickHandler = () => props.changeFilter('active', props.idToDo);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.idToDo);

    const onRemoveHandler = (ID: string) => {
        props.removeTask(ID, props.idToDo)
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
            <h3 style={{margin: '0px'}}>
                <EditableSpan title={props.title} onChangeAdd={changeTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul className={"todolist__list"}>
                {
                    props.tasks.map(t => {
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.idTask, newIsDoneValue, props.idToDo)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.idTask, newValue, props.idToDo);
                        };


                        return (
                            <li key={t.idTask} className={t.isDone ? "is-done" : ""}>
                                <Checkbox checked={t.isDone}
                                          onChange={onChangeCheckboxHandler}
                                          icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
                                <EditableSpan title={t.title} onChangeAdd={onChangeTitleHandler}/>

                                <IconButton aria-label="delete" onClick={() => onRemoveHandler(t.idTask)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button size={"small"} variant={props.filter === 'all' ? 'text' : 'contained'}
                                color={'primary'}
                                onClick={onAllClickHandler}>All</Button>
                    </Grid>
                    <Grid item>
                        <Button size={"small"} variant={props.filter === 'active' ? 'text' : 'contained'}
                                color={'secondary'}
                                onClick={onActiveClickHandler}>Active
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button size={"small"} variant={props.filter === 'completed' ? 'text' : 'contained'}
                                color={'success'}
                                onClick={onCompletedClickHandler}>Completed
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
