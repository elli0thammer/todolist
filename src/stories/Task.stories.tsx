import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../old-files/Task";
import {action} from "@storybook/addon-actions";

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
        task: {idTask: '1', title: 'JS', isDone: true},
        idToDo: '11'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {
};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {idTask: '1', title: 'Redux Toolkit', isDone: false},
    },
};
