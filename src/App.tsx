import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterType,
}

function App() {
    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistsID1, title: "What to lean", filter: "active"},
        {id: todolistsID2, title: "My favorite video games", filter: "all"},
    ])

    let [tasks, setTask] = useState({
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
        let task = tasks[todolistsID];

        let deleteTask = task.filter(t => t.idTask !== id);
        tasks[todolistsID] = deleteTask;
        return setTask({...tasks})
    }

    const addTask = (title: string, todolistsID: string) => {
        let newTask: TaskType = {idTask: v1(), title: title, isDone: false};
        let task = tasks[todolistsID];
        let taskObj = [newTask, ...task]
        tasks[todolistsID] = taskObj

        return setTask({...tasks})
    }

    const changeStatus = (taskID: string, isDone: boolean, todolistsID: string) => {
        let task = tasks[todolistsID];
        let newTask = task.find((t) => t.idTask === taskID)

        if (newTask) {
            newTask.isDone = isDone
            setTask({...tasks})
        }
    }

    const changeFilter = (value: FilterType, todolistID: string) => {
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

    return (
        <div className={"App"}>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                    }

                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                    }

                    return (
                        <Todolist tasks={tasksForTodolist}
                                  title={tl.title}
                                  removeTask={removeTask}
                                  addTask={addTask}
                                  changeFilter={changeFilter}
                                  changeStatus={changeStatus}
                                  filter={tl.filter}
                                  idToDo={tl.id}
                                  key={tl.id}
                                  removeTodolist={removeTodolist}/>
                    )
                })
            }
        </div>
    );
}

export default App;
