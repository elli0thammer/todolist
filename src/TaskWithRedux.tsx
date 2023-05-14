import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
    task: TaskType,
    idToDo: string,
}
export const TaskWithRedux = React.memo( ({task, idToDo}: TaskPropsType) => {
    let dispatch = useDispatch()

    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, idToDo))
    }

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, idToDo))
    }, [dispatch, task.id, idToDo]);

    const onRemoveHandler = (ID: string) => {
        dispatch(removeTaskAC(ID, idToDo))
    }

    return (
        <li key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      onChange={onChangeCheckboxHandler}
                      icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
            <EditableSpan title={task.title} onChangeAdd={onChangeTitleHandler}/>

            <IconButton aria-label="delete" onClick={() => onRemoveHandler(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
} );
