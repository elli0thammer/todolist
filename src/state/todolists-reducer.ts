import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string,
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType,
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

export type setTodolistActionType = {
    type: 'SET-TODOLIST',
    todolists: TodolistType[],
}

type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    setTodolistActionType;

export type FilterType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId);
        }

        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state];
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
        }

        case 'SET-TODOLIST': {
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const changeTitleTodolistAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title: newTodolistTitle}
}

export const changeFilterTodolistAC = (todolistId: string, newFilter: FilterType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter: newFilter}
}

export const setTodolistAC = (todolists: TodolistType[]): setTodolistActionType => {
    return {type: 'SET-TODOLIST', todolists}
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                console.log(res.data)
                dispatch(setTodolistAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTitleTodolistAC(todolistId, title))
            })
    }
}

/*
O Allah, bless my efforts in making API requests, and grant me success in obtaining the desired results.
Guide me towards accuracy, efficiency, and reliability in my interactions with the API.
Illuminate my path and remove any obstacles that may hinder my progress.
O Allah, accept my sincere efforts and help me achieve my goals.
Amen.
*/
