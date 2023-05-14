import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../old-files/Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: {
        changeStatus: {
            description: 'changed task status',
        },
        changeTaskTitle: {
            description: 'changed task title',
        },
        removeTask: {
            description: 'removed task',
        },
    },
    args: {
        changeStatus: action('changed task status'),
        changeTaskTitle: action('changed task title'),
        removeTask: action('removed task'),
        task: {id: '1', title: 'JS', status: TaskStatuses.Completed,  todoListId: '11', startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        idToDo: '11'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {
};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '1', title: 'Redux Toolkit', status: TaskStatuses.New,  todoListId: '11', startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
    },
};
