import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from './tasks-reducer'
import {addTodolistAC, setTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TodolistType} from "../api/todolists-api";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({id: '1', title: 'juce', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '',
        deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const action = updateTaskAC('2', {title: 'wine'}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('wine')
})

test('new array should be added when new todolist is added', () => {
    const newTodolist: TodolistType = ({id: 'todolistId1', title: 'juce', addedDate: '', order: 0})
    const action = addTodolistAC(newTodolist)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistAC([
        {id: "1", title: "title 1", addedDate: '', order: 0},
        {id: "2", title: "title 1", addedDate: '', order: 0}
    ])

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({'todolistId1':[],'todolistId2':[]}, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)

})
