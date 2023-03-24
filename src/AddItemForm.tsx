import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void,
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState(false)

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
        setError(false)
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>Field is required</div>}
        </div>
    )
}
