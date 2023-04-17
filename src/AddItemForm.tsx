import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormType = {
    addItem: (title: string) => void,
}

export const AddItemForm = React.memo ( (props: AddItemFormType) => {
    console.log('Рендер Формы')
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value
        setNewTaskTitle(target)
    }

    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            return setError(true)
        }

        props.addItem(newTaskTitle.trim())
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
} );
