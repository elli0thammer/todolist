import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistActionType,} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string,
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType,
}

export type changeTaskStatusACType = {
    type: 'CHANGE-TASK',
    taskId: string,
    model: UpdateDomainTaskModelType,
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
            let newTask: TaskType = action.task;

            const stateCopy = {...state}
            let tasks = stateCopy[newTask.todoListId];
            let newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks

            return stateCopy
        }

        case "CHANGE-TASK": {
            const stateCopy = {...state}
            const newTasks = stateCopy[action.todolistId]
            const newDone = newTasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            stateCopy[action.todolistId] = newDone

            return stateCopy
        }

/*        case "TITLE-TASK": {
            const stateCopy = {...state}
            const newTasks = stateCopy[action.todolistId]
            const newTitle = newTasks.map(t => t.id === action.taskID ? {...t, title: action.title} : t);
            stateCopy[action.todolistId] = newTitle

            return stateCopy
        }*/

        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []

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

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK', taskId, model, todolistId}
}

/*export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'TITLE-TASK', taskID, title, todolistId}
}*/

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

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    description?: string,
    title?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}

export const changeTaskTC = (idTask: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === idTask)

        if (!task) {
            console.warn("task not found in the state")
            return
        }

        const apiModel: UpdateTaskModelType = {
            description: task.description,
            status: task.status,
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, idTask, apiModel)
            .then(res => {
                dispatch(updateTaskAC(idTask, domainModel, todolistId))
            })
    }
}
