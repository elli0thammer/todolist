import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {Task} from "./Task";
import {FilterType} from "./AppWithRedux";

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
    changeFilter: (todolistID: string, value: FilterType) => void,
    changeStatus: (taskID: string, isDone: boolean, todolistsID: string) => void,
    filter: FilterType,
    idToDo: string,
    removeTodolist: (todolistsID: string) => void,
    changeTaskTitle: (taskID: string, newTitle: string, todolistsID: string) => void,
    changeTodolistTitle: (newTitle: string, todolistsID: string) => void
}

export const Todolist = React.memo((props: TodolistTaskType) => {
    console.log('Рендер Туду')
    const onAllClickHandler = useCallback(() => props.changeFilter(props.idToDo,'all'), [props.changeFilter, props.idToDo]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.idToDo,'active'), [props.changeFilter, props.idToDo]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.idToDo,'completed'), [props.changeFilter, props.idToDo]);

    const removeTodolistHandler = useCallback( () => {
        props.removeTodolist(props.idToDo)
    }, [props.removeTodolist, props.idToDo]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.idToDo)
    }, [props.addTask, props.idToDo]);

    const changeTodolistHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.idToDo)
    }, [props.changeTodolistTitle, props.idToDo]);

    let tasksForTodolist = props.tasks;

    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
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
                    tasksForTodolist.map(t => <Task task={t} idToDo={props.idToDo}
                                               removeTask={props.removeTask}
                                               changeTaskTitle={props.changeTaskTitle}
                                               changeStatus={props.changeStatus}
                                               key={t.idTask}/>)
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
});


