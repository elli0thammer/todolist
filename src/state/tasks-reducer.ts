import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string,
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string,
}

export type changeTaskStatusACType = {
    type: 'CHANGE-TASK',
    taskId: string,
    isDone: boolean,
    todolistId: string,
}

export type changeTaskTitleACType = {
    type: 'TITLE-TASK',
    taskID: string,
    title: string,
    todolistId: string,
}

type ActionsType = RemoveTaskActionType |
    AddTaskActionType | changeTaskStatusACType | changeTaskTitleACType | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}

            let task = stateCopy[action.todolistId];
            let filteredTasks = task.filter(t => t.idTask !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;

            return stateCopy
        }

        case 'ADD-TASK': {
            let newTask: TaskType = {idTask: v1(), title: action.title, isDone: false};

            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks

            return stateCopy
        }

        case "CHANGE-TASK": {
            const stateCopy = {...state}
            const newTasks = stateCopy[action.todolistId]
            const newDone = newTasks.map(t => t.idTask === action.taskId ? {...t, isDone: action.isDone} : t);
            stateCopy[action.todolistId] = newDone

            return stateCopy
        }

        case "TITLE-TASK": {
            const stateCopy = {...state}
            const newTasks = stateCopy[action.todolistId]
            const newTitle = newTasks.map(t => t.idTask === action.taskID ? {...t, title: action.title} : t);
            stateCopy[action.todolistId] = newTitle

            return stateCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []

            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]

            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId}
}

export const addTaskAC = (newTitle: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title: newTitle, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'TITLE-TASK', taskID, title, todolistId}
}
