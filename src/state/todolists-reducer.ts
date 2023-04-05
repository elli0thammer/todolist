import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string,
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string,
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string,
    title: string,
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string,
    filter: FilterType,
}

type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType;

export let todolistsID1 = v1();
export let todolistsID2 = v1();

const initialState: TodolistType[] = [
    {id: todolistsID1, title: "What to lean", filter: "all"},
    {id: todolistsID2, title: "My favorite video games", filter: "all"},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId);
        }

        case 'ADD-TODOLIST': {
            let newTodolist: TodolistType = {
                id: action.todolistId, title: action.title, filter: "all"
            }

            return [newTodolist, ...state];
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1()}
}

export const changeTitleTodolistAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title: newTodolistTitle}
}

export const changeFilterTodolistAC = (todolistId: string, newFilter: FilterType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter: newFilter}
}
