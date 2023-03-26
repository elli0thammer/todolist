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

        case 'yyy': {
            return state
        }

        default: return state
    }
}
