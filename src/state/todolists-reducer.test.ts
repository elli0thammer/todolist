import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, FilterType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {TodolistType} from "../api/todolists-api";

let todolistId1: string;
let todolistId2: string;

let startState: TodolistDomainType[];

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'
    const newTodolist: TodolistType = ({id: 'todolistId1', title: newTodolistTitle, addedDate: '', order: 0})

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = changeTitleTodolistAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = 'completed'

    const action = changeFilterTodolistAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {
    const action = setTodolistAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})


