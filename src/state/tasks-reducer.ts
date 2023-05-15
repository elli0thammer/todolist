import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistActionType,
    todolistsID1,
    todolistsID2
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";

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

export type setTaskACType = {
    type: 'SET-TASKS',
    tasks: TaskType[],
    todolistId: string,
}

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    changeTaskStatusACType |
    changeTaskTitleACType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    setTodolistActionType |
    setTaskACType;

export const initialState: TasksStateType = {}

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

        case "SET-TODOLIST": {
            const stateCopy = {...state}

            action.todolists.forEach(tl => {
                stateCopy[tl.id] = [];
            })

            return stateCopy
        }

        case "SET-TASKS": {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = action.tasks

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

export const setTasksAC = (tasks: TaskType[], todolistId: string): setTaskACType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
