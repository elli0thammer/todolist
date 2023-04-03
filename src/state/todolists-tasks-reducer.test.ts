import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../App";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {idTask: '1', title: 'CSS', isDone: false},
            {idTask: '2', title: 'JS', isDone: true},
            {idTask: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {idTask: '1', title: 'bread', isDone: false},
            {idTask: '2', title: 'milk', isDone: true},
            {idTask: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

