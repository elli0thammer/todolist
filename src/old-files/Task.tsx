import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    changeTaskTitle: (taskID: string, newTitle: string, todolistsID: string) => void,
    changeStatus: (taskID: string, isDone: boolean, todolistsID: string) => void,
    removeTask: (id: string, todolistsID: string) => void,
    task: TaskType,
    idToDo: string,
}
export const Task = React.memo( (props: TaskPropsType) => {
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.idTask, newIsDoneValue, props.idToDo)
    }

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.idTask, newValue, props.idToDo);
    }, [props.changeTaskTitle, props.task.idTask, props.idToDo] );

    const onRemoveHandler = (ID: string) => {
        props.removeTask(ID, props.idToDo)
    }

    return (
        <li key={props.task.idTask} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeCheckboxHandler}
                      icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
            <EditableSpan title={props.task.title} onChangeAdd={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={() => onRemoveHandler(props.task.idTask)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
} );
