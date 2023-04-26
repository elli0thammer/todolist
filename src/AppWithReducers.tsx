import React, {useReducer, useState} from 'react';
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
import {useDispatch} from "react-redux";

export type FilterType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType,
}

export type TasksStateType = {
    [key: string]: TaskType[],
}

function AppWithReducers() {
    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistsID1, title: "What to lean", filter: "all"},
        {id: todolistsID2, title: "My favorite video games", filter: "all"},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistsID1]: [
            {idTask: v1(), title: "HTML&CSS", isDone: true},
            {idTask: v1(), title: "JS", isDone: true},
            {idTask: v1(), title: "ReactJS", isDone: false},
            {idTask: v1(), title: "Rest API", isDone: false},
            {idTask: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistsID2]: [
            {idTask: v1(), title: "DMC", isDone: true},
            {idTask: v1(), title: "Borderlands", isDone: true},
            {idTask: v1(), title: "Genshin Impact", isDone: false},
        ],
    })

    const removeTask = (id: string, todolistsID: string) => {
        const action = removeTaskAC(id, todolistsID);
        dispatchToTasksReducer(action);
    }

    const addTask = (title: string, todolistsID: string) => {
        const action = addTaskAC(title, todolistsID);
        dispatchToTasksReducer(action);
    }

    const changeStatusTask = (taskID: string, isDone: boolean, todolistsID: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todolistsID);
        dispatchToTasksReducer(action);
    }

    const changeTaskTitle = (taskID: string, newTitle: string, todolistsID: string) => {
        const action = changeTaskTitleAC(taskID, newTitle, todolistsID);
        dispatchToTasksReducer(action);
    }

    const changeFilterTodolist = (todolistID: string, newFilter: FilterType) => {
        const action = changeFilterTodolistAC(todolistID, newFilter)
        dispatchToTodolistsReducer(action);
    }

    const removeTodolist = (todolistsID: string) => {
        const action = removeTodolistAC(todolistsID);
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeTodolistTitle = (newTitle: string, todolistsID: string) => {
        const action = changeTitleTodolistAC(todolistsID, newTitle);
        dispatchToTodolistsReducer(action)
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

export default AppWithReducers;