import {FilterType, TasksStateType, TodolistsType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string,
}

export type AddTodolistActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string,
}

type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType ;

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
            let task = stateCopy[action.todolistId];
            let taskObj = [newTask, ...task]
            stateCopy[action.todolistId] = taskObj

            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId}
}

export const addTaskAC = (newTitle: string, todolistId: string): AddTodolistActionType => {
    return {type: "ADD-TASK", title: newTitle, todolistId}
}
