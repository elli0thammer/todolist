import React, {useCallback} from 'react';
import './App.css';
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
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskType, TodolistWithRedux} from "./TodolistWithRedux";

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
    console.log('Рендер Арр')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, TodolistStateType[]>(state => state.todolists )
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks )

    const addTodolist = useCallback( (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action)
    }, [dispatch] );

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

                            return <Grid item>
                                <Paper style={{padding: '15px'}} elevation={3}>
                                    <TodolistWithRedux
                                        todolist={tl}
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
