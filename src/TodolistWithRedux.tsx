import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodolistType} from "./AppWithReducers";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {TaskWithRedux} from "./TaskWithRedux";
import {addTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    idTask: string,
    title: string,
    isDone: boolean,
}

type TodolistTaskType = {
    todolist: TodolistType
}

export const TodolistWithRedux = React.memo(({todolist}: TodolistTaskType) => {
    //деструктуризация тудулиста. приходит весь туду
    const {id, title, filter} = todolist

    //обращаемся к нужным таскам по ключу тудулиста - state.tasks[id]
    let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[id])

    let dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => dispatch(changeFilterTodolistAC(id, 'all')), [dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeFilterTodolistAC(id, 'active')), [dispatch]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeFilterTodolistAC(id, 'completed')), [dispatch]);

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch]);

    const changeTodolistHandler = useCallback((newTitle: string) => {
        dispatch(changeTitleTodolistAC(id, newTitle))
    }, [dispatch]);

    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }

    return (
        <div>
            <h3 style={{margin: '0px'}}>
                <EditableSpan title={title} onChangeAdd={changeTodolistHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul className={"todolist__list"}>
                {
                    tasks.map(t => <TaskWithRedux task={t} idToDo={id}
                                                  key={t.idTask}/>)
                }
            </ul>
            <div>
                <Grid container spacing={1}>
                    <Grid item>
                        <Button size={"small"} variant={filter === 'all' ? 'text' : 'contained'}
                                color={'primary'}
                                onClick={onAllClickHandler}>All</Button>
                    </Grid>
                    <Grid item>
                        <Button size={"small"} variant={filter === 'active' ? 'text' : 'contained'}
                                color={'secondary'}
                                onClick={onActiveClickHandler}>Active
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button size={"small"} variant={filter === 'completed' ? 'text' : 'contained'}
                                color={'success'}
                                onClick={onCompletedClickHandler}>Completed
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
});


