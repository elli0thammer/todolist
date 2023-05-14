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
    addTodolistAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {TaskType, TodolistType} from "./api/todolists-api";

/*export type TodolistStateType = {
    id: string,
    title: string,
    filter: FilterType,
}*/

export type TasksStateType = {
    [key: string]: TaskType[],
}

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists )

    const addTodolist = useCallback( (title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch]);

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

                            return <Grid item key={tl.id}>
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
