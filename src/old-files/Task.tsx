import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../api/todolists-api";

type TaskPropsType = {
    changeTaskTitle: (taskID: string, newTitle: string, todolistsID: string) => void,
    changeStatus: (taskID: string, status: TaskStatuses, todolistsID: string) => void,
    removeTask: (id: string, todolistsID: string) => void,
    task: TaskType,
    idToDo: string,
}
export const Task = React.memo( (props: TaskPropsType) => {
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.idToDo)
    }

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.idToDo);
    }, [props.changeTaskTitle, props.task.id, props.idToDo] );

    const onRemoveHandler = (ID: string) => {
        props.removeTask(ID, props.idToDo)
    }

    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed}
                      onChange={onChangeCheckboxHandler}
                      icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
            <EditableSpan title={props.task.title} onChangeAdd={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={() => onRemoveHandler(props.task.id)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
} );
