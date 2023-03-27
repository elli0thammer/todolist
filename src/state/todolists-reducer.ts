import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string,
    [key: string]: any,
}


export const todolistsReducer = (state: TodolistsType[], action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }

        case 'ADD-TODOLIST': {
            let newTodolist: TodolistsType = {
                id: v1(), title: action.title, filter: "all"
            }

            return [...state, newTodolist];
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);

            return todolist
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const newFilter = state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);

            return newFilter
        }

        default:
            return state
    }
}
