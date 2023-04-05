import React, {useReducer} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterType = "all" | "active" | "completed";

export type TodolistStateType = {
    id: string,
    title: string,
    filter: FilterType,
}

export type TasksStateType = {
    [key: string]: TaskType[],
}

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, TodolistStateType[]>(state => state.todolists )
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks )

    const removeTask = (id: string, todolistsID: string) => {
        const action = removeTaskAC(id, todolistsID);
        dispatch(action);
    }

    const addTask = (title: string, todolistsID: string) => {
        const action = addTaskAC(title, todolistsID);
        dispatch(action);
    }

    const changeStatusTask = (taskID: string, isDone: boolean, todolistsID: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todolistsID);
        dispatch(action);
    }

    const changeTaskTitle = (taskID: string, newTitle: string, todolistsID: string) => {
        const action = changeTaskTitleAC(taskID, newTitle, todolistsID);
        dispatch(action);
    }

    const changeFilterTodolist = (newFilter: FilterType, todolistID: string) => {
        const action = changeFilterTodolistAC(todolistID, newFilter)
        dispatch(action);
    }

    const removeTodolist = (todolistsID: string) => {
        const action = removeTodolistAC(todolistsID);
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action)
    }

    const changeTodolistTitle = (newTitle: string, todolistsID: string) => {
        const action = changeTitleTodolistAC(todolistsID, newTitle);
        dispatch(action)
    }

    return (
        <div className={"App"}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container style={{padding: '15px'}} spacing={5}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                            }

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding: '15px'}} elevation={3}>
                                    <Todolist
                                        tasks={tasksForTodolist}
                                        title={tl.title}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilterTodolist}
                                        changeStatus={changeStatusTask}
                                        filter={tl.filter}
                                        idToDo={tl.id}
                                        key={tl.id}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
