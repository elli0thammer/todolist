import React, {useState} from 'react';
import './App.css';
import {Todolist, TodolistType} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"

function App() {
    let [filter, setFilter] = useState<FilterType>("all")

    let [tasks, setTask] = useState<TodolistType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    let tasksForTodolist = tasks;

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    const removeTask = (id: string) => {
        let deleteTask = tasks.filter(t => t.id !== id)
        return setTask(deleteTask)
    }

    const addTask = (title: string) => {
        let newTask: TodolistType = {id: v1(), title: title, isDone: false};
        return setTask([newTask, ...tasks])
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    return (
        <div className={"App"}>
            <Todolist tasks={tasksForTodolist}
                      title={"What to lean"}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
