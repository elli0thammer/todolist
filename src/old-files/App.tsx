import React, {useState} from 'react';
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
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterType, TodolistDomainType} from "../state/todolists-reducer";

/*export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType,
}*/

export type TasksStateType = {
    [key: string]: TaskType[],
}

function App() {
    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, setTodolists] = useState<TodolistDomainType[]>([
        {id: todolistsID1, title: "What to lean", filter: "all", addedDate: '', order: 0},
        {id: todolistsID2, title: "My favorite video games", filter: "all", addedDate: '', order: 0},
    ])

    let [tasks, setTask] = useState<TasksStateType>({
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
        let task = tasks[todolistsID];

        let deleteTask = task.filter(t => t.id !== id);
        tasks[todolistsID] = deleteTask;
        return setTask({...tasks})
    }

    const addTask = (title: string, todolistsID: string) => {
        let newTask: TaskType = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistsID, startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''};
        let task = tasks[todolistsID];
        let taskObj = [newTask, ...task]
        tasks[todolistsID] = taskObj

        return setTask({...tasks})
    }

    const changeStatus = (taskID: string, status: TaskStatuses, todolistsID: string) => {
        let task = tasks[todolistsID];
        let newTask = task.find((t) => t.id === taskID)

        if (newTask) {
            newTask.status = status
            setTask({...tasks})
        }
    }

    const changeFilter = (todolistID: string, value: FilterType) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistsID: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistsID);
        setTodolists(filteredTodolist);

        delete tasks[todolistsID]
        setTask({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolist: TodolistDomainType = {
            id: v1(), title, filter: "all",  addedDate: '', order: 0
        }

        setTodolists([newTodolist, ...todolists])
        setTask({...tasks, [newTodolist.id]: []})
    }

    const changeTaskTitle = (taskID: string, newTitle: string, todolistsID: string) => {
        let task = tasks[todolistsID];
        let newTask = task.find((t) => t.id === taskID)

        if (newTask) {
            newTask.title = newTitle
            setTask({...tasks})
        }
    }

    const changeTodolistTitle = (newTitle: string, todolistsID: string) => {
        const todolist = todolists.find(tl => tl.id === todolistsID);

        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
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
                                tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                            }

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                            }

                            return <Grid item>
                                <Paper style={{padding: '15px'}} elevation={3}>
                                    <Todolist tasks={tasksForTodolist}
                                              title={tl.title}
                                              removeTask={removeTask}
                                              addTask={addTask}
                                              changeFilter={changeFilter}
                                              changeStatus={changeStatus}
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

export default App;
