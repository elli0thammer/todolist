import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistsID1, todolistsID2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

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
    status: TaskStatuses,
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

const initialState: TasksStateType = {
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
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}

            let task = stateCopy[action.todolistId];
            let filteredTasks = task.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;

            return stateCopy
        }

        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New,
                todoListId: action.todolistId, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''};

            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks

            return stateCopy
        }

        case "CHANGE-TASK": {
            const stateCopy = {...state}
            const newTasks = stateCopy[action.todolistId]
            const newDone = newTasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t);
            stateCopy[action.todolistId] = newDone

            return stateCopy
        }

        case "TITLE-TASK": {
            const stateCopy = {...state}
            const newTasks = stateCopy[action.todolistId]
            const newTitle = newTasks.map(t => t.id === action.taskID ? {...t, title: action.title} : t);
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

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK', taskId, status, todolistId}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'TITLE-TASK', taskID, title, todolistId}
}
