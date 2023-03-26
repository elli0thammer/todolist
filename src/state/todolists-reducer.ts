import {TodolistsType} from "../App";

type ActionType = {
    type: string,
    [key: string]: any,
}


export const todolistsReducer = (state: TodolistsType[], action: ActionType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }

        case 'xxx': {
            return state
        }

        case 'yyy': {
            return state
        }

        default: return state
    }
}
