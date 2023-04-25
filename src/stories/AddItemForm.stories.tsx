import {AddItemForm, AddItemFormType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Meta, StoryObj} from "@storybook/react";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const meta: Meta<typeof AddItemForm> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
        },
    },
    args: {
        addItem: action('Button was pressed')
    }
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
};

export const AddItemFormErrorStory = (args: AddItemFormType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean | null>(true)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        setNewTaskTitle(target)
    }

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            return setError(true)
        }

        args.addItem(newTaskTitle.trim())
        setNewTaskTitle("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.charCode === 13) {
            addTask()
        }
    }

    const styleButton = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        borderRadius: '5px',
        marginTop: '5px',
        marginLeft: '10px',
    }

    return (
        <div>
            <TextField id="standard-basic" label="Writing..." variant="standard"
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                       style={{marginBottom: '10px'}}/>
            <Button variant="contained" onClick={addTask} style={styleButton}>+</Button>
            {error && <div className={"error-message"}>Field is required</div>}
        </div>
    )
}
