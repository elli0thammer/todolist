import React, {useReducer} from 'react';
import '../App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm";

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
    changeTitleTodolistAC, FilterType,
    removeTodolistAC,
    todolistsReducer
} from "../state/todolists-reducer";
import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    updateTaskAC
} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

/*export type FilterType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType,
}*/

export type TasksStateType = {
    [key: string]: TaskType[],
}

function AppWithReducers() {
    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistsID1, title: "What to lean", filter: "all", addedDate: '', order: 0},
        {id: todolistsID2, title: "My favorite video games", filter: "all", addedDate: '', order: 0},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistsID1]: [
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistsID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId: todolistsID1, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ],
        [todolistsID2]: [
            {id: v1(), title: "DMC", status: TaskStatuses.Completed, todoListId: todolistsID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "Genshin Impact", status: TaskStatuses.New, todoListId: todolistsID2, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ],
    })

    const removeTask = (id: string, todolistsID: string) => {
        const action = removeTaskAC(id, todolistsID);
        dispatchToTasksReducer(action);
    }

    const addTask = (title: string, todolistsID: string) => {
        const action = addTaskAC({id: '1', title: title, status: TaskStatuses.New, todoListId: todolistsID, startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''});
        dispatchToTasksReducer(action);
    }

    const changeStatusTask = (taskID: string, status: TaskStatuses, todolistsID: string) => {
        const action = updateTaskAC(taskID, {status}, todolistsID);
        dispatchToTasksReducer(action);
    }

    const changeTaskTitle = (taskID: string, newTitle: string, todolistsID: string) => {
        const action = updateTaskAC(taskID, {title: newTitle}, todolistsID);
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
        const action = addTodolistAC({id: v1(),addedDate: '', order: 0, title});
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
                                tasksForTodolist = tasks[tl.id].filter(t => t.status)
                            }

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.status)
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
